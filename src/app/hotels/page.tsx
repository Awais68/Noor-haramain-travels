import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import HotelsClient from "./HotelsClient";
import Reveal, { SectionTitle } from "@/components/Reveal";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Hotels in Makkah & Madinah",
  description: "Hotels near Masjid al-Haram and Masjid an-Nabawi, grouped by walking distance and category.",
};

const tiers = [
  { k: "5★ Haram-front", d: "Steps from the gates. Ideal for elderly parents and for praying every salah in the Haram." },
  { k: "5★ Near Haram", d: "A short walk, often quieter, with more room options for families." },
  { k: "4★ Walking distance", d: "Comfortable and good value, usually 7–10 minutes on foot." },
];

export default function HotelsPage() {
  return (
    <>
      <PageHeader
        crumb="Hotels"
        arabic="الإقامة"
        title="Stay close to the Haram"
        intro="We choose hotels by walking time, lift access and room layout — the things that shape your day in the Holy Cities."
        photo="nabawiCity"
      />
      <Suspense fallback={<div className="mx-auto max-w-[1240px] px-5 py-20 text-muted md:px-8">Loading hotels…</div>}>
        <HotelsClient />
      </Suspense>

      <section className="bg-ivory-2/60 py-20 md:py-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <SectionTitle eyebrow="Hotel categories" title="Three categories, one question: how far is the walk?" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.k} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-white p-6 ring-1 ring-forest-900/5">
                  <p className="font-display text-[26px] font-semibold text-forest-900">{t.k}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[13px] text-muted">Hotel names are shown for demonstration. Availability, room types and walking times must be confirmed at the time of booking.</p>
        </div>
      </section>
      <div className="pt-20 md:pt-28" />
      <CTABand />
    </>
  );
}
