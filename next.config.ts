import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Brotli/Gzip for text responses is on by default (`compress: true`).

  images: {
    // Serve bytes straight from the Unsplash edge (already AVIF/WebP + resized).
    // See src/lib/unsplash-loader.ts for the rationale.
    loader: "custom",
    loaderFile: "./src/lib/unsplash-loader.ts",
    // Candidate widths next/image generates in srcset — tuned to this design.
    deviceSizes: [640, 960, 1280, 1920, 2560, 3840],
    imageSizes: [160, 280, 384],
    // Preferred formats (the Unsplash CDN honours these via content negotiation).
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    const oneYearImmutable = "public, max-age=31536000, immutable";
    return [
      {
        // Any local optimized output dropped by scripts/optimize-images.mjs.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: oneYearImmutable }],
      },
      {
        // Static media (e.g. the optional hero video) — fingerprint files for this.
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: oneYearImmutable }],
      },
    ];
    // Note: /_next/static/* is already served immutable by Next automatically.
  },
};

export default nextConfig;
