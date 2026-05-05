"use client";

import { track as vercelTrack } from "@vercel/analytics";

// Funnel events. Keep this list authoritative — analytics dashboards
// pivot on these exact strings.
export type CTAEvent =
  | "cta_download_hero"
  | "cta_download_closing"
  | "cta_download_fallback"
  | "cta_deeplink_import"
  | "cta_deeplink_fallback_shown"
  | "cta_scroll_timeline"
  | "outbound_product"
  | "outbound_source"
  | "in_app_hint_shown"
  | "in_app_hint_dismissed"
  | "in_app_hint_copy_url";

type Props = Record<string, string | number | boolean>;

export function track(event: CTAEvent, props?: Props): void {
  try {
    vercelTrack(event, props);
  } catch {
    // best-effort: analytics must never block the UI
  }
}
