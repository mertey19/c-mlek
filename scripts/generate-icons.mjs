import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = join(root, 'assets', 'icon.svg');
const generatedPath = join(root, 'assets', 'tarsus-favicon-512.png');

async function fromSvg() {
  const svg = readFileSync(svgPath);
  return sharp(svg);
}

async function fromGenerated() {
  return sharp(generatedPath);
}

async function main() {
  const source = await (async () => {
    try {
      await sharp(generatedPath).metadata();
      return fromGenerated();
    } catch {
      return fromSvg();
    }
  })();

  mkdirSync(join(root, 'app'), { recursive: true });
  mkdirSync(join(root, 'public'), { recursive: true });

  await source.clone().resize(512, 512).png().toFile(join(root, 'app', 'icon.png'));
  await source.clone().resize(180, 180).png().toFile(join(root, 'app', 'apple-icon.png'));
  await source.clone().resize(192, 192).png().toFile(join(root, 'public', 'icon-192.png'));
  await source.clone().resize(512, 512).png().toFile(join(root, 'public', 'icon-512.png'));

  const favicon32 = await source.clone().resize(32, 32).png().toBuffer();
  const favicon16 = await source.clone().resize(16, 16).png().toBuffer();
  writeFileSync(join(root, 'public', 'favicon.ico'), favicon32);
  writeFileSync(join(root, 'public', 'favicon-32x32.png'), favicon32);
  writeFileSync(join(root, 'public', 'favicon-16x16.png'), favicon16);

  console.log('Icons generated successfully.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
