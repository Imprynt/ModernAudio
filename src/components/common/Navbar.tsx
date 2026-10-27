"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const shouldBeScrolled = window.scrollY > 40;
          setIsScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: isScrolled ? "rgba(15, 15, 15, 0.96)" : "rgba(10, 10, 10, 0.4)",
          backdropFilter: "blur(16px)",
          borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid transparent",
          paddingTop: isScrolled ? "0.85rem" : "1.25rem",
          paddingBottom: isScrolled ? "0.85rem" : "1.25rem",
          boxShadow: isScrolled ? "0 10px 30px rgba(0, 0, 0, 0.5)" : "none",
          transition: "all 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          className="site-container-wide"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Logo & Location Tag */}
          <NextLink
            href="/"
            className="group flex flex-col no-underline"
            style={{ textDecoration: "none", color: "#FFFFFF" }}
            onClick={() => trackEvent("nav_click", { destination: "home" })}
          >
            <span
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                display: "block",
              }}
            >
              MODERN AUDIO CO.
            </span>
            <span
              className="header-subtext"
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#9E9E9E",
                textTransform: "uppercase",
                marginTop: "0.2rem",
              }}
            >
              Born in Chandni Chowk, Raised By INDIA
            </span>
          </NextLink>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Main Navigation"
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.25rem",
            }}
          >
            {SITE_CONFIG.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <NextLink
                  key={item.label}
                  href={item.href}
                  className="nav-link"
                  style={{
                    fontFamily: "var(--font-family-sans)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: isActive ? "#FFFFFF" : "#C4C4C4",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    position: "relative",
                  }}
                  onClick={() => trackEvent("nav_click", { destination: item.label })}
                >
                  {item.label}
                </NextLink>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="header-cta-wrapper" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <NextLink
              href="/contact"
              className="btn-primary"
              style={{
                padding: "0.75rem 1.4rem",
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
              onClick={() => trackEvent("hero_cta_click", { source: "navbar" })}
            >
              <span>{SITE_CONFIG.cta.label}</span>
              <ArrowUpRight size={16} />
            </NextLink>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-toggle-btn"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                padding: "0.6rem",
                borderRadius: "4px",
                cursor: "pointer",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 49,
            backgroundColor: "#111111",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "calc(5.5rem + env(safe-area-inset-top, 0px)) 2rem calc(2.5rem + env(safe-area-inset-bottom, 0px))",
            overflowY: "auto",
            animation: "fadeIn 0.25s ease-out",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <span
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--accent-red)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Navigation
            </span>
            {SITE_CONFIG.nav.map((item) => (
              <NextLink
                key={item.label}
                href={item.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackEvent("nav_click", { destination: item.label, isMobile: true });
                }}
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingBottom: "1rem",
                }}
              >
                {item.label}
              </NextLink>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <NextLink
              href="/contact"
              className="btn-primary"
              style={{ width: "100%", textAlign: "center", padding: "1rem" }}
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent("hero_cta_click", { source: "mobile_drawer" });
              }}
            >
              <span>{SITE_CONFIG.cta.label}</span>
              <ArrowUpRight size={18} />
            </NextLink>

            <div style={{ fontSize: "0.85rem", color: "#8E8E8E", fontFamily: "var(--font-family-sans)" }}>
              <p>{SITE_CONFIG.address.street}</p>
              <p>{SITE_CONFIG.address.area}, {SITE_CONFIG.address.city} {SITE_CONFIG.address.postalCode}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
