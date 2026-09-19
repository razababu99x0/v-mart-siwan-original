"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Heart, Plus, Check, Eye, Sparkles } from "lucide-react";
import type { Product } from "@/lib/catalogue";
import { useStore } from "@/lib/store";
import { cn, formatINR } from "@/lib/utils";
import { TagBadge, Stars } from "@/components/ui";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const reduce = useReducedMotion();
  const store = useStore();
  const [hover, setHover] = useState(false);
  const [pickSize, setPickSize] = useState(false);
  const [added, setAdded] = useState(false);
  const [burst, setBurst] = useState(false);

  const wished = store.isWished(product.id);
  const price = product.salePrice ?? product.price;
  const mrp = product.salePrice ? product.price : null;
  const off = mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

  function quickAdd() {
    if (pickSize) return;
    if (product.sizes.length > 3) {
      setPickSize(true);
      return;
    }
    commit(product.sizes[0]);
  }
  function commit(size: string) {
    store.addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
      size,
      color: product.colors[0].name,
    });
    store.toast(`${product.name} added to bag`, "success");
    setAdded(true);
    setBurst(true);
    setPickSize(false);
    setTimeout(() => setAdded(false), 1400);
    setTimeout(() => setBurst(false), 700);
  }

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPickSize(false);
      }}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-white/10 transition-all duration-500",
          hover && "ring-vmart-red/40 glow-red -translate-y-1"
        )}
      >
        {/* Image */}
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <div className="relative aspect-[4/5] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                hover && "scale-110"
              )}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <div className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-gradient-to-br from-vmart-red/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badges.slice(0, 2).map((b) => (
            <TagBadge key={b} type={b} />
          ))}
          {off > 0 && (
            <span className="rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold text-vmart-gold backdrop-blur">
              -{off}%
            </span>
          )}
        </div>

        {/* Top-right controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            onClick={() => store.openQuickView(product.id)}
            aria-label="Quick view"
            className="grid h-9 w-9 place-items-center rounded-full glass-strong text-white transition-colors hover:text-vmart-red"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              store.toggleWish({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                salePrice: product.salePrice,
                image: product.image,
                color: product.colors[0].name,
              });
              store.toast(wished ? "Removed from wishlist" : "Saved to wishlist", "default");
            }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="grid h-9 w-9 place-items-center rounded-full glass-strong text-white transition-colors hover:text-vmart-red"
          >
            <motion.span
              key={String(wished)}
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 16 }}
            >
              <Heart className={cn("h-4 w-4", wished && "fill-vmart-red text-vmart-red")} />
            </motion.span>
          </button>
        </div>

        {/* Quick add */}
        <div
          className={cn(
            "absolute inset-x-3 bottom-3 transition-all duration-300",
            hover ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <AnimatePresence mode="wait">
            {!pickSize ? (
              <motion.button
                key="qa"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                onClick={quickAdd}
                className="relative flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-semibold text-zinc-900 shadow-lg transition-colors hover:bg-vmart-red hover:text-white"
              >
                {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {added ? "Added" : "Quick Add"}
                {burst && (
                  <span className="pointer-events-none absolute inset-0 grid place-items-center">
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                        animate={{
                          opacity: 0,
                          x: Math.cos((deg * Math.PI) / 180) * 46,
                          y: Math.sin((deg * Math.PI) / 180) * 46,
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute text-vmart-gold"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                      </motion.span>
                    ))}
                  </span>
                )}
              </motion.button>
            ) : (
              <motion.div
                key="sizes"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="flex flex-wrap justify-center gap-1.5 rounded-2xl glass-strong p-2.5"
              >
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => commit(s)}
                    className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-vmart-red"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 px-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            {product.category} · {product.subcategory}
          </p>
          <Stars value={product.rating} />
        </div>
        <Link href={`/product/${product.slug}`} className="mt-1 block">
          <h3 className="text-[15px] font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-white">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-lg font-bold text-white">{formatINR(price)}</span>
          {mrp && <span className="text-sm text-zinc-500 line-through">{formatINR(mrp)}</span>}
        </div>
        {/* color swatches */}
        <div className="mt-2.5 flex items-center gap-1.5">
          {product.colors.slice(0, 5).map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3.5 w-3.5 rounded-full ring-1 ring-white/20"
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
