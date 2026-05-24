# FameTicker — Audit & Implementation Plan

## Codebase Analysis Summary

**Stack:** Next.js 15.5 (App Router), React 18, Tailwind CSS 3, TypeScript
**Structure:** 10 pages + robots/sitemap + 9 components + data layer (`src/data/`)
**Content:** 13 mock celebrity news articles with categories, tags, images (Unsplash/Same Assets CDN)

## Completed (18 items)

### Critical / Build
- [x] Next.js 15 params Promise type errors (4 pages)
- [x] SSR crash: same-runtime/bippy localStorage (removed jsxImportSource + CDN scripts)
- [x] Node 25 experimental webstorage breaks SSR (--no-experimental-webstorage in scripts)
- [x] next@15.3.7 security CVE → upgraded to 15.5.18
- [x] netlify.toml build command → bun → npm
- [x] eslint-config-next version mismatch → 15.5.18
- [x] npm cache EACCES permissions

### Bugs
- [x] Footer category links broken (5 links)
- [x] Dark mode toggle loses state on refresh → localStorage persistence
- [x] Search page special char handling

### Polish
- [x] Loading skeletons on 4 dynamic pages
- [x] Error boundary (error.tsx)
- [x] Branded 404 page (not-found.tsx)
- [x] SEO metadata on 4 dynamic pages (generateMetadata)
- [x] Forms functional: contact, submit-tip, sidebar newsletter, popup newsletter
- [x] robots.txt + sitemap.xml
- [x] lucide-react upgraded to 0.503
- [x] biome a11y rules re-enabled
- [x] ShareButtons with icons

### Refactor
- [x] Static data split: posts.ts → types.ts + posts.ts + index.ts barrel
- [x] All imports updated to `@/data` barrel
- [x] Removed unused deps: same-runtime, react-grab

## Remaining (low priority — not blocking)

- [ ] Move from static data to CMS/API when scaling

### QA Session (2026-05-24)
- [x] Search: accent-insensitive matching — normalized unicode diacritics before comparison (809e188)
- [x] Performance: LCP priority on above-fold ArticleCard images — added priority prop to ArticleCard (809e188)
- [x] XSS check: search rendering verified safe — React auto-escapes by default
- [ ] Deferred: 404 page returns HTTP 200 (Next.js not-found.tsx limitation)

### Security & Polish
- [x] Image optimization: removed global `unoptimized: true`, added `unoptimized` prop to CDN `<Image>` components (Hero, ArticleCard, [slug])
- [x] Dark mode SSR flash: inline `<script>` in `<head>` applies `dark` class before hydration, Header reads initial state from DOM
- [x] Newsletter localStorage key audit: extracted keys to `src/lib/constants.ts` (LS_THEME, LS_NEWSLETTER_DISMISSED)
- [x] Content security policy: added CSP + X-Content-Type-Options + Referrer-Policy headers in next.config
