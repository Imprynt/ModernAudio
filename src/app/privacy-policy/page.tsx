import type { Metadata } from "next";
import NextLink from "next/link";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | Modern Audio Co.",
  description:
    "Privacy Policy for Modern Audio Company Private Limited. Details of data collection, usage, and privacy commitments under the Digital Personal Data Protection Act, 2023 (DPDP).",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
            <strong>Legal Notice:</strong> This privacy policy is a working draft prepared for Modern Audio Company Private Limited for regulatory compliance review under the Digital Personal Data Protection Act, 2023 (DPDP).
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
            Privacy Policy
          </h1>

          <p style={{ fontSize: "0.85rem", color: "#8E8E8E", marginBottom: "3rem" }}>
            Last Updated: October 2026 · Modern Audio Company Private Limited (Chandni Chowk, Delhi)
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", fontSize: "0.98rem", lineHeight: 1.7, color: "#CCCCCC" }}>
            <section>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem", fontFamily: "var(--font-family-display)" }}>
                1. Overview and Scope
              </h2>
              <p>
                Modern Audio Company Private Limited (&ldquo;Modern Audio Co.&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is an institutional and commercial audio supplier and systems integrator operating from Chandni Chowk, Delhi 110006, serving clients across Delhi, NCR & Pan India. This Privacy Policy outlines how we collect, store, and process information submitted by representatives of businesses, educational institutions, hospitality spaces, and community facilities inquiring about commercial audio systems.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem", fontFamily: "var(--font-family-display)" }}>
                2. Information We Collect
              </h2>
              <p style={{ marginBottom: "0.75rem" }}>
                We collect personal and facility information strictly when voluntarily provided via our enquiry forms, direct telephone calls, WhatsApp conversations, or email correspondence:
              </p>
              <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li><strong>Identity Data:</strong> Full name of the representative or project lead.</li>
                <li><strong>Contact Data:</strong> Mobile phone number, telephone number, and official email address.</li>
                <li><strong>Project Specifications:</strong> Venue type (e.g., auditorium, school, hotel, place of worship), city or geographic location, project timeline, and functional audio requirements.</li>
                <li><strong>Technical &amp; Marketing Attribution:</strong> Non-personally identifiable visit metadata including landing page URL, HTTP referrer, UTM parameters (utm_source, utm_medium, utm_campaign), Meta Click ID (fbclid), and Google Click ID (gclid) for measuring advertising effectiveness.</li>
              </ul>
              <p style={{ marginTop: "0.85rem" }}>
                This site embeds a Google Map, which may set cookies and process data under Google&apos;s own privacy policy.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem", fontFamily: "var(--font-family-display)" }}>
                3. Purpose of Processing
              </h2>
              <p style={{ marginBottom: "0.75rem" }}>
                Your information is processed exclusively for commercial B2B enquiry fulfillment:
              </p>
              <ul style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Evaluating your space dimensions and operational audio needs.</li>
                <li>Contacting you via telephone or WhatsApp to clarify equipment configurations.</li>
                <li>Preparing and delivering itemized equipment proposals and quotations.</li>
                <li>Coordinating on-site delivery, mounting, and operational handover.</li>
              </ul>
              <p style={{ marginTop: "0.75rem" }}>
                We do not sell, rent, lease, or monetize your contact details with external third-party telemarketers.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem", fontFamily: "var(--font-family-display)" }}>
                4. Compliance with India&apos;s DPDP Act, 2023
              </h2>
              <p>
                In accordance with the Digital Personal Data Protection Act, 2023 of India, you retain rights regarding the personal data we hold about you. You may request confirmation of whether we are processing your personal data, request correction of inaccurate data, or request the erasure of your contact details once the commercial inquiry has concluded.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem", fontFamily: "var(--font-family-display)" }}>
                5. Data Retention &amp; Security
              </h2>
              <p>
                Enquiry details are retained only as long as necessary to fulfill commercial consultation, ongoing project delivery, or statutory accounting obligations. Technical submissions are transmitted via TLS encrypted protocols and access is restricted to verified personnel at our Chandni Chowk facility.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem", fontFamily: "var(--font-family-display)" }}>
                6. Contact for Privacy Matters
              </h2>
              <p>
                For questions regarding this policy or to exercise your rights under the DPDP Act, please reach out to our registered office:
              </p>
              <div style={{ marginTop: "1rem", backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "1.25rem", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <p><strong>Modern Audio Company Private Limited</strong></p>
                <p>{SITE_CONFIG.address.street}</p>
                <p>{SITE_CONFIG.address.area}, {SITE_CONFIG.address.city} {SITE_CONFIG.address.postalCode}, India</p>
                <p style={{ marginTop: "0.5rem" }}>Email: <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: "#FFFFFF" }}>{SITE_CONFIG.contact.email}</a></p>
                <p>Direct: {SITE_CONFIG.contact.phoneDisplay}</p>
              </div>
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
