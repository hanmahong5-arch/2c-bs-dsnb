import { useSyncExternalStore } from "react";
import type { UiText } from "./content";

export type Platform = "win" | "mac" | "linux" | "unknown";

const RELEASES_BASE =
  "https://github.com/LurusTech/lurus-switch/releases/latest";

// GitHub serves /releases/latest/download/<asset> as a 302 to the latest
// release's asset by exact filename — no API call needed, version-agnostic.
const ASSETS: Record<Exclude<Platform, "unknown" | "mac" | "linux">, string> = {
  win: "lurus-switch.exe",
};

export function detectPlatform(): Platform {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "unknown";
  }

  // Prefer the modern UA-Client-Hints API where available.
  const uaData = (
    navigator as Navigator & {
      userAgentData?: { platform?: string };
    }
  ).userAgentData;
  const hinted = uaData?.platform?.toLowerCase();
  if (hinted) {
    if (hinted.includes("win")) return "win";
    if (hinted.includes("mac")) return "mac";
    if (hinted.includes("linux") || hinted.includes("chrome os")) return "linux";
  }

  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("windows")) return "win";
  if (ua.includes("mac os") || ua.includes("macintosh")) return "mac";
  if (ua.includes("linux") || ua.includes("cros")) return "linux";
  return "unknown";
}

export function switchDownloadUrl(platform: Platform): string {
  if (platform === "win") {
    return `${RELEASES_BASE}/download/${ASSETS.win}`;
  }
  return RELEASES_BASE;
}

// Stable no-op subscription — navigator.userAgent is read-only and never
// changes within a session, so useSyncExternalStore never needs to notify.
const noopSubscribe = () => () => {};
const unknownPlatform = (): Platform => "unknown";

export function usePlatform(): Platform {
  return useSyncExternalStore(
    noopSubscribe,
    detectPlatform,
    unknownPlatform,
  );
}

export function switchPlatformLabel(
  platform: Platform,
  ui: UiText,
): string | null {
  switch (platform) {
    case "win":
      return ui.downloadForWindows;
    case "mac":
    case "linux":
      return ui.downloadComingSoonMac;
    case "unknown":
      return null;
  }
}
