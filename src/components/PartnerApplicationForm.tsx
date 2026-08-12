"use client";

import { useState, type FormEvent } from "react";
import type { Locale, PartnerSection } from "@/lib/content";
import { track } from "@/lib/track";

type PartnerApplicationFormProps = {
  locale: Locale;
  partner: PartnerSection;
};

type Status =
  | "idle"
  | "submitting"
  | "success"
  | "error_invalid"
  | "error_generic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PartnerApplicationForm({
  locale,
  partner,
}: PartnerApplicationFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [region, setRegion] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submitting = status === "submitting";
  const success = status === "success";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || success) return;

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    if (!EMAIL_RE.test(trimmedEmail) || !trimmedName) {
      setStatus("error_invalid");
      track("partner_error", { locale, reason: "invalid" });
      return;
    }

    setStatus("submitting");
    track("partner_submit", { locale });

    try {
      const res = await fetch("/api/partner-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          name: trimmedName,
          company: company.trim(),
          region: region.trim(),
          message: message.trim(),
          locale,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        track("partner_success", { locale });
        return;
      }

      if (data.error === "invalid") {
        setStatus("error_invalid");
        track("partner_error", { locale, reason: "invalid" });
        return;
      }

      setStatus("error_generic");
      track("partner_error", {
        locale,
        reason: data.error ?? "unknown",
      });
    } catch {
      setStatus("error_generic");
      track("partner_error", { locale, reason: "network" });
    }
  }

  const errorMsg =
    status === "error_invalid"
      ? partner.formErrorInvalid
      : status === "error_generic"
        ? partner.formErrorGeneric
        : null;

  function clearError() {
    if (status === "error_invalid" || status === "error_generic") {
      setStatus("idle");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
      noValidate
    >
      <Field
        id="partner-email"
        label={partner.formEmailLabel}
        type="email"
        value={email}
        onChange={(v) => {
          setEmail(v);
          clearError();
        }}
        required
        autoComplete="email"
        disabled={submitting || success}
      />
      <Field
        id="partner-name"
        label={partner.formNameLabel}
        value={name}
        onChange={(v) => {
          setName(v);
          clearError();
        }}
        required
        autoComplete="name"
        disabled={submitting || success}
      />
      <Field
        id="partner-company"
        label={partner.formCompanyLabel}
        value={company}
        onChange={setCompany}
        autoComplete="organization"
        disabled={submitting || success}
      />
      <Field
        id="partner-region"
        label={partner.formRegionLabel}
        value={region}
        onChange={setRegion}
        disabled={submitting || success}
      />
      <div className="sm:col-span-2">
        <label
          htmlFor="partner-message"
          className="block text-sm text-[var(--color-text-muted)] mb-2"
        >
          {partner.formMessageLabel}
        </label>
        <textarea
          id="partner-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          disabled={submitting || success}
          className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus:border-[var(--color-primary)] transition-colors disabled:opacity-60"
        />
      </div>
      <div className="sm:col-span-2 flex flex-col items-center gap-3 mt-2">
        <button
          type="submit"
          disabled={submitting || success}
          className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[var(--color-primary-deep)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {success
            ? partner.formSuccess
            : submitting
              ? partner.formSubmitting
              : partner.formSubmit}
        </button>
        {errorMsg ? (
          <p
            role="alert"
            className="text-sm text-[var(--color-text-secondary)]"
          >
            {errorMsg}
          </p>
        ) : null}
      </div>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
};

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
  disabled,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm text-[var(--color-text-muted)] mb-2"
      >
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
        className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus:border-[var(--color-primary)] transition-colors disabled:opacity-60"
      />
    </div>
  );
}
