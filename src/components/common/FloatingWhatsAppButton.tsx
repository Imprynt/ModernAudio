"use client";

import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/site-config";

export default function FloatingWhatsAppButton() {
  const pathname = usePathname() || "/";

  // Build grounded context-aware message from current pathname & venue title
  const getPrefilledMessage = (): string => {
    if (pathname === "/" || pathname === "") {
      return "Hi Modern Audio Co., I'd like to discuss an audio requirement.";
    }

    if (pathname === "/solutions") {
      return "Hi Modern Audio Co., I'm interested in exploring your commercial audio solutions.";
    }

    if (pathname.startsWith("/solutions/")) {
      const slug = pathname.replace("/solutions/", "").split("/")[0].split("?")[0];
      const matchedSpace = SITE_CONFIG.spaces.find((s) => s.slug === slug);
      if (matchedSpace) {
        return `Hi Modern Audio Co., I'm interested in sound systems for ${matchedSpace.label}.`;
      }
      return "Hi Modern Audio Co., I'm interested in commercial sound systems for my venue.";
    }

    if (pathname === "/contact") {
      return "Hi Modern Audio Co., I'd like to connect regarding an audio requirement.";
    }

    if (pathname === "/thank-you") {
      return "Hi Modern Audio Co., I just submitted an enquiry and would like to connect.";
    }

    return "Hi Modern Audio Co., I'd like to discuss an audio requirement.";
  };

  const message = getPrefilledMessage();
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    if (typeof window !== "undefined") {
      try {
        if (typeof (window as unknown as { fbq?: (action: string, event: string) => void }).fbq === "function") {
          (window as unknown as { fbq: (action: string, event: string) => void }).fbq("track", "Contact");
        }
        if (
          typeof (
            window as unknown as {
              gtag?: (command: string, action: string, params: Record<string, string>) => void;
            }
          ).gtag === "function"
        ) {
          (
            window as unknown as {
              gtag: (command: string, action: string, params: Record<string, string>) => void;
            }
          ).gtag("event", "contact", { method: "whatsapp" });
        }
      } catch {
        // Silent catch for ad-blockers / tracking disabled environments
      }
    }
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={handleClick}
      className="floating-wa-btn"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#25D366",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.45), 0 2px 6px rgba(37, 211, 102, 0.35)",
        textDecoration: "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        outlineOffset: "3px",
      }}
    >
      {/* Inline SVG WhatsApp Glyph - No External Icon Library */}
      <svg
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill="currentColor"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.3-.776.979-.951 1.18-.175.2-.351.226-.652.076-.3-.15-1.268-.468-2.416-1.492-.893-.797-1.496-1.781-1.671-2.082-.176-.3-.019-.462.132-.612.136-.135.301-.35.451-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.631-.926-2.234-.244-.588-.492-.508-.676-.517-.175-.009-.376-.01-.576-.01-.2 0-.526.075-.802.375-.276.3-1.052 1.028-1.052 2.508 0 1.48 1.077 2.908 1.228 3.109.15.2 2.12 3.236 5.135 4.54.717.31 1.277.496 1.713.634.72.229 1.375.196 1.893.12.577-.085 1.78-.727 2.03-1.43.251-.702.251-1.303.176-1.43-.075-.127-.276-.202-.576-.352zM12.04 2C6.545 2 2.08 6.465 2.08 11.96c0 1.944.56 3.76 1.532 5.297L2 22l4.887-1.579a9.92 9.92 0 005.153 1.439h.004c5.494 0 9.96-4.465 9.96-9.96 0-2.66-1.036-5.16-2.918-7.042A9.897 9.897 0 0012.04 2zm0 18.25h-.003a8.27 8.27 0 01-4.223-1.157l-.303-.18-3.138 1.013 1.036-3.058-.198-.315a8.25 8.25 0 01-1.267-4.588c0-4.567 3.716-8.283 8.288-8.283 2.213 0 4.293.863 5.858 2.428a8.232 8.232 0 012.424 5.858c0 4.568-3.716 8.284-8.288 8.284z" />
      </svg>
    </a>
  );
}
