import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/site-config";

export interface EnquirySubmission {
  name: string;
  phone: string;
  email?: string;
  spaceType: string;
  city: string;
  requirement?: string;
  timeline?: string;
  // Honeypot
  website_hp?: string;
  // Attribution & Tracking
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  referrer?: string;
  landing_page?: string;
  equipment_prefill?: string;
  space_prefill?: string;
  eventID?: string;
}

// In-memory rate limiting map: IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Indian mobile phone validation: 10 digits starting with 6, 7, 8, 9, optional country code +91 or 91
export function validateIndianMobile(raw: string): { valid: boolean; formatted: string } {
  if (!raw) return { valid: false, formatted: "" };
  const digitsOnly = raw.replace(/[^0-9]/g, "");

  let tenDigit = digitsOnly;
  if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
    tenDigit = digitsOnly.slice(2);
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
    tenDigit = digitsOnly.slice(1);
  }

  const isValid = tenDigit.length === 10 && /^[6-9]/.test(tenDigit);
  return {
    valid: isValid,
    formatted: isValid ? `+91${tenDigit}` : raw,
  };
}

export async function POST(request: Request) {
  try {
    // 0. Rate limiting by IP
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many enquiries submitted from this network. Please wait a few minutes or call us directly.",
        },
        { status: 429 }
      );
    }

    const body: Partial<EnquirySubmission> = await request.json();

    // 1. Honeypot Anti-Spam Check
    if (body.website_hp && body.website_hp.trim().length > 0) {
      // Bot detected - return silent fake success or 400
      return NextResponse.json(
        {
          success: true,
          message: "Enquiry received.",
          enquiryId: `MAC-${Date.now().toString(36).toUpperCase()}`,
        },
        { status: 200 }
      );
    }

    // 2. Strict Validation
    const errors: Record<string, string> = {};

    // Name (Required)
    if (!body.name || body.name.trim().length < 2) {
      errors.name = "Please provide your full name (minimum 2 characters).";
    }

    // Phone (Required, Indian Mobile format)
    const phoneValidation = validateIndianMobile(body.phone || "");
    if (!phoneValidation.valid) {
      errors.phone = "Please provide a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).";
    }

    // Venue Type / Space (Required)
    if (!body.spaceType || body.spaceType.trim().length === 0) {
      errors.spaceType = "Please select the venue or space type.";
    }

    // City / Location (Required)
    const city = body.city || (body as { location?: string }).location;
    if (!city || city.trim().length < 2) {
      errors.city = "Please specify your city or location (e.g. Delhi, NCR, Pan India).";
    }

    // Email (Optional, validate format if provided)
    if (body.email && body.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email.trim())) {
        errors.email = "Please provide a valid email address.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please correct the highlighted fields.",
          fieldErrors: errors,
        },
        { status: 400 }
      );
    }

    const enquiryId = `MAC-${Date.now().toString(36).toUpperCase()}`;
    const eventID = body.eventID || `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const payload: EnquirySubmission = {
      name: body.name!.trim(),
      phone: phoneValidation.formatted,
      email: body.email?.trim() || undefined,
      spaceType: body.spaceType!.trim(),
      city: city!.trim(),
      requirement: body.requirement?.trim() || undefined,
      timeline: body.timeline?.trim() || undefined,
      utm_source: body.utm_source?.trim() || undefined,
      utm_medium: body.utm_medium?.trim() || undefined,
      utm_campaign: body.utm_campaign?.trim() || undefined,
      utm_content: body.utm_content?.trim() || undefined,
      utm_term: body.utm_term?.trim() || undefined,
      fbclid: body.fbclid?.trim() || undefined,
      gclid: body.gclid?.trim() || undefined,
      referrer: body.referrer?.trim() || undefined,
      landing_page: body.landing_page?.trim() || undefined,
      equipment_prefill: body.equipment_prefill?.trim() || undefined,
      space_prefill: body.space_prefill?.trim() || undefined,
      eventID,
    };

    // 3. Email Delivery (Resend API if configured, or console log)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = SITE_CONFIG.contact.email;

    if (resendApiKey) {
      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL || "Modern Audio Co. <enquiry@modernaudioco.in>";
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [recipientEmail],
            subject: `[New Audio Enquiry ${enquiryId}] ${payload.name} - ${payload.spaceType} (${payload.city})`,
            text: `A new commercial audio enquiry was submitted on Modern Audio Co. website:

Enquiry ID: ${enquiryId}
Name: ${payload.name}
Phone: ${payload.phone}
Email: ${payload.email || "Not provided"}
Venue Type: ${payload.spaceType}
City / Location: ${payload.city}
Timeline: ${payload.timeline || "Not specified"}
Requirement: ${payload.requirement || "None specified"}

Attribution & Marketing:
Source: ${payload.utm_source || "direct"} / ${payload.utm_medium || "none"}
Campaign: ${payload.utm_campaign || "none"}
Landing Page: ${payload.landing_page || "none"}
Referrer: ${payload.referrer || "none"}
FBCLID: ${payload.fbclid || "none"}
GCLID: ${payload.gclid || "none"}
Event ID: ${eventID}
`,
          }),
        });
      } catch (emailErr) {
        console.error("Resend email dispatch error:", emailErr);
      }
    }

    // 4. Webhook Delivery (Google Sheets / CRM if configured)
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "Modern Audio Co. Website",
            enquiryId,
            timestamp: new Date().toISOString(),
            ...payload,
          }),
        });
      } catch (webhookErr) {
        console.error("Enquiry webhook dispatch error:", webhookErr);
      }
    }

    // Development logging
    if (process.env.NODE_ENV !== "production") {
      console.log("=== [NEW PROJECT ENQUIRY PROCESSED] ===");
      console.log(JSON.stringify({ enquiryId, ...payload }, null, 2));
      console.log("========================================");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been received. Our Chandni Chowk team will review your specifications.",
        enquiryId,
        eventID,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Enquiry API handler error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred while processing your request. Please try calling directly.",
      },
      { status: 500 }
    );
  }
}
