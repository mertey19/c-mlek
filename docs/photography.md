# Supplied photography — 20 October 2026

The owner supplied 31 JPEGs for the existing website. The 30 pottery-related
images are catalogued in `content/photography.json`; `adas.jpeg` is a light-bulb
advertisement and is intentionally excluded.

## Preservation and presentation

- Source files remain untouched. WebP exports retain the source dimensions,
  colors and composition; no generative retouching, enlargement or cropping.
- Export quality is 94; Next.js responsive display quality is 90. This preserves
  supplied detail, but does not claim to create 4K detail from smaller files.
- The homepage uses `q.jpeg` on desktop and `w.jpeg` on mobile. Only the
  browser-selected composition is requested, with high fetch priority.
- Gallery and inner-page hero images use their native aspect ratios. Gallery
  images are lazy-loaded and link to the full-resolution WebP.
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
