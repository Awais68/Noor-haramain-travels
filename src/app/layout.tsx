import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: {
    default: "Nurul Haramain — Hajj & Umrah from Karachi",
    template: "%s · Nurul Haramain",
  },
  description:
    "Thoughtfully arranged Hajj and Umrah journeys from Karachi to Makkah and Madinah. Umrah packages, Hajj arrangements, hotels near the Haram and personal travel advisors.",
  openGraph: {
    title: "Nurul Haramain — Your Sacred Journey Begins With Peace",
    description: "Hajj & Umrah journeys from Karachi to the Holy Cities.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#072519",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Manrope:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-forest-950">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
