"use client";

import NextLink from "next/link";
import { MapPin, Mail, ExternalLink, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {

  return (
    <footer
      className="section-dark"
      style={{
        backgroundColor: "#0D0D0D",
        paddingTop: "clamp(4.5rem, 8vw, 7rem)",
        paddingBottom: "calc(3.5rem + env(safe-area-inset-bottom, 0px))",
        position: "relative",
      }}
    >
      <div className="site-container-wide">
        {/* Top Grid: Brand Statement & Quick Pathways */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "3.5rem",
            marginBottom: "5rem",
          }}
        >
          {/* Col 1: Identity & Positioning */}
          <div style={{ maxWidth: "440px" }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "1.45rem",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  color: "#FFFFFF",
                  display: "block",
                }}
              >
                MODERN AUDIO CO.
              </span>
              <p
                style={{
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "var(--accent-red)",
                  marginTop: "0.35rem",
                }}
              >
                MODERN AUDIO COMPANY PRIVATE LIMITED
              </p>
            </div>

            <p
              style={{
                fontSize: "0.88rem",
                lineHeight: "1.65",
                color: "#8E8E8E",
              }}
            >
              {SITE_CONFIG.brandNetworkStatement}
            </p>

            {/* Year established if present */}
            {SITE_CONFIG.unconfirmed.yearEstablished && (
              <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#8E8E8E" }}>
                Established {SITE_CONFIG.unconfirmed.yearEstablished} · Chandni Chowk, Delhi
              </p>
            )}
          </div>

          {/* Col 2: Navigation & Company */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#FFFFFF",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <li>
                <NextLink
                  href="/"
                  style={{ color: "#A5A5A5", fontSize: "0.9rem", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A5A5A5")}
                >
                  Home & Overview
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/solutions"
                  style={{ color: "#A5A5A5", fontSize: "0.9rem", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A5A5A5")}
                >
                  All Solutions
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/#equipment"
                  style={{ color: "#A5A5A5", fontSize: "0.9rem", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A5A5A5")}
                >
                  Equipment Portfolio
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/#how-it-works"
                  style={{ color: "#A5A5A5", fontSize: "0.9rem", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A5A5A5")}
                >
                  5-Stage Customer Journey
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/#faq"
                  style={{ color: "#A5A5A5", fontSize: "0.9rem", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A5A5A5")}
                >
                  Frequently Asked Questions
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/contact"
                  style={{ color: "#A5A5A5", fontSize: "0.9rem", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A5A5A5")}
                >
                  Project Enquiry
                </NextLink>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Address & Direct Contact Channels */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#FFFFFF",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              Contact &amp; Location
            </h4>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", color: "#A5A5A5" }}>
              <MapPin size={18} style={{ color: "var(--accent-red)", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <address style={{ fontStyle: "normal", fontSize: "0.88rem", lineHeight: "1.6" }}>
                  Born in Chandni Chowk , Raised in India
                </address>
                <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <a
                    href="tel:+919811675192"
                    style={{ color: "#A5A5A5", fontSize: "0.88rem", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#A5A5A5")}
                  >
                    +91 98116 75192
                  </a>
                  <a
                    href="tel:+919899154003"
                    style={{ color: "#A5A5A5", fontSize: "0.88rem", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#A5A5A5")}
                  >
                    +91 98991 54003
                  </a>
                </div>
              </div>
            </div>

            <a
              href={SITE_CONFIG.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#FFFFFF",
                fontSize: "0.82rem",
                fontFamily: "var(--font-family-sans)",
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                marginBottom: "1.5rem",
              }}
            >
              <span>View on Google Maps</span>
              <ExternalLink size={13} />
            </a>

            {/* Email */}
            {SITE_CONFIG.contact.email && (
              <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Mail size={16} style={{ color: "#888888", flexShrink: 0 }} />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  style={{ color: "#A5A5A5", fontSize: "0.85rem", textDecoration: "none" }}
                  onClick={() => trackEvent("nav_click", { destination: "footer_email" })}
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            )}

            {/* Opening Hours (Only render if present) */}
            {SITE_CONFIG.unconfirmed.openingHours && (
              <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.6rem", color: "#A5A5A5", fontSize: "0.85rem" }}>
                <Clock size={15} style={{ color: "#888888", flexShrink: 0 }} />
                <span>{SITE_CONFIG.unconfirmed.openingHours}</span>
              </div>
            )}

            {/* Social Links (Only render if present) */}
            {Object.entries(SITE_CONFIG.unconfirmed.socials).some(([, url]) => Boolean(url)) && (
              <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {Object.entries(SITE_CONFIG.unconfirmed.socials).map(([platform, url]) =>
                  url ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#A5A5A5", fontSize: "0.82rem", textTransform: "capitalize" }}
                    >
                      {platform}
                    </a>
                  ) : null
                )}
              </div>
            )}

            {/* GST / CIN (Only render if present) */}
            {(SITE_CONFIG.unconfirmed.gstNumber || SITE_CONFIG.unconfirmed.cin) && (
              <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#666666", lineHeight: 1.5 }}>
                {SITE_CONFIG.unconfirmed.gstNumber && <p>GST: {SITE_CONFIG.unconfirmed.gstNumber}</p>}
                {SITE_CONFIG.unconfirmed.cin && <p>CIN: {SITE_CONFIG.unconfirmed.cin}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Links & Back to Top */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.8rem", color: "#9E9E9E", fontFamily: "var(--font-family-sans)" }}>
              © 2026 {SITE_CONFIG.name}. All rights reserved.
            </span>
            <NextLink
              href="/privacy-policy"
              style={{ fontSize: "0.8rem", color: "#A0A0A0", textDecoration: "none" }}
            >
              Privacy Policy
            </NextLink>
            <NextLink
              href="/terms"
              style={{ fontSize: "0.8rem", color: "#A0A0A0", textDecoration: "none" }}
            >
              Terms of Service
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
