import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  organization?: string;
  link?: string;
  usecase?: string;
  companyWebsite?: string;
};

const requiredEnv = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL"];

function clean(value: unknown, maxLength: number) {
  return String(value ?? "")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length) {
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Basic honeypot. Real users never see/fill this field.
  if (payload.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 180);
  const organization = clean(payload.organization, 180);
  const link = clean(payload.link, 240);
  const usecase = clean(payload.usecase, 3000);

  if (!name || !email || !organization || !usecase || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please complete the required fields." },
      { status: 400 },
    );
  }

  const subject = `Physera enquiry — ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization}`,
    `Link: ${link || "N/A"}`,
    "",
    usecase,
  ].join("\n");

  const html = `
    <div>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Organization:</strong> ${escapeHtml(organization)}</p>
      <p><strong>Link:</strong> ${escapeHtml(link || "N/A")}</p>
      <hr />
      <p style="white-space: pre-wrap;">${escapeHtml(usecase)}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not send your message. Please email hello@physera.ai." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
