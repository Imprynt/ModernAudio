"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHoveredState, setIsHoveredState] = useState(false);
  const [contextLabel, setContextLabel] = useState<string>("SELECT");

  const pointerDotRef = useRef<HTMLDivElement>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  // Bar elements for dynamic height animation without re-renders
  const bar0 = useRef<HTMLSpanElement>(null);
  const bar1 = useRef<HTMLSpanElement>(null);
  const bar2 = useRef<HTMLSpanElement>(null);
  const bar3 = useRef<HTMLSpanElement>(null);
  const bar4 = useRef<HTMLSpanElement>(null);

  // Coordinates
  const mousePos = useRef({ x: -200, y: -200 });
  const dotPos = useRef({ x: -200, y: -200 });
  const vizPos = useRef({ x: -200, y: -200 });

  // Dynamics & velocity
  const prevMouse = useRef({ x: -200, y: -200 });
  const velocity = useRef(0);
  const smoothedVelocity = useRef(0);
  const isHovered = useRef(false);
  const isMouseDown = useRef(false);
  const animTime = useRef(0);
  const rafId = useRef<number | null>(null);
  const activeInteractiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse / trackpad)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const determineContext = (el: HTMLElement): string => {
      // 1. Explicit data-cursor override on element or any ancestor
      const customCursor = el.getAttribute("data-cursor") || el.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (customCursor) return customCursor.toUpperCase().trim();

      const tagName = el.tagName.toLowerCase();
      const role = (el.getAttribute("role") || "").toLowerCase();
      const href = (el.getAttribute("href") || "").trim();
      const ariaLabel = (el.getAttribute("aria-label") || "").toLowerCase();
      const className = (typeof el.className === "string" ? el.className : "").toLowerCase();
      const innerText = (el.innerText || "").trim().toLowerCase();
      const title = (el.getAttribute("title") || "").toLowerCase();
      const fullText = `${innerText} ${ariaLabel} ${title}`;

      // 2. Form Inputs & Controls
      if (tagName === "textarea") return "TYPE";
      if (tagName === "input") {
        const inputType = ((el as HTMLInputElement).type || "text").toLowerCase();
        if (inputType === "submit" || inputType === "button") return "SUBMIT";
        if (inputType === "checkbox" || inputType === "radio") return "SELECT";
        return "TYPE";
      }
      if (tagName === "select") return "CHOOSE";
      if (
        el.getAttribute("type") === "submit" ||
        el.id === "enquiry-submit-btn" ||
        fullText.includes("submitting") ||
        fullText.includes("submit requirement") ||
        fullText.includes("send message")
      ) {
        return "SUBMIT";
      }

      // 3. Floating Utilities & Direct Communication Channels
      if (href.includes("wa.me") || href.includes("whatsapp") || className.includes("floating-wa-btn") || fullText.includes("whatsapp")) {
        return "WHATSAPP";
      }
      if (el.id === "scroll-to-top-button" || className.includes("scroll-to-top") || fullText.includes("scroll to top") || fullText.includes("back to top")) {
        return "TOP";
      }
      if (href.startsWith("tel:") || fullText.includes("call us") || fullText.includes("call now")) {
        return "CALL";
      }
      if (href.startsWith("mailto:") || fullText.includes("email us")) {
        return "EMAIL";
      }
      if (href.includes("maps.google") || href.includes("google.com/maps") || fullText.includes("get directions") || fullText.includes("view on map")) {
        return "DIRECTIONS";
      }

      // 4. Navigation: Brand Home Logo
      if (href === "/" || (href === "" && (fullText.includes("modern audio co") || className.includes("logo")))) {
        return "HOME";
      }

      // 5. Mobile Hamburger Menu Toggle
      if (className.includes("mobile-toggle-btn") || ariaLabel.includes("navigation menu") || ariaLabel.includes("menu")) {
        const isExpanded = el.getAttribute("aria-expanded") === "true";
        return isExpanded ? "CLOSE" : "MENU";
      }

      // 6. FAQ Accordion Triggers (Expand / Collapse)
      if (
        className.includes("faq-trigger") ||
        tagName === "summary" ||
        ariaLabel.includes("faq") ||
        (el.hasAttribute("aria-controls") && (el.getAttribute("aria-controls") || "").startsWith("faq-"))
      ) {
        const isExpanded = el.getAttribute("aria-expanded") === "true";
        return isExpanded ? "COLLAPSE" : "EXPAND";
      }

      // 7. Sliders / Carousel / Pagination Chevrons
      if (ariaLabel.includes("scroll venue categories left") || ariaLabel.includes("prev") || ariaLabel.includes("previous") || className.includes("prev") || innerText === "←") {
        return "PREV";
      }
      if (ariaLabel.includes("scroll venue categories right") || ariaLabel.includes("next") || className.includes("next") || innerText === "→") {
        return "NEXT";
      }

      // 8. In-Page Section Anchor Navigation
      if (href.includes("#equipment") || href === "#equipment") return "EQUIPMENT";
      if (href.includes("#how-it-works") || href.includes("#process") || href === "#process") return "PROCESS";
      if (href.includes("#approach") || href === "#approach") return "APPROACH";
      if (href.includes("#faq") || href === "#faq") return "FAQ";

      // 9. Equipment Portfolio Tabs & Interactive Cards
      if (className.includes("equipment-nav-btn") || (role === "tab" && el.closest("#equipment, .equipment-section"))) {
        return "INSPECT";
      }

      // 10. Primary Consultation & Enquiry CTAs
      if (
        href.includes("/contact") ||
        fullText.includes("discuss your requirement") ||
        fullText.includes("schedule consultation") ||
        fullText.includes("get in touch") ||
        fullText.includes("start your project") ||
        fullText.includes("project enquiry") ||
        fullText.includes("enquire")
      ) {
        return "CONNECT";
      }

      // 11. Solutions & Venues (Pages, Cards, Tabs)
      if (href.startsWith("/solutions/") || href === "/solutions" || fullText.includes("all solutions") || fullText.includes("view solutions") || fullText.includes("view all venues")) {
        return "EXPLORE";
      }

      // 12. Tabs & Category Filters
      if (role === "tab" || className.includes("tab") || fullText.includes("filter") || fullText.includes("all spaces")) {
        return "SELECT";
      }

      // 13. Legal & Regulatory Pages
      if (href.includes("privacy")) return "PRIVACY";
      if (href.includes("terms")) return "TERMS";

      // 14. Close / Dismiss Triggers
      if (ariaLabel.includes("close") || innerText === "close" || innerText === "✕" || innerText === "×") {
        return "CLOSE";
      }

      // 15. Clean Fallbacks
      if (tagName === "a") {
        if (fullText.includes("learn") || fullText.includes("read") || fullText.includes("journey")) return "READ";
        return "OPEN";
      }

      return "SELECT";
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const onMouseDown = () => {
      isMouseDown.current = true;
      // Trigger acoustic ripple at dot position
      if (rippleRef.current) {
        rippleRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(0.2)`;
        rippleRef.current.style.opacity = "0.85";
        rippleRef.current.style.transition = "none";

        requestAnimationFrame(() => {
          if (rippleRef.current) {
            rippleRef.current.style.transition = "transform 0.45s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.45s ease-out";
            rippleRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(2.8)`;
            rippleRef.current.style.opacity = "0";
          }
        });
      }
    };

    const onMouseUp = () => {
      isMouseDown.current = false;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, input, select, textarea, [role="button"], [role="tab"], [tabindex="0"], .btn-primary, .btn-secondary, .faq-trigger, label, summary, [data-cursor]'
      ) as HTMLElement | null;

      if (interactive) {
        if (activeInteractiveRef.current !== interactive) {
          activeInteractiveRef.current = interactive;
          if (!isHovered.current) {
            isHovered.current = true;
            setIsHoveredState(true);
          }
          const label = determineContext(interactive);
          setContextLabel(label);
        }
      } else {
        if (isHovered.current) {
          activeInteractiveRef.current = null;
          isHovered.current = false;
          setIsHoveredState(false);
        }
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const render = () => {
      animTime.current += 1;

      // 1. Calculate instant mouse velocity
      const dx = mousePos.current.x - prevMouse.current.x;
      const dy = mousePos.current.y - prevMouse.current.y;
      const instantSpeed = Math.hypot(dx, dy);
      velocity.current = Math.min(instantSpeed, 45);
      prevMouse.current.x = mousePos.current.x;
      prevMouse.current.y = mousePos.current.y;

      // Smooth velocity decay
      smoothedVelocity.current = lerp(smoothedVelocity.current, velocity.current, 0.14);

      // 2. High-precision central pointer dot (ultra fast follow: factor 0.6)
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, 0.65);
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, 0.65);

      if (pointerDotRef.current) {
        const scale = isMouseDown.current ? 0.75 : isHovered.current ? 1.4 : 1;
        pointerDotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      // 3. Floating Audio Equalizer & Badge (smooth fluid lag, zero-jump centered architecture)
      const isNearTop = mousePos.current.y < 70;
      const targetOffsetY = isNearTop ? 22 : -16;
      const idealTargetY = mousePos.current.y + targetOffsetY;

      // Screen-aware horizontal clamping: keep centered on pointer, clamped gracefully within viewport bounds
      const screenW = window.innerWidth;
      const pad = 14;
      const currentPillWidth = visualizerRef.current ? visualizerRef.current.offsetWidth : (isHovered.current ? 120 : 36);
      const halfWidth = currentPillWidth / 2;

      const idealTargetX = Math.max(
        halfWidth + pad,
        Math.min(mousePos.current.x, screenW - halfWidth - pad)
      );

      vizPos.current.x = lerp(vizPos.current.x, idealTargetX, 0.22);
      vizPos.current.y = lerp(vizPos.current.y, idealTargetY, 0.22);

      if (visualizerRef.current) {
        visualizerRef.current.style.transform = `translate3d(${vizPos.current.x}px, ${vizPos.current.y}px, 0) translate(-50%, ${isNearTop ? "0%" : "-100%"})`;
      }

      // 4. Equalizer Bar Waveform Animation (Audio visualizer reaction)
      const t = animTime.current;
      const v = smoothedVelocity.current;
      const boost = isHovered.current ? 1.6 : 1.0;

      // Heights calculated as live acoustic frequency bands
      const h0 = Math.max(3, Math.min(18, (4 + Math.sin(t * 0.16 + 0.3) * 2.5 + v * 0.35) * boost));
      const h1 = Math.max(4, Math.min(22, (6 + Math.sin(t * 0.22 + 1.2) * 3.5 + v * 0.55) * boost));
      const h2 = Math.max(5, Math.min(24, (9 + Math.sin(t * 0.19 + 2.5) * 4.5 + v * 0.70) * boost)); // peak
      const h3 = Math.max(4, Math.min(20, (5 + Math.sin(t * 0.24 + 3.8) * 3.2 + v * 0.48) * boost));
      const h4 = Math.max(3, Math.min(16, (3 + Math.sin(t * 0.15 + 4.9) * 2.2 + v * 0.28) * boost));

      if (bar0.current) bar0.current.style.height = `${h0}px`;
      if (bar1.current) bar1.current.style.height = `${h1}px`;
      if (bar2.current) bar2.current.style.height = `${h2}px`;
      if (bar3.current) bar3.current.style.height = `${h3}px`;
      if (bar4.current) bar4.current.style.height = `${h4}px`;

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  return (
    <div
      aria-hidden="true"
      className="custom-cursor-layer"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 999999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      {/* 1. Precision Center Pointer: Dual-tone high-contrast acoustic reticle (visible on white & dark) */}
      <div
        ref={pointerDotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "16px",
          height: "16px",
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        {/* Outer reticle ring with dark rim for sharp contrast on white screens */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: isHoveredState
              ? "1.5px solid #E51926"
              : "1.5px solid #FFFFFF",
            boxShadow: isHoveredState
              ? "0 0 0 1px rgba(0, 0, 0, 0.75), 0 0 12px rgba(229, 25, 38, 0.6)"
              : "0 0 0 1px rgba(0, 0, 0, 0.75), 0 2px 6px rgba(0, 0, 0, 0.4)",
            transition: "border-color 0.25s ease, box-shadow 0.25s ease",
          }}
        />
        {/* Center acoustic precision core — signature MACPL red (#E51926) with crisp dark rim */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: "#E51926",
            boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.65)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>

      {/* 2. Acoustic Shockwave Ripple on Click */}
      <div
        ref={rippleRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: "1.5px solid rgba(229, 25, 38, 0.95)",
          boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.35)",
          pointerEvents: "none",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />

      {/* 3. Dynamic Audio Frequency Waveform & Contextual Badge */}
      <div
        ref={visualizerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          gap: isHoveredState ? "8px" : "3px",
          padding: isHoveredState ? "6px 12px 6px 10px" : "4px 8px",
          background: "rgba(18, 18, 24, 0.94)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: isHoveredState
            ? "1px solid rgba(229, 25, 38, 0.75)"
            : "1px solid rgba(255, 255, 255, 0.22)",
          borderRadius: "999px",
          pointerEvents: "none",
          willChange: "transform",
          boxShadow: isHoveredState
            ? "0 0 0 1px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.55), 0 0 14px rgba(229, 25, 38, 0.25)"
            : "0 0 0 1px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.45)",
          transition:
            "padding 0.28s cubic-bezier(0.16, 1, 0.3, 1), gap 0.28s ease, border-color 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        {/* 5-Band Live Audio Spectrum Visualizer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            height: "24px",
          }}
        >
          <span
            ref={bar0}
            style={{
              display: "inline-block",
              width: "2px",
              height: "6px",
              borderRadius: "1px",
              backgroundColor: isHoveredState ? "#E51926" : "rgba(255, 255, 255, 0.95)",
              willChange: "height",
              transition: "background-color 0.25s ease",
            }}
          />
          <span
            ref={bar1}
            style={{
              display: "inline-block",
              width: "2px",
              height: "6px",
              borderRadius: "1px",
              backgroundColor: isHoveredState ? "#E51926" : "rgba(255, 255, 255, 0.95)",
              willChange: "height",
              transition: "background-color 0.25s ease",
            }}
          />
          <span
            ref={bar2}
            style={{
              display: "inline-block",
              width: "2px",
              height: "6px",
              borderRadius: "1px",
              backgroundColor: isHoveredState ? "#E51926" : "rgba(255, 255, 255, 0.95)",
              willChange: "height",
              transition: "background-color 0.25s ease",
            }}
          />
          <span
            ref={bar3}
            style={{
              display: "inline-block",
              width: "2px",
              height: "6px",
              borderRadius: "1px",
              backgroundColor: isHoveredState ? "#E51926" : "rgba(255, 255, 255, 0.95)",
              willChange: "height",
              transition: "background-color 0.25s ease",
            }}
          />
          <span
            ref={bar4}
            style={{
              display: "inline-block",
              width: "2px",
              height: "6px",
              borderRadius: "1px",
              backgroundColor: isHoveredState ? "#E51926" : "rgba(255, 255, 255, 0.95)",
              willChange: "height",
              transition: "background-color 0.25s ease",
            }}
          />
        </div>

        {/* Dynamic Context Micro-Label (expands on hover) */}
        {isHoveredState && (
          <span
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#FFFFFF",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              animation: "fadeInLabel 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {contextLabel}
          </span>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeInLabel {
          from {
            opacity: 0;
            transform: translateX(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
