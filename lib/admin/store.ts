import businessJson from '@/content/business.json';
import blogJson from '@/content/blog-posts.json';
import categoriesJson from '@/content/categories.json';
import productsJson from '@/content/products.json';
import { CONTENT_FILES, type ContentKey } from '@/lib/content-types';

/**
 * İçerik deposu. Üç çalışma biçimi var:
 * - github:   GITHUB_TOKEN + GITHUB_REPO tanımlıysa değişiklikler repoya commit edilir,
 *             Vercel yeni commit'i görüp siteyi yeniden derler (~1-2 dk).
 * - local:    geliştirme ortamında (npm run dev) dosyalar doğrudan diske yazılır.
 * - readonly: canlıda GitHub ayarı yoksa panel yalnızca okur.
 */

export type StoreMode = 'github' | 'local' | 'readonly';

export type Snapshot<T> = { data: T; version: string | null };

export class ConflictError extends Error {
  constructor() {
    super('Bu içerik siz düzenlerken başka bir yerden değiştirilmiş. Sayfayı yenileyip tekrar deneyin.');
  }
}

const bundled: Record<ContentKey, unknown> = {
  business: businessJson,
  products: productsJson,
  categories: categoriesJson,
  blog: blogJson,
};

const IMAGE_DIR = 'public/images';
const UPLOAD_DIR = 'public/images/uploads';
const IMAGE_RE = /\.(webp|png|jpe?g|avif|svg)$/i;

export function storeMode(): StoreMode {
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) return 'github';
  if (process.env.NODE_ENV !== 'production') return 'local';
  return 'readonly';
}

export function storeDescription() {
  const mode = storeMode();
  if (mode === 'github') return `GitHub: ${process.env.GITHUB_REPO} (${githubBranch()})`;
  if (mode === 'local') return 'Yerel dosyalar (geliştirme modu)';
  return 'Salt okunur — GITHUB_TOKEN ve GITHUB_REPO tanımlanmadı';
}

// ---------------------------------------------------------------------------
// GitHub
// ---------------------------------------------------------------------------

function githubBranch() {
  return process.env.GITHUB_BRANCH || 'main';
}

async function github(path: string, init: RequestInit = {}) {
  const response = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPO}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(init.headers as Record<string, string> | undefined),
    },
  });
  if (response.status === 409 || response.status === 422) {
    const body = await response.text();
    if (response.status === 409 || body.includes('sha')) throw new ConflictError();
    throw new Error(`GitHub isteği reddedildi (${response.status}): ${body.slice(0, 200)}`);
  }
  if (!response.ok && response.status !== 404) {
    throw new Error(`GitHub isteği başarısız (${response.status}). Token yetkisini ve repo adını kontrol edin.`);
  }
  return response;
}

const encodePath = (path: string) => path.split('/').map(encodeURIComponent).join('/');

async function githubRead(path: string) {
  const response = await github(`/contents/${encodePath(path)}?ref=${encodeURIComponent(githubBranch())}`);
  if (response.status === 404) throw new Error(`${path} repoda bulunamadı (${githubBranch()} dalı).`);
  const file = (await response.json()) as { content?: string; sha: string; encoding?: string };
  let text: string;
  if (file.encoding === 'base64' && file.content) {
    text = Buffer.from(file.content, 'base64').toString('utf8');
  } else {
    // 1 MB üzerindeki dosyalar içeriksiz döner; ham içeriği ayrıca iste.
    const raw = await github(`/contents/${encodePath(path)}?ref=${encodeURIComponent(githubBranch())}`, {
      headers: { Accept: 'application/vnd.github.raw+json' },
    });
    text = await raw.text();
  }
  return { text, sha: file.sha };
}

async function githubWrite(path: string, base64: string, message: string, sha: string | null) {
  const response = await github(`/contents/${encodePath(path)}`, {
    method: 'PUT',
    body: JSON.stringify({ message, content: base64, branch: githubBranch(), ...(sha ? { sha } : {}) }),
  });
  const result = (await response.json()) as { content?: { sha: string }; commit?: { html_url?: string } };
  return { version: result.content?.sha ?? null, commitUrl: result.commit?.html_url ?? null };
}

// ---------------------------------------------------------------------------
// Yerel dosya sistemi (yalnızca geliştirme)
// ---------------------------------------------------------------------------

