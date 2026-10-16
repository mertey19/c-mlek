import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { validateBlogPosts } from '../lib/content-types.ts';

// Test against a running production build: npm run start -- --port 3001
const base = new URL(process.argv[2] || 'http://localhost:3001');
assert(['localhost', '127.0.0.1'].includes(base.hostname), 'Run the audit against a local build, not the live business.');
const districts = ['akdeniz', 'anamur', 'aydincik', 'bozyazi', 'camliyayla', 'erdemli', 'gulnar', 'mezitli', 'mut', 'silifke', 'tarsus', 'toroslar', 'yenisehir'];
const paths = ['/mersin', ...districts.map(slug => `/mersin/${slug}`)];
const origin = 'https://www.tarsuscomlekcilik.com';
const businessData = JSON.parse(readFileSync('content/business.json', 'utf8'));
const products = JSON.parse(readFileSync('content/products.json', 'utf8'));
const categories = JSON.parse(readFileSync('content/categories.json', 'utf8'));
const posts = JSON.parse(readFileSync('content/blog-posts.json', 'utf8'));
validateBlogPosts(posts);
const textOnly = value => value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ' ').replace(/<[^>]*>/g, ' ').replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"').replace(/\s+/g, ' ').trim();
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'g')) || [];
const metadata = (html, name) => tags(html, 'meta').find(tag => attr(tag, 'name') === name || attr(tag, 'property') === name);
const seenTitles = new Set();
const seenDescriptions = new Set();
const internalLinks = new Set();
let checks = 0;
const check = (condition, message) => { assert(condition, message); checks++; };
async function get(path, expected = 200) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' });
  check(response.status === expected, `${path}: expected ${expected}, got ${response.status}`);
  const html = await response.text();
  for (const tag of tags(html, 'a')) {
    const href = attr(tag, 'href');
    if (href?.startsWith('/') && !href.startsWith('//')) internalLinks.add(new URL(href, base).pathname);
  }
  return html;
}

const sitemap = await get('/sitemap.xml');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
check(locations.length === new Set(locations).size, 'Duplicate sitemap URLs');
check(locations.every(url => url.startsWith(`${origin}/`)), 'Non-production sitemap URL');
check(locations.every(url => !/^\/(admin|api)(\/|$)/.test(new URL(url).pathname)), 'Private route in sitemap');
for (const item of [...categories, ...products]) {
  check(locations.includes(`${origin}/urunler/${item.slug}`), `Existing catalog page missing: ${item.slug}`);
}
for (const post of posts) {
  const url = `${origin}${post.locale === 'en' ? '/en/blog' : '/blog'}/${post.slug}`;
  const entry = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].find(match => match[1].includes(`<loc>${url}</loc>`))?.[1];
  check(!!entry, `Existing blog missing: ${url}`);
  check(entry.includes(`<lastmod>${new Date(post.updatedAt ?? post.publishedAt).toISOString()}</lastmod>`), `Blog date overwritten: ${url}`);
}

