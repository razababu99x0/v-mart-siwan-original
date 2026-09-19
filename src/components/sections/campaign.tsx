"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Ticket, ArrowRight, Sparkles } from "lucide-react";
import { offers } from "@/lib/catalogue";
import { SectionHeading, Reveal, MagneticButton } from "@/components/ui";

export function Campaign() {
  const reduce = useReducedMotion();

  return (
    <section id="campaign" className="relative scroll-mt-32 overflow-hidden bg-ink py-20 lg:py-28">
      {/* heavy motion background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-vmart-red/25 blur-[120px] animate-floaty" />
        <div className="absolute right-1/4 bottom-0 h-[26rem] w-[26rem] translate-x-1/2 rounded-full bg-vmart-red-deep/30 blur-[120px]" />
        {!reduce && (
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_50%_50%,transparent_0,rgba(0,0,0,0.6)_100%)]" />
        )}
      </div>

      <div className="relative mx-auto max-w-7xl px-5">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Festive Campaign"
            title={
              <>
                The <span className="text-gradient-red">Chhath &amp; Wedding</span> Edit
              </>
            }
            subtitle="Limited drops, deeper discounts. Curated for Siwan's biggest season of the year."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {offers.map((o, i) => (
            <Reveal key={o.code} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl glass p-6 ring-1 ring-white/10"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-vmart-red/20 blur-2xl transition-opacity group-hover:opacity-100" />
                <Ticket className="h-8 w-8 text-vmart-gold" />
                <h3 className="mt-4 font-display text-3xl text-white">{o.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{o.sub}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-zinc-300">
                    {o.code}
                  </span>
                  <MagneticButton
                    href="/#shop"
                    strength={0.3}
                    className="bg-white/10 px-5 py-2.5 text-white hover:bg-vmart-red"
                  >
                    Shop <ArrowRight className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <MagneticButton
            href="/#shop"
            strength={0.5}
            className="bg-vmart-red px-8 py-4 text-white shadow-2xl shadow-vmart-red/30 hover:bg-vmart-red-deep"
          >
            <Sparkles className="h-4 w-4" /> Unlock the festive edit
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
