import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import StructuredData from "@/components/common/StructuredData";
import FloatingWhatsAppButton from "@/components/common/FloatingWhatsAppButton";
import ScrollToTop from "@/components/common/ScrollToTop";
import Analytics from "@/components/common/Analytics";
import CustomCursor from "@/components/common/CustomCursor";
import Preloader from "@/components/common/Preloader";

const fontDisplay = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.shortName} | Complete Audio Solutions. Designed Around You.`,
    template: `%s | ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Modern Audio Company",
    "Professional Audio Delhi",
    "Auditorium sound system Delhi",
    "Institutional audio Chandni Chowk",
    "Commercial audio solutions Delhi",
    "Educational audio Delhi, NCR & Pan India",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: `${SITE_CONFIG.shortName} | Complete Audio Solutions. Designed Around You.`,
    description: SITE_CONFIG.promise,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Modern Audio Co. - Professional Commercial & Institutional Audio Systems Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.shortName} | Complete Audio Solutions. Designed Around You.`,
    description: SITE_CONFIG.promise,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontSans.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Preloader />
        <CustomCursor />
        <Analytics />
        <StructuredData />
        {children}
        <ScrollToTop />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
