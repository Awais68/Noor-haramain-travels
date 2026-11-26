import type { Metadata } from "next";
import { Suspense } from "react";
import { BedDouble, Plane, Tent, UserCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PackagesClient from "./PackagesClient";
import Photo from "@/components/Photo";
import Reveal, { SectionTitle } from "@/components/Reveal";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Umrah & Hajj Packages",
  description: "Economy, Standard, Premium and VIP Umrah packages and Hajj arrangements from Karachi.",
};

const hajj = [
  {
    icon: Plane,
    t: "Travel arrangements",
    d: "Flights from Karachi, airport meet-and-assist in Jeddah or Madinah, and coordinated transport between Makkah, Mina, Arafat, Muzdalifah and Madinah.",
  },
  {
    icon: BedDouble,
    t: "Accommodation",
    d: "Makkah hotel or Aziziyah building stays, Madinah hotels near Masjid an-Nabawi, and Mina camps according to the official allocation for your category.",
  },
  {
    icon: Tent,
    t: "The days of Hajj",
    d: "A clear day-by-day plan for 8–13 Dhul Hijjah, with group leaders who stay with you through Mina, Arafat and Muzdalifah.",
  },
  {
    icon: UserCheck,
    t: "Pilgrimage support",
    d: "Pre-departure training sessions in Karachi, a scholar travelling with premium groups, and a coordinator reachable around the clock.",
  },
];

const sharing = [
  { k: "Double", v: "2 per room", n: "Couples and those wanting privacy" },
  { k: "Triple", v: "3 per room", n: "Small families" },
  { k: "Quad", v: "4 per room", n: "Families or friends travelling together" },
  { k: "Quint", v: "5 per room", n: "Most economical, same-gender or family" },
];

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        crumb="Packages"
        arabic="العمرة والحج"
        title="Umrah & Hajj Packages"
        intro="Choose a starting point — Economy to VIP — and an advisor will tailor dates, room sharing and hotels to your family."
        photo="kaabaTower"
      />

      <Suspense fallback={<div className="mx-auto max-w-[1240px] px-5 py-20 text-muted md:px-8">Loading packages…</div>}>
        <PackagesClient />
      </Suspense>

      {/* Room sharing explainer */}
      <section className="mx-auto max-w-[1240px] px-5 pb-20 md:px-8">
        <div className="grid gap-4 rounded-[24px] border border-forest-900/10 bg-white p-6 sm:grid-cols-2 md:p-8 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <h2 className="font-display text-[30px] font-semibold leading-tight text-forest-900">Room sharing, explained</h2>
            <p className="mt-2 text-[15px] text-muted">Package prices change with how many people share a room.</p>
          </div>
          {sharing.map((s) => (
            <div key={s.k} className="rounded-2xl bg-ivory p-5">
              <p className="font-display text-2xl font-semibold text-forest-900">{s.k}</p>
              <p className="text-[14px] font-semibold text-gold-dark">{s.v}</p>
              <p className="mt-2 text-[14px] text-muted">{s.n}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hajj section */}
      <section id="hajj" className="relative overflow-hidden bg-forest-900 py-20 text-ivory md:py-28">
        <div className="lattice pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative mx-auto grid max-w-[1240px] gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionTitle
              light
              eyebrow="Hajj with Nurul Haramain"
              title="A once-in-a-lifetime obligation deserves careful planning."
              intro="Hajj packages from Pakistan follow the Ministry of Religious Affairs' Hajj Policy and Saudi allocations each year. We guide you through registration timelines, documents and what each category includes."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {hajj.map((h, i) => (
                <Reveal key={h.t} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-gold/20 bg-forest-950/40 p-5">
                    <h.icon className="h-5 w-5 text-gold" />
                    <h3 className="font-display mt-3 text-[22px] font-semibold">{h.t}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ivory/70">{h.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="relative h-[520px] [perspective:1200px] lg:h-[680px]">
            <div className="absolute inset-0 overflow-hidden rounded-[28px] [transform:rotateY(-6deg)]">
              <Photo k="kaabaCrowd" className="h-full w-full" sizes="(max-width: 1024px) 100vw, 640px" credit />
            </div>
            <div className="glass absolute -bottom-5 left-5 right-5 rounded-2xl p-5 sm:left-auto sm:w-72">
              <p className="text-[13px] text-gold-light">Hajj season</p>
              <p className="font-display text-2xl">8 – 13 Dhul Hijjah</p>
              <p className="mt-1 text-[13px] text-ivory/70">Exact dates follow the Saudi moon-sighting announcement.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pt-20 md:pt-28" />
      <CTABand />
    </>
  );
}
