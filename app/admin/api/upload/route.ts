import { NextResponse, type NextRequest } from 'next/server';
import { isAuthenticated } from '@/lib/admin/auth';
import { saveImage } from '@/lib/admin/store';
import { slugify } from '@/lib/content-types';

// Vercel fonksiyon gövde sınırı 4,5 MB; güvenli pay bırak.
const MAX_BYTES = 4 * 1024 * 1024;

function detectType(bytes: Uint8Array): 'webp' | 'png' | 'jpg' | 'avif' | null {
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'webp';
  if (bytes[0] === 0x89 && ascii(1, 4) === 'PNG') return 'png';
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'jpg';
  if (ascii(4, 8) === 'ftyp' && ['avif', 'avis'].includes(ascii(8, 12))) return 'avif';
  return null;
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Oturum süresi doldu.' }, { status: 401 });

  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'Dosya bulunamadı.' }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: 'Görsel en fazla 4 MB olabilir. WebP olarak sıkıştırmayı deneyin.' }, { status: 413 });

  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = detectType(bytes);
  if (!type) return NextResponse.json({ error: 'Yalnızca WebP, JPG, PNG veya AVIF yüklenebilir.' }, { status: 415 });

  const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'gorsel';
  const stamp = new Date().toISOString().slice(0, 19).replace(/[-:T]/g, '');
  try {
    const path = await saveImage(`${base}-${stamp}.${type}`, bytes);
    return NextResponse.json({ path });
  } catch (error) {
    console.error('[admin upload]', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Yükleme başarısız.' }, { status: 500 });
  }
}
