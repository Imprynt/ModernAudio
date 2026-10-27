"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      const lenisScroll = (window as unknown as { __lenis?: { scroll: number } }).__lenis?.scroll;
      const currentScroll =
        typeof lenisScroll === "number" && !isNaN(lenisScroll)
          ? lenisScroll
          : window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

      setIsVisible(currentScroll > 280);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafIdRef.current = requestAnimationFrame(updateVisibility);
      }
    };

    // Initial check
    updateVisibility();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return;

    // Use Lenis smooth scroller if active for premium deceleration
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: Record<string, unknown>) => void } }).__lenis;

    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, {
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      id="scroll-to-top-button"
      data-testid="scroll-to-top-button"
      type="button"
      onClick={handleScrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Scroll to top of page"
      title="Scroll to top"
      style={{
        position: "fixed",
        bottom: "calc(92px + env(safe-area-inset-bottom, 0px))",
        right: "24px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 40,
        cursor: "pointer",
        outline: "none",
        padding: 0,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transform: isVisible
          ? isHovered
            ? "translateY(-3px) scale(1.06)"
            : "translateY(0) scale(1)"
          : "translateY(16px) scale(0.9)",
        background: isHovered
          ? "linear-gradient(135deg, rgba(38, 38, 38, 0.96), rgba(18, 18, 18, 0.98))"
          : "linear-gradient(135deg, rgba(28, 28, 28, 0.88), rgba(14, 14, 14, 0.95))",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: isHovered
          ? "1px solid rgba(181, 18, 27, 0.75)"
          : "1px solid rgba(255, 255, 255, 0.14)",
        color: isHovered ? "#FFFFFF" : "#D4D4D8",
        boxShadow: isHovered
          ? "0 12px 28px rgba(0, 0, 0, 0.65), 0 0 20px rgba(181, 18, 27, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
          : "0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        transition:
          "opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, color 0.22s ease",
      }}
      className={`scroll-to-top-btn ${isVisible ? "visible" : ""}`}
    >
      <ArrowUp
        className="scroll-to-top-icon"
        size={20}
        strokeWidth={2.4}
        style={{
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </button>
  );
}
