import type { Metadata } from "next";
import NextLink from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";

export const metadata: Metadata = {
  title: "Terms of Service | Modern Audio Co.",
  description:
    "Commercial terms of service, equipment supply scope, and consultation parameters for Modern Audio Company Private Limited (Chandni Chowk, Delhi).",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="main-content" style={{ backgroundColor: "#111111", color: "#E0E0E0", minHeight: "80vh" }}>
        <div className="site-container" style={{ paddingTop: "clamp(7rem, 14vh, 9.5rem)", paddingBottom: "6rem", maxWidth: "860px" }}>
          {/* Draft Notice Banner */}
          <div
            style={{
              backgroundColor: "rgba(181, 18, 27, 0.1)",
              border: "1px solid var(--accent-red)",
              borderRadius: "4px",
              padding: "0.85rem 1.25rem",
              marginBottom: "2.5rem",
              fontSize: "0.82rem",
              color: "#FFAAAA",
              fontFamily: "var(--font-family-sans)",
            }}
          >
            <strong>Legal Notice:</strong> This document is a draft operational terms statement for Modern Audio Company Private Limited. Commercial transactions are subject to final itemized quotations and contract documentation.
          </div>

          <h1
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Terms of Service
          </h1>

          <p style={{ fontSize: "0.85rem", color: "#8E8E8E", marginBottom: "3rem" }}>
            Last Updated: October 2026 · Modern Audio Company Private Limited (Chandni Chowk, Delhi)
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", fontSize: "0.98rem", lineHeight: 1.7, color: "#CCCCCC" }}>
            <section>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem", fontFamily: "var(--font-family-display)" }}>
                1. Nature of Website Services
              </h2>
              <p>
                This website serves as an informational and enquiry portal for Modern Audio Company Private Limited (&ldquo;Modern Audio Co.&rdquo;). The website outlines audio systems, equipment scopes, and commercial sound configurations for institutional, educational, religious, and hospitality venues across Delhi, NCR & Pan India. The content provided does not constitute a binding unilateral offer to sell; all system proposals are subject to written confirmation following room layout assessment.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem", fontFamily: "var(--font-family-display)" }}>
                2. Quotations and Commercial Proposals
              </h2>
              <p>
                Informal estimates or website configurations are for planning purposes. Formal quotations issued by Modern Audio Co. specify hardware models, channel counts, active vs passive specifications, warranty terms, and delivery schedules. Quotation validity periods and commercial payment terms are stated explicitly on individual quotation documents.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem", fontFamily: "var(--font-family-display)" }}>
                3. Scope of Supply vs. Architectural Treatment
              </h2>
              <p>
                Modern Audio Co. specializes in professional audio hardware supply, signal distribution, power amplification, loudspeaker placement, and setup coordination. Unless explicitly agreed in writing under a separate commercial agreement, our services do not include civil construction, architectural wall soundproofing, structural acoustic treatment, or interior false-ceiling modifications.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem", fontFamily: "var(--font-family-display)" }}>
                4. Manufacturer Warranties &amp; Support
              </h2>
              <p>
                All brand-new audio equipment supplied by Modern Audio Co. carries standard manufacturer warranties. Warranty claims and component servicing are facilitated through authorized commercial distributor channels in accordance with the respective manufacturer&apos;s published policies.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem", fontFamily: "var(--font-family-display)" }}>
                5. Jurisdiction and Governing Law
              </h2>
              <p>
                All commercial engagements, quotations, and disputes arising from transactions with Modern Audio Company Private Limited are governed by the laws of India and subject to the exclusive jurisdiction of the competent courts in Delhi, India.
              </p>
            </section>
          </div>

          <div style={{ marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <NextLink href="/" style={{ color: "var(--accent-red)", fontWeight: 600, textDecoration: "none" }}>
              ← Return to Homepage
            </NextLink>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
