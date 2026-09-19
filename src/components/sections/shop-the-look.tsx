"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus, X } from "lucide-react";
import { getProduct } from "@/lib/catalogue";
import { SectionHeading, Reveal } from "@/components/ui";
import { formatINR, picsum } from "@/lib/utils";

const looks = [
  {
    id: "look-1",
    title: "The Crimson Evening",
    sub: "Festive-ready in 3 pieces",
    image: picsum("vmlook-crimson", 1200, 800),
    hotspots: [
      { x: 38, y: 42, pid: "w-dress-wrap" },
      { x: 62, y: 66, pid: "a-heels" },
      { x: 50, y: 22, pid: "a-bag" },
    ],
  },
  {
    id: "look-2",
    title: "Siwan Street Sharp",
    sub: "Everyday confidence",
    image: picsum("vmlook-street", 1200, 800),
    hotspots: [
      { x: 44, y: 40, pid: "m-tshirt-classic" },
      { x: 58, y: 70, pid: "m-joggers" },
      { x: 30, y: 30, pid: "a-cap" },
    ],
  },
];

export function ShopTheLook() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-36, 36]);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="section-warm px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Shop the Look"
            title={
              <>
                Styled, not <span className="text-vmart-red">just sold.</span>
              </>
            }
            subtitle="Tap the dots to shop the exact pieces from our Siwan editorial shoots."
            align="center"
          />
        </Reveal>

        <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-2">
          {looks.map((look, li) => (
            <Reveal key={look.id} delay={li * 0.1}>
              <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-black/10">
                <motion.div style={{ y: yImg }} className="aspect-[3/2] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={look.image}
                    alt={look.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                <div className="absolute left-5 top-5">
                  <h3 className="font-display text-2xl text-white">{look.title}</h3>
                  <p className="text-sm text-white/80">{look.sub}</p>
                </div>

                {look.hotspots.map((h, i) => {
                  const p = getProduct(h.pid);
                  if (!p) return null;
                  const isOpen = open === `${look.id}-${i}`;
                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : `${look.id}-${i}`)}
                        aria-label={`View ${p.name}`}
                        className="relative grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-vmart-red shadow-lg animate-pulse-ring"
                      >
                        {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute left-1/2 top-6 w-44 -translate-x-1/2 rounded-2xl bg-white p-2 text-left shadow-2xl"
                          >
                            <Link
                              href={`/product/${p.slug}`}
                              onClick={() => setOpen(null)}
                              className="flex gap-2"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={p.image}
                                alt=""
                                className="h-16 w-12 rounded-lg object-cover"
                              />
                              <span className="min-w-0">
                                <span className="block truncate text-xs font-semibold text-zinc-900">
                                  {p.name}
                                </span>
                                <span className="text-xs font-bold text-vmart-red-deep">
                                  {formatINR(p.salePrice ?? p.price)}
                                </span>
                              </span>
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
