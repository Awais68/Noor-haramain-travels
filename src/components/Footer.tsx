import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-ivory/75">
      <div className="lattice pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 pb-10 pt-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
            Hajj and Umrah journeys from Karachi to Makkah and Madinah, arranged with care, clarity and respect.
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg text-ivory">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-gold-light">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg text-ivory">Journeys</h3>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            <li><Link href="/packages?type=Umrah" className="hover:text-gold-light">Umrah packages</Link></li>
            <li><Link href="/packages?type=Hajj" className="hover:text-gold-light">Hajj packages</Link></li>
            <li><Link href="/hotels?city=Makkah" className="hover:text-gold-light">Makkah hotels</Link></li>
            <li><Link href="/hotels?city=Madinah" className="hover:text-gold-light">Madinah hotels</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg text-ivory">Karachi office</h3>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{site.address}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`tel:${site.phoneHref}`} className="whitespace-nowrap hover:text-gold-light">{site.phoneDisplay}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${site.email}`} className="hover:text-gold-light">{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8"><div className="hairline opacity-30" /></div>
      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-6 text-[13px] text-ivory/50 md:flex-row md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} Nurul Haramain. Demo website — business details, packages and prices are sample content.</p>
        <p>Photography via Unsplash, used under the Unsplash License.</p>
      </div>
    </footer>
  );
}
