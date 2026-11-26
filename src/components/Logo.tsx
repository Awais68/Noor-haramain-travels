import { site } from "@/lib/site";

export function StarMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ecd8a8" />
          <stop offset=".55" stopColor="#c9a86a" />
          <stop offset="1" stopColor="#97773f" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#lg-gold)" strokeWidth="1.6">
        <rect x="10" y="10" width="28" height="28" rx="1.5" />
        <rect x="10" y="10" width="28" height="28" rx="1.5" transform="rotate(45 24 24)" />
        <circle cx="24" cy="24" r="6.5" />
      </g>
      <circle cx="24" cy="24" r="2.4" fill="url(#lg-gold)" />
    </svg>
  );
}

export default function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <StarMark />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[19px] font-semibold tracking-[0.14em] ${light ? "text-ivory" : "text-forest-900"}`}>
          NURUL HARAMAIN
        </span>
        <span className="font-arabic mt-1 text-[13px] text-gold" lang="ar" dir="rtl">
          {site.arabic}
        </span>
      </span>
    </span>
  );
}
