"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessStorySection() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stages = SITE_CONFIG.processStages;
  const currentStage = stages[activeStageIdx];

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stageTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleStageSelect = (idx: number) => {
    setActiveStageIdx(idx);
    trackEvent("process_cta_click", { stage: stages[idx].title, step: stages[idx].step });

    const targetTab = stageTabRefs.current[idx];
    if (targetTab) {
      targetTab.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="section-warm relative overflow-hidden"
      style={{
        paddingTop: "clamp(6.5rem, 12vw, 10rem)",
        paddingBottom: "clamp(6.5rem, 12vw, 10rem)",
        backgroundColor: "var(--bg-warm, #F7F6F2)",
        color: "var(--text-primary, #1C1917)",
      }}
    >


      <div className="site-container-wide">
        {/* Header - Editorial unboxed layout */}
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
            From the first conversation to a perfect solution.
          </h2>

          <p
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
              lineHeight: 1.6,
              color: "var(--text-secondary, #57534E)",
            }}
          >
            We make it simple. Every project follows a simple five-stage steps, your space built around.
          </p>
        </div>

        {/* Process Stage Timeline Bar with Animated Progress Fill */}
        <div style={{ position: "relative", marginBottom: "3.5rem" }}>
          <div
            role="tablist"
            aria-label="Process Stages"
            className="stage-timeline-track no-scrollbar"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              borderBottom: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.12))",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {stages.map((st, idx) => {
              const isCurrent = idx === activeStageIdx;
              return (
                <button
                  key={st.step}
                  ref={(el) => {
                    stageTabRefs.current[idx] = el;
                  }}
                  role="tab"
                  aria-selected={isCurrent}
                  aria-controls={`stage-panel-${st.step}`}
                  id={`stage-tab-${st.step}`}
                  onClick={() => handleStageSelect(idx)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "1.25rem 0.5rem",
                    textAlign: "left",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.25s ease",
                    minWidth: "140px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-family-sans)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        color: isCurrent ? "var(--accent-red)" : "var(--text-muted, #A8A29E)",
                      }}
                    >
                      STAGE {st.step}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-family-display)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: isCurrent ? "var(--text-primary, #1C1917)" : "var(--text-muted, #78716C)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {st.title}
                    </span>
                  </div>
                  {/* Active Underline Indicator */}
                  {isCurrent && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-1px",
                        left: 0,
                        right: 0,
                        height: "2px",
                        backgroundColor: "var(--accent-red)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Editorial Composition */}
        <div
          id={`stage-panel-${currentStage.step}`}
          role="tabpanel"
          aria-labelledby={`stage-tab-${currentStage.step}`}
          className="stage-card-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "center",
          }}
        >
          {/* Stage Details */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "clamp(3rem, 5vw, 4.5rem)",
                  fontWeight: 800,
                  color: "var(--accent-red)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {currentStage.step}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "var(--text-muted, #78716C)",
                  textTransform: "uppercase",
                }}
              >
                {currentStage.title.toUpperCase()}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
                fontWeight: 800,
                color: "var(--text-primary, #1C1917)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "1.25rem",
              }}
            >
              {currentStage.tagline}
            </h3>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.65,
                color: "var(--text-secondary, #57534E)",
                marginBottom: "2rem",
              }}
            >
              {currentStage.summary}
            </p>

            {/* Scope Box */}
            <div
              style={{
                borderLeft: "2px solid var(--accent-red)",
                paddingLeft: "1.5rem",
                marginBottom: "2.5rem",
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--text-muted, #78716C)",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.6rem",
                }}
              >
                WHAT WE DELIVER  &amp; WHAT YOU WILL GET
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {currentStage.details.map((detail, dIdx) => (
                  <span
                    key={dIdx}
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-primary, #1C1917)",
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.12))",
                      padding: "0.3rem 0.7rem",
                      borderRadius: "3px",
                    }}
                  >
                    {detail}
                  </span>
                ))}
              </div>
            </div>

            <NextLink href="/contact" className="btn-primary">
              <span>{SITE_CONFIG.cta.primary}</span>
              <ArrowUpRight size={16} />
            </NextLink>
          </div>

          {/* Contextual Visual with Corner HUD */}
          <div
            className="cinematic-media-container"
            style={{
              position: "relative",
              height: "clamp(340px, 35vw, 460px)",
              overflow: "hidden",
              borderRadius: "6px",
              border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.12))",
              backgroundColor: "#E2DFD9",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Image
              key={currentStage.image}
              src={currentStage.image}
              alt={`Stage ${currentStage.step}: ${currentStage.title} process visualization`}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="cinematic-image-reveal"
              style={{
                objectFit: "cover",
                objectPosition: "center 45%",
                filter: "brightness(0.96) contrast(1.04)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
