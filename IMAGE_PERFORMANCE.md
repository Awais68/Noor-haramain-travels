# Image & Download Performance

How imagery and client-side download weight are handled in this project, what
changed in the performance pass, and how to add new assets.

## TL;DR — what this codebase actually looked like

Unlike a typical site, **there are no local raster images to compress.** Every
photograph is served from the **Unsplash CDN** via `unsplash(id, w, q)` in
`src/lib/site.ts`, which already:

- negotiates **AVIF / WebP** automatically (`auto=format`),
- resizes on the fly (`w=`),
- serves from a global edge with long-lived immutable cache headers.

So the classic "convert PNG→AVIF with sharp" work did not apply. The real
problems were **(1) a 220 KB-gzip Three.js bundle used only for a decorative
hero effect**, and **(2) raw `<img>` tags instead of `next/image`**. Both are now fixed.

## Before / after

| Metric | Before | After |
|---|---|---|
| **Total client JS (raw)** | 1.82 MB | **1.02 MB** (−865 KB, ≈ −45%) |
| Hero decorative effect | Three.js + R3F lazy chunks (**689 KB + 166 KB raw ≈ 223 KB gzip**) | Canvas 2D (~2 KB, in-component) |
| Runtime deps | incl. `three`, `@react-three/fiber`, `@types/three` | those **removed** |
| Image component | hand-rolled `<img>` + manual `srcset` | `next/image` (AVIF/WebP, srcset, lazy, CLS-safe, blur-up) |
| LCP preload | none | auto-emitted responsive preload for the hero |
| Homepage above-the-fold images | — | 4 requests, ~367 KB (AVIF/WebP) |
| **Lighthouse (desktop, prod build)** | — | **Performance 98 · LCP 0.8 s · CLS 0 · TBT 0 ms** |

> Image **payload** itself was already lean (the Unsplash CDN was doing AVIF/WebP
> + resizing all along), so this pass did **not** meaningfully reduce image bytes —
> the big download win is JavaScript. What improved for images is **perceived
> loading** (blur-up LQIP), **zero layout shift (CLS 0)**, a correct **LCP
> preload**, and proper **lazy-loading** — all via `next/image`.

## What changed

### 1. Removed Three.js from the hero (biggest win)
`src/components/GoldDust.tsx` previously rendered drifting gold motes with
`@react-three/fiber` + `three`. That shipped ~220 KB gzip of WebGL runtime as a
lazy chunk the moment the homepage hero mounted. It's been rewritten as a
**plain 2D canvas** with additive blending and a cached gradient sprite —
visually equivalent (pointer parallax, upward drift), pauses when the tab is
hidden, honours `prefers-reduced-motion`. The three packages were uninstalled.

### 2. Migrated `<img>` → `next/image`
- `src/components/Photo.tsx` and `src/components/Hero.tsx` now use `next/image`.
- A **custom loader** (`src/lib/unsplash-loader.ts`, wired in `next.config.ts`)
  makes `next/image` build Unsplash URLs directly, so bytes still come straight
  from the Unsplash edge (no extra hop through our server, no double
  optimization) while we gain proper `srcset`/`sizes`, lazy-loading,
  `decoding="async"`, `priority` preloads, and CLS protection via `fill`.
- The hero image is `priority` + `fetchPriority="high"` (LCP). Everything below
  the fold lazy-loads.

### 3. Blur-up placeholders (LQIP)
`scripts/generate-blur.mjs` fetches a tiny version of each Unsplash photo, uses
sharp to strip metadata and emit a **~140-byte WebP**, and writes
`src/lib/blur.generated.ts`. `next/image` uses these as `placeholder="blur"`,
so photos fade up from a smooth blur instead of empty space. (This file is
committed so builds need no network.)

### 4. Caching headers
`next.config.ts` adds `Cache-Control: public, max-age=31536000, immutable` for
`/images/*` and `/video/*` (future local assets). `/_next/static/*` is already
immutable by default. Brotli/Gzip is on by default (`compress: true`).

## Adding new images

### A remote Unsplash photo
1. Add an entry to `photos` in `src/lib/site.ts` (`id`, `alt`, `credit`).
2. Regenerate blur placeholders:
   ```bash
   npm run images:blur
   ```
3. Use it: `<Photo k="yourKey" sizes="(max-width: 768px) 100vw, 400px" />`
   (add `priority` only for an above-the-fold / LCP image).

### A local asset (logo, OG image, hero-video poster, brochure photo)
1. Drop the original into `src/assets/original/` (git-ignored — **originals stay
   local, only optimized output ships**).
2. Optimize it:
   ```bash
   npm run images:optimize
   ```
   This writes responsive **AVIF + WebP + fallback** (320/640/960/1280/1920) to
   `public/images/`, and minifies any SVGs with SVGO.
3. Reference the output from `public/images/…`.

## Scripts

| Command | What it does |
|---|---|
| `npm run images:optimize` | sharp/SVGO pipeline: `src/assets/original/` → `public/images/` (AVIF+WebP+fallback, responsive) |
| `npm run images:blur` | Regenerate `src/lib/blur.generated.ts` LQIP placeholders from `site.ts` |

## Hosting notes (assumption: Vercel)

No hosting config (`vercel.json` / `netlify.toml` / `nginx.conf`) was present, so
**Vercel** (Next.js's default host) is assumed. On Vercel:

- **Brotli/Gzip** compression and **HTTP/2 (and HTTP/3)** are enabled automatically.
- `next.config.ts` `headers()` are respected, so the immutable caching above applies.
- The custom Unsplash loader means the `/_next/image` optimizer is **not** used —
  no `images.remotePatterns` needed, and no per-image optimization billing.

If you deploy elsewhere (Nginx/Netlify/Cloudflare): the `next.config.ts` headers
still apply under `next start`; for a static/CDN setup, mirror the
`Cache-Control: ... immutable` rule for `/images/*` and `/video/*` and confirm
Brotli + HTTP/2 are on at the edge.
