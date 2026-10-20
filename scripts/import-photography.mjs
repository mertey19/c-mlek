import { readFile, mkdir, stat, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Reproducible web exports: never enlarge, crop, retouch or overwrite the sources.
const sourceDirectory = process.argv[2];
if (!sourceDirectory) throw new Error('Usage: node scripts/import-photography.mjs <source-directory>');
const collection = JSON.parse(await readFile('content/photography.json', 'utf8'));
const outputDirectory = resolve('public/images/photography-2026-10');
await mkdir(outputDirectory, { recursive: true });
await mkdir('outputs', { recursive: true });
const receipts = [];
for (const photo of collection) {
  const input = join(resolve(sourceDirectory), photo.source);
  const original = await readFile(input);
  const metadata = await sharp(original).metadata();
  if (metadata.width !== photo.width || metadata.height !== photo.height) throw new Error(`Unexpected source dimensions: ${photo.source}`);
  const output = join(outputDirectory, `${photo.file}.webp`);
  // Quality 94 retains the source's texture without claiming to create missing detail.
  await sharp(original).rotate().webp({ quality: 94, effort: 6 }).toFile(output);
  receipts.push({ source: photo.source, sha256: createHash('sha256').update(original).digest('hex'), output, width: photo.width, height: photo.height, bytes: (await stat(output)).size });
}
await writeFile('outputs/photography-import-receipt.json', JSON.stringify(receipts, null, 2));
console.log(`Exported ${receipts.length} photographs without upscaling (${(receipts.reduce((sum, item) => sum + item.bytes, 0) / 1024 / 1024).toFixed(2)} MiB).`);
