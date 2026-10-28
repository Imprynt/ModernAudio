"use client";

import { useEffect, useRef } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyViewRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const fold1Ref = useRef<HTMLDivElement>(null);
  const fold2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Initial entrance animation on preloader reveal
    const runEntrance = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (bgImageRef.current) {
        tl.fromTo(
          bgImageRef.current,
          { scale: 1.1, opacity: 0.6 },
          { scale: 1.0, opacity: 1, duration: 1.4 }
        );
      }

      if (fold1Ref.current) {
        tl.fromTo(
          fold1Ref.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.1 },
          "-=1.1"
        );
      }
    };

    // Listen for preloader reveal or trigger immediately
    const onReveal = () => runEntrance();
    window.addEventListener("site:preloaderReveal", onReveal);

    // Fallback if preloader has already finished or is not mounted
    const fallbackTimer = setTimeout(() => {
      if (fold1Ref.current && gsap.getProperty(fold1Ref.current, "opacity") === 0) {
        runEntrance();
      }
    }, 1500);

    if (prefersReducedMotion || !containerRef.current) {
      return () => {
        window.removeEventListener("site:preloaderReveal", onReveal);
        clearTimeout(fallbackTimer);
      };
    }

    // 2. Buttery-Smooth Pinned Swipe & Blur Transition (Fold 01 -> Fold 02)
    const ctx = gsap.context(() => {
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (() => {
            let lastState: "fold1" | "fold2" | null = null;
            return (self: { progress: number }) => {
              if (fold1Ref.current && fold2Ref.current) {
                const isFold2 = self.progress > 0.35;
                const nextState = isFold2 ? "fold2" : "fold1";
                if (nextState !== lastState) {
                  lastState = nextState;
                  if (isFold2) {
                    fold1Ref.current.style.pointerEvents = "none";
                    fold1Ref.current.style.zIndex = "5";
                    fold2Ref.current.style.pointerEvents = "auto";
                    fold2Ref.current.style.zIndex = "10";
                  } else {
                    fold1Ref.current.style.pointerEvents = "auto";
                    fold1Ref.current.style.zIndex = "10";
                    fold2Ref.current.style.pointerEvents = "none";
                    fold2Ref.current.style.zIndex = "5";
                  }
                }
              }
            };
          })(),
        },
      });

      // Fold 01 fades, slides up, and blurs away seamlessly
      scrubTl
        .to(
          fold1Ref.current,
          {
            opacity: 0,
            yPercent: -22,
            filter: "blur(8px)",
            ease: "power2.inOut",
          },
          0
        )
        // Background image scales and dims subtly for the quote
        .to(
          bgImageRef.current,
          {
            scale: 1.14,
            filter: "brightness(0.32) contrast(1.15)",
            ease: "none",
          },
          0
        )
        // Fold 02 sweeps in with blur-clearing and scaling
        .fromTo(
          fold2Ref.current,
          {
            opacity: 0,
            yPercent: 28,
            scale: 0.94,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            yPercent: 0,
            scale: 1.0,
            filter: "blur(0px)",
            ease: "power2.out",
          },
          0.32
        );
    }, containerRef);

    return () => {
      window.removeEventListener("site:preloaderReveal", onReveal);
      clearTimeout(fallbackTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        height: "220vh",
        backgroundColor: "#080808",
      }}
    >
      {/* Sticky Viewport Window */}
      <div
        ref={stickyViewRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background Architectural Canvas */}
        <div
          ref={bgImageRef}
          style={{
            position: "absolute",
            inset: "-5%",
            zIndex: 0,
            willChange: "transform, filter",
            filter: "brightness(0.55) contrast(1.1)",
          }}
        >
          <Image
            src="/images/hero-auditorium.jpg"
            alt="Modern grand auditorium in Delhi, NCR & Pan India featuring professional suspended line array acoustic systems"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 46%",
            }}
          />
          {/* Deep cinematic vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at center, rgba(8, 8, 8, 0.35) 0%, rgba(8, 8, 8, 0.85) 75%, #080808 100%)",
            }}
          />
          {/* Seamless bottom dissolve into next section */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "240px",
              background: "linear-gradient(to bottom, transparent, #080808 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* FOLD 01: Core Brand Identity & Positioning */}
        <div
          ref={fold1Ref}
          className="site-container-wide"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "auto",
            paddingTop: "calc(var(--header-height) + 1.5rem)",
            paddingBottom: "4.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            willChange: "transform, opacity, filter",
          }}
        >
          <div style={{ maxWidth: "1020px", margin: "0 auto" }}>
            {/* Main Headline */}
            <h1
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "clamp(2.6rem, 6vw, 5.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.04,
                color: "#FFFFFF",
                textWrap: "balance",
                marginBottom: "1.75rem",
                textShadow: "0 6px 30px rgba(0, 0, 0, 0.8)",
              }}
            >
              {SITE_CONFIG.tagline}
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                lineHeight: 1.65,
                color: "#D4D4D4",
                maxWidth: "760px",
                margin: "0 auto 2.5rem auto",
                textShadow: "0 2px 14px rgba(0, 0, 0, 0.7)",
              }}
            >
              {SITE_CONFIG.description}
            </p>

            {/* Direct Actions */}
            <div
              className="hero-cta-group"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              <NextLink
                href="/contact"
                className="btn-primary"
                style={{ padding: "1rem 2.25rem", fontSize: "0.95rem" }}
                onClick={() => trackEvent("hero_cta_click", { destination: "discuss_requirement" })}
              >
                <span>{SITE_CONFIG.cta.label}</span>
                <ArrowUpRight size={18} />
              </NextLink>

              <NextLink
                href="/solutions"
                className="btn-secondary-light"
                style={{ padding: "1rem 2rem", fontSize: "0.95rem" }}
              >
                <span>{SITE_CONFIG.cta.secondarySolutions}</span>
              </NextLink>
            </div>
          </div>

          {/* Bottom Scroll Indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: 0,
              right: 0,
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#8E8E8E",
                fontSize: "0.74rem",
                fontFamily: "var(--font-family-sans)",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <span>Scroll to explore</span>
              <ArrowDown size={13} />
            </div>
          </div>
        </div>

        {/* FOLD 02: Strategic Brand Promise ("You bring the requirement. We handle the audio.") */}
        <div
          ref={fold2Ref}
          className="site-container"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            pointerEvents: "none",
            paddingTop: "calc(var(--header-height) + 1.5rem)",
            paddingBottom: "4.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            willChange: "transform, opacity, filter",
            opacity: 0,
          }}
        >
          <div style={{ maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
            {/* Monumental Quote Headline */}
            <h2
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "clamp(2.8rem, 6.2vw, 5.75rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                color: "#FFFFFF",
                marginBottom: "2rem",
                textWrap: "balance",
                textShadow: "0 8px 40px rgba(0, 0, 0, 0.95)",
              }}
            >
              &ldquo;{SITE_CONFIG.promise}&rdquo;
            </h2>

            {/* Supporting Strategic Narrative */}
            <p
              style={{
                fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)",
                lineHeight: 1.6,
                color: "#D8D8D8",
                maxWidth: "780px",
                margin: "0 auto 3rem auto",
                textShadow: "0 2px 14px rgba(0, 0, 0, 0.8)",
              }}
            >
              Before proposing equipment, we study your room size, venue, acoustics, and audience coverage. You bring the space, We bring the sound.
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              <NextLink
                href="/contact"
                className="btn-primary"
                style={{ padding: "0.95rem 2rem", fontSize: "0.92rem" }}
              >
                <span>{SITE_CONFIG.cta.primary}</span>
                <ArrowUpRight size={17} />
              </NextLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
