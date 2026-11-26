"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Footprints, MapPin, Star } from "lucide-react";
import Photo from "@/components/Photo";
import Tilt from "@/components/Tilt";
import { InquiryModal } from "@/components/InquiryForm";
import { hotels, type Hotel } from "@/lib/site";

const cities = ["All", "Makkah", "Madinah"] as const;
const cats: Hotel["category"][] = ["5★ Haram-front", "5★ Near Haram", "4★ Walking distance"];

export default function HotelsClient() {
  const params = useSearchParams();
  const q = params.get("city");
  const [city, setCity] = useState<(typeof cities)[number]>(q === "Makkah" || q === "Madinah" ? q : "All");
  const [cat, setCat] = useState<Hotel["category"] | "All">("All");
  const [pkg, setPkg] = useState<string | null>(null);

  const list = useMemo(() => hotels.filter((h) => (city === "All" || h.city === city) && (cat === "All" || h.category === cat)), [city, cat]);

  return (
    <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-8 md:py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="City" className="flex w-fit rounded-full bg-ivory-2 p-1">
          {cities.map((c) => (
            <button key={c} role="tab" aria-selected={city === c} onClick={() => setCity(c)} className={`relative z-10 h-10 rounded-full px-5 text-[14px] font-semibold ${city === c ? "text-ivory" : "text-forest-800"}`}>
              {city === c && <motion.span layoutId="city-pill" className="absolute inset-0 -z-10 rounded-full bg-forest-900" />}
              {c}
            </button>
          ))}
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {(["All", ...cats] as const).map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`h-10 shrink-0 rounded-full border px-4 text-[14px] ${cat === c ? "border-gold bg-gold/15 font-semibold text-forest-900" : "border-forest-900/15 text-forest-800 hover:border-gold"}`}>
              {c === "All" ? "All categories" : c}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-5 text-[13.5px] text-muted" aria-live="polite">
        {list.length} hotels · demo listings, walking times approximate · photos show the Haram surroundings, not hotel interiors
      </p>

      <motion.div layout className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((h) => (
            <motion.div key={h.name} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.45 }}>
              <Tilt className="h-full rounded-[22px]" max={5}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white ring-1 ring-forest-900/5 shadow-[0_30px_60px_-35px_rgba(7,37,25,.45)]">
                  <div className="relative h-60 overflow-hidden">
                    <Photo k={h.photo} className="h-full w-full transition-transform duration-[1.4s] group-hover:scale-105" sizes="(max-width: 768px) 100vw, 400px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-forest-950/70 px-3 py-1 text-[12px] font-semibold text-gold-light backdrop-blur">{h.city}</span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="flex items-center gap-1 text-gold-light">
                        {Array.from({ length: h.category.startsWith("5") ? 5 : 4 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                      </p>
                      <h3 className="font-display mt-1 text-[27px] font-semibold leading-tight text-ivory">{h.name}</h3>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="grid grid-cols-2 gap-3 text-[14px]">
                      <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />{h.area}</p>
                      <p className="flex gap-2"><Footprints className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />{h.walk}</p>
                    </div>
                    <p className="mt-3 w-fit rounded-full bg-ivory-2 px-3 py-1 text-[12.5px] font-semibold text-forest-800">{h.category}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {h.rooms.map((r) => <span key={r} className="rounded-md border border-forest-900/10 px-2 py-1 text-[12.5px] text-muted">{r}</span>)}
                    </div>
                    <div className="mt-auto pt-5">
                      <button type="button" onClick={() => setPkg(`Stay at ${h.name}`)} className="h-11 w-full rounded-full border border-forest-900 text-[14px] font-semibold text-forest-900 transition hover:bg-forest-900 hover:text-ivory">
                        Ask about availability
                      </button>
                    </div>
                  </div>
                </article>
              </Tilt>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <InquiryModal pkg={pkg} onClose={() => setPkg(null)} />
    </section>
  );
}
