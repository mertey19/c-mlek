import { NextResponse, type NextRequest } from 'next/server';
import { createLead, LEAD_FIELDS, leadStoreMode, rateLimit } from '@/lib/admin/leads';

const MAX_LENGTH: Record<(typeof LEAD_FIELDS)[number], number> = {
  name: 120, company: 160, phone: 40, email: 200, country: 80, city: 80, product: 120, quantity: 40, message: 3000,
};
const REQUIRED = ['name', 'company', 'phone', 'country', 'product', 'message'] as const;

export async function POST(request: NextRequest) {
  if (leadStoreMode() === 'disabled') return NextResponse.json({ ok: false, reason: 'disabled' }, { status: 503 });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!(await rateLimit(`lead:${ip}`, 5, 600))) {
    return NextResponse.json({ ok: false, reason: 'rate_limited' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });
  }

  // Bal küpü: gerçek kullanıcı bu gizli alanı doldurmaz.
  if (typeof body.website === 'string' && body.website.trim()) return NextResponse.json({ ok: true });

  const values = Object.fromEntries(
    LEAD_FIELDS.map((field) => [field, typeof body[field] === 'string' ? (body[field] as string).trim().slice(0, MAX_LENGTH[field]) : '']),
  ) as Record<(typeof LEAD_FIELDS)[number], string>;

  if (REQUIRED.some((field) => !values[field])) return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 });

  const page = typeof body.page === 'string' && body.page.startsWith('/') ? body.page.slice(0, 200) : '';

  try {
    await createLead({ ...values, language: body.language === 'en' ? 'en' : 'tr', page });
  } catch (error) {
    console.error('[leads] kayıt başarısız', error);
    return NextResponse.json({ ok: false, reason: 'storage' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
