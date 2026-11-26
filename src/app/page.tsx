import Hero from "@/components/Hero";
import CTABand from "@/components/CTABand";
import { Featured, HolyCities, Journey, Ribbon, Services, Testimonials, TrustStrip } from "@/components/home/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Featured />
      <HolyCities />
      <Journey />
      <Services />
      <Ribbon />
      <Testimonials />
      <div className="pt-20 md:pt-28" />
      <CTABand />
    </>
  );
}
