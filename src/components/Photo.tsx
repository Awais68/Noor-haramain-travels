"use client";

import { useState } from "react";
import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/site";
import { blurData } from "@/lib/blur.generated";

type Props = {
  k: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  credit?: boolean;
};

/**
 * Responsive, lazy-loaded photograph built on next/image.
 *
 * - next/image generates the full AVIF/WebP `srcset` (served straight from the
 *   Unsplash edge via the custom loader) and chooses the right width from `sizes`.
 * - Below-the-fold images lazy-load + `decoding="async"`; the LCP image passes
 *   `priority`, which eagerly loads it and emits a correct responsive preload.
 * - A tiny baked-in blur placeholder (LQIP) fades up while the photo streams in,
 *   preventing a flash of empty space and layout shift.
 * - If the remote image fails, a graceful emerald lattice fallback is shown.
 */
export default function Photo({ k, className = "", sizes = "100vw", priority = false, credit = false }: Props) {
  const p = photos[k];
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-forest-800 ${className}`}>
      {failed ? (
        <div className="lattice absolute inset-0 grid place-items-center bg-forest-800/90" role="img" aria-label={p.alt}>
          <span className="max-w-[80%] text-center font-display text-lg text-gold-light/80">{p.alt}</span>
        </div>
      ) : (
        <Image
          src={p.id}
          alt={p.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={blurData[p.id]}
          onError={() => setFailed(true)}
          className="object-cover"
        />
      )}
      {credit && !failed && (
        <span className="absolute bottom-2 right-3 z-[1] text-[10px] text-white/60">Photo: {p.credit}</span>
      )}
    </div>
  );
}
