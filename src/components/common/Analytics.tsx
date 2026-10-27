"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export default function Analytics() {
  const pathname = usePathname();
  const lastPathnameRef = useRef<string | null>(null);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // Track PageView on client-side route changes & ViewContent on venue pages
  useEffect(() => {
    if (!pathname) return;

    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;

      // 1. Route change PageView
      trackEvent("PageView", { page: pathname });

      // 2. ViewContent on dedicated venue pages (/solutions/[slug])
      if (pathname.startsWith("/solutions/") && pathname !== "/solutions") {
        const venueSlug = pathname.replace("/solutions/", "");
        trackEvent("ViewContent", {
          content_name: venueSlug,
          content_category: "Venue Audio Solution",
          content_type: "service",
        });
      }
    }
  }, [pathname]);

  return (
    <>
      {/* Google Analytics 4 (Only if NEXT_PUBLIC_GA_ID is set) */}
      {gaId && (
        <>
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel (Only if NEXT_PUBLIC_META_PIXEL_ID is set) */}
      {metaPixelId && (
        <>
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}
