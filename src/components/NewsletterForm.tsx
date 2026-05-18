"use client";

import { useState, type FormEvent } from "react";
import type { Locale, UiText } from "@/lib/content";
import { track } from "@/lib/track";

type NewsletterFormProps = {
  locale: Locale;
  ui: UiText;
};

type Status = "idle" | "submitting" | "success" | "error_invalid" | "error_generic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm({ locale, ui }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submitting = status === "submitting";
  const success = status === "success";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || success) return;

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error_invalid");
      track("newsletter_error", { locale, reason: "invalid" });
      return;
    }

    setStatus("submitting");
    track("newsletter_submit", { locale });

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, locale }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        track("newsletter_success", { locale });
        return;
      }

      if (data.error === "invalid") {
        setStatus("error_invalid");
        track("newsletter_error", { locale, reason: "invalid" });
        return;
      }

      setStatus("error_generic");
      track("newsletter_error", {
        locale,
        reason: data.error ?? "unknown",
      });
    } catch {
      setStatus("error_generic");
      track("newsletter_error", { locale, reason: "network" });
    }
  }

  const errorMsg =
    status === "error_invalid"
      ? ui.newsletterErrorInvalid
      : status === "error_generic"
        ? ui.newsletterErrorGeneric
        : null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="eyebrow mb-3">{ui.newsletterEyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
          {ui.newsletterHeading}
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          {ui.newsletterBody}
        </p>

        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {ui.newsletterPlaceholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error_invalid" || status === "error_generic") {
                setStatus("idle");
              }
            }}
            placeholder={ui.newsletterPlaceholder}
            disabled={submitting || success}
            required
            autoComplete="email"
            className="flex-1 px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-colors disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={submitting || success}
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[var(--color-primary-deep)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {success ? ui.newsletterSuccess : ui.newsletterSubmit}
          </button>
        </form>

        {errorMsg ? (
          <p
            role="alert"
            className="mt-3 text-sm text-[var(--color-text-secondary)]"
          >
            {errorMsg}
          </p>
        ) : null}
      </div>
    </section>
  );
}
