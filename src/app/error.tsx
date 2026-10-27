"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import { ArrowUpRight, RefreshCw, Home } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";
import { SITE_CONFIG } from "@/config/site";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime errors for internal monitoring
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <SmoothScroll>
      <Navbar />
      <main
        id="main-content"
        style={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D0D0D",
          color: "#FFFFFF",
          paddingTop: "calc(var(--header-height) + 3rem)",
          paddingBottom: "5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "680px",
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              color: "#E63946",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "1rem",
              padding: "0.3rem 0.75rem",
              borderRadius: "4px",
              backgroundColor: "rgba(230, 57, 70, 0.1)",
              border: "1px solid rgba(230, 57, 70, 0.25)",
            }}
          >
            System Exception
          </span>

          <h1
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem",
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              lineHeight: 1.6,
              color: "#A0A0A0",
              marginBottom: "2.5rem",
              maxWidth: "540px",
            }}
          >
            An unexpected error occurred while loading this specification. You can retry the request or connect directly with our Chandni Chowk team.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => reset()}
              className="btn-primary"
              style={{
                padding: "0.95rem 2rem",
                fontSize: "0.92rem",
                cursor: "pointer",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <RefreshCw size={16} />
              <span>Try Again</span>
            </button>

            <NextLink
              href="/"
              className="btn-secondary-light"
              style={{ padding: "0.95rem 1.85rem", fontSize: "0.92rem" }}
            >
              <Home size={16} />
              <span>Return Home</span>
            </NextLink>

            <NextLink
              href="/contact"
              className="btn-secondary-light"
              style={{ padding: "0.95rem 1.85rem", fontSize: "0.92rem" }}
            >
              <span>{SITE_CONFIG.cta.primary}</span>
              <ArrowUpRight size={16} />
            </NextLink>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