for (const path of paths) {
  const html = await get(path);
  const title = textOnly(html.match(/<title>(.*?)<\/title>/s)?.[1] || '');
  const description = attr(metadata(html, 'description') || '', 'content');
  check(!!title && !seenTitles.has(title), `${path}: missing/duplicate title`);
  check(!!description && !seenDescriptions.has(description), `${path}: missing/duplicate description`);
  seenTitles.add(title); seenDescriptions.add(description);
  check((html.match(/<h1\b/g) || []).length === 1, `${path}: expected one SSR H1`);
  const canonical = tags(html, 'link').filter(tag => attr(tag, 'rel') === 'canonical');
  check(canonical.length === 1 && attr(canonical[0], 'href') === `${origin}${path}`, `${path}: wrong canonical`);
  const alternates = tags(html, 'link').filter(tag => attr(tag, 'rel') === 'alternate');
  check(alternates.every(tag => !attr(tag, 'hrefLang') || attr(tag, 'href') !== `${origin}/en`), `${path}: unrelated English alternate`);
  check(attr(metadata(html, 'og:url') || '', 'content') === `${origin}${path}`, `${path}: wrong OpenGraph URL`);
  check(attr(metadata(html, 'twitter:card') || '', 'content') === 'summary_large_image', `${path}: Twitter card missing`);
  check(attr(metadata(html, 'robots') || '', 'content')?.includes('index') && !attr(metadata(html, 'robots') || '', 'content')?.includes('noindex'), `${path}: production not indexable`);
  check(locations.includes(`${origin}${path}`), `${path}: absent from sitemap`);
  check(html.includes('name="fullName"') || html.includes('name="name"'), `${path}: quote form absent`);
  check(html.includes(`https://wa.me/${businessData.whatsapp}`), `${path}: wrong WhatsApp number`);
  check(!html.includes('<canvas'), `${path}: unnecessary SSR canvas`);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(match => JSON.parse(match[1]));
  const business = schemas.find(item => item['@type'] === 'LocalBusiness');
  check(business?.address?.addressLocality === businessData.locality && business?.address?.streetAddress === businessData.streetAddress, `${path}: fabricated branch address`);
  check(business?.['@id'] === `${origin}/#organization`, `${path}: inconsistent business identity`);
  check(business?.areaServed?.filter(area => area.containedInPlace).length === 13, `${path}: incomplete service areas`);
  const breadcrumb = schemas.find(item => item['@type'] === 'BreadcrumbList');
  check(breadcrumb?.itemListElement?.at(-1)?.item === `${origin}${path}`, `${path}: bad breadcrumb`);
  const faq = schemas.find(item => item['@type'] === 'FAQPage');
  check(faq?.mainEntity?.length > 0 && faq.mainEntity.every(item => textOnly(html).includes(item.name) && textOnly(html).includes(item.acceptedAnswer.text)), `${path}: FAQ differs from visible content`);
  if (path !== '/mersin') {
    const service = schemas.find(item => item['@type'] === 'Service');
    check(service?.provider?.['@id'] === business['@id'], `${path}: service provider mismatch`);
    check(html.includes('href="/mersin"'), `${path}: missing parent link`);
    const content = html.match(/<div class="content-section__blocks">(.*?)<\/section>/s)?.[1] || '';
    check(textOnly(content).split(/\s+/).length >= 200, `${path}: insufficient useful body content`);
  } else {
    check(districts.every(slug => html.includes(`href="/mersin/${slug}"`)), 'Hub missing district links');
    check(schemas.some(item => item['@type'] === 'ItemList' && item.numberOfItems === 13), 'Hub ItemList missing');
  }
}
const home = await get('/');
const blogIndex = await get('/blog');
const districtArticles = [];
for (const district of districts) {
  const areaPath = `/mersin/${district}`;
  const matches = posts.filter(post => post.locale === 'tr' && post.blocks.some(block => block.link?.href === areaPath));
  check(matches.length >= 1, `${district}: no dedicated blog article`);
  const article = matches[0];
  districtArticles.push(article);
  const articlePath = `/blog/${article.slug}`;
  check(blogIndex.includes(`href="${articlePath}"`), `${articlePath}: missing from blog index`);
  const areaHtml = await get(areaPath);
  check(areaHtml.includes(`href="${articlePath}"`), `${areaPath}: missing article backlink`);
  const html = await get(articlePath);
  check((html.match(/<h1\b/g) || []).length === 1, `${articlePath}: expected one H1`);
  const title = textOnly(html.match(/<title>(.*?)<\/title>/s)?.[1] || '');
  const description = attr(metadata(html, 'description') || '', 'content');
  check(title.includes(article.seoTitle) && !seenTitles.has(title), `${articlePath}: missing/duplicate SEO title`);
  check(description === article.seoDescription && !seenDescriptions.has(description), `${articlePath}: missing/duplicate description`);
  seenTitles.add(title); seenDescriptions.add(description);
  check(tags(html, 'link').some(tag => attr(tag, 'rel') === 'canonical' && attr(tag, 'href') === `${origin}${articlePath}`), `${articlePath}: bad canonical`);
  check(attr(metadata(html, 'og:type') || '', 'content') === 'article', `${articlePath}: wrong OpenGraph type`);
  check(attr(metadata(html, 'og:url') || '', 'content') === `${origin}${articlePath}`, `${articlePath}: wrong OpenGraph URL`);
  check(!attr(metadata(html, 'robots') || '', 'content')?.includes('noindex'), `${articlePath}: blocked indexing`);
  check(html.includes(`href="${areaPath}"`), `${articlePath}: missing service-area link`);
  check(!html.includes('{{adres}}') && !html.includes('{{telefon}}'), `${articlePath}: unresolved business tokens`);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(match => JSON.parse(match[1]));
  const articleSchema = schemas.find(item => item['@type'] === 'BlogPosting');
  check(articleSchema?.headline === article.title && articleSchema?.url === `${origin}${articlePath}`, `${articlePath}: wrong article schema`);
  check(articleSchema?.datePublished === article.publishedAt && articleSchema?.dateModified === (article.updatedAt ?? article.publishedAt), `${articlePath}: inconsistent article dates`);
  check(articleSchema?.author?.name === businessData.name, `${articlePath}: wrong author identity`);
  check(article.blocks.every(block => textOnly(html).includes(block.title)), `${articlePath}: missing article sections`);
  check(new Set(article.blocks.map(block => block.title)).size === article.blocks.length, `${articlePath}: duplicate sections`);
}
check(new Set(districtArticles.map(post => post.slug)).size === districts.length, 'Districts share the same article');
const originalBodies = districtArticles.flatMap(post => post.blocks.map(block => block.body));
check(new Set(originalBodies).size === originalBodies.length, 'Repeated district article paragraphs');
check(districts.every(slug => home.includes(`href="/mersin/${slug}"`)), 'Home missing district links');
check(home.includes('Toprağın ustalığı'), 'Home H1 content lost');
check(home.includes('/images/hero-terracotta.webp'), 'Static hero fallback removed');
const featuredProduct = products.find(product => product.featured) ?? products[0];
check(home.includes(`href="/urunler/${featuredProduct.slug}"`), 'Admin-selected featured product lost');
check(!/PotteryHero|ProductionExperience|ProductViewer3D|pottery\.css/.test(readFileSync('app/page.tsx', 'utf8')), 'Unrequested 3D homepage restored');
check(!/^['"]use client/m.test(readFileSync('app/page.tsx', 'utf8')), 'Homepage became a Client Component');

// Crawl every sitemap URL, including preserved product, blog and English routes.
for (const url of locations) {
  const path = new URL(url).pathname;
  if (paths.includes(path) || path === '/') continue;
  const html = await get(path);
  check((html.match(/<h1\b/g) || []).length === 1, `${path}: missing/duplicate H1`);
}
const robots = await get('/robots.txt');
check(robots.includes(`Sitemap: ${origin}/sitemap.xml`) && robots.includes('Allow: /'), 'Production robots/sitemap mismatch');
check(robots.includes('Disallow: /admin') && robots.includes('Disallow: /api/'), 'Admin/API crawl exclusions lost');
const adminLogin = await get('/admin/giris');
check(attr(metadata(adminLogin, 'robots') || '', 'content')?.includes('noindex'), 'Admin login became indexable');
for (const path of internalLinks) {
  const response = await fetch(new URL(path, base));
  check(response.status === 200, `Broken internal link: ${path}`);
}
await get('/mersin/olmayan-ilce', 404);
for (const [nodeEnv, vercelEnv, expected] of [
  ['production', 'production', true], ['production', 'preview', false],
  ['production', 'development', false], ['development', '', false], ['production', '', true],
]) {
  const actual = execFileSync(process.execPath, ['--experimental-strip-types', '--input-type=module', '-e', "import { allowIndexing } from './lib/indexing.ts'; process.stdout.write(String(allowIndexing));"], {
    env: { ...process.env, NODE_ENV: nodeEnv, VERCEL_ENV: vercelEnv }, encoding: 'utf8',
  });
  check(actual === String(expected), `Wrong indexing policy: ${nodeEnv}/${vercelEnv}`);
}
console.log(`SEO audit passed: ${checks} checks, ${paths.length} service-area pages, ${districtArticles.length} district articles, ${locations.length} sitemap URLs. No external messages sent.`);
