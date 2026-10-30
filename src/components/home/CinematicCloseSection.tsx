"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicCloseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Background parallax scale
      gsap.fromTo(
        bgImgRef.current,
        { scale: 1.05, y: -40 },
        {
          scale: 1.15,
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // In-transition for content
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        paddingTop: "clamp(7rem, 14vw, 12rem)",
        paddingBottom: "clamp(7rem, 14vw, 12rem)",
        backgroundColor: "#0D0D0D",
        color: "#FFFFFF",
        position: "relative",
      }}
    >

      {/* Background Architectural Atmosphere */}
      <div
        ref={bgImgRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/images/event-public-space.jpg"
          alt="Expansive multipurpose civic auditorium with acoustic suspended elements"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 50%",
            filter: "brightness(0.32) contrast(1.15)",
          }}
        />
        {/* Soft radial overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(13, 13, 13, 0.4) 0%, rgba(13, 13, 13, 0.95) 90%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, #111111 0%, transparent 20%, transparent 80%, #0D0D0D 100%)",
          }}
        />
      </div>

      {/* Foreground Composition with Smooth Entrance */}
      <div className="site-container relative z-10 text-center" style={{ textAlign: "center" }}>
        <div ref={contentRef} style={{ maxWidth: "880px", marginLeft: "auto", marginRight: "auto" }}>

          <h2
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#FFFFFF",
              marginBottom: "1.75rem",
              textWrap: "balance",
            }}
          >
            Your Space Has a Purpose. Let&apos;s Get The Sound Right.
          </h2>

          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              lineHeight: 1.6,
              color: "#D5D5D5",
              maxWidth: "680px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "2.75rem",
            }}
          >
            Tell us what you are planning. We&apos;ll start with understanding the requirement.
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
              style={{
                padding: "1rem 2.2rem",
                fontSize: "1rem",
              }}
              onClick={() => trackEvent("cta_click", { source: "cinematic_close" })}
            >
              <span>{SITE_CONFIG.cta.primary}</span>
              <ArrowUpRight size={17} />
            </NextLink>

            <NextLink
              href="/solutions"
              className="btn-secondary-light"
              style={{
                padding: "1rem 1.8rem",
                fontSize: "1rem",
              }}
            >
              <span>{SITE_CONFIG.cta.secondarySolutions}</span>
            </NextLink>
          </div>

          <div
            style={{
              marginTop: "3.5rem",
              fontFamily: "var(--font-family-sans)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#888888",
              textTransform: "uppercase",
            }}
          >
            Born in Chandni Chowk , Raised in India
          </div>
        </div>
      </div>
    </section>
  );
}
