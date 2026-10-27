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

const mobileCategoryShortNames: Record<string, string> = {
  amplifiers: "Amplifiers",
  speakers: "Speakers",
  microphones: "Microphones",
  "sound-mixers": "Mixers",
  "sound-processors": "DSP",
  "portable-systems": "Portable PA",
  "line-array-live": "Line Arrays",
  "kitchen-talkback": "Talkback",
  "cabling-connections": "Cables",
};

export default function EquipmentPortfolioSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const desktopDisplayRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const desktopTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const equipmentList = SITE_CONFIG.equipmentTaxonomy;
  const current = equipmentList[selectedIdx];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    trackEvent("equipment_tab_select", {
      equipmentId: equipmentList[idx].id,
      equipmentName: equipmentList[idx].name,
    });

    const targetDesktopTab = desktopTabRefs.current[idx];
    if (targetDesktopTab) {
      targetDesktopTab.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    const targetMobileTab = mobileTabRefs.current[idx];
    if (targetMobileTab) {
      targetMobileTab.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    if (desktopDisplayRef.current) {
      gsap.fromTo(
        desktopDisplayRef.current,
        { opacity: 0.35, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }

    if (mobileCardRef.current) {
      gsap.fromTo(
        mobileCardRef.current,
        { opacity: 0.35, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  const handlePrevEquip = () => {
    const nextIdx = selectedIdx > 0 ? selectedIdx - 1 : equipmentList.length - 1;
    handleSelect(nextIdx);
  };

  const handleNextEquip = () => {
    const nextIdx = selectedIdx < equipmentList.length - 1 ? selectedIdx + 1 : 0;
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
        handleNextEquip();
      } else {
        handlePrevEquip();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="equipment"
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(4.5rem, 9vw, 9rem)",
        paddingBottom: "clamp(4.5rem, 9vw, 9rem)",
        backgroundColor: "#101012",
        color: "#FFFFFF",
        scrollMarginTop: "80px",
      }}
    >
      <div className="site-container-wide">
        {/* Section Header */}
        <div ref={headerRef} style={{ maxWidth: "860px", marginBottom: "clamp(2.5rem, 5vw, 4.5rem)" }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-family-sans)",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "var(--accent-red)",
              textTransform: "uppercase",
              marginBottom: "0.65rem",
            }}
          >
            HARDWARE INVENTORY • 09 CATEGORIES
          </span>
          <h2
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
            }}
          >
            Equipment we supply.
          </h2>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.7vw, 1.3rem)",
              lineHeight: 1.6,
              color: "#CCCCCC",
            }}
          >
            Digital and analog audio hardware configurations supplied and planned for institutional campuses, commercial facilities, and live sound environments across Delhi, NCR & Pan India.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP VIEW (Screens > 860px): 2-Column Interactive Spatial Browser
            ========================================================================= */}
        <div
          className="equipment-desktop-view"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 340px) 1fr",
            gap: "clamp(2rem, 4vw, 4.5rem)",
            alignItems: "flex-start",
          }}
        >
          {/* Category List Navigation */}
          <nav
            aria-label="Equipment categories"
            className="equipment-nav-track no-scrollbar"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              borderRight: "1px solid rgba(255, 255, 255, 0.08)",
              paddingRight: "1.5rem",
            }}
          >
            {equipmentList.map((item, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    desktopTabRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  aria-selected={isSelected}
                  role="tab"
                  className="equipment-nav-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.95rem 1.15rem",
                    backgroundColor: isSelected ? "rgba(181, 18, 27, 0.12)" : "transparent",
                    border: isSelected ? "1px solid rgba(181, 18, 27, 0.35)" : "1px solid transparent",
                    borderLeft: isSelected ? "3px solid var(--accent-red)" : "3px solid transparent",
                    borderRadius: "4px",
                    color: isSelected ? "#FFFFFF" : "#A6A6A6",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.22s ease",
                    outline: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-family-display)",
                      fontSize: "1.05rem",
                      fontWeight: isSelected ? 700 : 500,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-family-sans)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: isSelected ? "var(--accent-red)" : "#9E9E9E",
                      textTransform: "uppercase",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Active Equipment Display Card */}
          <div
            ref={desktopDisplayRef}
            className="equipment-display-card"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.15fr",
              gap: "2.5rem",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "6px",
              padding: "clamp(1.75rem, 3.5vw, 2.75rem)",
            }}
          >
            {/* Visual Image */}
            <div
              className="cinematic-media-container"
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(260px, 32vw, 360px)",
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "#080808",
              }}
            >
              <Image
                key={current.image}
                src={current.image}
                alt={current.imageAlt || `${current.name} commercial audio equipment`}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className="cinematic-image-reveal"
                style={{
                  objectFit: "cover",
                  filter: "brightness(0.92) contrast(1.05)",
                }}
              />
            </div>

            {/* Information */}
            <div>
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.74rem",
                  letterSpacing: "0.12em",
                  color: "var(--accent-red)",
                  textTransform: "uppercase",
                  marginBottom: "0.85rem",
                  fontWeight: 700,
                }}
              >
                {current.scope}
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "clamp(1.8rem, 2.6vw, 2.3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  marginBottom: "1rem",
                }}
              >
                {current.name}
              </h3>

              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  color: "#CCCCCC",
                  marginBottom: "1.75rem",
                }}
              >
                {current.description}
              </p>

              {/* Stated Configurations */}
              <div style={{ marginBottom: "2rem" }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-family-sans)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "#888888",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  What&apos;s included
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {current.characteristics.map((char) => (
                    <span
                      key={char}
                      style={{
                        fontSize: "0.82rem",
                        color: "#E0E0E0",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "3px",
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Enquiry Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <NextLink
                  href={`/contact?equipment=${current.id}`}
                  className="btn-primary"
                  style={{ padding: "0.85rem 1.6rem", fontSize: "0.88rem" }}
                  onClick={() => trackEvent("hero_cta_click", { source: `equipment_${current.id}` })}
                >
                  <span>{SITE_CONFIG.cta.primary}</span>
                  <ArrowUpRight size={15} />
                </NextLink>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE VIEW (Screens <= 860px): Native Mobile-Optimized Equipment Fold
            (Self-contained, touch-swipeable, thumb-friendly pill selector)
            ========================================================================= */}
        <div className="equipment-mobile-view">
          {/* Mobile Horizontal Pill Selector Track */}
          <div
            role="tablist"
            aria-label="Mobile Equipment Categories"
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
            {equipmentList.map((item, idx) => {
              const isSelected = idx === selectedIdx;
              const shortLabel = mobileCategoryShortNames[item.id] || item.name;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    mobileTabRefs.current[idx] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(idx)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.55rem 0.9rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: isSelected ? 700 : 500,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: isSelected
                      ? "1px solid var(--accent-red)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    backgroundColor: isSelected ? "var(--accent-red)" : "rgba(255, 255, 255, 0.05)",
                    color: isSelected ? "#FFFFFF" : "#CCCCCC",
                    boxShadow: isSelected ? "0 4px 14px rgba(181, 18, 27, 0.3)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-family-sans)",
                      fontSize: "0.68rem",
                      opacity: isSelected ? 0.9 : 0.6,
                      fontWeight: 700,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Dedicated Spotlight Card */}
          <div
            ref={mobileCardRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              backgroundColor: "#161618",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
              position: "relative",
            }}
          >
            {/* Visual Header Image Container */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "200px",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                backgroundColor: "#0A0A0A",
                marginBottom: "1rem",
              }}
            >
              <Image
                key={current.image}
                src={current.image}
                alt={current.imageAlt || `${current.name} commercial audio equipment`}
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  filter: "brightness(0.92) contrast(1.05)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(16, 16, 18, 0.8) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />
              {/* Category Counter Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(6px)",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "4px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--accent-red)",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                CAT {String(selectedIdx + 1).padStart(2, "0")} / {String(equipmentList.length).padStart(2, "0")}
              </div>

              {/* Scope Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(6px)",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "4px",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: "#D4D4D8",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {current.scope}
              </div>
            </div>

            {/* Title & Scope */}
            <h3
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "1.35rem",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.015em",
                marginBottom: "0.45rem",
                lineHeight: 1.2,
              }}
            >
              {current.name}
            </h3>

            <p
              style={{
                fontSize: "0.88rem",
                lineHeight: 1.55,
                color: "#CCCCCC",
                marginBottom: "1rem",
              }}
            >
              {current.description}
            </p>

            {/* What's included (compact 3 chips) */}
            <div style={{ marginBottom: "1.25rem" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "#8E8E8E",
                  textTransform: "uppercase",
                  marginBottom: "0.45rem",
                }}
              >
                Key Components Included
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {current.characteristics.slice(0, 3).map((char) => (
                  <span
                    key={char}
                    style={{
                      fontSize: "0.78rem",
                      color: "#E0E0E0",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "3px",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <NextLink
              href={`/contact?equipment=${current.id}`}
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "0.85rem 1.25rem",
                fontSize: "0.88rem",
              }}
              onClick={() => trackEvent("hero_cta_click", { source: `equipment_mobile_${current.id}` })}
            >
              <span>Enquire Equipment Setup</span>
              <ArrowUpRight size={15} />
            </NextLink>

            {/* Bottom Controls: Prev / Dots / Next */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "1rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <button
                type="button"
                onClick={handlePrevEquip}
                aria-label="Previous equipment category"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ChevronLeft size={17} />
              </button>

              {/* Pagination Dots */}
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                {equipmentList.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => handleSelect(dotIdx)}
                    aria-label={`Go to category ${dotIdx + 1}`}
                    style={{
                      height: "6px",
                      width: dotIdx === selectedIdx ? "18px" : "6px",
                      borderRadius: "3px",
                      backgroundColor: dotIdx === selectedIdx ? "var(--accent-red)" : "rgba(255, 255, 255, 0.2)",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "all 0.22s ease",
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextEquip}
                aria-label="Next equipment category"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  color: "#FFFFFF",
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
        </div>
      </div>
    </section>
  );
}
