import NextLink from "next/link";
import { ArrowUpRight, Home } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SmoothScroll from "@/components/common/SmoothScroll";
import { SITE_CONFIG } from "@/config/site";

export default function NotFound() {
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
          textAlign: "center",
        }}
      >
        <div className="site-container" style={{ maxWidth: "680px" }}>
          <span
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "var(--accent-red)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1.25rem",
            }}
          >
            404 · PAGE NOT FOUND
          </span>

          <h1
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            The requested audio route could not be found.
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.65,
              color: "#B4B4B4",
              marginBottom: "2.5rem",
            }}
          >
            The page you are looking for may have been moved or updated. Explore our commercial audio solutions or return to the main homepage.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <NextLink
              href="/"
              className="btn-primary"
              style={{ padding: "0.95rem 2rem", fontSize: "0.92rem" }}
            >
              <Home size={16} />
              <span>Return Home</span>
            </NextLink>

            <NextLink
              href="/solutions"
              className="btn-secondary-light"
              style={{ padding: "0.95rem 1.85rem", fontSize: "0.92rem" }}
            >
              <span>{SITE_CONFIG.cta.secondarySolutions}</span>
              <ArrowUpRight size={16} />
            </NextLink>

            <NextLink
              href="/contact"
              className="btn-secondary-light"
              style={{ padding: "0.95rem 1.85rem", fontSize: "0.92rem" }}
            >
              <span>{SITE_CONFIG.cta.primary}</span>
            </NextLink>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
