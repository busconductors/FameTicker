# FameTicker — Setup & Publishing Guide

**Domain:** `fameticker.news`
**Netlify URL:** `fameticker.netlify.app`
**GitHub:** `busconductors/FameTicker`

---

## 1. Domain Setup — Namecheap → Cloudflare DNS → Netlify

### Step 1: Add Domain to Cloudflare

1. Create a free account at [cloudflare.com](https://cloudflare.com)
2. Click **Add a Site** and enter `fameticker.news`
3. Cloudflare scans existing DNS records. Choose the **Free** plan
4. Cloudflare gives you **two nameservers**, e.g.:
   - `iris.ns.cloudflare.com`
   - `matt.ns.cloudflare.com`

### Step 2: Point Namecheap to Cloudflare

1. Log into **Namecheap** → Domain List → `fameticker.news` → **Manage**
2. Under **Nameservers**, select **Custom DNS**
3. Paste the two Cloudflare nameservers from Step 1
4. Save. Propagation takes 5-30 minutes

### Step 3: Add DNS Records in Cloudflare

Once Cloudflare confirms the domain is active, go to **DNS → Records** and add:

| Type  | Name  | Content                 | Proxy Status        |
|-------|-------|-------------------------|---------------------|
| CNAME | `@`   | `fameticker.netlify.app` | Proxied (orange)    |
| CNAME | `www` | `fameticker.netlify.app` | Proxied (orange)    |

If Cloudflare rejects a CNAME for `@` (root domain), it will automatically use **CNAME flattening**. That works fine.

### Step 4: Add Domain to Netlify

1. Open [Netlify Dashboard](https://app.netlify.com) → `fameticker` → **Domain settings**
2. Click **Add custom domain** → enter `fameticker.news`
3. Also add `www.fameticker.news`
4. Netlify auto-provisions HTTPS via Let's Encrypt (10-30 min)
5. Once the SSL certificate shows as active, `https://fameticker.news` is live

### Step 5: Enable the Redirect (After DNS Works)

Add this to `netlify.toml` so the old Netlify URL redirects to your custom domain:

```toml
[[redirects]]
  from = "https://fameticker.netlify.app/*"
  to = "https://fameticker.news/:splat"
  status = 301
  force = true

[[redirects]]
  from = "https://www.fameticker.news/*"
  to = "https://fameticker.news/:splat"
  status = 301
  force = true
```

**Wait until DNS is confirmed working before adding the first redirect.** Otherwise the site will redirect to a dead domain.

---

## 2. How the Blog Works

FameTicker uses **static data files** — no database, no admin panel. All articles live in:

```
src/data/posts.ts
```

This is a TypeScript file containing an array of article objects. Every article on the site is defined here.

### Article Structure

```ts
{
  slug: "article-url-name",                 // Unique, URL-friendly, lowercase with hyphens
  title: "Full Article Headline Here",
  subheadline: "Optional sub-headline",
  excerpt: "One or two sentence summary shown on cards and search results.",
  author: "Author Name",
  date: "2026-05-24",                       // YYYY-MM-DD format
  readTime: "4 min read",                   // String, not number
  category: "Music",                        // Must match an existing category
  tags: ["Tag1", "Tag2", "Tag3"],           // Any tags you want
  image: {
    src: "https://images.unsplash.com/photo-XXXXX?w=800",
    alt: "Descriptive alt text for accessibility",
  },
  content: `<p>First paragraph of the article body.</p>
<p>Second paragraph. Write as much HTML as you want.</p>
<p>Third paragraph with <strong>bold text</strong> and <em>italics</em>.</p>`,
  isBreaking: true,                         // Shows in the red ticker bar at top
  featured: true,                           // Makes this the Hero article on homepage
  trending: true,                           // Shows in Trending Now section
  popular: false,                           // Shows in Most Read sidebar
},
```

### To Add a New Article

1. Open `src/data/posts.ts`
2. Add a new object to the array (copy an existing one as a template)
3. Fill in all fields
4. Commit and push — Netlify auto-deploys

### To Edit an Existing Article

1. Open `src/data/posts.ts`
2. Find the article by its `slug`
3. Edit the fields you want to change
4. Commit and push

### To Delete an Article

1. Open `src/data/posts.ts`
2. Remove the article object from the array
3. Commit and push

---

## 3. How Photos Work

All images come from **Unsplash** — a free stock photo library. No local image files needed.

### Getting an Unsplash Image URL

1. Go to [unsplash.com](https://unsplash.com) and search for a photo
2. Click the photo to open it
3. Right-click the image → **Copy Image Address**
4. Append `?w=800` to the URL for proper sizing

Example:
```
https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800
```

### Unsplash URL Formats

| Format | Example |
|--------|---------|
| Direct image | `https://images.unsplash.com/photo-XXXXX?w=800` |
| Random by keyword | `https://source.unsplash.com/800x600/?celebrity` |

### Allowed Image Domains

The following domains are already configured in `netlify.toml` and `next.config.js`:

- `images.unsplash.com`
- `source.unsplash.com`
- `ext.same-assets.com`
- `ugc.same-assets.com`

If you use images from another domain, you must add it to the allowlist.

---

## 4. How to Deploy Changes

Every push to `main` on GitHub triggers an automatic Netlify deploy.

```bash
git add -A
git commit -m "new article: Kanye West surprise album controversy"
git push origin main
```

Netlify builds and deploys in about 60-90 seconds. Monitor progress at:

```
https://app.netlify.com/projects/fameticker
```

### Manual Deploy (If Auto-Deploy Isn't Working)

```bash
netlify deploy --prod --message "Your deploy message here"
```

---

## 5. Site Structure Reference

### Pages (12 total)

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage with hero, trending, latest stories, category sections |
| `/[slug]` | Dynamic | Individual article page |
| `/category/[name]` | Dynamic | Articles filtered by category |
| `/tag/[tag]` | Dynamic | Articles filtered by tag |
| `/search` | Dynamic | Search results page |
| `/about` | Static | About page |
| `/contact` | Static | Contact form |
| `/submit-tip` | Static | Anonymous tip submission form |
| `/privacy` | Static | Privacy policy |
| `/terms` | Static | Terms of service |
| `/sitemap.xml` | Static | Auto-generated sitemap |
| `/robots.txt` | Static | Robots directives |

### Components

| Component | Purpose |
|-----------|---------|
| `BreakingTicker` | Red scrolling ticker bar at top of homepage |
| `Header` | Site header with logo (`FAME TICKER` / `CELEBRITY NEWS`) and navigation |
| `Hero` | Full-width featured article on homepage |
| `TrendingNow` | Numbered trending articles list |
| `ArticleCard` | Article preview card used in grids |
| `CategoryPill` | Category label (e.g., `MUSIC`, `FASHION`) |
| `BreakingBadge` | Green dot + `BREAKING` label |
| `Sidebar` | Desktop sidebar with newsletter and tag cloud |
| `NewsletterSignup` | Email signup form (used in sidebar) |
| `NewsletterPopup` | Bottom slide-up newsletter popup |
| `TagCloud` | Hashtag-style tag pills |
| `Footer` | Three-column footer with links and copyright |
| `RichContent` | Article body HTML renderer |
| `RelatedArticles` | Related articles section on article pages |
| `CommentsPlaceholder` | Comments section placeholder |
| `ShareButtons` | Social share buttons |

### Categories

- Music
- Movies
- Fashion
- Relationships
- Reality TV
- News
- Gossip

### Data Files

| File | Purpose |
|------|---------|
| `src/data/types.ts` | TypeScript types (`Post`, etc.) |
| `src/data/posts.ts` | All 13 articles |
| `src/data/index.ts` | Barrel export (`@/data`) |

---

## 6. Design Reference

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `#1A0A0A` | Burgundy-black | Header, footer, dark sections |
| `#E8C4C4` | Blush pink | Logo, text on dark backgrounds |
| `#FFF5F5` | Rose cream | Article body backgrounds |
| `#CC0000` | True red | Breaking news ticker |
| `#8B0000` | Burgundy | Buttons, hover states, focus rings |
| `#8B4D5C` | Dusty rose | Category labels on light backgrounds |
| `#D4A0A0` | Blush | Section dividers, decorative borders |

### Fonts

| Role | Font |
|------|------|
| Headlines | Cormorant Garamond |
| Body text | DM Sans |
| Labels / section headers | Oswald |
| Category labels | Oswald |

---

## 7. Recommended YouTube Guides

### Next.js Blog from Scratch

Search on YouTube: **"Next.js blog tutorial with Sanity CMS"** by JavaScript Mastery or Sonny Sangha

> [https://www.youtube.com/watch?v=Y6KDk5iyrYE](https://www.youtube.com/watch?v=Y6KDk5iyrYE)

### DNS & Domain Setup

Search: **"How to connect Namecheap domain to Netlify with Cloudflare DNS"**

### Upgrading to a CMS (Sanity.io)

Search: **"Next.js Sanity CMS blog tutorial 2025"**

---

## 8. Future Upgrades

1. **Headless CMS** — Sanity.io (free tier) gives you a web dashboard to write articles without editing code
2. **Newsletter backend** — Buttondown or ConvertKit for the email subscribe form
3. **Comments** — Giscus (free, GitHub-backed, no ads)
4. **Search** — Upgrade from basic string match to Fuse.js fuzzy search
5. **RSS feed** — Auto-generate `/feed.xml` for syndication
6. **PWA** — Service worker for app-like mobile experience

---

## Commands Cheat Sheet

```bash
# Development
npm run dev              # Start dev server at localhost:3000
npx tsc --noEmit         # TypeScript type check
npm run build            # Production build
npm run start            # Start production server locally

# Deploy
git add -A
git commit -m "message"
git push origin main     # Auto-deploys to Netlify

# Manual deploy
netlify deploy --prod --message "message"

# Check Netlify status
netlify status
```

---

*Last updated: 2026-05-24*
