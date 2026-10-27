# Modern Audio Company Private Limited (Modern Audio Co.)

Production-ready, conversion-focused Next.js application for **Modern Audio Company Private Limited**, commercial and institutional audio suppliers and system integrators based in Chandni Chowk, Delhi, serving Delhi, NCR, and Pan India.

- **Intended Production Domain:** `https://modernaudioco.in`
- **Framework:** Next.js 16 (App Router with Turbopack) & React 19
- **Styling:** Custom CSS Design System (Vanilla CSS with CSS custom properties)

---

## 1. Environment Variables

Create a `.env.local` file in the project root:

```bash
# Production Domain (Used for canonicals, sitemap, OpenGraph metadata)
NEXT_PUBLIC_SITE_URL=https://modernaudioco.in

# Primary Contact Email (Recipient of website enquiry submissions)
NEXT_PUBLIC_CONTACT_EMAIL=enquiry@modernaudioco.in

# WhatsApp Business Line (E.164 formatted without spaces, e.g. +919811675192)
NEXT_PUBLIC_WHATSAPP_NUMBER=+919811675192

# Email Delivery Provider (Resend API key to deliver form submissions)
RESEND_API_KEY=re_your_api_key_here

# Optional: CRM / Google Sheets Webhook endpoint
ENQUIRY_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-id

# Tracking & Analytics
NEXT_PUBLIC_META_PIXEL_ID=your_meta_pixel_id_here
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Meta Conversions API (CAPI) Server-side Tracking
META_PIXEL_ID=your_meta_pixel_id_here
META_CONVERSIONS_API_TOKEN=your_capi_access_token_here
```

> **Note:** If `NEXT_PUBLIC_META_PIXEL_ID` or `NEXT_PUBLIC_GA_ID` are not defined, no tracking scripts are loaded in the browser.

---

## 2. Development & Building

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run TypeScript type-check
npx tsc --noEmit

# Run production build
npm run build

# Start production server
npm run start
```

---

## 3. How to Test Analytics & Conversion Tracking

### Meta (Facebook & Instagram) Pixel
1. Install the official **Meta Pixel Helper** Chrome extension.
2. Open `http://localhost:3000` with `NEXT_PUBLIC_META_PIXEL_ID=1234567890` set in `.env.local`.
3. Open the extension icon to verify:
   - `PageView` fires automatically on initial page load and client-side route changes.
   - `ViewContent` fires when navigating to any `/solutions/[slug]` venue page.
   - `Contact` fires when clicking any telephone (`tel:`) or WhatsApp link.
   - `Lead` fires with a unique `eventID` upon submitting the enquiry form and redirects to `/thank-you` (deduplicated).

### Google Analytics 4 (GA4)
1. Install **Google Analytics Debugger** extension or append `?dbg=1` to the URL.
2. In Google Analytics, navigate to **Admin > DebugView**.
3. Verify `lead_form_submitted`, `contact_click`, and `view_item` events appear in real time.

### Meta Conversions API (CAPI) Server Route Stub
- Endpoint: `POST /api/meta-conversions`
- Body payload: `{ eventName: "Lead", eventId: "lead_123...", userData: { phone, email, clientIp, userAgent }, customData: { venueType, city } }`
- Enabled automatically when `META_CONVERSIONS_API_TOKEN` and `META_PIXEL_ID` environment variables are present on Vercel.

---

## 4. How to Add or Modify Venue Solutions

All 10 commercial venue solutions are centrally configured in [`src/lib/site-config.ts`](src/lib/site-config.ts) under `SITE_CONFIG.spaces`.

To add or edit a venue:
1. Open `src/lib/site-config.ts`.
2. Add a new object to the `spaces` array:
   ```ts
   {
     id: "recording-studios",
     slug: "recording-studio-sound-system-delhi",
     label: "Recording Studios & Broadcast",
     tagline: "Acoustic monitoring and reference sound systems",
     headline: "Precision studio monitoring setups for broadcast suites and recording facilities.",
     description: "Detailed description of the audio infrastructure...",
     image: "/images/studio-monitoring.jpg",
     imageAlt: "Professional recording studio interior with nearfield reference monitors in Delhi",
     href: "/solutions/recording-studio-sound-system-delhi",
     systemScope: "Active & Digital · Reference Grade",
     configurations: [
       "Nearfield reference monitors",
       "Acoustic calibration processing",
       "Audio interface routing"
     ],
     relatedSlugs: ["auditorium-sound-system-delhi", "cinema-hall-sound-system"],
     metaTitle: "Studio Audio & Monitoring Systems Delhi | Modern Audio Co.",
     metaDescription: "Reference studio monitors and acoustic signal processing for Delhi NCR suites.",
     faqs: [
       {
         q: "What monitors do you recommend for broadcast control rooms?",
         a: "We recommend bi-amplified active studio monitors paired with balanced digital routing."
       }
     ]
   }
   ```
3. Run `npm run build`. Next.js will automatically:
   - Statically prerender `/solutions/recording-studio-sound-system-delhi`.
   - Add it to the dynamic `/sitemap.xml`.
   - Generate Schema.org `Service`, `FAQPage`, and `BreadcrumbList` structured data.
   - Add it to the solutions directory grid on `/solutions`.

---

## 5. How to Add or Update FAQs

Global grounded FAQs are stored in `SITE_CONFIG.faqs` inside [`src/lib/site-config.ts`](src/lib/site-config.ts).

To add a question:
```ts
{
  q: "Can you provide demonstration equipment before quotation?",
  a: "Yes. For institutional and high-capacity projects in Delhi, NCR, and Pan India, we coordinate on-site equipment walkthroughs and functional demos."
}
```
Updating this array automatically:
- Updates the interactive disclosure accordion on the home page (`/#faq`).
- Updates the Schema.org `FAQPage` JSON-LD rendered in the page head for Google Rich Results.

---

## 6. Staging & Production Host Headers

- **Preview Deployments (`*.vercel.app`):** The custom Next.js middleware automatically injects `X-Robots-Tag: noindex, nofollow` on any request with a `.vercel.app` hostname.
- **Production (`https://modernaudioco.in`):** Fully indexable with canonical tags, XML sitemap, and rich snippet schemas.
