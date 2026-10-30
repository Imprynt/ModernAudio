import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { ArrowUpRight, ArrowRight, Info } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Commercial Audio Equipment & Systems | Modern Audio Co.",
  },
  description:
    "Sound systems for residential societies, clubs, theme parks, stadiums & commercial spaces from Modern Audio Co., Chandni Chowk, Delhi.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "Commercial Audio Equipment & Systems | Modern Audio Co.",
    description:
      "Sound systems for residential societies, clubs, theme parks, stadiums & commercial venues across Delhi, NCR & Pan India.",
    url: "/solutions",
    siteName: SITE_CONFIG.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Modern Audio Co. - Commercial Audio Equipment & Systems Delhi",
      },
    ],
  },
};

export default function SolutionsPage() {

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
        name: "Solutions",
        item: `${SITE_CONFIG.url}/solutions`,
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
        {/* Solutions Page Hero */}
        <section
          className="solutions-hero-section"
          style={{
            paddingTop: "clamp(8rem, 16vh, 12rem)",
            paddingBottom: "clamp(4.5rem, 8vw, 7rem)",
            position: "relative",
            backgroundColor: "#0D0D0D",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            overflow: "hidden",
          }}
        >
          {/* Architectural Background Media */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
            }}
          >
            <Image
              src="/images/hero-auditorium.jpg"
              alt="Institutional auditorium and commercial venues background"
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center 38%",
                filter: "brightness(0.5) contrast(1.08)",
              }}
            />
            {/* Cinematic Directional Vignette Overlay for High Legibility */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(10, 10, 12, 0.94) 0%, rgba(10, 10, 12, 0.86) 55%, rgba(10, 10, 12, 0.72) 100%), linear-gradient(to bottom, rgba(10, 10, 12, 0.5) 0%, rgba(10, 10, 12, 0.95) 100%)",
              }}
            />
          </div>

          <div className="site-container-wide" style={{ position: "relative", zIndex: 10 }}>
            <div style={{ maxWidth: "920px" }}>
              <h1
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "clamp(2.4rem, 5.2vw, 4.6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  lineHeight: 1.06,
                  marginBottom: "1.5rem",
                }}
              >
                Institutional &amp; commercial audio solutions.
              </h1>

              <p
                style={{
                  fontSize: "clamp(1.05rem, 1.7vw, 1.3rem)",
                  lineHeight: 1.6,
                  color: "#CCCCCC",
                  maxWidth: "800px",
                  marginBottom: "2.5rem",
                }}
              >
                Born in Chandni Chowk, Delhi, Modern Audio coordinates complete audio systems for institutional campuses, corporate facilities, and commercial venues across Delhi, NCR & Pan India. Explore our portfolio of institutional and commercial projects and the complete professional audio system that powers them.
              </p>

              {/* Jump Anchor Links */}
              <div
                className="solutions-hero-anchors"
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#equipment-portfolio"
                  className="btn-primary"
                  style={{
                    padding: "0.6rem 1.15rem",
                    fontSize: "0.82rem",
                    fontFamily: "var(--font-family-sans)",
                    fontWeight: 600,
                  }}
                >
                  <span>Audio Equipment Portfolio</span>
                </a>

                {SITE_CONFIG.spaces.map((space) => (
                  <a
                    key={space.id}
                    href={`#${space.id}`}
                    className="btn-secondary-light"
                    style={{
                      padding: "0.55rem 1rem",
                      fontSize: "0.82rem",
                      fontFamily: "var(--font-family-sans)",
                      fontWeight: 500,
                    }}
                  >
                    <span>{space.label}</span>
                  </a>
                ))}
              </div>

              <p
                style={{
                  marginTop: "1.25rem",
                  fontSize: "0.92rem",
                  color: "#A1A1AA",
                  lineHeight: 1.5,
                }}
              >
                Don&apos;t see your space? We customise sound for other venues too.{" "}
                <NextLink
                  href="/contact"
                  style={{
                    color: "var(--accent-red, #B5121B)",
                    fontWeight: 600,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    transition: "opacity 0.2s ease",
                  }}
                >
                  Tell us what you need &rarr;
                </NextLink>
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: Equipment Taxonomy & Systems Overview */}
        <section
          id="equipment-portfolio"
          className="solutions-equipment-section"
          style={{
            paddingTop: "clamp(5rem, 9vw, 8rem)",
            paddingBottom: "clamp(5rem, 9vw, 8rem)",
            backgroundColor: "#141414",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            scrollMarginTop: "80px",
          }}
        >
          <div className="site-container-wide">
            <div style={{ maxWidth: "880px", marginBottom: "3.5rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                  lineHeight: 1.12,
                  marginBottom: "1rem",
                }}
              >
                Professional audio equipment and complete systems
              </h2>
              <p style={{ fontSize: "1.05rem", color: "#A8A8A8", lineHeight: 1.65 }}>
                Modern Audio supplies and setup digital and analog system ranging from single-channel units to multi-zone live setups. All categories below reflect our stated portfolio.
              </p>
            </div>

            {/* Equipment Grid */}
            <div className="equipment-grid">
              {SITE_CONFIG.equipmentTaxonomy.map((eq) => (
                <div
                  key={eq.id}
                  className="equipment-taxonomy-card"
                >
                  {/* Media Header with Overlays and Badges */}
                  <div className="equipment-card-media-wrapper">
                    {eq.image && (
                      <Image
                        src={eq.image}
                        alt={eq.imageAlt || `${eq.name} commercial audio hardware`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="equipment-card-media"
                      />
                    )}
                    <div className="equipment-card-media-overlay" />

                    {/* Architectural Scope Pill Badge */}
                    <div className="equipment-card-scope-badge">
                      <span>{eq.scope}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="equipment-card-body">
                    <h3 className="equipment-card-title">
                      {eq.name}
                    </h3>

                    <p className="equipment-card-desc">
                      {eq.description}
                    </p>

                    {/* Technical Scope & Capabilities */}
                    <div style={{ marginTop: "auto" }}>
                      <div className="equipment-card-specs-header">
                        <span className="equipment-card-specs-title">
                          System Capabilities
                        </span>
                        <div className="equipment-card-specs-line" />
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "0.25rem" }}>
                        {eq.characteristics.map((char) => (
                          <span key={char} className="equipment-spec-chip">
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Direct Enquiry Action */}
                  <div className="equipment-card-footer">
                    <NextLink
                      href={`/contact?equipment=${eq.id}`}
                      className="equipment-card-cta-btn"
                      aria-label={`Enquire about ${eq.name}`}
                    >
                      <span>Enquire</span>
                      <ArrowUpRight size={13} className="equipment-card-cta-icon" />
                    </NextLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: Institutional & Commercial Applications */}
        {SITE_CONFIG.spaces.map((space, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <section
              key={space.id}
              id={space.id}
              className="solutions-space-section"
              style={{
                paddingTop: "clamp(5rem, 9vw, 8rem)",
                paddingBottom: "clamp(5rem, 9vw, 8rem)",
                backgroundColor: isEven ? "#161616" : "#101010",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                scrollMarginTop: "80px",
              }}
            >
              <div className="site-container-wide">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isEven ? "1fr 1.15fr" : "1.15fr 1fr",
                    gap: "4.5rem",
                    alignItems: "center",
                  }}
                  className="solution-grid"
                >

                  {/* Text Column */}
                  <div className="solution-venue-text" style={{ order: isEven ? 2 : 1 }}>
                    {/* Clean Category Eyebrow */}
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-family-sans)",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--accent-red)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "0.85rem",
                      }}
                    >
                      {space.label}
                    </span>

                    <h2
                      style={{
                        fontFamily: "var(--font-family-display)",
                        fontSize: "clamp(1.95rem, 3.4vw, 2.9rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.14,
                        color: "#FFFFFF",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {space.headline}
                    </h2>

                    <p
                      style={{
                        fontSize: "1.02rem",
                        lineHeight: 1.7,
                        color: "#CCCCCC",
                        marginBottom: "2rem",
                      }}
                    >
                      {space.description}
                    </p>

                    {/* Core Systems */}
                    <div style={{ marginBottom: "2.5rem" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-family-sans)",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "#71717A",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          marginBottom: "0.75rem",
                        }}
                      >
                        Core Systems
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.45rem",
                        }}
                      >
                        {space.confirmedSetups.map((setup) => (
                          <span
                            key={setup}
                            style={{
                              fontSize: "0.82rem",
                              color: "#D4D4D8",
                              backgroundColor: "rgba(255, 255, 255, 0.04)",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              padding: "0.35rem 0.75rem",
                              borderRadius: "4px",
                              fontFamily: "var(--font-family-sans)",
                            }}
                          >
                            {setup}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="solution-venue-cta" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                      <NextLink
                        href={`/contact?space=${space.slug || space.id}`}
                        className="btn-primary"
                        style={{ padding: "0.85rem 1.6rem", fontSize: "0.88rem" }}
                      >
                        <span>{SITE_CONFIG.cta.primary}</span>
                        <ArrowUpRight size={15} />
                      </NextLink>

                      <NextLink
                        href={`/solutions/${space.slug}`}
                        style={{
                          padding: "0.85rem 1.4rem",
                          fontSize: "0.88rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.45rem",
                          color: "#A1A1AA",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                        }}
                        className="hover:text-white"
                      >
                        <span>Dedicated Guide</span>
                        <ArrowRight size={14} />
                      </NextLink>
                    </div>
                  </div>

                  {/* Image Column - Clean, Unobstructed Architectural View */}
                  <div
                    className="solution-venue-image"
                    style={{
                      order: isEven ? 1 : 2,
                      position: "relative",
                      height: "clamp(380px, 52vh, 560px)",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      boxShadow: "0 24px 60px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <Image
                      src={space.image}
                      alt={space.imageAlt || `${space.label} architectural audio installation in Delhi, NCR & Pan India`}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      style={{ objectFit: "cover", filter: "brightness(0.92)" }}
                    />
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Visual Architecture & Asset Integrity Notice */}
        <section
          style={{
            paddingTop: "3rem",
            paddingBottom: "3rem",
            backgroundColor: "#0B0B0B",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div className="site-container-wide">
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1.25rem 1.5rem",
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
                maxWidth: "960px",
                margin: "0 auto",
              }}
            >
              <Info size={20} style={{ color: "var(--accent-red)", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-family-sans)",
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.25rem",
                  }}
                >
                  Visual Representation Notice
                </span>
                <p style={{ fontSize: "0.82rem", color: "#8E8E8E", lineHeight: 1.6, margin: 0 }}>
                  The architectural imagery displayed across these solutions represents art-directed conceptual models of institutional and commercial environments. Modern Audio Company Private Limited provides audio equipment supply, system configuration, and implementation arrangements tailored to each venue&apos;s physical specifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Conversion Section */}
        <section
          style={{
            paddingTop: "clamp(5rem, 9vw, 8rem)",
            paddingBottom: "clamp(5rem, 9vw, 8rem)",
            backgroundColor: "#0D0D0D",
            textAlign: "center",
          }}
        >
          <div className="site-container">
            <div style={{ maxWidth: "760px", marginLeft: "auto", marginRight: "auto" }}>
              <span
                style={{
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "var(--accent-red)",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                HAVE A SPECIFIC VENUE IN MIND?
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "clamp(2.2rem, 4.4vw, 3.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                }}
              >
                Let&apos;s evaluate your space&apos;s audio requirements.
              </h2>

              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  color: "#CCCCCC",
                  marginBottom: "2.5rem",
                }}
              >
                Share your room dimensions, venue type, and functional requirements with our technical team for an honest equipment evaluation and system configuration plan across Delhi, NCR & Pan India.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <NextLink
                  href="/contact"
                  className="btn-primary"
                  style={{ padding: "1rem 2.2rem", fontSize: "1rem" }}
                >
                  <span>{SITE_CONFIG.cta.primary}</span>
                  <ArrowUpRight size={17} />
                </NextLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
