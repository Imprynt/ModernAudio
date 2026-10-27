"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// High-fidelity acoustic waveform envelope (48 frequency & amplitude bins)
const WAVEFORM_BARS = [
  0.14, 0.22, 0.18, 0.32, 0.48, 0.38, 0.62, 0.78, 0.58, 0.42,
  0.68, 0.88, 0.72, 0.54, 0.38, 0.60, 0.82, 0.98, 0.80, 0.60,
  0.44, 0.68, 0.88, 0.72, 0.50, 0.64, 0.82, 0.94, 0.70, 0.48,
  0.58, 0.76, 0.66, 0.50, 0.76, 0.84, 0.62, 0.42, 0.52, 0.66,
  0.78, 0.56, 0.38, 0.46, 0.38, 0.30, 0.22, 0.15,
];

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const topBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomBarRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // Lock body scroll during preloader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const sweepProgress = { value: 0 };
    const totalBars = WAVEFORM_BARS.length;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Trigger Hero Section Entrance
          window.dispatchEvent(new CustomEvent("site:preloaderReveal"));

          if (prefersReducedMotion) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.35,
              onComplete: () => {
                document.body.style.overflow = originalOverflow;
                setIsVisible(false);
              },
            });
            return;
          }

          // 1. Acoustic Transient Pulse - Soundwave spikes surge in resonance
          const allBars = [
            ...topBarRefs.current.filter(Boolean),
            ...bottomBarRefs.current.filter(Boolean),
          ];

          gsap.to(allBars, {
            filter: "brightness(2) drop-shadow(0 0 14px #FFFFFF)",
            duration: 0.12,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          });

          if (isMobile) {
            // ─── MOBILE: Premium single-panel curtain lift ───
            // Clean upward sweep — the entire preloader lifts away as one piece
            // with a subtle scale to create depth. No split, no laser, no burst.
            const curtainTl = gsap.timeline({
              delay: 0.2,
              onStart: () => {
                if (containerRef.current) {
                  containerRef.current.style.pointerEvents = "none";
                }
              },
              onComplete: () => {
                document.body.style.overflow = originalOverflow;
                setIsVisible(false);
              },
            });

            curtainTl.to(containerRef.current, {
              yPercent: -100,
              duration: 0.9,
              ease: "power3.inOut",
            });
          } else {
            // ─── DESKTOP: Dramatic soundwave split reveal ───
            // Center seam laser flash and expanding acoustic burst
            if (seamRef.current) {
              gsap.fromTo(
                seamRef.current,
                { opacity: 0, scaleX: 0 },
                {
                  opacity: 1,
                  scaleX: 1,
                  duration: 0.28,
                  ease: "power3.out",
                  onComplete: () => {
                    gsap.to(seamRef.current, {
                      opacity: 0,
                      scaleY: 0,
                      duration: 0.45,
                      ease: "power2.in",
                    });
                  },
                }
              );
            }

            if (burstRef.current) {
              gsap.fromTo(
                burstRef.current,
                { opacity: 0, scaleY: 0.2, scaleX: 0.5 },
                {
                  opacity: 1,
                  scaleY: 15,
                  scaleX: 1.2,
                  duration: 0.45,
                  ease: "power2.out",
                  onComplete: () => {
                    gsap.to(burstRef.current, {
                      opacity: 0,
                      duration: 0.35,
                      ease: "power2.in",
                    });
                  },
                }
              );
            }

            // Physical Soundwave Split Reveal
            const splitTl = gsap.timeline({
              delay: 0.1,
              onStart: () => {
                if (containerRef.current) {
                  containerRef.current.style.pointerEvents = "none";
                }
              },
              onComplete: () => {
                document.body.style.overflow = originalOverflow;
                setIsVisible(false);
              },
            });

            splitTl
              .to(topPanelRef.current, {
                yPercent: -100,
                duration: 0.88,
                ease: "power4.inOut",
              })
              .to(
                bottomPanelRef.current,
                {
                  yPercent: 100,
                  duration: 0.88,
                  ease: "power4.inOut",
                },
                "<"
              );
          }
        },
      });

      // Animate Acoustic Waveform Lighting Up Sequentially from Left to Right
      tl.to(sweepProgress, {
        value: 1,
        duration: prefersReducedMotion ? 0.45 : 1.05,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentP = sweepProgress.value;
          const currentIdx = Math.floor(currentP * totalBars);

          for (let i = 0; i < totalBars; i++) {
            const topBar = topBarRefs.current[i];
            const btmBar = bottomBarRefs.current[i];
            if (!topBar || !btmBar) continue;

            if (i < currentIdx) {
              // Fully lit state
              topBar.style.backgroundImage =
                "linear-gradient(180deg, #FFFFFF 0%, #E53935 35%, #B5121B 100%)";
              topBar.style.boxShadow =
                "0 -2px 10px rgba(229, 57, 53, 0.8), 0 0 16px rgba(181, 18, 27, 0.4)";
              topBar.style.opacity = "1";

              btmBar.style.backgroundImage =
                "linear-gradient(180deg, #B5121B 0%, #E53935 65%, #FFFFFF 100%)";
              btmBar.style.boxShadow =
                "0 2px 10px rgba(229, 57, 53, 0.8), 0 0 16px rgba(181, 18, 27, 0.4)";
              btmBar.style.opacity = "1";
            } else if (i === currentIdx) {
              // Leading crest spark
              topBar.style.backgroundColor = "#FFFFFF";
              topBar.style.backgroundImage = "none";
              topBar.style.boxShadow = "0 0 16px #FFFFFF, 0 0 28px var(--accent-red)";
              topBar.style.opacity = "1";

              btmBar.style.backgroundColor = "#FFFFFF";
              btmBar.style.backgroundImage = "none";
              btmBar.style.boxShadow = "0 0 16px #FFFFFF, 0 0 28px var(--accent-red)";
              btmBar.style.opacity = "1";
            } else {
              // Dormant unlit state
              topBar.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
              topBar.style.backgroundImage = "none";
              topBar.style.boxShadow = "none";
              topBar.style.opacity = "0.25";

              btmBar.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
              btmBar.style.backgroundImage = "none";
              btmBar.style.boxShadow = "none";
              btmBar.style.opacity = "0.25";
            }
          }
        },
      });
    }, containerRef);

    // Failsafe watchdog to guarantee user is never locked out of scrolling
    const failsafeTimer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      window.dispatchEvent(new CustomEvent("site:preloaderReveal"));
      setIsVisible(false);
    }, 3200);

    return () => {
      clearTimeout(failsafeTimer);
      document.body.style.overflow = originalOverflow;
      ctx.revert();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      ref={containerRef}
      id="site-preloader"
      aria-label="Modern Audio Co. Audio Waveform Initializing"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric Ambient Glow behind waveform */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(680px, 92vw)",
          height: "min(340px, 50vh)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(181, 18, 27, 0.22) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Top Split Panel with Upper Half of the Acoustic Waveform */}
      <div
        ref={topPanelRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "calc(50% + 1px)",
          backgroundColor: "#080808",
          zIndex: 2,
          willChange: "transform",
          overflow: "hidden",
        }}
      >
        {/* Brand Header */}
        <header
          style={{
            position: "absolute",
            top: "clamp(2rem, 5vw, 3.5rem)",
            left: "clamp(2rem, 5vw, 3.5rem)",
            display: "flex",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-family-display)",
              fontWeight: 800,
              fontSize: "0.88rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#FFFFFF",
            }}
          >
            MODERN AUDIO CO.
          </span>
        </header>

        {/* Upper Waveform Half (Grows upward from the bottom baseline) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(640px, 92vw)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "clamp(2px, 0.4vw, 5px)",
            height: "55px",
          }}
        >
          {WAVEFORM_BARS.map((amp, idx) => {
            const h = Math.max(4, Math.round(amp * 50));
            return (
              <div
                key={`top-${idx}`}
                ref={(el) => {
                  topBarRefs.current[idx] = el;
                }}
                style={{
                  flex: "1 1 0px",
                  maxWidth: "6px",
                  height: `${h}px`,
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  opacity: 0.25,
                  transition: "opacity 0.08s ease",
                  willChange: "background-image, box-shadow, opacity",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Split Panel with Lower Half of the Acoustic Waveform */}
      <div
        ref={bottomPanelRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "calc(50% + 1px)",
          backgroundColor: "#080808",
          zIndex: 2,
          willChange: "transform",
          overflow: "hidden",
        }}
      >
        {/* Lower Waveform Half (Grows downward from the top baseline) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(640px, 92vw)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "clamp(2px, 0.4vw, 5px)",
            height: "55px",
          }}
        >
          {WAVEFORM_BARS.map((amp, idx) => {
            const h = Math.max(4, Math.round(amp * 50));
            return (
              <div
                key={`btm-${idx}`}
                ref={(el) => {
                  bottomBarRefs.current[idx] = el;
                }}
                style={{
                  flex: "1 1 0px",
                  maxWidth: "6px",
                  height: `${h}px`,
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  opacity: 0.25,
                  transition: "opacity 0.08s ease",
                  willChange: "background-image, box-shadow, opacity",
                }}
              />
            );
          })}
        </div>

        {/* Minimal Footer */}
        <footer
          style={{
            position: "absolute",
            bottom: "clamp(2rem, 5vw, 3.5rem)",
            left: "clamp(2rem, 5vw, 3.5rem)",
            right: "clamp(2rem, 5vw, 3.5rem)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: "0.72rem",
              fontWeight: 500,
              color: "#666666",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            COMMERCIAL &amp; INSTITUTIONAL AUDIO SYSTEMS
          </span>

          <span
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: "0.72rem",
              fontWeight: 500,
              color: "#666666",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            DELHI · NCR · PAN INDIA
          </span>
        </footer>
      </div>

      {/* Center Laser Beam along the split seam */}
      <div
        ref={seamRef}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(181, 18, 27, 0.4) 15%, #FFFFFF 50%, rgba(181, 18, 27, 0.4) 85%, transparent 100%)",
          boxShadow: "0 0 24px var(--accent-red), 0 0 40px #FFFFFF",
          transform: "translateY(-50%)",
          zIndex: 4,
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Anamorphic Central Acoustic Burst */}
      <div
        ref={burstRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(680px, 92vw)",
          height: "6px",
          background:
            "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.95) 0%, rgba(229, 57, 53, 0.6) 45%, transparent 75%)",
          zIndex: 3,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </aside>
  );
}
