import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteShell } from "./components/SiteShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ifmkindredpathfertilitycentre.com"),
  title: {
    default: "Kindred Path Fertility Centre | Personalised Fertility Care in Lagos",
    template: "%s | Kindred Path Fertility Centre",
  },
  description:
    "Private, personalised fertility consultations, reproductive medicine, fertility preservation, diagnostics and counselling in Ikeja, Lagos.",
  keywords: ["fertility centre Lagos", "IVF Lagos", "IUI Lagos", "fertility consultation Ikeja", "egg freezing Nigeria", "male fertility Lagos"],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Kindred Path Fertility Centre",
    title: "Kindred Path Fertility Centre",
    description: "Expert fertility care, explained clearly and delivered compassionately.",
    images: [{ url: "/images/hero-consultation.webp", width: 1598, height: 984, alt: "A fertility consultation at Kindred Path" }],
  },
  icons: { icon: "/images/kindred-path-mark-compact.png", shortcut: "/images/kindred-path-mark-compact.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#54258a",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Kindred Path Fertility Centre",
  medicalSpecialty: "ReproductiveMedicine",
  telephone: "+2349132347955",
  email: "Kindredpathifm@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1-5 Oba Akinjobi Way",
    addressLocality: "Ikeja",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  openingHours: "Mo-Fr 08:00-16:00",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
