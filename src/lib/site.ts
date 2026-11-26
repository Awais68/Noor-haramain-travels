/**
 * NURUL HARAMAIN — site configuration
 * ------------------------------------------------------------------
 * Everything a client will want to change lives here: contact details,
 * WhatsApp number, hero video, photography and demo package data.
 * All business details below are PLACEHOLDERS for a client demo.
 */

export const site = {
  name: "Nurul Haramain",
  arabic: "نور الحرمين",
  tagline: "Hajj & Umrah journeys from Karachi",
  // Placeholder contact details — replace before going live.
  phoneDisplay: "+92 300 000 0000",
  phoneHref: "+923000000000",
  whatsapp: "923000000000", // international format, no + or spaces
  email: "info@example.com",
  address: "Office placeholder, Shahrah-e-Faisal, Karachi, Pakistan",
  hours: [
    { d: "Monday – Saturday", t: "10:00 am – 8:00 pm" },
    { d: "Friday break", t: "1:00 pm – 2:30 pm" },
    { d: "Sunday", t: "By appointment" },
  ],
  /**
   * Hero video. Drop a licensed, compressed MP4 (H.264, ~6–10 MB, 1080p or 4K)
   * of Masjid an-Nabawi into /public/video/hero.mp4 and set this to
   * "/video/hero.mp4". Leave empty to use the cinematic photo hero.
   */
  heroVideo: "",
};

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

/* ------------------------------------------------------------------ */
/* Photography — real photographs, free to use under the Unsplash License */
/* ------------------------------------------------------------------ */

export type Photo = { id: string; alt: string; credit: string };

