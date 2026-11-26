"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BedDouble, Building2, Check, ChevronDown, Clock, Footprints, Users } from "lucide-react";
import Photo from "./Photo";
import Tilt from "./Tilt";
import { formatPKR, type Pkg } from "@/lib/site";

const tierStyle: Record<Pkg["tier"], string> = {
  Economy: "bg-ivory-2 text-forest-800",
  Standard: "bg-forest-700 text-ivory",
  Premium: "bg-gold text-forest-950",
  VIP: "bg-forest-950 text-gold-light ring-1 ring-gold/60",
};

export default function PackageCard({ p, onInquire }: { p: Pkg; onInquire: (p: Pkg) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Tilt className="h-full rounded-[22px]" max={5}>
      <article className="flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_30px_60px_-35px_rgba(7,37,25,.45)] ring-1 ring-forest-900/5">
        <div className="relative h-56 [transform:translateZ(30px)]">
          <Photo k={p.photo} className="h-full w-full" sizes="(max-width: 768px) 100vw, 400px" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[12px] font-semibold ${tierStyle[p.tier]}`}>
            {p.type} · {p.tier}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-black/35 px-2.5 py-1 text-[11px] text-white/90 backdrop-blur">Sample</span>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-ivory">
            <h3 className="font-display text-[28px] font-semibold leading-none">{p.name}</h3>
            <span className="flex items-center gap-1.5 whitespace-nowrap text-[13px]"><Clock className="h-4 w-4 text-gold-light" />{p.nights} nights</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-[13.5px]">
            <div className="col-span-2 flex gap-2.5">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
              <div><dt className="sr-only">Makkah hotel</dt><dd><span className="text-muted">Makkah · {p.makkahNights}n</span><br />{p.makkahHotel}</dd></div>
            </div>
            <div className="col-span-2 flex gap-2.5">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
              <div><dt className="sr-only">Madinah hotel</dt><dd><span className="text-muted">Madinah · {p.madinahNights}n</span><br />{p.madinahHotel}</dd></div>
            </div>
            <div className="flex gap-2.5"><Users className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /><dd>{p.sharing}</dd></div>
            <div className="flex gap-2.5"><Footprints className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /><dd>{p.distance}</dd></div>
          </dl>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-4 flex items-center justify-between border-t border-forest-900/10 pt-3 text-[13.5px] font-semibold text-forest-800"
          >
            What&apos;s included
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden text-[13.5px]"
              >
                {p.inclusions.map((i) => (
                  <li key={i} className="flex gap-2 pt-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />{i}</li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <div>
              <p className="text-[12px] text-muted">From, per person</p>
              <p className="whitespace-nowrap font-display text-[26px] font-semibold leading-tight text-forest-900">{formatPKR(p.priceFrom)}</p>
              <p className="text-[11px] text-muted">Sample price for demo only</p>
            </div>
            <button
              type="button"
              onClick={() => onInquire(p)}
              className="flex items-center gap-2 rounded-full bg-forest-900 px-5 py-3 text-[14px] font-semibold text-ivory transition hover:bg-forest-700"
            >
              <BedDouble className="h-4 w-4 text-gold-light" /> Inquire
            </button>
          </div>
        </div>
      </article>
    </Tilt>
  );
}
