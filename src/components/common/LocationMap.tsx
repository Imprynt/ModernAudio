"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, MapPin, Clock, Navigation } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LocationMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
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
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (mapWrapperRef.current) {
        gsap.fromTo(
          mapWrapperRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15,
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

  // Use configured mapEmbedUrl or fallback to dynamically generated query embed
  const mapEmbedSrc =
    SITE_CONFIG.address.mapEmbedUrl && SITE_CONFIG.address.mapEmbedUrl.trim().length > 0
      ? SITE_CONFIG.address.mapEmbedUrl
      : `https://www.google.com/maps?q=${encodeURIComponent(
          "Modern Audio Company, " + SITE_CONFIG.address.full
        )}&output=embed`;

  const directionsUrl =
    SITE_CONFIG.address.directionsUrl ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      SITE_CONFIG.address.full
    )}`;

  const openingHours = SITE_CONFIG.unconfirmed?.openingHours;

  return (
    <section
      ref={sectionRef}
      id="location-map"
      className="section-dark relative overflow-hidden"
      style={{
        paddingTop: "clamp(5rem, 9vw, 8rem)",
        paddingBottom: "clamp(5rem, 9vw, 8rem)",
        backgroundColor: "#0B0B0B",
        color: "#FFFFFF",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="site-container-wide">
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            maxWidth: "780px",
            marginBottom: "clamp(2.5rem, 4.5vw, 3.5rem)",
          }}
        >
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
            OUR FACILITY
          </span>

          <h2
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(2.3rem, 4.5vw, 3.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Find us in Chandni Chowk.
          </h2>

          <p
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
              lineHeight: 1.6,
              color: "#A1A1AA",
            }}
          >
            Our base in the heart of Old Delhi&apos;s historic audio trade centre.
          </p>
        </div>

        {/* Map & Card Composite Container */}
        <div ref={mapWrapperRef} className="location-map-composite">
          {/* Map Frame */}
          <div
            className="location-map-frame"
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(320px, 42vw, 440px)",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backgroundColor: "#141416",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
            }}
          >
            <iframe
              src={mapEmbedSrc}
              title="Map showing Modern Audio Co. at Dewan Hall Road, Chandni Chowk, Delhi"
              width="100%"
              height="100%"
              className={`location-map-iframe ${isInteracting ? "is-active" : ""}`}
              style={{
                border: 0,
                width: "100%",
                height: "100%",
                display: "block",
                // Tuned dark theme filter blending into near-black while keeping roads, text & pin clear
                filter:
                  "invert(92%) hue-rotate(180deg) contrast(0.95) saturate(0.7) brightness(0.9)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen={false}
              aria-hidden="false"
            />

            {/* Faint subtle edge gradient blend */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: "inset 0 0 24px rgba(11, 11, 11, 0.6)",
                pointerEvents: "none",
              }}
            />

            {/* Mobile Touch Protection Overlay Hint */}
            <button
              type="button"
              className={`location-map-touch-overlay ${isInteracting ? "is-hidden" : ""}`}
              onClick={() => setIsInteracting(true)}
              aria-label="Enable map interaction"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(1px)",
                justifyContent: "center",
                cursor: "pointer",
                border: "none",
                zIndex: 5,
              }}
            >
              <span
                style={{
                  backgroundColor: "rgba(18, 18, 20, 0.92)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  padding: "0.6rem 1.1rem",
                  borderRadius: "20px",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <Navigation size={14} style={{ color: "var(--accent-red)" }} />
                Tap to interact with the map
              </span>
            </button>

            {/* Desktop Info Overlay Card (Positioned bottom-left over map) */}
            <div className="location-info-card-desktop">
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 20, 0.92)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  borderRadius: "6px",
                  padding: "1.5rem",
                  boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <MapPin
                    size={20}
                    style={{ color: "var(--accent-red)", flexShrink: 0, marginTop: "2px" }}
                  />
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-family-sans)",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        color: "var(--accent-red)",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "0.25rem",
                      }}
                    >
                      CHANDNI CHOWK FACILITY
                    </span>
                    <address
                      style={{
                        fontStyle: "normal",
                        fontSize: "0.92rem",
                        color: "#FFFFFF",
                        lineHeight: 1.55,
                        userSelect: "text",
                      }}
                    >
                      {SITE_CONFIG.address.full}
                    </address>

                    {/* Opening hours line only rendered if present in config */}
                    {openingHours && openingHours.trim().length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          marginTop: "0.6rem",
                          fontSize: "0.82rem",
                          color: "#A1A1AA",
                        }}
                      >
                        <Clock size={13} style={{ color: "var(--accent-red)", flexShrink: 0 }} />
                        <span>{openingHours}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-light"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "0.65rem 1.1rem",
                      fontSize: "0.86rem",
                    }}
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Info Card (Stacked beneath map to keep pin visible) */}
          <div className="location-info-card-mobile">
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "6px",
                padding: "1.35rem",
                marginTop: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <MapPin
                  size={18}
                  style={{ color: "var(--accent-red)", flexShrink: 0, marginTop: "2px" }}
                />
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-family-sans)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "var(--accent-red)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.25rem",
                    }}
                  >
                    CHANDNI CHOWK FACILITY
                  </span>
                  <address
                    style={{
                      fontStyle: "normal",
                      fontSize: "0.9rem",
                      color: "#FFFFFF",
                      lineHeight: 1.5,
                      userSelect: "text",
                    }}
                  >
                    {SITE_CONFIG.address.full}
                  </address>

                  {openingHours && openingHours.trim().length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        marginTop: "0.5rem",
                        fontSize: "0.8rem",
                        color: "#A1A1AA",
                      }}
                    >
                      <Clock size={13} style={{ color: "var(--accent-red)", flexShrink: 0 }} />
                      <span>{openingHours}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-light"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "0.65rem 1.1rem",
                    fontSize: "0.86rem",
                  }}
                >
                  <span>Get Directions</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
