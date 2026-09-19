"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeKey = "new" | "bestseller" | "sale" | "limited" | "trending";

/* ----------------------------- Reveal ----------------------------- */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* --------------------------- MagneticBtn -------------------------- */
export function MagneticButton({
  children,
  className,
  as = "button",
  href,
  onClick,
  strength = 0.4,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  strength?: number;
} & HTMLMotionProps<"button">) {
  const reduce = useReducedMotion();
  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const reset = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
  };

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors will-change-transform",
    className
  );

  if (as === "a" && href) {
    return (
      <motion.a
        href={href}
        className={classes}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={classes}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/* ----------------------------- Badge ------------------------------ */
export function TagBadge({ type }: { type: BadgeKey }) {
  const map: Record<string, { label: string; cls: string }> = {
    new: { label: "NEW", cls: "bg-white text-zinc-900" },
    bestseller: { label: "BESTSELLER", cls: "bg-vmart-red text-white" },
    sale: { label: "SALE", cls: "bg-vmart-gold text-zinc-900" },
    limited: { label: "LIMITED", cls: "bg-zinc-900 text-white border border-white/20" },
    trending: { label: "TRENDING", cls: "bg-zinc-100/90 text-zinc-900" },
  };
  const b = map[type] ?? map.new;
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
        b.cls
      )}
    >
      {b.label}
    </span>
  );
}

/* ------------------------- SectionHeading ------------------------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.32em] text-vmart-red-soft"
        >
          {eyebrow}
        </motion.span>
      )}
      <h2
        className={cn(
          "font-display text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl",
          align === "center" && "text-balance"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ----------------------------- Marquee ---------------------------- */
export function MarqueeBar({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t, i) => (
        <span
          key={i}
          className="flex items-center gap-10 font-poster text-sm uppercase tracking-[0.2em] text-zinc-300"
        >
          {t}
          <span className="text-vmart-red">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}

/* --------------------------- StarRating --------------------------- */
export function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-vmart-gold" aria-label={`Rated ${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill={i < Math.round(value) ? "currentColor" : "none"} stroke="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9L10 1.5z" strokeWidth="1.2" />
        </svg>
      ))}
      <span className="ml-1 text-xs font-medium text-zinc-400">{value.toFixed(1)}</span>
    </span>
  );
}
