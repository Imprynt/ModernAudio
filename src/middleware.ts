import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const isVercelHost = host.endsWith(".vercel.app");

  // Optional: Redirect .vercel.app to the canonical production domain if configured
  if (isVercelHost && process.env.REDIRECT_VERCEL_TO_PRODUCTION === "true") {
    const productionDomain = process.env.NEXT_PUBLIC_SITE_URL || "https://modernaudioco.in";
    const targetUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, productionDomain);
    return NextResponse.redirect(targetUrl, 308);
  }

  const response = NextResponse.next();

  // If request is served from any *.vercel.app host, prevent search engine indexing
  if (isVercelHost) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images / media public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
