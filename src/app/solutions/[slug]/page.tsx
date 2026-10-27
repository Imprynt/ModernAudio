import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";
import { SITE_CONFIG, SpaceCategory } from "@/lib/site-config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SITE_CONFIG.spaces.map((space) => ({
    slug: space.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const space = SITE_CONFIG.spaces.find((s) => s.slug === slug);

  if (!space) {
    return {
      title: "Venue Solutions | Modern Audio Co.",
    };
  }

  return {
    title: {
      absolute: space.metaTitle,
    },
    description: space.metaDescription,
    alternates: {
      canonical: `/solutions/${space.slug}`,
    },
    openGraph: {
      title: space.metaTitle,
      description: space.metaDescription,
      url: `/solutions/${space.slug}`,
      siteName: SITE_CONFIG.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: space.image,
          width: 1200,
          height: 630,
          alt: `${space.label} audio systems by Modern Audio Co. Delhi`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: space.metaTitle,
      description: space.metaDescription,
      images: [space.image],
    },
  };
}

export default async function VenuePage({ params }: PageProps) {
  const { slug } = await params;
  const space = SITE_CONFIG.spaces.find((s) => s.slug === slug);

  if (!space) {
    notFound();
  }

  // Related spaces resolution (3-4 related venues)
  const relatedSpaces: SpaceCategory[] = space.relatedSlugs
    .map((rSlug) => SITE_CONFIG.spaces.find((s) => s.slug === rSlug || s.id === rSlug))
    .filter((s): s is SpaceCategory => Boolean(s))
    .slice(0, 3);

  // Structured Data: BreadcrumbList + Service + FAQPage
  const jsonLd = [
    {
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
        {
          "@type": "ListItem",
          position: 3,
          name: space.label,
          item: `${SITE_CONFIG.url}/solutions/${space.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: space.label,
      serviceType: "Commercial Audio System Integration",
      description: space.metaDescription,
      provider: {
        "@type": "LocalBusiness",
        name: SITE_CONFIG.legalName,
        telephone: SITE_CONFIG.contact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE_CONFIG.address.street,
          addressLocality: SITE_CONFIG.address.area,
          addressRegion: SITE_CONFIG.address.city,
          postalCode: SITE_CONFIG.address.postalCode,
          addressCountry: "IN",
        },
      },
      areaServed: SITE_CONFIG.primaryMarkets.map((m) => ({
        "@type": "AdministrativeArea",
        name: m,
      })),
    },
    ...(space.faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: space.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <SmoothScroll>
      <Navbar />
      <main id="main-content" style={{ backgroundColor: "#111111", color: "#FFFFFF" }}>
        {/* Inject JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Header Section */}
        <section
          style={{
            paddingTop: "clamp(7.5rem, 15vh, 10.5rem)",
            paddingBottom: "clamp(3.5rem, 6vw, 5rem)",
            backgroundColor: "#0D0D0D",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="site-container-wide">
            {/* Breadcrumb Links */}
            <nav
              aria-label="Breadcrumbs"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-family-sans)",
                fontSize: "0.82rem",
                color: "#888888",
                marginBottom: "1.75rem",
              }}
            >
              <NextLink href="/" style={{ color: "#AAAAAA", textDecoration: "none" }}>
                Home
              </NextLink>
              <span>/</span>
              <NextLink href="/solutions" style={{ color: "#AAAAAA", textDecoration: "none" }}>
                Solutions
              </NextLink>
              <span>/</span>
              <span style={{ color: "var(--accent-red)", fontWeight: 600 }}>{space.label}</span>
            </nav>

            <div style={{ maxWidth: "860px" }}>
              <span
                style={{
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "var(--accent-red)",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                {space.label} · AUDIO INTEGRATION
              </span>

              {/* Single H1 per page */}
              <h1
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "clamp(2.3rem, 5vw, 4.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                  textWrap: "balance",
                }}
              >
                {space.headline}
              </h1>

              <p
                style={{
                  fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                  lineHeight: 1.6,
                  color: "#CCCCCC",
                  marginBottom: "2.5rem",
                }}
              >
                {space.description}
              </p>

              {/* Top Quick Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <NextLink
                  href={`/contact?space=${space.slug}`}
                  className="btn-primary"
                  style={{ padding: "0.95rem 2.2rem", fontSize: "0.95rem" }}
                >
                  <span>{SITE_CONFIG.cta.primary}</span>
                  <ArrowUpRight size={17} />
                </NextLink>

                <NextLink
                  href="/solutions"
                  className="btn-secondary-light"
                  style={{ padding: "0.95rem 1.8rem", fontSize: "0.95rem" }}
                >
                  <span>{SITE_CONFIG.cta.secondarySolutions}</span>
                </NextLink>
              </div>
            </div>
          </div>
        </section>

        {/* Venue Technical Scope & Visual Showcase */}
        <section style={{ padding: "clamp(4.5rem, 8vw, 7rem) 0" }}>
          <div className="site-container-wide">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "4rem",
                alignItems: "center",
              }}
              className="venue-detail-grid"
            >
              {/* Left: What's included configurations */}
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-family-sans)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--accent-red)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                >
                  ENGINEERED HARDWARE &amp; ZONING
                </span>

                <h2
                  style={{
                    fontFamily: "var(--font-family-display)",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#FFFFFF",
                    marginBottom: "1.25rem",
                  }}
                >
                  What we configure
                </h2>

                <p style={{ color: "#A8A8A8", lineHeight: 1.65, marginBottom: "2rem", fontSize: "1rem" }}>
                  Hardware configurations planned and supplied for {space.label.toLowerCase()} across Delhi, NCR & Pan India. Every deployment is calibrated for room dimensions, ambient acoustic balance, and functional requirements.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "0.85rem",
                    marginBottom: "2.5rem",
                  }}
                >
                  {space.configurations.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "0.85rem 1rem",
                        borderRadius: "4px",
                      }}
                    >
                      <CheckCircle2 size={16} style={{ color: "var(--accent-red)", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.9rem", color: "#E0E0E0", fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    borderLeft: "2px solid var(--accent-red)",
                    paddingLeft: "1.25rem",
                    color: "#9E9E9E",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                  }}
                >
                  <strong>System Architecture:</strong> {space.systemScope}
                </div>
              </div>

              {/* Right: Venue Visual with Unique Descriptive Alt */}
              <div
                style={{
                  position: "relative",
                  height: "clamp(340px, 45vw, 500px)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <Image
                  src={space.image}
                  alt={space.imageAlt || `Commercial audio system installation and acoustics for ${space.label} in Delhi, NCR & Pan India`}
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Venue-Specific FAQs */}
        {space.faqs.length > 0 && (
          <section
            style={{
              padding: "clamp(4rem, 7vw, 6rem) 0",
              backgroundColor: "#141414",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div className="site-container">
              <div style={{ maxWidth: "780px", marginBottom: "3rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-family-sans)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--accent-red)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.75rem",
                  }}
                >
                  TECHNICAL QUESTIONS
                </span>

                <h2
                  style={{
                    fontFamily: "var(--font-family-display)",
                    fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  {space.label} FAQs
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {space.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "6px",
                      padding: "1.25rem 1.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <summary
                      style={{
                        fontFamily: "var(--font-family-sans)",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        userSelect: "none",
                      }}
                    >
                      <HelpCircle size={18} style={{ color: "var(--accent-red)", flexShrink: 0 }} />
                      <span>{faq.q}</span>
                    </summary>
                    <p style={{ marginTop: "1rem", color: "#CCCCCC", lineHeight: 1.65, fontSize: "0.95rem", paddingLeft: "2rem" }}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Venues Cross-Linking */}
        {relatedSpaces.length > 0 && (
          <section
            style={{
              padding: "clamp(4.5rem, 8vw, 6.5rem) 0",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div className="site-container-wide">
              <div style={{ marginBottom: "2.5rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-family-sans)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--accent-red)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  EXPLORE OTHER VENUES
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-family-display)",
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  Related Sound Systems
                </h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1.75rem",
                }}
              >
                {relatedSpaces.map((rel) => (
                  <NextLink
                    key={rel.slug}
                    href={`/solutions/${rel.slug}`}
                    style={{
                      display: "block",
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "6px",
                      overflow: "hidden",
                      textDecoration: "none",
                      transition: "border-color 0.2s ease, transform 0.2s ease",
                    }}
                  >
                    <div style={{ position: "relative", height: "190px" }}>
                      <Image
                        src={rel.image}
                        alt={rel.imageAlt || `${rel.label} audio setup in Delhi, NCR & Pan India`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ padding: "1.5rem" }}>
                      <h4
                        style={{
                          fontFamily: "var(--font-family-display)",
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          color: "#FFFFFF",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {rel.label}
                      </h4>
                      <p style={{ fontSize: "0.88rem", color: "#9E9E9E", lineHeight: 1.5, marginBottom: "1rem" }}>
                        {rel.tagline}
                      </p>
                      <span
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--accent-red)",
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        <span>View Solutions</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </NextLink>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final Venue Conversion CTA Section */}
        <section
          style={{
            padding: "clamp(5rem, 9vw, 7.5rem) 0",
            backgroundColor: "#0D0D0D",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            textAlign: "center",
          }}
        >
          <div className="site-container">
            <div style={{ maxWidth: "760px", margin: "0 auto" }}>
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
                DISCUSS YOUR {space.label.toUpperCase()}
              </span>

              <h2
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "clamp(2.1rem, 4.2vw, 3.4rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  marginBottom: "1.25rem",
                }}
              >
                Plan your {space.label.toLowerCase()} audio system.
              </h2>

              <p style={{ fontSize: "1.1rem", color: "#CCCCCC", lineHeight: 1.6, marginBottom: "2.5rem" }}>
                Tell us about your room dimensions and audio objectives. Our Chandni Chowk team will review your specifications and provide an honest configuration assessment.
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <NextLink
                  href={`/contact?space=${space.slug}`}
                  className="btn-primary"
                  style={{ padding: "1rem 2.2rem", fontSize: "1rem" }}
                >
                  <span>{SITE_CONFIG.cta.primary}</span>
                  <ArrowUpRight size={17} />
                </NextLink>

                <NextLink
                  href="/solutions"
                  className="btn-secondary-light"
                  style={{ padding: "1rem 2rem", fontSize: "1rem" }}
                >
                  <span>View Solutions</span>
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
