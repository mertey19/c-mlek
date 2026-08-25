import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export default function NotFound() {
  return <><SiteHeader /><main className="not-found"><p className="eyebrow">404</p><h1>Aradığınız sayfa toprağa karışmış olabilir.</h1><p>Bağlantı değişmiş veya sayfa kaldırılmış olabilir. Koleksiyonlara dönerek devam edebilirsiniz.</p><div><Link className="button button--dark" href="/">Ana sayfaya dön</Link><Link className="button button--outline-dark" href="/urunler">Ürünleri keşfet</Link></div></main><SiteFooter /></>;
}
