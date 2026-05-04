import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "hello@physera.ai";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Physera Website <hello@physera.ai>";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  website?: unknown;
  message?: unknown;
  companyPhone?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function normalizeWebsite(value: string) {
  if (!value) return "";

  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isAllowedOrigin(origin: string | null) {
  if (!origin) return false;

  try {
    const { hostname } = new URL(origin);
    const vercelHost = process.env.VERCEL_URL;

    if (hostname === "physera.ai" || hostname === "www.physera.ai") return true;
    if (vercelHost && hostname === vercelHost) return true;

    if (process.env.NODE_ENV !== "production") {
      return (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.startsWith("192.168.")
      );
    }

    return false;
  } catch {
    return false;
  }
}

function validationError() {
  return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > MAX_BODY_BYTES || !isAllowedOrigin(request.headers.get("origin"))) {
    return validationError();
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return validationError();
  }

  if (text(payload.companyPhone)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(payload.name);
  const email = text(payload.email).toLowerCase();
  const organization = text(payload.organization);
  const websiteInput = text(payload.website);
  const website = normalizeWebsite(websiteInput);
  const message = text(payload.message);

  if (
    name.length < 2 ||
    name.length > 120 ||
    !isValidEmail(email) ||
    organization.length < 1 ||
    organization.length > 160 ||
    (websiteInput && !website) ||
    message.length < 2 ||
    message.length > 3000
  ) {
    return validationError();
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: false, message: "Email is not configured." }, { status: 503 });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
      <p>${escapeHtml(organization)}</p>
      ${
        website
          ? `<p><a href="${escapeHtml(website)}">${escapeHtml(website)}</a></p>`
          : ""
      }
      <hr style="border: 0; border-top: 1px solid #ddd; margin: 16px 0;" />
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    </div>
  `;

  const plainText = [
    `${name} <${email}>`,
    organization,
    website,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `Physera contact: ${name}`,
    text: plainText,
    html,
  });

  if (error) {
    console.error("Resend contact email failed", JSON.stringify(error, null, 2));
    return NextResponse.json({ ok: false, message: "Email failed to send." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
