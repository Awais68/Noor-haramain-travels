/**
 * Custom next/image loader for Unsplash-hosted photography.
 * ------------------------------------------------------------------
 * All site imagery is served from the Unsplash CDN, which already:
 *   - negotiates AVIF / WebP automatically via `auto=format`
 *   - resizes on the fly via `w=`
 *   - serves with long-lived immutable cache headers from a global edge
 *
 * Using this loader (instead of Next's default `/_next/image` optimizer)
 * lets next/image generate correct `srcset` / `sizes` / lazy-loading /
 * blur-up / priority preloads, while the actual bytes come straight from
 * Unsplash's edge — no extra hop through our server, no double optimization.
 *
 * `src` is the Unsplash photo id (e.g. "photo-1729931421786-7bbd6c7d78f6").
 * Full URLs and local/relative paths are passed through untouched so the
 * component keeps working if non-Unsplash images are ever added.
 */
export default function unsplashLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // Local asset or an already-absolute non-Unsplash URL → leave it alone.
  if (src.startsWith("/") || (src.startsWith("http") && !src.includes("images.unsplash.com"))) {
    return src;
  }
  const id = src.replace(/^https?:\/\/images\.unsplash\.com\//, "");
  // q=80 matches the site's established visual fidelity for this photography.
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}
