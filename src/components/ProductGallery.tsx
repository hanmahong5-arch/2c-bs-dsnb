"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ContentBundle } from "@/lib/content";

type ProductCardProps = {
  product: ContentBundle["products"][number];
  index: number;
};

function ProductCard({ product, index }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const inner = (
    <div className="card h-full p-5 flex flex-col gap-3 group cursor-default">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-[var(--color-text-primary)] text-base leading-snug group-hover:text-[var(--color-primary-light)] transition-colors duration-200">
          {product.name}
        </h3>
        <span
          className="flex-shrink-0 text-xs font-mono px-2 py-0.5 rounded-md"
          style={{
            background: "rgba(77,107,254,0.1)",
            color: "var(--color-primary-light)",
            border: "1px solid rgba(77,107,254,0.2)",
          }}
        >
          {product.year}
        </span>
      </div>

      {/* Bullet */}
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
        {product.bullet}
      </p>

      {/* Impact */}
      <div
        className="mt-auto pt-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]"
      >
        <span className="text-[var(--color-accent)] font-medium">Impact: </span>
        {product.impact}
      </div>

      {/* External link indicator */}
      {product.url && (
        <div className="text-xs text-[var(--color-primary)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span>查看项目</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path
              d="M2 8L8 2M5 2h3v3"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index * 0.07, 0.35),
      }}
    >
      {product.url ? (
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}

type ProductGalleryProps = {
  products: ContentBundle["products"];
};

export function ProductGallery({ products }: ProductGalleryProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const cols =
    products.length >= 6 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Divider */}
        <div className="section-divider mb-16" />

        {/* Header */}
        <div ref={headerRef} className="mb-10 text-center">
          <motion.p
            className="eyebrow mb-3"
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            研究产出
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold headline-tight"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            产品图谱
          </motion.h2>
        </div>

        {/* Grid */}
        <div className={`grid grid-cols-1 ${cols} gap-4`}>
          {products.map((p, i) => (
            <ProductCard key={`${p.name}-${i}`} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