export const photos = {
  nabawiCity: {
    id: "photo-1729931421786-7bbd6c7d78f6",
    alt: "Masjid an-Nabawi with the Green Dome and minarets, Madinah",
    credit: "Helmi Tan / Unsplash",
  },
  nabawiDomes: {
    id: "photo-1711261817080-8f064416206c",
    alt: "Domes and minarets of Masjid an-Nabawi against a clear sky",
    credit: "Juned Khatri / Unsplash",
  },
  nabawiColumns: {
    id: "photo-1704104501140-476216730933",
    alt: "Illuminated colonnade inside Masjid an-Nabawi",
    credit: "Haythem Gataa / Unsplash",
  },
  nabawiCourtyard: {
    id: "photo-1720913209705-50d7c9db4fb3",
    alt: "Courtyard of Masjid an-Nabawi, Madinah",
    credit: "Jumanh Jammaz / Unsplash",
  },
  nabawiDome: {
    id: "photo-1711576109103-79d79079dbd2",
    alt: "Masjid an-Nabawi domes, Madinah",
    credit: "Muhammad Tayyab / Unsplash",
  },
  nabawiClock: {
    id: "photo-1677835238946-20fc43ab0533",
    alt: "Columns and clock at Masjid an-Nabawi",
    credit: "Nurul / Unsplash",
  },
  kaaba: {
    id: "photo-1710695198971-3abdf7fcc82e",
    alt: "The Kaaba at Masjid al-Haram, Makkah",
    credit: "Juned Khatri / Unsplash",
  },
  kaabaTower: {
    id: "photo-1627728734379-a5f8c099763e",
    alt: "The Kaaba with the Abraj Al-Bait clock tower behind, Makkah",
    credit: "Untung Bekti Nugroho / Unsplash",
  },
  kaabaArch: {
    id: "photo-1713239060784-e6ed820a0715",
    alt: "The Kaaba in low sun, framed by an archway of Masjid al-Haram",
    credit: "Hushaan / Unsplash",
  },
  kaabaPilgrims: {
    id: "photo-1580418827493-f2b22c0a76cb",
    alt: "Pilgrims performing tawaf around the Kaaba",
    credit: "Ekrem Osmanoglu / Unsplash",
  },
  kaabaCrowd: {
    id: "photo-1591004272853-1462c050dca8",
    alt: "Pilgrims in ihram surrounding the Kaaba",
    credit: "Ömer F. Arslan / Unsplash",
  },
  haramExterior: {
    id: "photo-1591604159758-680f22f77d24",
    alt: "Pilgrims walking outside Masjid al-Haram, Makkah",
    credit: "Sulthan Auliya / Unsplash",
  },
  haramGround: {
    id: "photo-1513072064285-240f87fa81e8",
    alt: "Prayer ground around the Kaaba",
    credit: "Izuddin Helmi Adnan / Unsplash",
  },
  haramPillars: {
    id: "photo-1566747675140-317e7484b10d",
    alt: "Pilgrims beside the columns of Masjid al-Haram",
    credit: "mohavic Otb / Unsplash",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export const unsplash = (id: string, w: number, q = 80) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

/* ------------------------------------------------------------------ */
/* Packages — SAMPLE data for demonstration. Prices are not real offers. */
/* ------------------------------------------------------------------ */

export type Tier = "Economy" | "Standard" | "Premium" | "VIP";
export type Pkg = {
  slug: string;
  type: "Umrah" | "Hajj";
  tier: Tier;
  name: string;
  nights: number;
  makkahNights: number;
  madinahNights: number;
  priceFrom: number; // PKR per person, sample
  sharing: string;
  makkahHotel: string;
  madinahHotel: string;
  distance: string;
  photo: PhotoKey;
  inclusions: string[];
  featured?: boolean;
};

export const packages: Pkg[] = [
  {
    slug: "umrah-economy",
    type: "Umrah",
    tier: "Economy",
    name: "Economy Umrah",
    nights: 21,
    makkahNights: 14,
    madinahNights: 7,
    priceFrom: 285000,
    sharing: "Quad / Quint sharing",
    makkahHotel: "3★ hotel, Ajyad / Misfalah",
    madinahHotel: "3★ hotel, Markazia outer ring",
    distance: "700–900 m to Haram",
    photo: "haramExterior",
    inclusions: ["Return flights from Karachi", "Umrah visa processing", "Shared bus transfers", "Ziyarat in Makkah & Madinah"],
  },
  {
    slug: "umrah-standard",
    type: "Umrah",
    tier: "Standard",
    name: "Standard Umrah",
    nights: 15,
    makkahNights: 10,
    madinahNights: 5,
    priceFrom: 365000,
    sharing: "Triple / Quad sharing",
    makkahHotel: "4★ hotel, Ibrahim Al Khalil Rd",
    madinahHotel: "4★ hotel, Markazia North",
    distance: "350–500 m to Haram",
    photo: "nabawiCourtyard",
    inclusions: ["Return flights from Karachi", "Umrah visa processing", "Private family transfers", "Guided ziyarat", "Daily breakfast"],
    featured: true,
  },
  {
    slug: "umrah-premium",
    type: "Umrah",
    tier: "Premium",
    name: "Premium Umrah",
    nights: 14,
    makkahNights: 9,
    madinahNights: 5,
    priceFrom: 520000,
    sharing: "Double / Triple sharing",
    makkahHotel: "5★ hotel, Abraj Al-Bait area",
    madinahHotel: "5★ hotel, Markazia Central",
    distance: "Under 150 m to Haram",
    photo: "kaabaArch",
    inclusions: ["Direct flights from Karachi", "Umrah visa processing", "Private GMC transfers", "Scholar-led ziyarat", "Breakfast & dinner", "Haramain train Makkah → Madinah"],
    featured: true,
  },
  {
    slug: "umrah-vip",
    type: "Umrah",
    tier: "VIP",
    name: "VIP Umrah",
    nights: 10,
    makkahNights: 6,
    madinahNights: 4,
    priceFrom: 890000,
    sharing: "Private double room",
    makkahHotel: "5★ Haram-view room",
    madinahHotel: "5★ hotel facing Masjid an-Nabawi",
    distance: "Haram-facing",
    photo: "kaabaTower",
    inclusions: ["Business-class flights", "Fast-track visa processing", "Private chauffeur throughout", "Personal guide for Umrah rites", "Full board", "Haramain train, business class"],
  },
  {
    slug: "hajj-standard",
    type: "Hajj",
    tier: "Standard",
    name: "Standard Hajj",
    nights: 38,
    makkahNights: 28,
    madinahNights: 10,
    priceFrom: 1450000,
    sharing: "Quad sharing",
    makkahHotel: "Aziziyah building accommodation",
    madinahHotel: "4★ hotel, Markazia",
    distance: "Shuttle to Haram",
    photo: "kaabaCrowd",
    inclusions: ["Return flights from Karachi", "Hajj visa processing", "Mina tent as per allotment", "Arafat & Muzdalifah transport", "Pre-departure Hajj training in Karachi", "Qurbani coordination"],
  },
  {
    slug: "hajj-premium",
    type: "Hajj",
    tier: "Premium",
    name: "Premium Hajj",
    nights: 25,
    makkahNights: 18,
    madinahNights: 7,
    priceFrom: 2350000,
    sharing: "Triple sharing",
    makkahHotel: "5★ hotel near Haram",
    madinahHotel: "5★ hotel, Markazia Central",
    distance: "Walking distance",
    photo: "kaabaPilgrims",
    inclusions: ["Direct flights from Karachi", "Hajj visa processing", "Upgraded Mina camp", "Air-conditioned buses for Mashair", "Scholar accompanying the group", "Full board"],
    featured: true,
  },
  {
    slug: "hajj-vip",
    type: "Hajj",
    tier: "VIP",
    name: "VIP Hajj",
    nights: 18,
    makkahNights: 12,
    madinahNights: 6,
    priceFrom: 3600000,
    sharing: "Double sharing",
    makkahHotel: "5★ Haram-view hotel",
    madinahHotel: "5★ hotel facing Masjid an-Nabawi",
    distance: "Haram-facing",
    photo: "haramGround",
    inclusions: ["Business-class flights", "Hajj visa processing", "Premium Mina camp (as allotted)", "Private transport where permitted", "Dedicated group coordinator 24/7", "Full board"],
  },
];

export const formatPKR = (n: number) =>
  "PKR " + n.toLocaleString("en-PK", { maximumFractionDigits: 0 });

/* ------------------------------------------------------------------ */
/* Hotels — DEMO listings. Distances are approximate; verify before use. */
/* Photos show the surrounding Haram area, not hotel interiors.         */
/* ------------------------------------------------------------------ */

export type Hotel = {
  name: string;
  city: "Makkah" | "Madinah";
  category: "5★ Haram-front" | "5★ Near Haram" | "4★ Walking distance";
  area: string;
  walk: string;
  rooms: string[];
  photo: PhotoKey;
};

export const hotels: Hotel[] = [
  { name: "Swissôtel Makkah", city: "Makkah", category: "5★ Haram-front", area: "Abraj Al-Bait complex", walk: "~2 min walk", rooms: ["Double", "Triple", "Haram view"], photo: "kaabaTower" },
  { name: "Pullman ZamZam Makkah", city: "Makkah", category: "5★ Haram-front", area: "Abraj Al-Bait complex", walk: "~3 min walk", rooms: ["Double", "Triple", "Quad"], photo: "haramGround" },
  { name: "Hilton Suites Makkah", city: "Makkah", category: "5★ Near Haram", area: "Ibrahim Al Khalil Rd", walk: "~5 min walk", rooms: ["Double", "Family suite"], photo: "kaabaArch" },
  { name: "Anjum Hotel Makkah", city: "Makkah", category: "5★ Near Haram", area: "Jabal Omar side", walk: "~6 min walk", rooms: ["Double", "Triple", "Quad"], photo: "haramPillars" },
  { name: "Elaf Ajyad (sample)", city: "Makkah", category: "4★ Walking distance", area: "Ajyad", walk: "~8 min walk", rooms: ["Triple", "Quad", "Quint"], photo: "haramExterior" },
  { name: "Anwar Al Madinah Mövenpick", city: "Madinah", category: "5★ Haram-front", area: "Markazia North", walk: "~2 min walk", rooms: ["Double", "Triple", "Quad"], photo: "nabawiCity" },
  { name: "Dar Al Taqwa Madinah", city: "Madinah", category: "5★ Haram-front", area: "Markazia South", walk: "~2 min walk", rooms: ["Double", "Triple"], photo: "nabawiDomes" },
  { name: "Pullman ZamZam Madinah", city: "Madinah", category: "5★ Near Haram", area: "Markazia East", walk: "~5 min walk", rooms: ["Double", "Triple", "Quad"], photo: "nabawiCourtyard" },
  { name: "Al Eiman Royal (sample)", city: "Madinah", category: "4★ Walking distance", area: "Markazia West", walk: "~7 min walk", rooms: ["Triple", "Quad"], photo: "nabawiClock" },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/hotels", label: "Hotels" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
