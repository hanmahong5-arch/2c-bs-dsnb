"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ContentBundle } from "@/lib/content";

type IntroProps = {
  intro: ContentBundle["intro"];
};

export function IntroSection({ intro }: IntroProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6 text-gradient-blue headline-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {intro.headline}
        </motion.h2>

        <motion.p
          className="text-lg text-[var(--color-text-secondary)] leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          {intro.body}
        </motion.p>
      </div>
    </section>
  );
}