async function localFs() {
  const [fs, path] = await Promise.all([import('node:fs/promises'), import('node:path')]);
  return { fs, resolve: (file: string) => path.join(process.cwd(), file) };
}

async function localVersion(text: string) {
  const digest = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(text));
  return Buffer.from(digest).toString('hex');
}

// ---------------------------------------------------------------------------
// Ortak API
// ---------------------------------------------------------------------------

export async function readContent<T>(key: ContentKey): Promise<Snapshot<T>> {
  const mode = storeMode();
  const file = CONTENT_FILES[key];
  if (mode === 'github') {
    const { text, sha } = await githubRead(file);
    return { data: JSON.parse(text) as T, version: sha };
  }
  if (mode === 'local') {
    const { fs, resolve } = await localFs();
    const text = await fs.readFile(resolve(file), 'utf8');
    return { data: JSON.parse(text) as T, version: await localVersion(text) };
  }
  return { data: bundled[key] as T, version: null };
}

export type WriteResult = { commitUrl: string | null };

/**
 * İçeriği okur, `update` ile değiştirir ve geri yazar. Okuma ile yazma arasında
 * dosya değişirse (başka sekme / başka kullanıcı) ConflictError fırlatır.
 */
export async function updateContent<T>(
  key: ContentKey,
  message: string,
  update: (current: T) => T,
): Promise<WriteResult> {
  const mode = storeMode();
  if (mode === 'readonly') {
    throw new Error('Panel salt okunur modda: kaydetmek için GITHUB_TOKEN ve GITHUB_REPO ortam değişkenlerini tanımlayın.');
  }
  const current = await readContent<T>(key);
  const next = update(current.data);
  const text = `${JSON.stringify(next, null, 2)}\n`;
  const file = CONTENT_FILES[key];

  if (mode === 'github') {
    const { commitUrl } = await githubWrite(file, Buffer.from(text, 'utf8').toString('base64'), message, current.version);
    return { commitUrl };
  }

  const { fs, resolve } = await localFs();
  const onDisk = await fs.readFile(resolve(file), 'utf8');
  if ((await localVersion(onDisk)) !== current.version) throw new ConflictError();
  await fs.writeFile(resolve(file), text, 'utf8');
  return { commitUrl: null };
}

export async function listImages(): Promise<string[]> {
  const mode = storeMode();
  if (mode === 'github') {
    const results: string[] = [];
    for (const dir of [IMAGE_DIR, UPLOAD_DIR]) {
      const response = await github(`/contents/${encodePath(dir)}?ref=${encodeURIComponent(githubBranch())}`);
      if (response.status === 404) continue;
      const entries = (await response.json()) as { type: string; path: string }[];
      for (const entry of entries) {
        if (entry.type === 'file' && IMAGE_RE.test(entry.path)) results.push(entry.path.replace(/^public/, ''));
      }
    }
    return results.sort();
  }
  try {
    const { fs, resolve } = await localFs();
    const results: string[] = [];
    for (const dir of [IMAGE_DIR, UPLOAD_DIR]) {
      const entries = await fs.readdir(resolve(dir), { withFileTypes: true }).catch(() => []);
      for (const entry of entries) {
        if (entry.isFile() && IMAGE_RE.test(entry.name)) results.push(`${dir.replace(/^public/, '')}/${entry.name}`);
      }
    }
    return results.sort();
  } catch {
    return [];
  }
}

/** Görseli public/images/uploads altına kaydeder ve sitedeki yolunu döndürür. */
export async function saveImage(fileName: string, bytes: Uint8Array) {
  const mode = storeMode();
  if (mode === 'readonly') throw new Error('Panel salt okunur modda; görsel yüklenemez.');
  const repoPath = `${UPLOAD_DIR}/${fileName}`;
  if (mode === 'github') {
    await githubWrite(repoPath, Buffer.from(bytes).toString('base64'), `Admin: görsel yüklendi (${fileName})`, null);
  } else {
    const { fs, resolve } = await localFs();
    await fs.mkdir(resolve(UPLOAD_DIR), { recursive: true });
    await fs.writeFile(resolve(repoPath), bytes);
  }
  return repoPath.replace(/^public/, '');
}
