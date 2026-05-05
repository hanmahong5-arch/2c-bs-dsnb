"use client";

import { useEffect, useState } from "react";

// Thin scroll-progress indicator pinned to the top of the viewport. Updates
// via requestAnimationFrame so it doesn't fight with the user's scroll on
// mid-tier mobile.
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const compute = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const ratio = total > 0 ? doc.scrollTop / total : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
      frame = 0;
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-40 h-[2px] pointer-events-none"
      style={{
        background: "rgba(77, 107, 254, 0.08)",
      }}
    >
      <div
        className="h-full"
        style={{
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)",
          transition: "width 80ms linear",
          boxShadow: "0 0 8px rgba(77, 107, 254, 0.5)",
        }}
      />
    </div>
  );
}
