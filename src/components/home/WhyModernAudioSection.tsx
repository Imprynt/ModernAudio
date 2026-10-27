"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CoreValue {
  title: string;
  description: string;
}

const VALUES: CoreValue[] = [
  {
    title: "High-Fidelity Sound",
    description:
      "Acoustically balanced hardware engineered for speech intelligibility and dynamic music reproduction.",
  },
  {
    title: "Expert Setup Team",
    description:
      "Experienced technicians coordinating speaker mounting, cable routing, gain staging, and signal tuning.",
  },
  {
    title: "Transparent Pricing",
    description:
      "Itemized commercial quotations with clear component specifications and no hidden charges.",
  },
  {
    title: "Trusted Audio Partners",
    description:
      "Direct access to established professional audio manufacturers and commercial AV distributors.",
  },
  {
    title: "Tailored Solutions",
    description:
      "System planning matched to your room dimensions, venue architecture, and functional use cases.",
  },
  {
    title: "On-Time Delivery & Setup",
    description:
      "Structured project timelines coordinated around your facility schedule and handover deadlines.",
  },
  {
    title: "After-Sales Support",
    description:
      "Operational walkthroughs, operator orientation, and dependable technical support after setup.",
  },
];

export default function WhyModernAudioSection() {
  const { dealerLogos, projectGallery, testimonials } = SITE_CONFIG.unconfirmed;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-modern-audio"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#141414",
        paddingTop: "clamp(6.5rem, 11vw, 9rem)",
        paddingBottom: "clamp(6.5rem, 11vw, 9rem)",
      }}
    >
      <div className="site-container">
        {/* Section Header - Left aligned, clean, architectural */}
        <div ref={headerRef} style={{ maxWidth: "780px", marginBottom: "4rem" }}>
          <span
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "var(--accent-red)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.85rem",
            }}
          >
            OUR COMMITMENT
          </span>

          <h2
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Why Modern Audio
          </h2>

          <p
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
              lineHeight: 1.6,
              color: "#CCCCCC",
            }}
          >
            Serving commercial, institutional, and hospitality clients across Delhi, NCR & Pan India with honest guidance and professional audio integration.
          </p>
        </div>

        {/* 7 Core Values Grid - Left-aligned, clean, uncluttered */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem 3rem",
            marginBottom: "4.5rem",
          }}
        >
          {VALUES.map((val, idx) => (
            <div
              key={val.title}
              style={{
                borderLeft: "2px solid rgba(255, 255, 255, 0.15)",
                paddingLeft: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--accent-red)",
                  letterSpacing: "0.1em",
                }}
              >
                0{idx + 1}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                }}
              >
                {val.title}
              </h3>

              <p
                style={{
                  fontSize: "0.92rem",
                  color: "#A0A0A0",
                  lineHeight: 1.6,
                }}
              >
                {val.description}
              </p>
            </div>
          ))}
        </div>

        {/* Data-Driven Block 1: Partner / Dealer Logos (Render ONLY if provided) */}
        {dealerLogos && dealerLogos.length > 0 && (
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "3rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#888888",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              Authorized Brands &amp; Commercial Distribution Partners
            </h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2.5rem",
                alignItems: "center",
              }}
            >
              {dealerLogos.map((dl) => (
                <div key={dl.name} style={{ opacity: 0.8 }}>
                  <Image
                    src={dl.logoUrl}
                    alt={dl.name}
                    width={140}
                    height={48}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data-Driven Block 2: Project Gallery with Venue Names (Render ONLY if provided) */}
        {projectGallery && projectGallery.length > 0 && (
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "3rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#888888",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              Completed Installations
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {projectGallery.map((proj) => (
                <div
                  key={proj.title}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "relative", height: "200px" }}>
                    <Image
                      src={proj.imageUrl}
                      alt={`${proj.title} - ${proj.venueType} in ${proj.location}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--accent-red)", fontWeight: 600 }}>
                      {proj.venueType} · {proj.location}
                    </span>
                    <h5 style={{ fontSize: "1rem", color: "#FFFFFF", marginTop: "0.35rem" }}>{proj.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data-Driven Block 3: Verifiable Client Testimonials (Render ONLY if provided) */}
        {testimonials && testimonials.length > 0 && (
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "3rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#888888",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              Client Feedback
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "6px",
                    padding: "1.75rem",
                  }}
                >
                  <p style={{ fontSize: "0.95rem", color: "#D0D0D0", lineHeight: 1.6, fontStyle: "italic", marginBottom: "1.25rem" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <span style={{ fontWeight: 600, color: "#FFFFFF", fontSize: "0.9rem", display: "block" }}>{t.clientName}</span>
                    <span style={{ fontSize: "0.78rem", color: "#888888" }}>{t.venue} · {t.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visual Representation Notice (Rendered while placeholder imagery is in use) */}
        {(!projectGallery || projectGallery.length === 0) && (
          <div
            style={{
              marginTop: "3rem",
              padding: "1rem 1.25rem",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "4px",
            }}
          >
            <p
              style={{
                fontSize: "0.8rem",
                color: "#888888",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              <strong style={{ color: "#AAAAAA" }}>Visual Representation Notice:</strong> Architectural venue photography represents art-directed conceptual representations of commercial environments. Equipment supply and physical installations are engineered around each venue&apos;s verified room dimensions.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
