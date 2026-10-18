import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';

// Read-only HTTP audit. This cannot reveal Google's crawl history or selected canonical.
const base = new URL(process.argv[2] || 'http://127.0.0.1:3001');
assert(['localhost', '127.0.0.1', 'www.tarsuscomlekcilik.com'].includes(base.hostname), 'Unexpected audit target');
const origin = 'https://www.tarsuscomlekcilik.com';
const sameUrl = (a, b) => { try { return new URL(a).href === new URL(b).href; } catch { return false; } };
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'g')) || [];
const plain = value => value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ' ').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
async function get(path, options = {}) {
  const start = performance.now();
  const response = await fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(20000), ...options });
  return { response, html: await response.text(), ms: Math.round(performance.now() - start) };
}
const robots = await get('/robots.txt');
const sitemap = await get('/sitemap.xml');
assert.equal(sitemap.response.status, 200);
const urls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]));
assert(urls.every(url => url.origin === origin), 'Unexpected sitemap origin');
const queue = urls.map(url => url.pathname);
const pages = [];
await Promise.all(Array.from({ length: 3 }, async () => {
  while (queue.length) {
    const path = queue.shift();
    const { response, html, ms } = await get(path);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
    const body = html.match(/<div class="content-section__blocks">([\s\S]*?)<\/section>/)?.[1];
    const links = [...new Set(tags(html, 'a').map(tag => attr(tag, 'href')).filter(Boolean).flatMap(href => {
      try { const url = new URL(href, new URL(path, base)); return [base.origin, origin].includes(url.origin) && url.pathname !== path ? [url.pathname] : []; } catch { return []; }
    }))];
    const meta = tags(html, 'meta');
    pages.push({ path, status: response.status, ms, location: response.headers.get('location'), xRobots: response.headers.get('x-robots-tag'),
      robots: meta.filter(tag => ['robots', 'googlebot'].includes(attr(tag, 'name'))).map(tag => attr(tag, 'content')),
      title: plain(html.match(/<title>(.*?)<\/title>/s)?.[1] || ''),
      canonical: tags(html, 'link').filter(tag => attr(tag, 'rel') === 'canonical').map(tag => attr(tag, 'href')),
      alternates: tags(html, 'link').filter(tag => attr(tag, 'rel') === 'alternate').map(tag => ({ locale: attr(tag, 'hrefLang'), url: attr(tag, 'href') })),
      h1Count: (main.match(/<h1\b/g) || []).length, mainWords: plain(main).split(/\s+/).length,
      bodyHash: body ? createHash('sha256').update(plain(body)).digest('hex') : null,
      bodyWords: body ? plain(body).split(/\s+/).length : null, links });
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}));
const grouped = key => [...new Set(pages.map(page => page[key]).filter(Boolean))].map(value => pages.filter(page => page[key] === value).map(page => page.path)).filter(group => group.length > 1);
const byPath = new Map(pages.map(page => [page.path, page]));
const reachable = new Set(['/']);
const todo = ['/'];
while (todo.length) for (const path of byPath.get(todo.shift())?.links || []) if (!reachable.has(path)) { reachable.add(path); todo.push(path); }
const alternateIssues = pages.flatMap(page => page.alternates.filter(alternate => {
  if (!alternate.url || !alternate.locale || alternate.locale === 'x-default') return false;
  const target = byPath.get(new URL(alternate.url).pathname);
  return target && !target.alternates.some(back => sameUrl(back.url, origin + page.path));
}).map(alternate => ({ path: page.path, alternate })));
const problems = pages.filter(page => page.status !== 200 || page.h1Count !== 1 || page.canonical.length !== 1 || !sameUrl(page.canonical[0], origin + page.path) || /noindex/i.test([page.xRobots, ...page.robots].join(' ')));
const unknown = await get('/olmayan-sayfa-seo-kontrolu');
const botChecks = [];
for (const path of ['/', '/urunler', '/mersin/mezitli', '/blog/mezitli-balkon-teras-terracotta-saksi-secimi']) {
  const { response, html } = await get(path, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' } });
  botChecks.push({ path, status: response.status, hasH1: /<h1\b/.test(html), xRobots: response.headers.get('x-robots-tag') });
}
const summary = { target: base.origin, checkedAt: new Date().toISOString(), urls: pages.length, robots: robots.html.trim(),
  problems: problems.map(({ path, status, canonical, robots, xRobots }) => ({ path, status, canonical, robots, xRobots })),
  unreachableFromHome: pages.filter(page => !reachable.has(page.path)).map(page => page.path),
  duplicateTitles: grouped('title'), identicalMainBlocks: grouped('bodyHash'), alternateIssues,
  unknownUrlStatus: unknown.response.status, botChecks,
  note: 'Googlebot user-agent simulation only; not a Google URL Inspection result. Identical blocks are an improvement signal, not proof of exclusion.' };
mkdirSync('outputs', { recursive: true });
writeFileSync(`outputs/indexing-${base.hostname === 'www.tarsuscomlekcilik.com' ? 'live' : 'local'}.json`, JSON.stringify({ ...summary, pages }, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (process.argv.includes('--assert')) {
  assert.equal(summary.problems.length, 0, 'HTTP, canonical, H1 or indexability regression');
  assert.equal(summary.unreachableFromHome.length, 0, 'Sitemap pages unreachable from the homepage');
  assert.equal(summary.duplicateTitles.length, 0, 'Duplicate page titles');
  assert.equal(summary.alternateIssues.length, 0, 'Non-reciprocal hreflang');
  assert.equal(summary.unknownUrlStatus, 404, 'Unknown URL should not be a soft 404');
  assert(summary.botChecks.every(check => check.status === 200 && check.hasH1 && !/noindex/i.test(check.xRobots || '')), 'Bot user-agent access regression');
  assert(!summary.identicalMainBlocks.some(group => group.filter(path => path.startsWith('/urunler/')).length > 1), 'Duplicate category body content');
  console.log('Indexability and discoverability assertions passed. This is not an indexing guarantee.');
}
