"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // High-performance smooth inertial scrolling
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    // Smoothly absorb micro-stutters and frame drops without animation hitching
    gsap.ticker.lagSmoothing(500, 33);

    // Universal scroll-driven in and out cinematic transitions for all images across the website
    const imageElements = document.querySelectorAll<HTMLElement>(
      ".cinematic-media-container, .solutions-mobile-view img, .stage-card-grid img, .equipment-browser-grid img, #solutions img, #equipment img, #how-it-works img, #approach img, #why-modern-audio img"
    );

    const imageTriggers: ScrollTrigger[] = [];

    imageElements.forEach((el) => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 95%",
        end: "bottom 5%",
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
        onLeave: () => {
          gsap.to(el, {
            opacity: 0.88,
            scale: 0.985,
            duration: 0.7,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        },
        onEnterBack: () => {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(el, {
            opacity: 0.88,
            scale: 0.985,
            duration: 0.7,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        },
      });
      imageTriggers.push(st);
    });

    return () => {
      imageTriggers.forEach((t) => t.kill());
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
