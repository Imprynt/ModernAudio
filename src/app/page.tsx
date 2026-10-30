import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";
import HeroSection from "@/components/home/HeroSection";
import NarrativeParallaxSection from "@/components/home/NarrativeParallaxSection";
import SolutionsSelectorSection from "@/components/home/SolutionsSelectorSection";
import EquipmentPortfolioSection from "@/components/home/EquipmentPortfolioSection";
import ProcessStorySection from "@/components/home/ProcessStorySection";
import RequirementFactorsSection from "@/components/home/RequirementFactorsSection";
import CredibilitySection from "@/components/home/CredibilitySection";
import WhyModernAudioSection from "@/components/home/WhyModernAudioSection";
import EnquirySection from "@/components/home/EnquirySection";
import FaqSection from "@/components/home/FaqSection";
import CinematicCloseSection from "@/components/home/CinematicCloseSection";
import LocationMap from "@/components/common/LocationMap";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: {
    absolute: "Professional Audio Systems in Delhi | Modern Audio Co.",
  },
  description:
    "Custom sound for residential societies, clubs, theme parks, stadiums & institutions. Headquartered at Chandni Chowk, Delhi, serving Delhi, NCR & Pan India.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Professional Audio Systems in Delhi | Modern Audio Co.",
    description:
      "Custom sound systems for residential societies, clubs, theme parks, stadiums and institutions across Delhi, NCR & Pan India.",
    url: "/",
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Modern Audio Co. - Complete Audio Solutions Delhi",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="main-content">
        {/* Fold 01 & Fold 02: The Cinematic Hero & Strategic Brand Promise */}
        <HeroSection />

        {/* Fold 03: Layered parallax space-first reveal */}
        <NarrativeParallaxSection />

        {/* Section 04: Solutions by Venue Category (Light) */}
        <SolutionsSelectorSection />

        {/* Section 05: Equipment We Supply (Dark) */}
        <EquipmentPortfolioSection />

        {/* Section 06: The 5-Stage Customer Journey (Light) */}
        <ProcessStorySection />

        {/* Section 07: What The Right Solution Depends On (Dark) */}
        <RequirementFactorsSection />

        {/* Section 08: Grounded Trust, Verified Capabilities & Integrity (Light) */}
        <CredibilitySection />

        {/* Section 09: Why Modern Audio - 7 Core Values & Proof (Dark) */}
        <WhyModernAudioSection />

        {/* Section 10: Project Enquiry & Space Consultation Form */}
        <EnquirySection />

        {/* Section 10: Frequently Asked Questions */}
        <FaqSection />

        {/* Section 11: Final Cinematic Close */}
        <CinematicCloseSection />

        {/* Section 12: Find Us Location Map - hidden temporarily
        <LocationMap />
        */}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
