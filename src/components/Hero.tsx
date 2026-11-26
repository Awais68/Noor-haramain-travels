"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MapPin, Plane } from "lucide-react";
import Gate from "./Gate";
import { photos, site, unsplash } from "@/lib/site";
import { blurData } from "@/lib/blur.generated";

const GoldDust = dynamic(() => import("./GoldDust"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [dust, setDust] = useState<number>(0);
  const onOpen = useCallback(() => setOpen(true), []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduce) return;
    // Fewer particles on small screens, none on very low-end devices.
    const cores = navigator.hardwareConcurrency || 4;
    if (cores < 4) return;
    setDust(window.innerWidth < 768 ? 140 : 420);
  }, [reduce]);

  const hero = photos.nabawiCity;
  const poster = unsplash(hero.id, 1920);

  const show = open ? "show" : "hidden";
  const item = {
    hidden: { opacity: 0, y: 34, filter: "blur(6px)" },
    show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: 0.25 + i * 0.14, duration: 1.1, ease } }),
  };

  return (
    <>
      <Gate onOpen={onOpen} />
      <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-950 [perspective:1200px]">
        {/* Background: licensed video if configured, else cinematic photograph */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.18, rotateX: 4 }}
            animate={open ? { scale: 1, rotateX: 0 } : {}}
            transition={{ duration: 3.2, ease }}
          >
            {site.heroVideo ? (
              <video
                className="h-full w-full object-cover"
                src={site.heroVideo}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                src={hero.id}
                alt={hero.alt}
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                placeholder="blur"
                blurDataURL={blurData[hero.id]}
                className="object-cover"
              />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/45 to-forest-950/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(4,25,15,.85),transparent_60%)]" />
        </motion.div>

        {dust > 0 && (
          <div className="pointer-events-none absolute inset-0 -z-[5] opacity-80 mix-blend-screen">
            <GoldDust count={dust} />
          </div>
        )}

        <motion.div style={{ y: textY, opacity: fade }} className="relative mx-auto w-full max-w-[1240px] px-5 pb-28 pt-40 md:px-8 md:pb-32">
          <motion.p
            custom={0}
            variants={item}
            initial="hidden"
            animate={show}
            className="font-arabic text-[clamp(26px,3vw,34px)] text-gold-light"
            lang="ar"
            dir="rtl"
            style={{ textAlign: "left" }}
          >
            {site.arabic}
          </motion.p>
          <motion.h1
            custom={1}
            variants={item}
            initial="hidden"
            animate={show}
            className="font-display mt-3 max-w-[15ch] text-[clamp(46px,7.6vw,104px)] font-semibold leading-[0.98] text-ivory [text-wrap:balance] [text-shadow:0_4px_40px_rgba(0,0,0,.35)]"
          >
            Your Sacred Journey Begins With Peace.
          </motion.h1>
          <motion.p custom={2} variants={item} initial="hidden" animate={show} className="mt-6 max-w-xl text-[clamp(16px,1.4vw,19px)] leading-relaxed text-ivory/85">
            Discover thoughtfully arranged Hajj and Umrah journeys from Karachi to the Holy Cities.
          </motion.p>
          <motion.div custom={3} variants={item} initial="hidden" animate={show} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/packages" className="btn-gold rounded-full px-8 py-4 text-center text-[15px] font-semibold">
              Explore Packages
            </Link>
            <Link href="/contact" className="rounded-full border border-ivory/35 px-8 py-4 text-center text-[15px] font-semibold text-ivory backdrop-blur-sm transition hover:border-gold-light hover:bg-white/5">
              Talk to Our Travel Advisor
            </Link>
          </motion.div>

          <motion.div
            custom={4}
            variants={item}
            initial="hidden"
            animate={show}
            className="glass mt-12 hidden max-w-2xl grid-cols-3 divide-x divide-gold/15 rounded-2xl md:grid"
          >
            {[
              { icon: Plane, k: "Departing", v: "Karachi (KHI)" },
              { icon: MapPin, k: "Makkah", v: "Masjid al-Haram" },
              { icon: MapPin, k: "Madinah", v: "Masjid an-Nabawi" },
            ].map((s) => (
              <div key={s.k} className="flex items-center gap-3 px-5 py-4">
                <s.icon className="h-4 w-4 shrink-0 text-gold" />
                <div className="leading-tight">
                  <p className="text-[12px] text-ivory/55">{s.k}</p>
                  <p className="text-[14px] font-medium text-ivory">{s.v}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.a
          href="#featured"
          aria-label="Scroll to featured packages"
          initial={{ opacity: 0 }}
          animate={open ? { opacity: 1 } : {}}
          transition={{ delay: 1.6 }}
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] text-ivory/60"
        >
          <span className="flex h-10 w-6 justify-center rounded-full border border-ivory/40 pt-2">
            <span className="scrolldot h-2 w-1 rounded-full bg-gold-light" />
          </span>
          Scroll
        </motion.a>

        <p className="absolute bottom-3 right-4 text-[10px] text-white/50">Photo: {hero.credit}</p>
      </section>
    </>
  );
}
