/**
 * Modern Audio Co. - Analytics & Event Tracking Utility
 * Lightweight, privacy-respecting event dispatcher ready for Google Analytics / Plausible / custom sinks.
 */

export type AnalyticsEvent =
  | "hero_cta_click"
  | "hero_promise_cta_click"
  | "cta_click"
  | "solutions_section_view"
  | "solution_category_click"
  | "process_cta_click"
  | "contact_form_start"
  | "contact_form_submit"
  | "contact_form_success"
  | "contact_form_error"
  | "whatsapp_click"
  | "phone_click"
  | "contact_click"
  | "nav_click"
  | "custom_venue_enquiry_click"
  | "solution_category_select"
  | "equipment_tab_select"
  | "equipment_camera_select"
  | "venue_room_switch"
  | "venue_station_select"
  | "faq_toggle"
  | "PageView"
  | "Lead"
  | "Contact"
  | "ViewContent";

export interface AnalyticsPayload {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: AnalyticsEvent,
  payload?: AnalyticsPayload,
  options?: { eventID?: string }
): void {
  // Safe SSR guard
  if (typeof window === "undefined") return;

  try {
    // 1. Google Analytics 4 / Google Tag
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    }

    // 2. Meta Pixel (Facebook Pixel)
    if (typeof window.fbq === "function") {
      if (eventName === "PageView") {
        window.fbq("track", "PageView");
      } else if (eventName === "Lead") {
        if (options?.eventID) {
          window.fbq("track", "Lead", payload, { eventID: options.eventID });
        } else {
          window.fbq("track", "Lead", payload);
        }
      } else if (eventName === "Contact" || eventName === "contact_click" || eventName === "phone_click" || eventName === "whatsapp_click") {
        window.fbq("track", "Contact", payload);
      } else if (eventName === "ViewContent") {
        window.fbq("track", "ViewContent", payload);
      } else {
        window.fbq("trackCustom", eventName, payload);
      }
    }

    // 3. Window dataLayer support
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...payload,
        eventID: options?.eventID,
        timestamp: Date.now(),
      });
    }

    // 4. Custom DOM CustomEvent for integrations
    window.dispatchEvent(
      new CustomEvent("macpl_analytics", {
        detail: { event: eventName, payload, options },
      })
    );
  } catch (err) {
    // Non-blocking fail-safe
    console.warn("Analytics event dispatch error", err);
  }
}
