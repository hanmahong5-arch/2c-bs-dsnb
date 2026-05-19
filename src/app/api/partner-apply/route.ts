import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OPERATOR_EMAIL = "marvin.uu@gmail.com";

type PartnerApplyBody = {
  email?: string;
  name?: string;
  company?: string;
  region?: string;
  message?: string;
  locale?: "zh" | "en";
};

type PartnerApplyError = "invalid" | "config" | "upstream";

function fail(error: PartnerApplyError, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: PartnerApplyBody;
  try {
    body = (await req.json()) as PartnerApplyBody;
  } catch {
    return fail("invalid", 400);
  }

  const email = body.email?.trim() ?? "";
  const name = body.name?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const region = body.region?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const locale = body.locale === "en" ? "en" : "zh";

  if (!email || !EMAIL_RE.test(email) || !name) {
    return fail("invalid", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID_PARTNER;

  if (!apiKey || !audienceId) {
    console.warn("[partner-apply] missing RESEND env vars; skipping create");
    return fail("config", 500);
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.contacts.create({
      audienceId,
      email,
      firstName: name,
      unsubscribed: false,
    });
    if (error) {
      console.warn("[partner-apply] resend contacts error", error);
      return fail("upstream", 502);
    }
  } catch (err) {
    console.warn("[partner-apply] resend contacts exception", err);
    return fail("upstream", 502);
  }

  // Best-effort operator notification. Contact already saved at this point,
  // so a notify failure shouldn't fail the request.
  try {
    const html = `
      <h2>New partner application (${escapeHtml(locale)})</h2>
      <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px">
        <tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><b>Company</b></td><td>${escapeHtml(company) || "—"}</td></tr>
        <tr><td><b>Region</b></td><td>${escapeHtml(region) || "—"}</td></tr>
        <tr><td><b>Locale</b></td><td>${escapeHtml(locale)}</td></tr>
      </table>
      ${message ? `<h3>Message</h3><pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;font-size:14px">${escapeHtml(message)}</pre>` : ""}
    `;
    await resend.emails.send({
      from: "dsnb.help <onboarding@resend.dev>",
      to: OPERATOR_EMAIL,
      replyTo: email,
      subject: `[dsnb partner] ${name} · ${region || locale}`,
      html,
    });
  } catch (err) {
    console.warn("[partner-apply] operator notify failed", err);
  }

  return NextResponse.json({ ok: true });
}
