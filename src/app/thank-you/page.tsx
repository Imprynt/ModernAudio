import type { Metadata } from "next";
import NextLink from "next/link";
import { CheckCircle2, ArrowUpRight, Home } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";
import ThankYouTracker from "./ThankYouTracker";

export const metadata: Metadata = {
  title: "Thank You | Modern Audio Co.",
  description: "We have received your commercial audio requirement.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ThankYouPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <ThankYouTracker />
      <main id="main-content" style={{ backgroundColor: "#111111", minHeight: "85vh", display: "flex", alignItems: "center" }}>
        <div className="site-container" style={{ paddingTop: "7rem", paddingBottom: "6rem", width: "100%" }}>
          <div
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              backgroundColor: "#171717",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "8px",
              padding: "clamp(2rem, 5vw, 3.5rem)",
              textAlign: "center",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "rgba(37, 211, 102, 0.12)",
                border: "1px solid rgba(37, 211, 102, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <CheckCircle2 size={32} style={{ color: "#25D366" }} />
            </div>

            <span
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "var(--accent-red)",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              REQUIREMENT RECEIVED
            </span>

            <h1
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}
            >
              Thank you for contacting Modern Audio Co.
            </h1>

            <p style={{ fontSize: "1.05rem", color: "#CCCCCC", lineHeight: 1.6, marginBottom: "2rem" }}>
              Our Chandni Chowk audio engineering team has received your requirement. An audio specialist will review your space details and reach out to discuss suitable system configurations across Delhi, NCR & Pan India.
            </p>


            {/* Navigation options */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <NextLink
                href="/"
                className="btn-primary"
                style={{ padding: "0.85rem 1.75rem", fontSize: "0.9rem" }}
              >
                <Home size={15} />
                <span>Return to Homepage</span>
              </NextLink>

              <NextLink
                href="/solutions"
                className="btn-secondary-light"
                style={{ padding: "0.85rem 1.75rem", fontSize: "0.9rem" }}
              >
                <span>View Solutions</span>
                <ArrowUpRight size={15} />
              </NextLink>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
