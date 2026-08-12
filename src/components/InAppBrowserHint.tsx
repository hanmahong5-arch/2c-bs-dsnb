"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { track } from "@/lib/track";

// In-app browsers (especially WeChat) intercept switch:// deeplinks and
// frequently block GitHub release pages. This banner nudges users to open
// the page in the system browser, where downloads and deeplinks both work.

type InAppClient =
  | "wechat"
  | "qq"
  | "weibo"
  | "xhs"
  | "bilibili"
  | "dingtalk"
  | "alipay";

const STORAGE_KEY = "dsnb_in_app_hint_dismissed";
const SITE_URL = "https://dsnb.help";

function detectInAppClient(): InAppClient | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("micromessenger")) return "wechat";
  if (ua.includes("qq/") || ua.includes("qqtheme") || ua.includes("mqqbrowser/"))
    return "qq";
  if (ua.includes("weibo")) return "weibo";
  if (ua.includes("xhsdiscover")) return "xhs";
  if (ua.includes("bilibili")) return "bilibili";
  if (ua.includes("dingtalk")) return "dingtalk";
  if (ua.includes("alipayclient")) return "alipay";
  return null;
}

const CLIENT_LABEL: Record<InAppClient, string> = {
  wechat: "微信",
  qq: "QQ",
  weibo: "微博",
  xhs: "小红书",
  bilibili: "B 站",
  dingtalk: "钉钉",
  alipay: "支付宝",
};

// useSyncExternalStore: server returns null (no banner), client computes
// from UA + sessionStorage. This is the React-blessed pattern for
// "show different thing on server vs client" without hydration mismatch.
const subscribe = () => () => {};

function getClientSnapshot(): InAppClient | null {
  if (typeof window === "undefined") return null;
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return null;
  } catch {
    // sessionStorage may be unavailable in some embedded contexts; ignore.
  }
  return detectInAppClient();
}

const getServerSnapshot = (): InAppClient | null => null;

export function InAppBrowserHint() {
  const client = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (client) track("in_app_hint_shown", { client });
  }, [client]);

  const onDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    track("in_app_hint_dismissed", { client: client ?? "unknown" });
  };

  const onCopy = async () => {
    track("in_app_hint_copy_url", { client: client ?? "unknown" });
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Older WebView clipboard fallback
      const ta = document.createElement("textarea");
      ta.value = SITE_URL;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        // give up silently
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <AnimatePresence>
      {client && !dismissed && (
        <motion.div
          role="status"
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 px-3 py-2.5 backdrop-blur-md border-b"
          style={{
            background: "rgba(13, 17, 48, 0.92)",
            borderColor: "rgba(77, 107, 254, 0.4)",
          }}
        >
          <div className="max-w-3xl mx-auto flex items-center gap-2 text-xs sm:text-sm text-[var(--color-text-primary)]">
            <BrowserIcon />
            <span className="flex-1 leading-snug">
              <span className="text-[var(--color-primary-light)] font-medium">
                {CLIENT_LABEL[client]}内
              </span>
              无法下载 Switch · 点右上角{" "}
              <span className="font-mono px-1 rounded bg-[var(--color-primary)]/15">
                ⋯
              </span>{" "}
              在浏览器打开
            </span>
            <button
              onClick={onCopy}
              className="flex-shrink-0 px-2.5 py-1 rounded-md text-xs border border-[var(--color-primary)]/40 text-[var(--color-primary-light)] hover:bg-[var(--color-primary)]/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              {copied ? "已复制" : "复制链接"}
            </button>
            <button
              onClick={onDismiss}
              aria-label="关闭提示"
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-primary)]/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            >
              <CloseIcon />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BrowserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 text-[var(--color-primary-light)]"
    >
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2 9h14M9 2c2 2.5 2 11.5 0 14M9 2c-2 2.5-2 11.5 0 14"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 3l8 8M11 3l-8 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
