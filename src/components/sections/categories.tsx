"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/catalogue";
import { SectionHeading, Reveal } from "@/components/ui";

function TiltTile({
  cat,
  index,
}: {
  cat: (typeof categories)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <Reveal delay={index * 0.08} className={cat.span}>
      <motion.div
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="group relative h-64 overflow-hidden rounded-3xl ring-1 ring-white/10 lg:h-full"
      >
        <Link ref={ref} href={cat.href} className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cat.image}
            alt={cat.label}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
          <div className="absolute inset-0 bg-vmart-red/0 transition-colors duration-500 group-hover:bg-vmart-red/15" />
          <div className="absolute inset-0 opacity-0 ring-2 ring-inset ring-vmart-red/50 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vmart-red-soft">
                {cat.tag}
              </p>
              <h3 className="font-display text-3xl text-white lg:text-4xl">{cat.label}</h3>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full glass text-white transition-all duration-300 group-hover:bg-vmart-red group-hover:text-white">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </Link>
      </motion.div>
    </Reveal>
  );
}

export function Categories() {
  return (
    <section id="categories" className="section-warm scroll-mt-32 px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Shop by Category"
            title={
              <>
                Four worlds. <span className="text-vmart-red">One address.</span>
              </>
            }
            subtitle="From boardroom sharp to festive fierce — find your fit in Siwan."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {categories.map((cat, i) => (
            <TiltTile key={cat.key} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
