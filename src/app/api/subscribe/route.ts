import { NextResponse } from "next/server";
import { Resend } from "resend";

// Minimal RFC-5322-ish check. Stricter validation happens server-side at Resend.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeBody = {
  email?: string;
  locale?: "zh" | "en";
};

type SubscribeError = "invalid" | "config" | "upstream";

function fail(error: SubscribeError, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: SubscribeBody;
  try {
    body = (await req.json()) as SubscribeBody;
  } catch {
    return fail("invalid", 400);
  }

  const email = body.email?.trim() ?? "";
  const locale = body.locale === "en" ? "en" : "zh";

  if (!email || !EMAIL_RE.test(email)) {
    return fail("invalid", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId =
    locale === "en"
      ? process.env.RESEND_AUDIENCE_ID_EN
      : process.env.RESEND_AUDIENCE_ID_ZH;

  if (!apiKey || !audienceId) {
    // Graceful degradation: keep build green before operator wires up Resend.
    console.warn("[subscribe] missing RESEND env vars; skipping create");
    return fail("config", 500);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.create({
      audienceId,
      email,
      unsubscribed: false,
    });
    if (error) {
      console.warn("[subscribe] resend error", error);
      return fail("upstream", 502);
    }
  } catch (err) {
    console.warn("[subscribe] resend exception", err);
    return fail("upstream", 502);
  }

  return NextResponse.json({ ok: true });
}
