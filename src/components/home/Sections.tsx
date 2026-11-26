"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowRight, BookOpen, Bus, FileCheck2, Headset, HeartHandshake, Hotel, Plane, ShieldCheck, Users,
} from "lucide-react";
import Photo from "../Photo";
import PackageCard from "../PackageCard";
import Reveal, { Eyebrow, SectionTitle } from "../Reveal";
import { InquiryModal } from "../InquiryForm";
import { packages, type PhotoKey } from "@/lib/site";

/* ---------------- Trust strip ---------------- */
export function TrustStrip() {
  const items = [
    { icon: ShieldCheck, t: "Transparent pricing", d: "Every inclusion written down" },
    { icon: FileCheck2, t: "Visa guidance", d: "Documents checked in Karachi" },
    { icon: Headset, t: "In-Kingdom support", d: "A coordinator on call" },
    { icon: HeartHandshake, t: "Family care", d: "Elderly & women travellers" },
  ];
  return (
    <section className="relative z-10 -mt-px bg-forest-950 px-5 pb-14 md:px-8">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-px overflow-hidden rounded-2xl bg-gold/15 sm:grid-cols-2 md:grid-cols-4">
        {items.map((i, n) => (
          <Reveal key={i.t} delay={n * 0.08} className="flex items-start gap-3 bg-forest-950 p-5 md:p-6">
            <i.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div>
              <p className="font-semibold text-ivory">{i.t}</p>
              <p className="mt-0.5 text-[13.5px] text-ivory/60">{i.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Featured packages ---------------- */
export function Featured() {
  const [pkg, setPkg] = useState<string | null>(null);
  const featured = packages.filter((p) => p.featured);
  return (
    <section id="featured" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            eyebrow="Featured journeys"
            title="Packages arranged around your worship, not the other way round."
            intro="Three of our most requested journeys. Each one can be adjusted for dates, room sharing and hotel preference."
          />
          <Reveal delay={0.1}>
            <Link href="/packages" className="group flex items-center gap-2 whitespace-nowrap font-semibold text-forest-800">
              View all packages <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} className="h-full">
              <PackageCard p={p} onInquire={(x) => setPkg(x.name)} />
            </Reveal>
          ))}
        </div>
      </div>
      <InquiryModal pkg={pkg} onClose={() => setPkg(null)} />
    </section>
  );
}

/* ---------------- Holy cities, layered parallax ---------------- */
function CityBlock({
  name, arabic, lead, points, main, inset, flip = false,
}: { name: string; arabic: string; lead: string; points: string[]; main: PhotoKey; inset: PhotoKey; flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const yInset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [140, -120]);
  const rot = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [flip ? -6 : 6, flip ? 4 : -4]);

  return (
    <div ref={ref} className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div className="relative h-[440px] [perspective:1200px] sm:h-[520px]">
        <motion.div style={{ y: yMain, rotateY: rot }} className="absolute inset-0 right-[14%] overflow-hidden rounded-[26px] shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)] md:right-[18%]">
          <Photo k={main} className="h-full w-full" sizes="(max-width: 768px) 90vw, 560px" credit />
        </motion.div>
        <motion.div style={{ y: yInset }} className="absolute -bottom-6 right-0 h-[46%] w-[46%] overflow-hidden rounded-[20px] border-[6px] border-ivory shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]">
          <Photo k={inset} className="h-full w-full" sizes="280px" />
        </motion.div>
        <div className="pointer-events-none absolute -left-4 -top-4 h-28 w-28 rounded-tl-[30px] border-l border-t border-gold/70" />
      </div>
      <div>
        <Reveal>
          <p className="font-arabic text-3xl text-gold-dark" lang="ar" dir="rtl" style={{ textAlign: "left" }}>{arabic}</p>
          <h3 className="font-display mt-2 text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.02] text-forest-900">{name}</h3>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">{lead}</p>
        </Reveal>
        <ul className="mt-7 grid gap-3">
          {points.map((pt, i) => (
            <Reveal key={pt} delay={0.08 * i}>
              <li className="flex items-start gap-3 rounded-xl border border-forest-900/10 bg-white/60 px-4 py-3.5 text-[15px]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />{pt}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function HolyCities() {
  return (
    <section className="relative overflow-hidden bg-ivory-2/60 py-20 md:py-28">
      <div className="lattice pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto grid max-w-[1240px] gap-24 px-5 md:gap-32 md:px-8">
        <SectionTitle
          center
          eyebrow="The two Holy Cities"
          title="Time arranged for what matters in Makkah and Madinah."
          intro="We plan hotels, transfers and ziyarat so your days are spent in the Haram — not in queues, taxis or uncertainty."
        />
        <CityBlock
          name="Makkah al-Mukarramah"
          arabic="مكة المكرمة"
          lead="Perform your Umrah with a guide who walks the rites with your group, then settle into a rhythm of prayer close to Masjid al-Haram."
          points={[
            "Guided first Umrah on arrival, with rest built in after the journey",
            "Hotels chosen by walking time to the Haram, not just star rating",
            "Ziyarat to Jabal al-Nour, Jabal Thawr, Mina and Arafat",
          ]}
          main="kaabaArch"
          inset="haramExterior"
        />
        <CityBlock
          flip
          name="Madinah al-Munawwarah"
          arabic="المدينة المنورة"
          lead="Unhurried days near Masjid an-Nabawi, with help arranging Riyadh ul-Jannah visits through the official Nusuk app."
          points={[
            "Haramain high-speed train or private road transfer from Makkah",
            "Ziyarat to Masjid Quba, Uhud and the Seven Mosques",
            "Separate arrangements and guidance for women travellers",
          ]}
          main="nabawiDomes"
          inset="nabawiColumns"
        />
      </div>
    </section>
  );
}

/* ---------------- Journey route ---------------- */
export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const steps = [
    { t: "Karachi", d: "Advisor meeting, documents, pre-departure briefing", code: "KHI" },
    { t: "Jeddah / Madinah", d: "Met on arrival and transferred to your hotel", code: "JED · MED" },
    { t: "Makkah", d: "Umrah with guidance, prayer near the Haram", code: "MAK" },
    { t: "Madinah", d: "Days at Masjid an-Nabawi and ziyarat", code: "MED" },
    { t: "Home", d: "Return flight and a follow-up call", code: "KHI" },
  ];
  return (
    <section className="relative overflow-hidden bg-forest-900 py-20 text-ivory md:py-28">
      <div className="lattice pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionTitle light eyebrow="Your journey" title="From our Karachi office to the Holy Cities, and home again." />
        <div ref={ref} className="relative mt-16">
          <div className="absolute left-[11px] top-0 h-full w-px bg-gold/20 md:left-0 md:top-[11px] md:h-px md:w-full" />
          <motion.div style={{ width: w }} className="absolute left-0 top-[11px] hidden h-px bg-gradient-to-r from-gold to-gold-light md:block" />
          <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.t + i} delay={i * 0.1}>
                <li className="relative pl-10 md:pl-0 md:pt-10">
                  <span className="absolute left-0 top-0 grid h-[23px] w-[23px] place-items-center rounded-full border border-gold bg-forest-900">
                    <span className="h-2 w-2 rotate-45 bg-gold" />
                  </span>
                  <p className="text-[12px] font-semibold text-gold">{s.code}</p>
                  <p className="font-display mt-1 text-[26px] font-semibold leading-tight">{s.t}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ivory/65">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
export function Services() {
  const s = [
    { icon: FileCheck2, t: "Visa processing", d: "Umrah and Hajj visa applications prepared and checked with you." },
    { icon: Plane, t: "Flights from Karachi", d: "Direct and connecting options, with ihram-friendly timing advice." },
    { icon: Hotel, t: "Hotels near the Haram", d: "Matched to walking ability, budget and family size." },
    { icon: Bus, t: "Ground transport", d: "Airport pickups, intercity transfers and the Haramain train." },
    { icon: BookOpen, t: "Guidance & training", d: "Pre-departure sessions on the rites of Umrah and Hajj." },
    { icon: Users, t: "Groups & families", d: "Private family packages and organised group departures." },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionTitle eyebrow="What we arrange" title="Everything handled, so your heart can stay with the journey." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {s.map((x, i) => (
            <Reveal key={x.t} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-[20px] border border-forest-900/10 bg-white p-7 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_30px_50px_-35px_rgba(7,37,25,.5)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-900 text-gold-light transition group-hover:rotate-[8deg]">
                  <x.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-5 text-[26px] font-semibold text-forest-900">{x.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials (demo) ---------------- */
export function Testimonials() {
  const t = [
    { q: "Our parents needed wheelchair help at every step. It was arranged before we even asked twice.", n: "Family of five", c: "Standard Umrah" },
    { q: "The briefing in Karachi made our first Umrah calm. We knew exactly what to expect at each stage.", n: "First-time pilgrims", c: "Premium Umrah" },
    { q: "Clear prices, clear hotels, and someone answering WhatsApp at 3 am in Makkah.", n: "Group traveller", c: "Economy Umrah" },
  ];
  return (
    <section className="relative overflow-hidden bg-ivory-2/60 py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionTitle eyebrow="Pilgrim words" title="What pilgrims tell us after they return." />
          <span className="w-fit rounded-full border border-gold/50 bg-white px-3 py-1 text-[12px] text-gold-dark">Demo content — replace with verified reviews</span>
        </div>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {t.map((x, i) => (
            <Reveal key={i} delay={i * 0.1} className="w-[85%] shrink-0 snap-start md:w-auto">
              <figure className="flex h-full flex-col rounded-[22px] bg-forest-900 p-7 text-ivory">
                <span className="font-display text-6xl leading-none text-gold">“</span>
                <blockquote className="font-display -mt-3 text-[23px] leading-snug">{x.q}</blockquote>
                <figcaption className="mt-auto pt-6 text-[14px] text-ivory/65">
                  <span className="text-ivory">{x.n}</span> · {x.c}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery ribbon ---------------- */
export function Ribbon() {
  const keys: PhotoKey[] = ["kaabaPilgrims", "nabawiCourtyard", "kaabaTower", "nabawiColumns", "haramGround", "nabawiDome"];
  return (
    <section aria-label="Photo gallery" className="overflow-hidden bg-forest-950 py-10">
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {[...keys, ...keys].map((k, i) => (
          <Photo key={i} k={k} className="h-48 w-72 shrink-0 rounded-2xl md:h-64 md:w-96" sizes="384px" />
        ))}
      </motion.div>
      <div className="mx-auto mt-8 max-w-[1240px] px-5 md:px-8"><Eyebrow light>Masjid al-Haram & Masjid an-Nabawi</Eyebrow></div>
    </section>
  );
}
