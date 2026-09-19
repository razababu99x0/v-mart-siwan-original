"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { SlidersHorizontal, TrendingUp } from "lucide-react";
import { products, budgetTiers } from "@/lib/catalogue";
import { ProductCard } from "@/components/product-card";
import { SectionHeading, Reveal } from "@/components/ui";
import { cn } from "@/lib/utils";

type Cat = "all" | "men" | "women" | "kids" | "infants";
const cats: { key: Cat; label: string }[] = [
  { key: "all", label: "All" },
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
  { key: "kids", label: "Kids" },
  { key: "infants", label: "Infants" },
];

export function NewArrivals({
  initialCategory = "all",
  initialTier = "all",
}: {
  initialCategory?: string;
  initialTier?: string;
}) {
  const [cat, setCat] = useState<Cat>((initialCategory as Cat) || "all");
  const [tier, setTier] = useState<string>(
    budgetTiers.some((b) => b.key === initialTier) ? initialTier : "all"
  );
  const [size, setSize] = useState<string>("all");
  const [sort, setSort] = useState<"featured" | "low" | "high" | "rating">("featured");

  const allSizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))).slice(0, 8),
    []
  );

  const filtered = useMemo(() => {
    let list = products.slice();
    if (cat !== "all") list = list.filter((p) => p.gender === cat);
    if (tier !== "all") {
      const t = budgetTiers.find((b) => b.key === tier)!;
      list = list.filter((p) => {
        const price = p.salePrice ?? p.price;
        return price >= t.min && price <= t.max;
      });
    }
    if (size !== "all") list = list.filter((p) => p.sizes.includes(size));
    if (sort === "low") list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    if (sort === "high")
      list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, tier, size, sort]);

  return (
    <section id="shop" className="relative scroll-mt-32 px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="New Arrivals"
            title={
              <>
                Trending in <span className="text-gradient-red">Siwan</span>
              </>
            }
            subtitle="Fresh drops our neighbours are already loving. Filter, tap, add — done."
          />
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold text-zinc-300">
            <TrendingUp className="h-4 w-4 text-vmart-red" />
            {filtered.length} styles
          </span>
        </Reveal>

        {/* Filter bar */}
        <div className="mt-8 flex flex-col gap-3 rounded-3xl glass p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <SlidersHorizontal className="ml-1 hidden h-4 w-4 shrink-0 text-zinc-500 sm:block" />
            {cats.map((c) => (
              <Chip key={c.key} active={cat === c.key} onClick={() => setCat(c.key)}>
                {c.label}
              </Chip>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="shrink-0 px-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Budget
            </span>
            <Chip active={tier === "all"} onClick={() => setTier("all")}>
              All
            </Chip>
            {budgetTiers.map((t) => (
              <Chip key={t.key} active={tier === t.key} onClick={() => setTier(t.key)}>
                {t.label}
              </Chip>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none"
            aria-label="Sort products"
          >
            <option value="featured" className="bg-zinc-900">
              Featured
            </option>
            <option value="low" className="bg-zinc-900">
              Price: Low to High
            </option>
            <option value="high" className="bg-zinc-900">
              Price: High to Low
            </option>
            <option value="rating" className="bg-zinc-900">
              Top Rated
            </option>
          </select>
        </div>

        {/* Size quick filter */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Size
          </span>
          <Chip active={size === "all"} onClick={() => setSize("all")}>
            Any
          </Chip>
          {allSizes.map((s) => (
            <Chip key={s} active={size === s} onClick={() => setSize(s)}>
              {s}
            </Chip>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-zinc-500">
            No styles match that combo yet — try another filter.
          </p>
        )}
      </div>
    </section>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-vmart-red text-white"
          : "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}
