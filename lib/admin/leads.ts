/**
 * Teklif formu kayıtları.
 * - Canlıda Upstash Redis (Vercel Marketplace → Upstash) REST API'si kullanılır:
 *   KV_REST_API_URL / KV_REST_API_TOKEN veya UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.
 * - Geliştirme ortamında Redis tanımlı değilse .data/leads.json dosyasına yazılır.
 * Kişisel veri içerdiği için kayıtlar asla repoya commit edilmez.
 */

import type { Lead } from './lead-types';

export { LEAD_FIELDS, LEAD_STATUSES, type Lead, type LeadStatus } from './lead-types';

const INDEX_KEY = 'leads:index';
const leadKey = (id: string) => `lead:${id}`;
const RETENTION_DAYS = 730;

type RedisConfig = { url: string; token: string };

function redisConfig(): RedisConfig | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

export type LeadStoreMode = 'redis' | 'file' | 'disabled';

export function leadStoreMode(): LeadStoreMode {
  if (redisConfig()) return 'redis';
  if (process.env.NODE_ENV !== 'production') return 'file';
  return 'disabled';
}

async function redis<T = unknown>(commands: (string | number)[][]): Promise<T[]> {
  const config = redisConfig();
  if (!config) throw new Error('Redis yapılandırılmadı');
  const response = await fetch(`${config.url}/pipeline`, {
    method: 'POST',
    cache: 'no-store',
    headers: { Authorization: `Bearer ${config.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!response.ok) throw new Error(`Redis isteği başarısız (${response.status})`);
  const results = (await response.json()) as { result?: T; error?: string }[];
  const failed = results.find((item) => item.error);
  if (failed) throw new Error(`Redis hatası: ${failed.error}`);
  return results.map((item) => item.result as T);
}

// --- Geliştirme için dosya deposu ------------------------------------------

async function fileStore() {
  const [fs, path] = await Promise.all([import('node:fs/promises'), import('node:path')]);
  const file = path.join(process.cwd(), '.data', 'leads.json');
  return {
    async read(): Promise<Lead[]> {
      try {
        return JSON.parse(await fs.readFile(file, 'utf8')) as Lead[];
      } catch {
        return [];
      }
    },
    async write(leads: Lead[]) {
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, JSON.stringify(leads, null, 2), 'utf8');
    },
  };
}

// --- Genel API -------------------------------------------------------------

export async function createLead(input: Omit<Lead, 'id' | 'createdAt' | 'status' | 'note'>) {
  const lead: Lead = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: 'yeni', note: '' };
  const mode = leadStoreMode();
  if (mode === 'redis') {
    await redis([
      ['SET', leadKey(lead.id), JSON.stringify(lead), 'EX', RETENTION_DAYS * 86400],
      ['ZADD', INDEX_KEY, Date.parse(lead.createdAt), lead.id],
    ]);
  } else if (mode === 'file') {
    const store = await fileStore();
    await store.write([lead, ...(await store.read())]);
  } else {
    throw new Error('Teklif kaydı deposu yapılandırılmadı');
  }
  return lead;
}

export async function listLeads(limit = 500): Promise<Lead[]> {
  const mode = leadStoreMode();
  if (mode === 'file') return (await (await fileStore()).read()).slice(0, limit);
  if (mode === 'disabled') return [];
  const [ids] = await redis<string[]>([['ZRANGE', INDEX_KEY, 0, limit - 1, 'REV']]);
  if (!ids?.length) return [];
  const [values] = await redis<(string | null)[]>([['MGET', ...ids.map(leadKey)]]);
  const expired = ids.filter((_, i) => !values[i]);
  if (expired.length) await redis([['ZREM', INDEX_KEY, ...expired]]);
  return values.filter((value): value is string => Boolean(value)).map((value) => JSON.parse(value) as Lead);
}

export async function updateLead(id: string, patch: Partial<Pick<Lead, 'status' | 'note'>>) {
  const mode = leadStoreMode();
  if (mode === 'file') {
    const store = await fileStore();
    const leads = await store.read();
    await store.write(leads.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead)));
    return;
  }
  if (mode === 'disabled') throw new Error('Teklif kaydı deposu yapılandırılmadı');
  const [value] = await redis<string | null>([['GET', leadKey(id)]]);
  if (!value) throw new Error('Kayıt bulunamadı');
  await redis([['SET', leadKey(id), JSON.stringify({ ...(JSON.parse(value) as Lead), ...patch }), 'KEEPTTL']]);
}

export async function deleteLead(id: string) {
  const mode = leadStoreMode();
  if (mode === 'file') {
    const store = await fileStore();
    await store.write((await store.read()).filter((lead) => lead.id !== id));
    return;
  }
  if (mode === 'disabled') throw new Error('Teklif kaydı deposu yapılandırılmadı');
  await redis([['DEL', leadKey(id)], ['ZREM', INDEX_KEY, id]]);
}

// --- Hız sınırı ------------------------------------------------------------

const memoryHits = new Map<string, { count: number; resetAt: number }>();

/** `limit` isteği `windowSeconds` içinde aşarsa false döner. Redis yoksa süreç içi sayaç kullanır. */
export async function rateLimit(bucket: string, limit: number, windowSeconds: number) {
  const key = `ratelimit:${bucket}`;
  if (redisConfig()) {
    try {
      const [count] = await redis<number>([['INCR', key], ['EXPIRE', key, windowSeconds, 'NX']]);
      return count <= limit;
    } catch {
      // Redis geçici olarak erişilemezse formu engelleme; bellek sayacına düş.
    }
  }
  const now = Date.now();
  const entry = memoryHits.get(key);
  if (!entry || entry.resetAt < now) {
    memoryHits.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}
