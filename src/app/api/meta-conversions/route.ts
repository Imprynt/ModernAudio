import { NextResponse } from "next/server";

/**
 * Meta Conversions API (CAPI) Server Route Stub
 *
 * This server route allows server-side event forwarding directly to Meta's Graph API
 * for robust measurement when client-side pixels are blocked by browser privacy tools.
 *
 * Deduplication:
 * Pass the exact same `eventID` that was dispatched on the client-side Pixel `fbq('track', 'Lead', ..., { eventID })`
 * to ensure Meta deduplicates the event and counts it only once.
 *
 * Configuration:
 * To enable, supply the following environment variables:
 * - META_CAPI_ACCESS_TOKEN: Your System User Access Token generated in Meta Events Manager.
 * - NEXT_PUBLIC_META_PIXEL_ID or META_PIXEL_ID: Your Meta Pixel Dataset ID.
 */

export interface MetaCapiEventPayload {
  eventName: "Lead" | "Contact" | "PageView" | "ViewContent";
  eventID: string;
  eventTime?: number;
  eventSourceUrl?: string;
  userData?: {
    email?: string;
    phone?: string;
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbc?: string;
    fbp?: string;
  };
  customData?: Record<string, unknown>;
}

export async function POST(request: Request) {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // If environment variables are missing, keep stub disabled without errors
  if (!accessToken || !pixelId) {
    return NextResponse.json(
      {
        enabled: false,
        message: "Meta Conversions API is disabled. Set META_CAPI_ACCESS_TOKEN and META_PIXEL_ID to enable.",
      },
      { status: 200 }
    );
  }

  try {
    const body: MetaCapiEventPayload = await request.json();

    if (!body.eventName || !body.eventID) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: eventName and eventID are required for CAPI deduplication.",
        },
        { status: 400 }
      );
    }

    const clientIp =
      body.userData?.clientIpAddress ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;

    const userAgent =
      body.userData?.clientUserAgent ||
      request.headers.get("user-agent") ||
      undefined;

    const eventTime = body.eventTime || Math.floor(Date.now() / 1000);

    const metaPayload = {
      data: [
        {
          event_name: body.eventName,
          event_time: eventTime,
          event_id: body.eventID,
          event_source_url: body.eventSourceUrl || request.headers.get("referer") || "https://modernaudioco.in",
          action_source: "website",
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            fbc: body.userData?.fbc,
            fbp: body.userData?.fbp,
          },
          custom_data: body.customData || {},
        },
      ],
    };

    const metaRes = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metaPayload),
      }
    );

    const metaData = await metaRes.json();

    if (!metaRes.ok) {
      console.error("Meta CAPI Graph API response error:", metaData);
      return NextResponse.json(
        {
          success: false,
          error: "Meta Graph API rejected event.",
          details: metaData,
        },
        { status: metaRes.status }
      );
    }

    return NextResponse.json({
      success: true,
      metaResponse: metaData,
    });
  } catch (err) {
    console.error("Meta Conversions API internal error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error dispatching Meta CAPI event.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const isConfigured = Boolean(
    process.env.META_CAPI_ACCESS_TOKEN &&
      (process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID)
  );

  return NextResponse.json({
    endpoint: "/api/meta-conversions",
    status: isConfigured ? "configured_and_active" : "disabled_missing_env_vars",
    requiredVars: ["META_CAPI_ACCESS_TOKEN", "NEXT_PUBLIC_META_PIXEL_ID"],
  });
}
