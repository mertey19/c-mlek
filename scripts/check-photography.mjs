import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import sharp from 'sharp';

const photos = JSON.parse(await readFile('content/photography.json', 'utf8'));
assert.equal(photos.length, 30);
assert.equal(new Set(photos.map(photo => photo.id)).size, 30);
assert.equal(new Set(photos.map(photo => photo.file)).size, 30);
assert(!photos.some(photo => photo.source === 'adas.jpeg'), 'Unrelated bulb advertisement imported');
let bytes = 0;
for (const photo of photos) {
  const file = `public/images/photography-2026-10/${photo.file}.webp`;
  const meta = await sharp(file).metadata();
  assert.equal(meta.width, photo.width, `${photo.id}: width changed`);
  assert.equal(meta.height, photo.height, `${photo.id}: height changed`);
  assert.equal(meta.format, 'webp');
  assert(photo.alt.length > 25 && photo.altEn.length > 25, `${photo.id}: missing descriptive alt`);
  bytes += (await stat(file)).size;
}

const base = new URL(process.argv[2] || 'http://127.0.0.1:3002');
assert(['localhost', '127.0.0.1', 'www.tarsuscomlekcilik.com'].includes(base.hostname));
const get = async (path) => {
  const response = await fetch(new URL(path, base));
  assert(response.ok, `${path}: HTTP ${response.status}`);
  return response;
};
const gallery = await (await get('/galeri')).text();
for (const photo of photos) {
  const path = `/images/photography-2026-10/${photo.file}.webp`;
  assert(gallery.includes(`href="${path}"`), `${photo.id}: full-size link absent`);
  assert(gallery.includes(`alt="${photo.alt}"`), `${photo.id}: gallery alt absent`);
  const image = [...gallery.matchAll(/<img\b[^>]*>/g)].map(match => match[0]).find(tag => tag.includes(`alt="${photo.alt}"`) && tag.includes('loading="lazy"'));
  assert(image, `${photo.id}: missing lazy-loaded gallery image`);
  const asset = await get(path);
  assert(asset.headers.get('content-type')?.includes('image/webp'), `${path}: wrong content type`);
}
const home = await (await get('/')).text();
assert(home.includes('<picture>') && home.includes('media="(max-width: 700px)"'), 'Responsive hero missing');
assert(home.includes('fetchPriority="high"') || home.includes('fetchpriority="high"'), 'Hero is not prioritized');
assert(home.includes('q=90'), 'High-quality hero optimization missing');
const oldImages = /\/images\/(?:hero-terracotta|collection|workshop|project-concept)\.webp|\/og\.png/;
for (const route of ['/', '/galeri', '/atolye', '/urunler', '/blog', '/mersin', '/mersin/tarsus', '/en', '/en/products', '/en/blog/pot-wholesale', '/projeler']) {
  const html = (await (await get(route)).text()).replace(/%2f/gi, '/');
  assert(!oldImages.test(html), `${route}: former concept imagery still in rendered output`);
  assert(!html.includes('şekillendiren usta elleri'), `${route}: obsolete image description`);
}
for (const id of ['gardenJars', 'gardenTrio', 'blueBatch']) {
  const photo = photos.find(item => item.id === id);
  const url = `/_next/image?url=${encodeURIComponent(`/images/photography-2026-10/${photo.file}.webp`)}&w=640&q=90`;
  const response = await get(url);
  assert(response.headers.get('content-type')?.startsWith('image/'), `Optimizer failed: ${id}`);
  const rendered = await sharp(Buffer.from(await response.arrayBuffer())).metadata();
  assert.equal(rendered.width, 640);
  assert(Math.abs(rendered.height / rendered.width - photo.height / photo.width) < 0.005, `${id}: optimized image distorted`);
}
console.log(`Photography audit passed: 30 full-resolution assets (${(bytes / 1024 / 1024).toFixed(2)} MiB), gallery, 11 routes, responsive hero and quality-90 optimizer.`);
