"use client";

import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const faqs = SITE_CONFIG.faqs;

  const getFaqLink = (idx: number) => {
    switch (idx) {
      case 0:
        return { href: "/#equipment", label: "Explore Equipment Portfolio" };
      case 1:
        return { href: "/solutions", label: "View All Venues" };
      case 2:
        return { href: "/#equipment", label: "View Speakers & Amplification Scope" };
      case 3:
        return { href: "/solutions#restaurants-cafes", label: "Learn About Restaurant & Kitchen Talkback" };
      case 4:
        return { href: "/#how-it-works", label: "Review the 5-Stage Customer Journey" };
      case 5:
        return { href: "/contact", label: "Consult On Venue System Requirements" };
      case 6:
        return { href: "/contact", label: "Start Your Project Specification" };
      case 7:
      case 8:
      case 9:
        return { href: "/contact", label: "Contact Our Chandni Chowk Base" };
      default:
        return null;
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
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

      if (accordionRef.current) {
        gsap.fromTo(
          accordionRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: accordionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (idx: number) => {
    const next = openIdx === idx ? null : idx;
    setOpenIdx(next);
    if (next !== null) {
      trackEvent("faq_toggle", { questionIndex: idx, question: faqs[idx].q });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="section-warm relative overflow-hidden"
      style={{
        paddingTop: "clamp(6.5rem, 11vw, 9.5rem)",
        paddingBottom: "clamp(6.5rem, 11vw, 9.5rem)",
        backgroundColor: "var(--bg-warm, #F7F6F2)",
        color: "var(--text-primary, #1C1917)",
        scrollMarginTop: "80px",
      }}
    >


      <div className="site-container">
        {/* Header - Editorial unboxed layout */}
        <div ref={headerRef} style={{ maxWidth: "780px", marginBottom: "clamp(3.5rem, 6vw, 4.5rem)" }}>
          <h2
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(2.3rem, 4.2vw, 3.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "var(--text-primary, #1C1917)",
              lineHeight: 1.08,
              marginBottom: "1.25rem",
            }}
          >
            Clear Answers About Our Service.
          </h2>

          <p
            style={{
              fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
              lineHeight: 1.6,
              color: "var(--text-secondary, #57534E)",
            }}
          >
            Everything you need to know about consulting, system sourcing, and working with Modern Audio.
          </p>
        </div>

        {/* Semantic Accessible Accordion */}
        <div
          ref={accordionRef}
          style={{
            maxWidth: "960px",
            borderTop: "1px solid var(--border-subtle, rgba(0, 0, 0, 0.12))",
          }}
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const controlId = `faq-header-${idx}`;
            const panelId = `faq-panel-${idx}`;
            const linkObj = getFaqLink(idx);

            return (
              <div
                key={faq.q}
                className="faq-accordion-item"
                style={{
                  backgroundColor: isOpen ? "rgba(0, 0, 0, 0.02)" : "transparent",
                }}
              >
                <button
                  type="button"
                  id={controlId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                  className="faq-trigger"
                >
                  <span className="faq-question">
                    {faq.q}
                  </span>

                  {/* Clean minimal toggle icon - NO circular border */}
                  <span className="faq-toggle-icon" aria-hidden="true">
                    <Plus size={20} strokeWidth={2.2} />
                  </span>
                </button>

                {/* Ultra-smooth CSS Grid Height Expansion */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={controlId}
                  className={`faq-content-grid ${isOpen ? "is-open" : ""}`}
                >
                  <div className="faq-content-inner">
                    <p className="faq-answer-text">
                      {faq.a}
                    </p>
                    {linkObj && (
                      <div style={{ paddingBottom: "1.75rem" }}>
                        <NextLink
                          href={linkObj.href}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            color: "var(--accent-red)",
                            fontSize: "0.88rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            fontFamily: "var(--font-family-sans)",
                          }}
                        >
                          <span>{linkObj.label}</span>
                          <ArrowUpRight size={14} />
                        </NextLink>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
