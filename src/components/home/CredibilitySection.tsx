"use client";

import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "@/config/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CredibilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Smooth fold in-transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          colLeftRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          colRightRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      num: "01",
      title: "Commercial Audio Equipment Sourcing",
      tag: "OBJECTIVE SELECTION",
      description:
        "Direct access to leading professional audio manufacturers and commercial Audio distributors, Modern Audio ensures the right equipment for your room, rather than just pushing one brand.",
    },
    {
      num: "02",
      title: "Requirement Based On Setup Plan",
      tag: "CUSTOM SIZING",
      description:
        "We design systems around physical room layout, audience coverage, and operational workflow. Every quotation is planned after checking your venue dimensions and your purpose.",
    },
    {
      num: "03",
      title: "Transparent Quotations & Organised Setup",
      tag: "DELIBERATE HANDOVER",
      description:
        "Clear list of products with scheduled delivery, organised installations, and operational training as applicable to the requirement.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-warm relative overflow-hidden"
      style={{
        paddingTop: "clamp(6.5rem, 12vw, 10rem)",
        paddingBottom: "clamp(6.5rem, 12vw, 10rem)",
        backgroundColor: "var(--bg-warm, #F7F6F2)",
        color: "var(--text-primary, #1C1917)",
      }}
    >


      <div className="site-container-wide">
        {/* Section Header - Editorial unboxed layout */}
        <div ref={headerRef} style={{ maxWidth: "860px", marginBottom: "clamp(3.5rem, 6vw, 5rem)" }}>

          <h2
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(2.4rem, 4.8vw, 4.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary, #1C1917)",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
            }}
          >
            Built On Sound Principles.
          </h2>

          <p
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
              lineHeight: 1.6,
              color: "var(--text-secondary, #57534E)",
            }}
          >
            Modern Audio Co. operates with verified industry relationships, transparent equipment sourcing, and deep commitment to acoustic clarity.
          </p>
        </div>

        {/* Asymmetrical Editorial Credibility Composition */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column: Physical Anchor in Chandni Chowk, Delhi with In-Fold Radar Beacon */}
          <div
            ref={colLeftRef}
            style={{
              borderLeft: "2px solid var(--accent-red)",
              paddingLeft: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >

            <h3
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 800,
                color: "var(--text-primary, #1C1917)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "1.25rem",
              }}
            >
              Born in Chandni Chowk, Raised by India.
            </h3>

            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.65,
                color: "var(--text-secondary, #57534E)",
                marginBottom: "1.75rem",
              }}
            >
              Modern Audio Company Private Limited coordinates commercial audio equipment supply and sound system configurations from the verified distributor networks. We coordinate systems for commercial facilities, educational institutions, hospitality spaces, and religious halls across Delhi, NCR & Pan India.
            </p>

            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.12))",
                borderRadius: "4px",
                padding: "1.25rem 1.5rem",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "0.76rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "var(--accent-red)",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                Registered Facility
              </span>
              <p style={{ fontSize: "0.95rem", color: "var(--text-primary, #1C1917)", fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                {SITE_CONFIG.address.full}
              </p>
            </div>
          </div>

          {/* Right Column: 3 Truthful Evidence Rows with In-Fold Tech Tags */}
          <div ref={colRightRef} style={{ display: "flex", flexDirection: "column" }}>
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                style={{
                  borderTop: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.12))",
                  paddingTop: "2rem",
                  paddingBottom: "2rem",
                  transition: "background-color 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-family-sans)",
                      fontSize: "0.85rem",
                      color: "var(--accent-red)",
                      fontWeight: 700,
                    }}
                  >
                    {pillar.num}
                  </span>
                  <h4
                    style={{
                      fontFamily: "var(--font-family-display)",
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      color: "var(--text-primary, #1C1917)",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {pillar.title}
                  </h4>
                </div>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.65,
                    color: "var(--text-secondary, #57534E)",
                    paddingLeft: "1.85rem",
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
