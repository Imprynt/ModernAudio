"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

interface FormData {
  name: string;
  phone: string;
  email: string;
  spaceType: string;
  city: string;
  requirement: string;
  timeline: string;
  website_hp: string; // Honeypot anti-spam
}

const spaceOptions = [
  { value: "", label: "Select venue / space type..." },
  { value: "auditoriums", label: "Auditorium / Cultural Performance Hall" },
  { value: "schools-colleges", label: "School / College / Classroom System" },
  { value: "hotels", label: "Hotel / Banquet / Meeting Facility" },
  { value: "shopping-malls", label: "Shopping Mall / Retail Atrium" },
  { value: "cinema-halls", label: "Cinema Hall / Screening Venue" },
  { value: "hospitals", label: "Hospital / Healthcare Facility" },
  { value: "metro-stations", label: "Metro Station / Transit Platform" },
  { value: "religious-community", label: "Religious Place (Temple, Mosque, Gurdwara, Church, Satsang Bhawan)" },
  { value: "restaurants-cafes", label: "Restaurant / Café / Kitchen Talkback" },
  { value: "discotheques-nightlife", label: "Discotheque / Live DJ & Performance Venue" },
  { value: "residential-societies", label: "Residential Society" },
  { value: "social-clubs", label: "Social Club" },
  { value: "theme-parks", label: "Theme Park" },
  { value: "outdoor-stadiums", label: "Outdoor Stadium" },
  { value: "gyms-fitness", label: "Gym / Fitness Center" },
  { value: "salons-spas", label: "Salon / Spa / Wellness Studio" },
  { value: "portable-audio", label: "Portable Audio System / Wide-Area Reach" },
  { value: "other", label: "Other Venue (tell us in the description)" },
];

const timelineOptions = [
  "Planning Phase (1-3 months out)",
  "Immediate Need (Within 2-4 weeks)",
  "Evaluating Budget / Quotations",
  "Upgrading Existing Sound System",
];

