import { NextResponse } from "next/server";
import { profile } from "@/data/portfolio";

export const runtime = "nodejs";

type Payload = { name?: string; email?: string; message?: string; company?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  // Honeypot — bots fill hidden fields; humans don't.
  if (body.company) return NextResponse.json({ ok: true });

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  if (message.length < 10) errors.message = "Message must be at least 10 characters.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  // "from" must be a Resend-verified domain; falls back to the shared sandbox sender.
  const from = process.env.CONTACT_FROM_EMAIL || "Hunter System <onboarding@resend.dev>";

  if (!apiKey) {
    // No mail provider configured yet: don't fail silently — tell the client to
    // fall back to a mailto link so the message is never lost.
    return NextResponse.json(
      { ok: false, code: "NO_PROVIDER", error: "Email service not configured." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New transmission from ${name}`,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;background:#0a0a12;color:#f5f5f7;padding:24px;border-radius:12px">
            <h2 style="color:#a78bfa;margin:0 0 12px">New message from the portfolio</h2>
            <p style="margin:4px 0"><strong>Name:</strong> ${esc(name)}</p>
            <p style="margin:4px 0"><strong>Email:</strong> ${esc(email)}</p>
            <p style="margin:12px 0 4px"><strong>Message:</strong></p>
            <p style="white-space:pre-wrap;line-height:1.6;color:#d4d4e0">${esc(message)}</p>
          </div>`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", detail);
      return NextResponse.json({ ok: false, error: "Failed to send. Try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error." }, { status: 500 });
  }
}
