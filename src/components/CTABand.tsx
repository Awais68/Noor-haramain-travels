import Link from "next/link";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./FloatingWhatsApp";

export default function CTABand() {
  return (
    <section className="px-4 pb-20 md:px-8 md:pb-28">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] bg-forest-900">
        <Photo k="nabawiColumns" className="absolute inset-0 h-full w-full opacity-60" sizes="(max-width: 1240px) 100vw, 1240px" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/30" />
        <div className="relative grid gap-8 px-6 py-14 sm:px-12 md:grid-cols-[1.4fr_1fr] md:items-end md:py-20">
          <Reveal>
            <p className="font-arabic text-xl text-gold" lang="ar" dir="rtl" style={{ textAlign: "left" }}>لبيك اللهم لبيك</p>
            <h2 className="font-display mt-3 text-[clamp(34px,4.4vw,52px)] font-semibold leading-[1.05] text-ivory [text-wrap:balance]">
              Begin planning your journey with an advisor who listens.
            </h2>
            <p className="mt-4 max-w-lg text-ivory/75">
              Share your dates, family size and comfort needs. We will suggest a route, hotels and a package that fits — no pressure, no hidden extras.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
            <Link href="/packages" className="btn-gold rounded-full px-7 py-4 text-center font-semibold">Explore Packages</Link>
            <a
              href={waLink("Assalamu alaikum, I would like help planning my Umrah/Hajj.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-ivory/30 px-7 py-4 font-semibold text-ivory hover:bg-white/5"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#3ccf7a]" /> WhatsApp an Advisor
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
