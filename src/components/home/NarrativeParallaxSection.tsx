"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NarrativeParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const wavefrontRef = useRef<HTMLDivElement>(null);
  const headlineBlockRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const metric1Ref = useRef<HTMLDivElement>(null);
  const metric2Ref = useRef<HTMLDivElement>(null);
  const metric3Ref = useRef<HTMLDivElement>(null);
  const lineGuideRef = useRef<HTMLDivElement>(null);
  const [activeHoverIdx, setActiveHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // MOBILE (<= 768px): Silky smooth, jitter-free staggered vertical entrance
      mm.add("(max-width: 768px)", () => {
        // Subtle background drift without heavy GPU scale overhead
        if (bgImageRef.current) {
          gsap.fromTo(
            bgImageRef.current,
            { y: -30, scale: 1.02, force3D: true },
            {
              y: 30,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Headline entrance
        if (headlineBlockRef.current) {
          gsap.fromTo(
            headlineBlockRef.current,
            { opacity: 0, y: 30, force3D: true },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power2.out",
              scrollTrigger: {
                trigger: headlineBlockRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        // Three Pointers: Trigger on the cards container so animation fires when visible on mobile screen
        const metrics = [metric1Ref.current, metric2Ref.current, metric3Ref.current].filter(Boolean);
        if (metrics.length > 0 && cardsContainerRef.current) {
          gsap.fromTo(
            metrics,
            { opacity: 0, y: 32, force3D: true },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.14,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: "top 82%",
                once: true,
              },
            }
          );
        }

        // Architectural guide line
        if (lineGuideRef.current && cardsContainerRef.current) {
          gsap.fromTo(
            lineGuideRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top center",
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: "top 82%",
                once: true,
              },
            }
          );
        }
      });

      // DESKTOP (> 768px): Full desktop spatial choreography
      mm.add("(min-width: 769px)", () => {
        if (bgImageRef.current) {
          gsap.fromTo(
            bgImageRef.current,
            { y: -90, scale: 1.03, force3D: true },
            {
              y: 90,
              scale: 1.14,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (headlineBlockRef.current) {
          gsap.fromTo(
            headlineBlockRef.current,
            { opacity: 0, y: 50, force3D: true },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 68%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        const metrics = [metric1Ref.current, metric2Ref.current, metric3Ref.current].filter(Boolean);
        if (metrics.length > 0) {
          gsap.fromTo(
            metrics,
            { opacity: 0, x: 30, y: 20, force3D: true },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.75,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (lineGuideRef.current) {
          gsap.fromTo(
            lineGuideRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top center",
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 68%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const acousticSpecs = [
    {
      num: "01",
      title: "Venue layout and mounting architecture",
      body: "From lecture halls to worship sanctuaries, we match speaker formats (wall-mounted, flush ceiling, or floor-mounted) to room dimensions to ensure balanced coverage without visual clutter.",
      spec: "PLACEMENT: WALL / CEILING / FLOOR",
      badge: "SPATIAL ALIGNMENT",
    },
    {
      num: "02",
      title: "Active and passive system coordination",
      body: "Whether your setup benefits from self-powered active enclosures or centralized multi-channel distribution amplifiers with passive speaker networks, we match the right power architecture to the venue.",
      spec: "TOPOLOGY: ACTIVE & PASSIVE",
      badge: "POWER MATCHING",
    },
    {
      num: "03",
      title: "Source routing, zoning and feedback control",
      body: "From wireless handhelds, podium mics, and mixer delays/reverbs to processors with feedback destroyers and multi-zone routing, signal management keeps every voice clear and stable.",
      spec: "CONTROL: DIGITAL & ANALOG",
      badge: "SIGNAL STABILITY",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: "clamp(7rem, 14vw, 11rem)",
        paddingBottom: "clamp(7rem, 14vw, 11rem)",
        backgroundColor: "#0C0C0C",
        color: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Parallax Background Architectural Layer */}
      <div
        ref={bgImageRef}
        style={{
          position: "absolute",
          top: "-20%",
          left: 0,
          right: 0,
          bottom: "-20%",
          zIndex: 0,
        }}
      >
        <Image
          src="/images/venue-acoustic-planning.jpg"
          alt="Audio engineer conducting acoustic sound check and system calibration in an auditorium"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 38%",
            filter: "brightness(0.32) contrast(1.18)",
          }}
        />
        {/* Seamless cinematic atmospheric gradient vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, #080808 0%, rgba(12, 12, 12, 0.35) 20%, rgba(12, 12, 12, 0.65) 65%, #0B0B0B 100%)",
          }}
        />
        {/* Top edge seamless dissolve into Hero section */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "220px",
            background: "linear-gradient(to bottom, #080808 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Bottom edge seamless dissolve into Solutions section */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "220px",
            background: "linear-gradient(to bottom, transparent 0%, #0B0B0B 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Foreground Content */}
      <div className="site-container-wide relative z-10 w-full">
        <div
          className="narrative-parallax-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(2.5rem, 5vw, 6rem)",
            alignItems: "center",
          }}
        >
          {/* Main Editorial Statement */}
          <div ref={headlineBlockRef} style={{ maxWidth: "660px" }}>

            <h2
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "clamp(2.4rem, 4.8vw, 4.4rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: "1.75rem",
                color: "#FFFFFF",
              }}
            >
              Sound configured for the way your space operates.
            </h2>

            <p
              style={{
                fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                lineHeight: "1.6",
                color: "#D0D0D0",
                marginBottom: "2.25rem",
              }}
            >
              An auditorium, a school classroom, a hotel conference hall, and a prayer sanctuary do not share the same audio requirements. The right solution begins with understanding what the space needs to achieve.
            </p>

            <div
              style={{
                borderLeft: "2px solid var(--accent-red)",
                paddingLeft: "1.5rem",
                marginTop: "2rem",
              }}
            >
              <p style={{ fontSize: "1rem", color: "#A8A8A8", lineHeight: 1.65 }}>
                We plan around physical layout, speaker mounting constraints, active vs passive needs, and source routing before recommending hardware from our verified distributor network.
              </p>
            </div>
          </div>

          {/* Precision Architectural Acoustic Indices */}
          <div
            ref={cardsContainerRef}
            style={{
              position: "relative",
              maxWidth: "560px",
              marginLeft: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "2.25rem",
              padding: "1.75rem 1.5rem",
              borderRadius: "4px",
              background: "rgba(18, 18, 20, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >


            {/* Architectural Vertical Guide Line */}
            <div
              ref={lineGuideRef}
              style={{
                position: "absolute",
                top: "10px",
                bottom: "10px",
                left: "14px",
                width: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.18)",
                zIndex: 0,
              }}
            />

            {/* Indices */}
            {acousticSpecs.map((item, idx) => {
              const refs = [metric1Ref, metric2Ref, metric3Ref];
              const isHovered = activeHoverIdx === idx;

              return (
                <div
                  key={item.num}
                  ref={refs[idx]}
                  onMouseEnter={() => setActiveHoverIdx(idx)}
                  onMouseLeave={() => setActiveHoverIdx(null)}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "1rem 1rem 1rem 3rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: isHovered ? "rgba(255, 255, 255, 0.03)" : "transparent",
                    border: isHovered ? "1px solid rgba(181, 18, 27, 0.3)" : "1px solid transparent",
                    transition: "background-color 0.25s ease, border-color 0.25s ease",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Indicator Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "9px",
                      top: "1.25rem",
                      width: "11px",
                      height: "11px",
                      backgroundColor: idx === 0 || isHovered ? "var(--accent-red)" : "#FFFFFF",
                      borderRadius: "50%",
                      boxShadow: isHovered ? "0 0 12px var(--accent-red)" : "none",
                      transition: "all 0.25s ease",
                    }}
                  />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.4rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-family-sans)",
                        fontSize: "0.8rem",
                        letterSpacing: "0.1em",
                        color: isHovered ? "var(--accent-red)" : "#FFFFFF",
                        textTransform: "uppercase",
                        transition: "color 0.2s ease",
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.95rem", color: "#A8A8A8", lineHeight: 1.6, marginBottom: "0.6rem" }}>
                    {item.body}
                  </p>


                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
