"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ThankYouTracker() {
  useEffect(() => {
    try {
      const alreadyFired = sessionStorage.getItem("macpl_lead_fired");
      if (!alreadyFired) {
        const storedEventId = sessionStorage.getItem("macpl_last_event_id") || `lead_${Date.now()}`;
        trackEvent("Lead", { source: "thank_you_page", eventID: storedEventId }, { eventID: storedEventId });
        sessionStorage.setItem("macpl_lead_fired", "true");
      }
    } catch {
      // Non-blocking fallback
      trackEvent("Lead", { source: "thank_you_page" });
    }
  }, []);

  return null;
}
