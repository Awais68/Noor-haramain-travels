import type { Metadata } from "next";
import { Compass, HandHeart, Scale, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Photo from "@/components/Photo";
import Reveal, { SectionTitle } from "@/components/Reveal";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "About Us",
  description: "A Karachi-based Hajj and Umrah travel agency built on clarity, care and respect for the journey.",
};

const values = [
  { icon: Scale, t: "Honest pricing", d: "Every package lists exactly what is included. If something costs extra, you know before you pay." },
  { icon: HandHeart, t: "Care for every pilgrim", d: "Elderly parents, first-timers, women travelling in groups — we plan around real needs." },
  { icon: Compass, t: "Guidance, not just tickets", d: "Pre-departure sessions in Karachi so you arrive knowing the rites and the route." },
  { icon: Sparkles, t: "Respect for the journey", d: "Calm communication, no pressure selling, and time built in for worship." },
];

const steps = [
  { n: "Listen", d: "A conversation in our office, by phone or on WhatsApp about dates, family and budget." },
  { n: "Propose", d: "A written itinerary with hotels, flights, sharing and the full price." },
  { n: "Prepare", d: "Visa documents, vaccinations checklist and a briefing on the rites." },
  { n: "Accompany", d: "A coordinator reachable throughout your stay in the Kingdom." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About"
        arabic="من نحن"
        title="Serving the guests of Allah, from Karachi."
        intro="Nurul Haramain — the light of the two Holy Sanctuaries — is a travel agency dedicated to one kind of journey."
        photo="nabawiColumns"
      />

      <section className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 md:grid-cols-2 md:items-center md:px-8 md:py-28">
        <div>
          <SectionTitle
            eyebrow="Who we are"
            title="A small team that treats your journey as an amanah."
            intro="We focus only on Hajj and Umrah. That lets us know the hotels, the walking routes and the questions families ask — and answer them before they become worries."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-2xl border-l-0 bg-forest-900 p-7 text-ivory">
              <p className="text-[13px] font-semibold text-gold-light">Our mission</p>
              <p className="font-display mt-2 text-[26px] leading-snug">
                To make the journey to Makkah and Madinah clear, comfortable and spiritually focused for every pilgrim we serve.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal className="relative h-[520px] [perspective:1200px]">
          <div className="absolute inset-0 left-[10%] overflow-hidden rounded-[26px] [transform:rotateY(-8deg)]">
            <Photo k="nabawiDome" className="h-full w-full" sizes="(max-width: 768px) 90vw, 560px" credit />
          </div>
          <div className="absolute bottom-10 left-0 h-48 w-40 overflow-hidden rounded-2xl border-[6px] border-ivory shadow-xl">
            <Photo k="kaabaArch" className="h-full w-full" sizes="160px" />
          </div>
        </Reveal>
      </section>

      <section className="bg-ivory-2/60 py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <SectionTitle eyebrow="Why pilgrims choose us" title="Four commitments we hold ourselves to." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={(i % 2) * 0.08}>
                <div className="flex h-full gap-5 rounded-2xl bg-white p-7 ring-1 ring-forest-900/5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest-900 text-gold-light"><v.icon className="h-5 w-5" /></span>
                  <div>
                    <h3 className="font-display text-[26px] font-semibold text-forest-900">{v.t}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{v.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
        <SectionTitle eyebrow="Our service commitment" title="How we work with every family." />
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <li className="relative h-full rounded-2xl border border-forest-900/10 p-6">
                <span className="font-display text-5xl font-semibold text-gold/60">{i + 1}</span>
                <h3 className="font-display mt-2 text-[26px] font-semibold text-forest-900">{s.n}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mt-10 rounded-xl bg-ivory-2 px-5 py-4 text-[13.5px] text-muted">
          Demo note: registrations, licences and accreditations are not shown on this demo. Add the agency&apos;s verified details (e.g. DTS licence and MoRA Hajj organiser status, if applicable) before launch.
        </p>
      </section>
      <CTABand />
    </>
  );
}
