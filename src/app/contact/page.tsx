import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import InquiryForm from "@/components/InquiryForm";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/FloatingWhatsApp";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Visit our Karachi office, call, or WhatsApp a Hajj and Umrah travel advisor.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        arabic="تواصل معنا"
        title="Talk to a travel advisor"
        intro="Visit our Karachi office, call, or message us on WhatsApp. We usually reply within office hours the same day."
        photo="kaaba"
      />

      <section className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1.25fr]">
        <div className="grid content-start gap-5">
          <Reveal>
            <a
              href={waLink("Assalamu alaikum, I would like to speak to a travel advisor.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-[#1f9d55] p-6 text-white transition hover:brightness-105"
            >
              <WhatsAppIcon className="h-10 w-10" />
              <span>
                <span className="block font-display text-[26px] font-semibold leading-tight">Chat on WhatsApp</span>
                <span className="text-[14px] text-white/85">{site.phoneDisplay} · placeholder number</span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-forest-900/5">
              <ul className="grid gap-4 text-[15px]">
                <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /><span><span className="block font-semibold">Karachi office</span>{site.address}</span></li>
                <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /><span><span className="block font-semibold">Phone</span><a href={`tel:${site.phoneHref}`} className="whitespace-nowrap hover:text-gold-dark">{site.phoneDisplay}</a></span></li>
                <li className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /><span><span className="block font-semibold">Email</span><a href={`mailto:${site.email}`} className="hover:text-gold-dark">{site.email}</a></span></li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-forest-900 p-6 text-ivory">
              <p className="flex items-center gap-2 font-semibold"><Clock className="h-5 w-5 text-gold" /> Business hours</p>
              <dl className="mt-4 grid gap-2.5 text-[15px]">
                {site.hours.map((h) => (
                  <div key={h.d} className="flex justify-between gap-4 border-b border-gold/15 pb-2.5 last:border-0">
                    <dt className="text-ivory/70">{h.d}</dt>
                    <dd className="whitespace-nowrap">{h.t}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[12px] text-ivory/50">Placeholder hours (Pakistan Standard Time).</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative grid h-64 place-items-center overflow-hidden rounded-2xl bg-forest-800 text-center" role="img" aria-label="Google Maps placeholder">
              <div className="lattice absolute inset-0 opacity-20" />
              <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
                <path d="M0 180 C120 140 220 210 340 160 S560 120 700 170" stroke="#e6d09f" strokeWidth="2" fill="none" />
                <path d="M80 0 L140 300 M420 0 L360 300" stroke="#e6d09f" strokeWidth="1" fill="none" />
              </svg>
              <div className="relative">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold text-forest-950 shadow-[0_0_0_10px_rgba(201,168,106,.2)]"><MapPin className="h-6 w-6" /></span>
                <p className="mt-3 font-semibold text-ivory">Google Maps placeholder</p>
                <p className="text-[13px] text-ivory/60">Embed the office location here</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-[26px] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(7,37,25,.5)] ring-1 ring-forest-900/5 sm:p-9">
            <p className="text-[13px] font-semibold text-gold-dark">Send an inquiry</p>
            <h2 className="font-display mt-1 text-[clamp(32px,3.6vw,44px)] font-semibold leading-tight text-forest-900">Tell us about your journey</h2>
            <p className="mt-2 mb-7 text-muted">An advisor will reply with options, hotels and a written price.</p>
            <InquiryForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
