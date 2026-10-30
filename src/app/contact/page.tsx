import type { Metadata } from "next";
import { MapPin, Mail, ExternalLink } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";
import EnquirySection from "@/components/home/EnquirySection";
import LocationMap from "@/components/common/LocationMap";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Modern Audio Co. | Chandni Chowk, Delhi",
  },
  description:
    "Discuss your commercial or institutional audio requirement directly with Modern Audio Company Private Limited. Located at 1481 Dewan Hall Road, Chandni Chowk, Delhi.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Modern Audio Co. | Chandni Chowk, Delhi",
    description: "Discuss your commercial or institutional audio requirement directly with Modern Audio Co.",
    url: "/contact",
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Modern Audio Co. - Chandni Chowk, Delhi",
      },
    ],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${SITE_CONFIG.url}/contact`,
      },
    ],
  };

  return (
    <SmoothScroll>
      <Navbar />
      <main id="main-content" style={{ backgroundColor: "#111111", color: "#FFFFFF" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {/* Contact Page Editorial Header */}
        <section
          style={{
            paddingTop: "clamp(8rem, 16vh, 11rem)",
            paddingBottom: "clamp(3.5rem, 6vw, 5rem)",
            backgroundColor: "#0D0D0D",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="site-container-wide">
            <div style={{ maxWidth: "840px" }}>

              <h1
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "clamp(2.5rem, 5.5vw, 4.6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  lineHeight: 1.05,
                  marginBottom: "1.5rem",
                }}
              >
                Let&apos;s talk about your audio requirement.
              </h1>

              <p
                style={{
                  fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                  lineHeight: 1.6,
                  color: "#CCCCCC",
                }}
              >
                Whether you have an upcoming project, are outfitting a new auditorium or lecture hall, or simply need clarity on what your venue requires, tell us about your space.
              </p>
            </div>
          </div>
        </section>

        {/* Split Editorial Layout: Location & Facility Info + Project Form */}
        <section style={{ paddingBottom: "clamp(5rem, 9vw, 8rem)" }}>
          <div className="site-container-wide" style={{ paddingTop: "clamp(3.5rem, 6vw, 5rem)" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.35fr",
                gap: "5rem",
                alignItems: "flex-start",
              }}
              className="contact-split-grid"
            >
              {/* Left Column: Verified Location, Company Information & Direct Channels */}
              <div>
                <div style={{ marginBottom: "3rem" }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-family-display)",
                      fontSize: "1.85rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Chandni Chowk Facility
                  </h2>

                  <p style={{ fontSize: "1rem", color: "#A5A5A5", lineHeight: 1.65, marginBottom: "2rem" }}>
                    Modern Audio Company Private Limited is anchored in the historic audio trade center of Old Delhi. We coordinate system planning, equipment sourcing, consultation, and delivery from our Chandni Chowk base, primarily serving institutional, hospitality, and commercial clients across Delhi, NCR & Pan India.
                  </p>

                  {/* Physical Address Block */}
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "6px",
                      padding: "1.75rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                      <MapPin size={22} style={{ color: "var(--accent-red)", flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <span
                          style={{
                            fontFamily: "var(--font-family-sans)",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            color: "var(--accent-red)",
                            textTransform: "uppercase",
                            display: "block",
                            marginBottom: "0.25rem",
                          }}
                        >
                          PRESENCE &amp; HERITAGE
                        </span>
                        <address style={{ fontStyle: "normal", fontSize: "0.95rem", color: "#FFFFFF", lineHeight: 1.6 }}>
                          Born in Chandni Chowk , Raised in India
                        </address>

                        <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.95rem", lineHeight: 1.6 }}>
                          <div>
                            <a
                              href="tel:+919811675192"
                              style={{ color: "#FFFFFF", textDecoration: "none" }}
                            >
                              +91 98116 75192
                            </a>
                          </div>
                          <div>
                            <a
                              href="tel:+919899154003"
                              style={{ color: "#FFFFFF", textDecoration: "none" }}
                            >
                              +91 98991 54003
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hidden for now until new address is updated
                    <a
                      href={SITE_CONFIG.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-light"
                      style={{
                        padding: "0.6rem 1.1rem",
                        fontSize: "0.85rem",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <span>Open Address on Google Maps</span>
                      <ExternalLink size={14} />
                    </a>
                    */}
                  </div>

                  {/* Verified Communications Channels */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {/* Official Enquiry Email */}
                    {SITE_CONFIG.contact.email && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          padding: "1rem 1.25rem",
                          backgroundColor: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: "4px",
                        }}
                      >
                        <Mail size={18} style={{ color: "var(--accent-red)" }} />
                        <div>
                          <span style={{ display: "block", fontSize: "0.72rem", color: "#888888", fontFamily: "var(--font-family-mono)" }}>
                            OFFICIAL ENQUIRY EMAIL
                          </span>
                          <a
                            href={`mailto:${SITE_CONFIG.contact.email}`}
                            style={{ color: "#FFFFFF", fontSize: "0.92rem", textDecoration: "none" }}
                          >
                            {SITE_CONFIG.contact.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Honest Reassurance Notice */}
                <div
                  style={{
                    borderLeft: "2px solid var(--accent-red)",
                    paddingLeft: "1.25rem",
                    color: "#999999",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                  }}
                >
                  <p>
                    <strong>What happens after you enquire?</strong>
                    <br />
                    An audio solutions specialist reviews your room dimensions, venue type, and requirements, then gets back in touch to clarify details before any equipment quotation is prepared.
                  </p>
                </div>
              </div>

              {/* Right Column: Full Interactive Consultation Form */}
              <div>
                <EnquirySection embedded />
              </div>
            </div>
          </div>
        </section>

        {/* Find Us Location Map - hidden temporarily
        <LocationMap />
        */}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
