"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Wallet } from "lucide-react";
import { budgetTiers, productsByBudget } from "@/lib/catalogue";
import { SectionHeading, Reveal } from "@/components/ui";
import { formatINR } from "@/lib/utils";

export function ShopByBudget() {
  return (
    <section className="section-warm px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Shop by Budget"
            title={
              <>
                Style that fits <span className="text-vmart-red">your wallet.</span>
              </>
            }
            subtitle="Smart picks across every price band — no compromise on the look."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {budgetTiers.map((tier, i) => {
            const items = productsByBudget(tier).slice(0, 3);
            const from = Math.min(
              ...productsByBudget(tier).map((p) => p.salePrice ?? p.price)
            );
            return (
              <Reveal key={tier.key} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-5 shadow-xl shadow-black/5 ring-1 ring-black/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-vmart-red/10 text-vmart-red">
                      <Wallet className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold text-zinc-500">
                      {productsByBudget(tier).length} styles
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl text-zinc-900">{tier.label}</h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    Starting at <span className="font-bold text-vmart-red-deep">{formatINR(from)}</span>
                  </p>

                  <div className="mt-4 flex -space-x-3">
                    {items.map((p) => (
                      <div
                        key={p.id}
                        className="h-14 w-11 overflow-hidden rounded-lg ring-2 ring-white"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/?b=${tier.key}#shop`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-vmart-red-deep transition-colors group-hover:gap-2.5"
                  >
                    Shop this band <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
