import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pairs = [
  ['sitemap.xml', 'sitemap.xml'],
  ['robots.txt', 'robots.txt'],
];

for (const [sourceName, destName] of pairs) {
  const source = path.join(root, '.next/server/app', `${sourceName}.body`);
  const dest = path.join(root, 'public', destName);

  if (!fs.existsSync(source)) {
    console.warn(`[sync-seo-files] Missing build artifact: ${source}`);
    continue;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(source, dest);
  console.log(`[sync-seo-files] Wrote public/${destName}`);
}