export default function EnquirySection({
  defaultSpace,
  embedded,
}: {
  defaultSpace?: string;
  embedded?: boolean;
}) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    spaceType: defaultSpace || "",
    city: "",
    requirement: "",
    timeline: "Planning Phase",
    website_hp: "",
  });

  const trackingDataRef = useRef<Record<string, string>>({});
  const [equipmentPrefill, setEquipmentPrefill] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formBoxRef = useRef<HTMLFormElement>(null);

  // Capture UTM parameters and URL prefill on client mount safely
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const utmSource = searchParams.get("utm_source");
      const utmMedium = searchParams.get("utm_medium");
      const utmCampaign = searchParams.get("utm_campaign");
      const utmContent = searchParams.get("utm_content");
      const utmTerm = searchParams.get("utm_term");
      const fbclid = searchParams.get("fbclid");
      const gclid = searchParams.get("gclid");
      const spaceParam = searchParams.get("space");
      const equipmentParam = searchParams.get("equipment");

      const storedJson = sessionStorage.getItem("macpl_tracking");
      const stored = storedJson ? JSON.parse(storedJson) : {};

      const currentTracking: Record<string, string> = {
        utm_source: utmSource || stored.utm_source || "",
        utm_medium: utmMedium || stored.utm_medium || "",
        utm_campaign: utmCampaign || stored.utm_campaign || "",
        utm_content: utmContent || stored.utm_content || "",
        utm_term: utmTerm || stored.utm_term || "",
        fbclid: fbclid || stored.fbclid || "",
        gclid: gclid || stored.gclid || "",
        referrer: document.referrer || stored.referrer || "",
        landing_page: window.location.href || stored.landing_page || "",
      };

      sessionStorage.setItem("macpl_tracking", JSON.stringify(currentTracking));
      trackingDataRef.current = currentTracking;

      // Handle space and equipment prefill from URL asynchronously
      if (spaceParam || equipmentParam) {
        setTimeout(() => {
          if (spaceParam) {
            const matchedSpace = SITE_CONFIG.spaces.find(
              (s) => s.id === spaceParam || s.slug === spaceParam
            );
            if (matchedSpace) {
              setFormData((prev) => ({ ...prev, spaceType: matchedSpace.id }));
            } else if (spaceOptions.some((opt) => opt.value === spaceParam)) {
              setFormData((prev) => ({ ...prev, spaceType: spaceParam }));
            }
          }

          if (equipmentParam) {
            const matchedEquip = SITE_CONFIG.equipmentTaxonomy.find(
              (e) => e.id === equipmentParam
            );
            if (matchedEquip) {
              setEquipmentPrefill(matchedEquip.name);
              setFormData((prev) => ({
                ...prev,
                requirement: prev.requirement || `Inquiring about ${matchedEquip.name} (${matchedEquip.scope}) setup.`,
              }));
            }
          }
        }, 0);
      }
    } catch {
      // Storage access fail-safe
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateClient = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your name (minimum 2 characters).";
    }

    // Phone validation for Indian mobile numbers: 10 digits starting with 6, 7, 8, 9
    const cleanDigits = formData.phone.replace(/[^0-9]/g, "");
    let tenDigit = cleanDigits;
    if (cleanDigits.length === 12 && cleanDigits.startsWith("91")) {
      tenDigit = cleanDigits.slice(2);
    } else if (cleanDigits.length === 11 && cleanDigits.startsWith("0")) {
      tenDigit = cleanDigits.slice(1);
    }

    if (tenDigit.length !== 10 || !/^[6-9]/.test(tenDigit)) {
      errors.phone = "Please enter a valid 10-digit Indian mobile number (e.g. 98116 75192).";
    }

    if (!formData.spaceType) {
      errors.spaceType = "Please select the type of space or venue.";
    }

    if (!formData.city.trim() || formData.city.trim().length < 2) {
      errors.city = "Please specify your project city or location (e.g. Delhi, NCR, Pan India).";
    }

    if (formData.email && formData.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateClient()) {
      setErrorMsg("Please complete all required fields correctly before submitting.");
      return;
    }

    setLoading(true);
    trackEvent("contact_form_submit", { spaceType: formData.spaceType, city: formData.city });

    const eventID = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    try {
      const payload = {
        ...formData,
        ...trackingDataRef.current,
        equipment_prefill: equipmentPrefill,
        eventID,
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        throw new Error(data.error || "Unable to submit enquiry. Please try calling directly.");
      }

      // Record lead tracking deduplication in sessionStorage
      try {
        sessionStorage.setItem("macpl_last_event_id", eventID);
        sessionStorage.setItem("macpl_lead_fired", "true");
      } catch { }

      // Fire Lead event with eventID for Meta Pixel & Google Analytics
      trackEvent("Lead", { eventID, spaceType: formData.spaceType, city: formData.city }, { eventID });

      setSubmitted(true);

      // Redirect to /thank-you with enquiryId
      setTimeout(() => {
        router.push(`/thank-you?enquiryId=${data.enquiryId || ""}`);
      }, 300);
    } catch (err: unknown) {
      console.error("Enquiry submission error:", err);
      const message = err instanceof Error ? err.message : "An error occurred while submitting your requirement. Please call us directly.";
      setErrorMsg(message);
      trackEvent("contact_form_error", { error: message });
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <div style={{ minHeight: "560px" }}>
      {!embedded && (
        <div style={{ marginBottom: "2.75rem", textAlign: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-family-sans)",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "var(--accent-red)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            DISCUSS YOUR REQUIREMENT
          </span>
          <h2
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Tell us about your space.
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#CCCCCC",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
            }}
          >
            Share your room dimensions, venue type, and requirements with our experienced technical team for an honest evaluation and setup plan.
          </p>
        </div>
      )}

      {submitted ? (
        <div
          role="status"
          aria-live="polite"
          style={{
            backgroundColor: "#171717",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "8px",
            padding: "clamp(2rem, 4vw, 3.5rem)",
            textAlign: "center",
            maxWidth: "840px",
            margin: "0 auto",
          }}
        >
          <CheckCircle2 size={42} style={{ color: "#25D366", margin: "0 auto 1.25rem" }} />
          <h3
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "1rem",
            }}
          >
            Thank you, {formData.name}.
          </h3>
          <p style={{ fontSize: "1.05rem", color: "#CCCCCC", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Your requirement for <strong>{formData.spaceType}</strong> in <strong>{formData.city}</strong> has been recorded. Redirecting to your confirmation details...
          </p>
        </div>
      ) : (
        <form
          ref={formBoxRef}
          onSubmit={handleSubmit}
          noValidate
          id="enquiry-form"
          className="enquiry-form-card"
          style={{
            backgroundColor: "#171717",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            padding: "clamp(1.5rem, 4vw, 3.5rem)",
            maxWidth: "840px",
            margin: "0 auto",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Honeypot Field (Invisible to human users, traps spam bots) */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="field-hp">Do not fill this field</label>
            <input
              id="field-hp"
              name="website_hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website_hp}
              onChange={handleChange}
            />
          </div>

          {/* Global Error Banner */}
          {errorMsg && (
            <div
              role="alert"
              aria-live="assertive"
              style={{
                backgroundColor: "rgba(181, 18, 27, 0.12)",
                border: "1px solid var(--accent-red)",
                color: "#FF9999",
                padding: "1rem 1.25rem",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "2rem",
                fontSize: "0.9rem",
              }}
            >
              <AlertCircle size={18} style={{ color: "var(--accent-red)", flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Grid Fields */}
          <div
            className="enquiry-grid-fields"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "1.75rem",
              marginBottom: "1.75rem",
            }}
          >
            {/* Field: Name (Required) */}
            <div>
              <label
                htmlFor="field-name"
                style={{
                  display: "block",
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#E0E0E0",
                  marginBottom: "0.5rem",
                }}
              >
                Your Name <span style={{ color: "var(--accent-red)" }}>*</span>
              </label>
              <input
                id="field-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                aria-required="true"
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                placeholder="e.g. Rajesh Kumar"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${fieldErrors.name ? "error" : ""}`}
                style={{ backgroundColor: "#222222", color: "#FFFFFF", borderColor: fieldErrors.name ? "var(--accent-red)" : "#333333" }}
              />
              {fieldErrors.name && (
                <span
                  id="name-error"
                  role="alert"
                  style={{ display: "block", fontSize: "0.78rem", color: "var(--accent-red)", marginTop: "0.35rem" }}
                >
                  {fieldErrors.name}
                </span>
              )}
            </div>

            {/* Field: Phone (Required, Indian Mobile) */}
            <div>
              <label
                htmlFor="field-phone"
                style={{
                  display: "block",
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#E0E0E0",
                  marginBottom: "0.5rem",
                }}
              >
                Mobile Number <span style={{ color: "var(--accent-red)" }}>*</span>
              </label>
              <input
                id="field-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                aria-required="true"
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                placeholder="10-digit mobile (e.g. 98116 75192)"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${fieldErrors.phone ? "error" : ""}`}
                style={{ backgroundColor: "#222222", color: "#FFFFFF", borderColor: fieldErrors.phone ? "var(--accent-red)" : "#333333" }}
              />
              {fieldErrors.phone && (
                <span
                  id="phone-error"
                  role="alert"
                  style={{ display: "block", fontSize: "0.78rem", color: "var(--accent-red)", marginTop: "0.35rem" }}
                >
                  {fieldErrors.phone}
                </span>
              )}
            </div>

            {/* Field: Venue / Space Type (Required) */}
            <div>
              <label
                htmlFor="field-spaceType"
                style={{
                  display: "block",
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#E0E0E0",
                  marginBottom: "0.5rem",
                }}
              >
                Type of Space / Venue <span style={{ color: "var(--accent-red)" }}>*</span>
              </label>
              <select
                id="field-spaceType"
                name="spaceType"
                required
                aria-required="true"
                aria-invalid={!!fieldErrors.spaceType}
                aria-describedby={fieldErrors.spaceType ? "space-error" : undefined}
                value={formData.spaceType}
                onChange={handleChange}
                className={`form-select ${fieldErrors.spaceType ? "error" : ""}`}
                style={{ backgroundColor: "#222222", color: "#FFFFFF", borderColor: fieldErrors.spaceType ? "var(--accent-red)" : "#333333" }}
              >
                {spaceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {fieldErrors.spaceType && (
                <span
                  id="space-error"
                  role="alert"
                  style={{ display: "block", fontSize: "0.78rem", color: "var(--accent-red)", marginTop: "0.35rem" }}
                >
                  {fieldErrors.spaceType}
                </span>
              )}
            </div>

            {/* Field: City / Location (Required) */}
            <div>
              <label
                htmlFor="field-city"
                style={{
                  display: "block",
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#E0E0E0",
                  marginBottom: "0.5rem",
                }}
              >
                City / Location <span style={{ color: "var(--accent-red)" }}>*</span>
              </label>
              <input
                id="field-city"
                name="city"
                type="text"
                required
                autoComplete="address-level2"
                aria-required="true"
                aria-invalid={!!fieldErrors.city}
                aria-describedby={fieldErrors.city ? "city-error" : undefined}
                placeholder="e.g. Delhi, NCR, or Pan India"
                value={formData.city}
                onChange={handleChange}
                className={`form-input ${fieldErrors.city ? "error" : ""}`}
                style={{ backgroundColor: "#222222", color: "#FFFFFF", borderColor: fieldErrors.city ? "var(--accent-red)" : "#333333" }}
              />
              {fieldErrors.city && (
                <span
                  id="city-error"
                  role="alert"
                  style={{ display: "block", fontSize: "0.78rem", color: "var(--accent-red)", marginTop: "0.35rem" }}
                >
                  {fieldErrors.city}
                </span>
              )}
            </div>

            {/* Field: Email (Optional) */}
            <div>
              <label
                htmlFor="field-email"
                style={{
                  display: "block",
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "#BDBDBD",
                  marginBottom: "0.5rem",
                }}
              >
                Email Address <span style={{ fontSize: "0.75rem", color: "#777777" }}>(Optional)</span>
              </label>
              <input
                id="field-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                placeholder="name@institution.edu or company.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                style={{ backgroundColor: "#222222", color: "#FFFFFF", borderColor: fieldErrors.email ? "var(--accent-red)" : "#333333" }}
              />
              {fieldErrors.email && (
                <span
                  id="email-error"
                  role="alert"
                  style={{ display: "block", fontSize: "0.78rem", color: "var(--accent-red)", marginTop: "0.35rem" }}
                >
                  {fieldErrors.email}
                </span>
              )}
            </div>

            {/* Field: Timeline (Optional) */}
            <div>
              <label
                htmlFor="field-timeline"
                style={{
                  display: "block",
                  fontFamily: "var(--font-family-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "#BDBDBD",
                  marginBottom: "0.5rem",
                }}
              >
                Project Timeline <span style={{ fontSize: "0.75rem", color: "#777777" }}>(Optional)</span>
              </label>
              <select
                id="field-timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="form-select"
                style={{ backgroundColor: "#222222", color: "#FFFFFF", borderColor: "#333333" }}
              >
                {timelineOptions.map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Field: Requirement Description (Optional) */}
          <div style={{ marginBottom: "2rem" }}>
            <label
              htmlFor="field-requirement"
              style={{
                display: "block",
                fontFamily: "var(--font-family-sans)",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#E0E0E0",
                marginBottom: "0.5rem",
              }}
            >
              Requirement Description <span style={{ fontSize: "0.75rem", color: "#777777" }}>(Optional)</span>
            </label>
            <textarea
              id="field-requirement"
              name="requirement"
              rows={4}
              placeholder="Tell us about the space dimensions, seating, or functional goal (e.g. '300-seat school hall needing clear speech without feedback')."
              value={formData.requirement}
              onChange={handleChange}
              className="form-textarea"
              style={{ backgroundColor: "#222222", color: "#FFFFFF", borderColor: "#333333", resize: "vertical" }}
            />
            <span
              style={{
                display: "block",
                fontSize: "0.8rem",
                color: "#888888",
                marginTop: "0.45rem",
              }}
            >
              No need for technical specs. Just describe how the room will be used, and our team will assist you.
            </span>
          </div>

          {/* Response time note if configured */}
          {SITE_CONFIG.unconfirmed.responseTimeHours && (
            <div style={{ marginBottom: "1.25rem", fontSize: "0.82rem", color: "#25D366", fontFamily: "var(--font-family-sans)" }}>
              Our team will get back to you within {SITE_CONFIG.unconfirmed.responseTimeHours} hours.
            </div>
          )}

          {/* Submit Action */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.25rem" }}>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              id="enquiry-submit-btn"
              style={{
                padding: "1rem 2.25rem",
                fontSize: "1rem",
                opacity: loading ? 0.75 : 1,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Submitting Requirement...</span>
                </>
              ) : (
                <>
                  <span>{SITE_CONFIG.cta.primary}</span>
                  <ArrowUpRight size={18} />
                </>
              )}
            </button>

            <span style={{ fontSize: "0.8rem", color: "#777777", fontFamily: "var(--font-family-sans)" }}>
              Reviewed by our technical team
            </span>
          </div>

          {/* Consent line linking to Privacy Policy */}
          <p style={{ fontSize: "0.78rem", color: "#888888", marginTop: "1.25rem", lineHeight: 1.5 }}>
            By submitting this form, you consent to our team contacting you regarding your audio requirement in accordance with our{" "}
            <NextLink href="/privacy-policy" style={{ color: "#CCCCCC", textDecoration: "underline" }}>
              Privacy Policy
            </NextLink>.
          </p>
        </form>
      )}
    </div>
  );

  return embedded ? (
    <div style={{ width: "100%" }}>{formContent}</div>
  ) : (
    <section
      id="enquiry"
      className="section-dark relative overflow-hidden"
      style={{
        padding: "clamp(5.5rem, 11vw, 9rem) 0",
        backgroundColor: "var(--bg-black)",
      }}
    >
      <div className="site-container">{formContent}</div>
    </section>
  );
}
