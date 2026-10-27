"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mobileSpaceShortNames: Record<string, string> = {
  auditoriums: "Auditoriums",
  "schools-colleges": "Schools",
  hotels: "Hotels & Banquets",
  "nightclubs-lounges": "Nightclubs",
  "restaurants-cafes": "Restaurants",
  "places-of-worship": "Places of Worship",
  "boardrooms-offices": "Offices",
  "gyms-fitness": "Gyms",
  "salons-spas": "Salons",
  "retail-showrooms": "Retail",
  "outdoor-venues": "Open-Air",
  "recording-studios": "Studios",
  "home-theatres": "Home Theatres",
  "government-facilities": "Government",
  "convention-centers": "Conventions",
};

export default function SolutionsSelectorSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentPanelRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const tabsTrackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const spaces = SITE_CONFIG.spaces;
  const activeSpace = spaces[activeIdx];
  const scrollRafRef = useRef<number | null>(null);

  const updateScrollState = () => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      const el = tabsTrackRef.current;
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    });
  };

  useEffect(() => {
    updateScrollState();
    const el = tabsTrackRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });

    return () => {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

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

  const scrollTrack = (delta: number) => {
    if (tabsTrackRef.current) {
      tabsTrackRef.current.scrollBy({ left: delta, behavior: "smooth" });
    }
  };

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    trackEvent("solution_category_select", {
      categoryIndex: idx,
      categoryId: spaces[idx].id,
      categoryLabel: spaces[idx].label,
    });

    // Smoothly glide active desktop tab into center view
    const targetTab = tabRefs.current[idx];
    if (targetTab) {
      targetTab.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    // Smoothly glide active mobile tab into center view
    const targetMobileTab = mobileTabRefs.current[idx];
    if (targetMobileTab) {
      targetMobileTab.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    // Content panel smooth fade on desktop
    if (contentPanelRef.current) {
      gsap.fromTo(
        contentPanelRef.current,
        { opacity: 0.25, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    }

    // Mobile card smooth fade
    if (mobileCardRef.current) {
      gsap.fromTo(
        mobileCardRef.current,
        { opacity: 0.35, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  };

  const handlePrevVenue = () => {
    const nextIdx = activeIdx > 0 ? activeIdx - 1 : spaces.length - 1;
    handleSelect(nextIdx);
  };

  const handleNextVenue = () => {
    const nextIdx = activeIdx < spaces.length - 1 ? activeIdx + 1 : 0;
    handleSelect(nextIdx);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.35) {
      if (diffX < 0) {
        handleNextVenue();
      } else {
        handlePrevVenue();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="section-warm relative overflow-hidden"
      style={{
        paddingTop: "clamp(6.5rem, 12vw, 10rem)",
        paddingBottom: "clamp(6.5rem, 12vw, 10rem)",
        backgroundColor: "var(--bg-warm, #F7F6F2)",
        color: "var(--text-primary, #1C1917)",
      }}
    >


      <div className="site-container-wide">
        {/* Section Header */}
        <div ref={headerRef} style={{ maxWidth: "860px", marginBottom: "clamp(3rem, 5vw, 4rem)" }}>
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
            Sound that fits your space.
          </h2>

          <p
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
              lineHeight: 1.6,
              color: "var(--text-secondary, #57534E)",
            }}
          >
            Every institutional and commercial venue operates under distinct functional demands. Explore our audio system configurations across specialized venue environments.
          </p>
        </div>

        {/* Desktop View: Editorial Scene Selector with Interactive Spatial HUD */}
        <div className="solutions-desktop-view">
          {/* Category Navigation Bar - Clean Scroll-Free with Tactile Chevrons & Edge Fades */}
          <div style={{ position: "relative", marginBottom: "3.5rem" }}>
            {/* Left Edge Fade Mask */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "48px",
                pointerEvents: "none",
                background: "linear-gradient(to right, var(--bg-warm, #F7F6F2), transparent)",
                zIndex: 6,
                opacity: canScrollLeft ? 1 : 0,
                transition: "opacity 0.25s ease",
              }}
            />

            {/* Right Edge Fade Mask */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "48px",
                pointerEvents: "none",
                background: "linear-gradient(to left, var(--bg-warm, #F7F6F2), transparent)",
                zIndex: 6,
                opacity: canScrollRight ? 1 : 0,
                transition: "opacity 0.25s ease",
              }}
            />

            {/* Left Floating Chevron Button */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scrollTrack(-320)}
                aria-label="Scroll venue categories left"
                style={{
                  position: "absolute",
                  left: "-14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-pure, #FFFFFF)",
                  border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.1))",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-primary, #1C1917)",
                  transition: "all 0.2s ease",
                }}
              >
                <ChevronLeft size={18} />
              </button>
            )}

            {/* Right Floating Chevron Button */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollTrack(320)}
                aria-label="Scroll venue categories right"
                style={{
                  position: "absolute",
                  right: "-14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-pure, #FFFFFF)",
                  border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.1))",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-primary, #1C1917)",
                  transition: "all 0.2s ease",
                }}
              >
                <ChevronRight size={18} />
              </button>
            )}

            {/* Scrollable Tabs Track with Hidden Scrollbar */}
            <div
              ref={tabsTrackRef}
              role="tablist"
              aria-label="Venue Solution Categories"
              className="no-scrollbar"
              style={{
                display: "flex",
                borderBottom: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.12))",
                gap: "2.25rem",
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                paddingBottom: "0.25rem",
                scrollBehavior: "smooth",
              }}
            >
              {spaces.map((space, idx) => {
                const isCurrent = idx === activeIdx;
                return (
                  <button
                    key={space.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    role="tab"
                    aria-selected={isCurrent}
                    aria-controls={`panel-${space.id}`}
                    id={`tab-${space.id}`}
                    onClick={() => handleSelect(idx)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: "1.1rem 0",
                      fontFamily: "var(--font-family-display)",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      color: isCurrent ? "var(--text-primary, #1C1917)" : "var(--text-muted, #78716C)",
                      cursor: "pointer",
                      position: "relative",
                      transition: "color 0.25s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-family-sans)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: isCurrent ? "var(--accent-red)" : "var(--text-muted, #A8A29E)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {space.label}
                    </span>
                    {/* Active Indicator Underline */}
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

          {/* Active Category Display Panel */}
          <div
            ref={contentPanelRef}
            id={`panel-${activeSpace.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeSpace.id}`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.25fr",
              gap: "clamp(3rem, 6vw, 6rem)",
              alignItems: "center",
            }}
          >
            {/* Left: Editorial Details & What We Configure HUD */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--accent-red)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                VENUE {String(activeIdx + 1).padStart(2, "0")} / {String(spaces.length).padStart(2, "0")}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  color: "var(--text-primary, #1C1917)",
                  lineHeight: 1.1,
                  marginBottom: "1.25rem",
                }}
              >
                {activeSpace.label}
              </h3>

              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "var(--text-primary, #292524)",
                  lineHeight: 1.45,
                  marginBottom: "1rem",
                }}
              >
                {activeSpace.headline}
              </p>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text-secondary, #57534E)",
                  lineHeight: 1.65,
                  marginBottom: "2rem",
                }}
              >
                {activeSpace.description}
              </p>

              {/* Key Setups Tags */}
              <div style={{ marginBottom: "2rem" }}>
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-muted, #78716C)",
                    display: "block",
                    marginBottom: "0.85rem",
                  }}
                >
                  Key Configurations
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {activeSpace.confirmedSetups.map((setup, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontSize: "0.84rem",
                        color: "var(--text-primary, #1C1917)",
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                        border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.12))",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "4px",
                      }}
                    >
                      {setup}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <NextLink
                  href={activeSpace.href || `/solutions/${activeSpace.slug}`}
                  className="btn-primary"
                >
                  <span>{SITE_CONFIG.cta.secondarySolutions}</span>
                  <ArrowUpRight size={16} />
                </NextLink>
              </div>
            </div>

            {/* Right: Dominant Architectural Venue Photograph */}
            <div
              className="cinematic-media-container"
              style={{
                position: "relative",
                height: "640px",
                width: "100%",
                overflow: "hidden",
                borderRadius: "8px",
                border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.12))",
                backgroundColor: "#E2DFD9",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Image
                key={activeSpace.image}
                src={activeSpace.image}
                alt={activeSpace.imageAlt || `${activeSpace.label} commercial sound setup in Delhi, NCR & Pan India`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="cinematic-image-reveal"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 45%",
                  filter: "brightness(0.96) contrast(1.04)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, transparent 40%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile View: Specifically Designed Mobile Fold (Compact, Touch-First, No Long Scroll) */}
        <div className="solutions-mobile-view">
          {/* Mobile Category Chip Scroller Track */}
          <div
            ref={mobileTrackRef}
            role="tablist"
            aria-label="Mobile Venue Categories"
            className="no-scrollbar"
            style={{
              display: "flex",
              gap: "0.5rem",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingBottom: "0.75rem",
              marginBottom: "1rem",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {spaces.map((space, idx) => {
              const isCurrent = idx === activeIdx;
              const shortLabel = mobileSpaceShortNames[space.id] || space.label;
              return (
                <button
                  key={space.id}
                  ref={(el) => {
                    mobileTabRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => handleSelect(idx)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.55rem 0.9rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: isCurrent ? 700 : 500,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: isCurrent
                      ? "1px solid var(--accent-red)"
                      : "1px solid var(--border-subtle, rgba(0, 0, 0, 0.12))",
                    backgroundColor: isCurrent ? "var(--accent-red)" : "var(--bg-pure, #FFFFFF)",
                    color: isCurrent ? "#FFFFFF" : "var(--text-secondary, #57534E)",
                    boxShadow: isCurrent ? "0 4px 14px rgba(181, 18, 27, 0.25)" : "none",
                  }}
                >
                  <span>{shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Active Featured Space Spotlight Card */}
          <div
            ref={mobileCardRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              backgroundColor: "var(--bg-pure, #FFFFFF)",
              border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.12))",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              position: "relative",
            }}
          >
            {/* Cinematic Venue Photograph Frame */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "185px",
                overflow: "hidden",
                borderRadius: "6px",
                border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.1))",
                backgroundColor: "#E2DFD9",
                marginBottom: "1rem",
              }}
            >
              <Image
                key={activeSpace.image}
                src={activeSpace.image}
                alt={activeSpace.imageAlt || `${activeSpace.label} commercial sound setup in Delhi, NCR & Pan India`}
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 45%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, transparent 40%)",
                  pointerEvents: "none",
                }}
              />

            </div>

            <h3
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "1.35rem",
                fontWeight: 800,
                color: "var(--text-primary, #1C1917)",
                letterSpacing: "-0.015em",
                marginBottom: "0.35rem",
                lineHeight: 1.2,
              }}
            >
              {activeSpace.label}
            </h3>

            <p
              style={{
                color: "var(--text-primary, #292524)",
                fontWeight: 600,
                fontSize: "0.9rem",
                lineHeight: 1.45,
                marginBottom: "0.85rem",
              }}
            >
              {activeSpace.headline}
            </p>

            {/* Key Configurations Tags (Compact 3 chips) */}
            <div style={{ marginBottom: "1.25rem" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted, #78716C)",
                  display: "block",
                  marginBottom: "0.45rem",
                }}
              >
                Core Systems Installed
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {(activeSpace.confirmedSetups || activeSpace.configurations).slice(0, 3).map((setup, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      fontSize: "0.76rem",
                      color: "var(--text-primary, #1C1917)",
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.1))",
                      padding: "0.25rem 0.55rem",
                      borderRadius: "3px",
                    }}
                  >
                    {setup}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <NextLink
              href={activeSpace.href || `/solutions/${activeSpace.slug}`}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "0.82rem 1.25rem", fontSize: "0.88rem" }}
            >
              <span>{SITE_CONFIG.cta.secondarySolutions}</span>
              <ArrowUpRight size={15} />
            </NextLink>

            {/* Bottom Controls: Prev / Tap-Swipe / Next */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "1rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.08))",
              }}
            >
              <button
                type="button"
                onClick={handlePrevVenue}
                aria-label="Previous venue"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.15))",
                  backgroundColor: "var(--bg-pure, #FFFFFF)",
                  color: "var(--text-primary, #1C1917)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ChevronLeft size={17} />
              </button>

              <span style={{ fontSize: "0.72rem", color: "var(--text-muted, #78716C)", fontWeight: 500 }}>
                Swipe to browse ({String(activeIdx + 1).padStart(2, "0")} / {String(spaces.length).padStart(2, "0")})
              </span>

              <button
                type="button"
                onClick={handleNextVenue}
                aria-label="Next venue"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.15))",
                  backgroundColor: "var(--bg-pure, #FFFFFF)",
                  color: "var(--text-primary, #1C1917)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          {/* Clean Directory Link (Replaces bulky 14-grid dropdown to eliminate long scrolling) */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <NextLink
              href="/solutions"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                fontSize: "0.84rem",
                fontWeight: 600,
                color: "var(--accent-red)",
                textDecoration: "none",
                padding: "0.55rem 1.1rem",
                borderRadius: "20px",
                backgroundColor: "rgba(181, 18, 27, 0.06)",
                border: "1px solid rgba(181, 18, 27, 0.15)",
                transition: "all 0.2s ease",
              }}
            >
              <span>View all {spaces.length} venue specifications in Solutions Guide</span>
              <ArrowUpRight size={13} />
            </NextLink>
          </div>
        </div>

        {/* Fallback Notice for custom venues */}
        <p
          style={{
            marginTop: "2.5rem",
            fontSize: "0.88rem",
            color: "var(--text-muted, #78716C)",
            textAlign: "center",
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
            onClick={() => trackEvent("custom_venue_enquiry_click", { source: "home_fallback" })}
          >
            Tell us what you need &rarr;
          </NextLink>
        </p>
      </div>
    </section>
  );
}
