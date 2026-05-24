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

### Deploy (2026-05-24)
- [x] GitHub repo created: `busconductors/FameTicker`
- [x] Netlify site created and linked: `fameticker.news`
- [x] Netlify deploy fixed: removed `NETLIFY_NEXT_PLUGIN_SKIP` (was causing 404s)
- [x] Production verified: homepage, search (accent fix confirmed), category, contact all 200

- [ ] Move from static data to CMS/API when scaling

### Redesign — fameticker.news Clone (2026-05-24)
- [x] Dark luxury theme: #0D0D0D base, cream sections (#FDF5E6), gold accents (#C8A96E)
- [x] Breaking news ticker: red bar with CSS scroll animation (25s linear infinite)
- [x] "FAME TICKER" gold Playfair Display branding, DM Sans body font
- [x] 6 new components: BreakingTicker, BreakingBadge, CategoryPill, TrendingNow, TagCloud, NewsletterSignup
- [x] 13 articles enriched with full HTML body content from spec
- [x] Dark mode toggle removed (single theme)
- [x] All 12 pages restyled: Playfair Display headlines, cream content backgrounds, gold accents
- [x] Breadcrumb navigation on article pages
- [x] Build: 0 errors, all 12 pages compile
- [x] Deployed: https://fameticker.news

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

### FameTicker.news Rebrand (2026-05-24)
- [x] Global text replacement: "Spill It Now" / "THE TEA" / "spillitnow" → "Fame Ticker" / "FAME TICKER" / "fameticker" — all 0 remaining
- [x] Header logo: "FAME TICKER" / "CELEBRITY NEWS" in gold Playfair Display
- [x] Footer: updated copyright, description to "Real-time celebrity intel..."
- [x] BreakingTicker restyled: burgundy #8B0000 bg, blush pink #E8C4C4 text, Cormorant Garamond italic (35s), Oswald "BREAKING" label
- [x] Design tokens: --ticker-bg, --ticker-text, --ticker-label, --ticker-height added to globals.css
- [x] Fonts: Cormorant Garamond + Oswald added to next/font/google
- [x] SEO: full metadata with OG, Twitter, canonical, keywords on layout + [slug] + all pages
- [x] About page: full rewrite with What We Cover / Our Standards / Contact sections
- [x] Submit Tip: "Tip the Ticker." heading, new CTA copy
- [x] Newsletter: "Get the biggest scoops before anyone else" CTA
- [x] Contact: updated subtitle
- [x] Config: package.json name → fameticker, netlify.toml redirects (fameticker.netlify.app → fameticker.news 301), README rewrite
- [x] Domain: sitemap + robots → fameticker.news
- [x] Build: 0 errors, 0 type errors, all 12 pages compile
- [ ] Domain purchase: fameticker.news (pending registrar action)
