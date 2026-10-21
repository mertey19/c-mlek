# Supplied photography — 20–21 October 2026

The owner initially supplied 31 JPEGs for the existing website, followed by two
additional handled-jar photographs. Those 32 pottery-related images are catalogued
in `content/photography.json`; `adas.jpeg` is a light-bulb advertisement and is
intentionally excluded.

On 21 October the owner supplied another batch of 25 photographs. Only 22 were
new, bringing the gallery to 54 images. The following incoming copies were omitted:

- `WhatsApp Image 2026-10-20 at 16.01.12.jpeg`: byte-identical to `..çç.jpeg` (H55 × L37).
- `WhatsApp Image 2026-10-20 at 16.01.12 (3).jpeg`: byte-identical to `öööööö.jpeg` (H49 × L39).
- `WhatsApp Image 2026-10-20 at 16.01.12 (5).jpeg`: a re-encoded copy of `hhh.jpeg`,
  confirmed by visual comparison and a 32 × 32 RGB mean absolute difference of
  0.30 on the 0–255 scale. The existing outdoor blue-pot photograph was retained.

The incoming batch was also compared with the existing admin-uploaded images.
The additions are gallery-only: 16 product/collection photographs, five preparation
photographs and one labelled placement example. Existing heroes are unchanged.
Only the gallery's editorial modification date advances to 21 October.

## Preservation and presentation

- Source files remain untouched. WebP exports retain the source dimensions,
  colors and composition; no generative retouching, enlargement or cropping.
- Export quality is 94; Next.js responsive display quality is 90. This preserves
  supplied detail, but does not claim to create 4K detail from smaller files.
- The homepage uses `q.jpeg` on desktop and `w.jpeg` on mobile. Only the
  browser-selected composition is requested, with high fetch priority.
- Gallery and inner-page hero images use their native aspect ratios. Gallery
  images are lazy-loaded and link to the full-resolution WebP.
- The new collages, embedded black borders and H/L labels remain intact. New
  images retain their source dimensions, including the 3024 × 4032 indoor blue-pot
  photograph; smaller source images are not enlarged.
- The additional `..çç.jpeg` (1242 × 1192) and `öööööö.jpeg` (1242 × 1200)
  photographs appear in the Terracotta collection. Their embedded H55 × L37 and
  H49 × L39 labels remain visible; no measurement unit, age or stock availability
  is inferred. The gallery count is derived from the collection.
- Badges embedded in `aaaaaa.jpeg` and `aaaaaaaaaaa.jpeg` remain intact. These
  files are gallery-only rather than hero images.
- Hospitality/brand-styled scenes are labelled as placement inspiration, not
  verified customer projects. No new client relationship or product specification
  is inferred from a photo.
- Existing `/images/uploads/` admin-managed product photographs are preserved.
  Only the large-jar record's old placeholder photographs are replaced.
- Legacy source image files remain in Git for recovery, but public pages no
  longer reference them. Existing logo and favicon assets are unchanged.
- Image paths, alt text, social previews and sitemap modification dates reflect
  the photography update. Earlier editorial revisions remain recorded in their
  source data; the last-modified resolver also accounts for photography.

## Rebuild and verify

```sh
node scripts/import-photography.mjs "<directory containing the supplied JPEGs>"
npm run build
npm run start -- --port 3002
npm run test:photography -- http://127.0.0.1:3002
npm run test:seo -- http://127.0.0.1:3002
```

The importer produces a source SHA-256 / size / dimensions receipt in the ignored
`outputs/photography-import-receipt.json`. No local source-directory path is needed
in the deployed application.
