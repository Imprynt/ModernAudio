"use client";

import { useEffect, useRef } from "react";
import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RequirementFactorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Smooth fold in-transition
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered factor rows entrance
      if (rowsRef.current) {
        gsap.fromTo(
          rowsRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rowsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const factors = [
    {
      num: "01",
      title: "The Type of Venue",
      tag: "VENUE ARCHITECTURE",
      detail: "Whether an educational auditorium, classroom, shopping mall, hospital, metro station, sacred prayer hall, hotel, or restaurant. Each demands a distinct system configuration.",
    },
    {
      num: "02",
      title: "Digital vs Analog Setup",
      tag: "SIGNAL TOPOLOGY",
      detail: "Matching digital or analog power amplifiers, mixing consoles with echo/delay/reverb, and sound processors with feedback destroyers to your operational workflow.",
    },
    {
      num: "03",
      title: "Active vs Passive Systems",
      tag: "POWER DISTRIBUTION",
      detail: "Selecting between self-powered active loudspeaker arrays or external multi-channel power amplifiers driving passive wall, ceiling, or floor-mounted speakers.",
    },
    {
      num: "04",
      title: "Mounting & Placement Constraints",
      tag: "PHYSICAL PLACEMENT",
      detail: "Determining whether your space requires wall-mount brackets, flush ceiling-grid arrays, floor-standing units, or suspended curved line arrays.",
    },
    {
      num: "05",
      title: "Communication & Zoning Needs",
      tag: "ZONING & TALKBACK",
      detail: "Evaluating multi-zone volume routing, centralized campus broadcasting, staff talkback, or dedicated kitchen talkback sound systems.",
    },
    {
      num: "06",
      title: "Microphone & Cabling Setup",
      tag: "WIRING & CONNECTIVITY",
      detail: "Specifying handhelds, lapels, headsets, tabletop conference arrays, stage microphones, heavy-duty speaker wiring, snake cables, and HD connection links.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-dark relative overflow-hidden"
      style={{
        paddingTop: "clamp(6.5rem, 12vw, 10rem)",
        paddingBottom: "clamp(6.5rem, 12vw, 10rem)",
        backgroundColor: "#0F0F0F",
        color: "#FFFFFF",
      }}
    >

      <div className="site-container-wide">
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "flex-end",
            marginBottom: "clamp(4rem, 7vw, 5.5rem)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            paddingBottom: "3rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "clamp(2.4rem, 4.8vw, 4.4rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                lineHeight: 1.05,
              }}
            >
              The right system starts with the right questions.
            </h2>
          </div>

          <div>
            <p
              style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                lineHeight: 1.65,
                color: "#CCCCCC",
                marginBottom: "2rem",
              }}
            >
              You don&apos;t need any technical knowledge before searching out, We handle that. Tell us your space, your story and we will add sound .
            </p>
            <NextLink href="/contact" className="btn-primary">
              <span>{SITE_CONFIG.cta.primary}</span>
              <ArrowUpRight size={16} />
            </NextLink>
          </div>
        </div>

        {/* Editorial Factors Matrix with Satisfying In-Fold Hover & Tech Badges */}
        <div ref={rowsRef} style={{ display: "flex", flexDirection: "column" }}>
          {factors.map((item) => (
            <div
              key={item.num}
              className="factor-row"
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                cursor: "pointer",
              }}
            >
              <div className="factor-header-mobile">
                <span
                  style={{
                    fontFamily: "var(--font-family-sans)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--accent-red)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.num}
                </span>

                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-family-display)",
                      fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      color: "#FFFFFF",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>

              <p
                style={{
                  fontSize: "1.025rem",
                  lineHeight: 1.65,
                  color: "#B0B0B0",
                }}
              >
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
