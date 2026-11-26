"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import PackageCard from "@/components/PackageCard";
import { InquiryModal } from "@/components/InquiryForm";
import { packages, type Tier } from "@/lib/site";

const types = ["All", "Umrah", "Hajj"] as const;
const tiers: Tier[] = ["Economy", "Standard", "Premium", "VIP"];
const durations = [
  { k: "any", l: "Any duration", f: () => true },
  { k: "short", l: "Up to 14 nights", f: (n: number) => n <= 14 },
  { k: "mid", l: "15 – 21 nights", f: (n: number) => n >= 15 && n <= 21 },
  { k: "long", l: "22+ nights", f: (n: number) => n >= 22 },
];
const sorts = [
  { k: "price-asc", l: "Price: low to high" },
  { k: "price-desc", l: "Price: high to low" },
  { k: "nights", l: "Shortest first" },
];

export default function PackagesClient() {
  const router = useRouter();
  const params = useSearchParams();
  const initialType = (params.get("type") as (typeof types)[number]) || "All";
  const [type, setType] = useState<(typeof types)[number]>(types.includes(initialType) ? initialType : "All");
  const [active, setActive] = useState<Tier[]>([]);
  const [dur, setDur] = useState("any");
  const [sort, setSort] = useState("price-asc");
  const [pkg, setPkg] = useState<string | null>(null);

  const list = useMemo(() => {
    const d = durations.find((x) => x.k === dur)!;
    const r = packages.filter(
      (p) => (type === "All" || p.type === type) && (active.length === 0 || active.includes(p.tier)) && d.f(p.nights)
    );
    return r.sort((a, b) =>
      sort === "price-asc" ? a.priceFrom - b.priceFrom : sort === "price-desc" ? b.priceFrom - a.priceFrom : a.nights - b.nights
    );
  }, [type, active, dur, sort]);

  const chooseType = (t: (typeof types)[number]) => {
    setType(t);
    router.replace(t === "All" ? "/packages" : `/packages?type=${t}`, { scroll: false });
  };
  const reset = () => {
    chooseType("All");
    setActive([]);
    setDur("any");
    setSort("price-asc");
  };
  const toggle = (t: Tier) => setActive((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]));

  const select = "h-11 rounded-full border border-forest-900/15 bg-white px-4 text-[15px] outline-none focus:border-gold";

  return (
    <section id="list" className="mx-auto max-w-[1240px] px-5 py-14 md:px-8 md:py-20">
      {/* Filters */}
      <div className="sticky top-[76px] z-30 -mx-5 border-b border-forest-900/10 bg-ivory/90 px-5 py-4 backdrop-blur md:static md:mx-0 md:rounded-2xl md:border md:bg-white md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" aria-label="Journey type" className="relative flex w-fit rounded-full bg-ivory-2 p-1">
            {types.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={type === t}
                onClick={() => chooseType(t)}
                className={`relative z-10 h-10 rounded-full px-5 text-[14px] font-semibold transition-colors ${type === t ? "text-ivory" : "text-forest-800"}`}
              >
                {type === t && <motion.span layoutId="type-pill" className="absolute inset-0 -z-10 rounded-full bg-forest-900" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                {t}
              </button>
            ))}
          </div>

          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-gold-dark" />
            {tiers.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={active.includes(t)}
                onClick={() => toggle(t)}
                className={`h-10 shrink-0 rounded-full border px-4 text-[14px] transition ${
                  active.includes(t) ? "border-gold bg-gold/15 font-semibold text-forest-900" : "border-forest-900/15 text-forest-800 hover:border-gold"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <label className="sr-only" htmlFor="dur">Duration</label>
            <select id="dur" value={dur} onChange={(e) => setDur(e.target.value)} className={select}>
              {durations.map((d) => <option key={d.k} value={d.k}>{d.l}</option>)}
            </select>
            <label className="sr-only" htmlFor="sort">Sort</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className={select}>
              {sorts.map((s) => <option key={s.k} value={s.k}>{s.l}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[14px] text-muted">
        <p aria-live="polite">{list.length} {list.length === 1 ? "package" : "packages"} · sample prices shown for demonstration</p>
        <button type="button" onClick={reset} className="flex items-center gap-1.5 font-semibold text-forest-800 hover:text-gold-dark">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <motion.div layout className="mt-6 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <PackageCard p={p} onInquire={(x) => setPkg(x.name)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-gold/60 bg-white p-10 text-center">
          <p className="font-display text-2xl text-forest-900">No package matches those filters.</p>
          <p className="mt-2 text-muted">Try another duration, or ask an advisor to tailor one for you.</p>
          <button type="button" onClick={reset} className="btn-gold mt-5 rounded-full px-6 py-3 font-semibold">Show all packages</button>
        </div>
      )}

      <InquiryModal pkg={pkg} onClose={() => setPkg(null)} />
    </section>
  );
}
