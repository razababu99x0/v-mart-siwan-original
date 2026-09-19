"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Plus, Minus, Check } from "lucide-react";
import { getProduct } from "@/lib/catalogue";
import { useStore } from "@/lib/store";
import { cn, formatINR } from "@/lib/utils";
import { TagBadge, Stars } from "@/components/ui";

export function QuickView() {
  const store = useStore();
  const id = store.quickViewId;
  const product = id ? getProduct(id) : null;
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setActiveImg(0);
      setColor(product.colors[0].name);
      setSize(null);
      setQty(1);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && store.closeQuickView();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [store]);

  const open = !!product;

  return (
    <AnimatePresence>
      {open && product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85]"
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={store.closeQuickView}
          />
          <div className="absolute inset-0 grid place-items-center p-4">
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="relative grid max-h-[88vh] w-full max-w-3xl gap-0 overflow-hidden rounded-3xl glass-strong ring-1 ring-white/10 md:grid-cols-2"
            >
              <button
                onClick={store.closeQuickView}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.gallery[activeImg]}
                  alt={product.name}
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                  {product.badges.slice(0, 2).map((b) => (
                    <TagBadge key={b} type={b} />
                  ))}
                </div>
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {product.gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={cn(
                        "h-10 w-8 overflow-hidden rounded-md ring-1",
                        activeImg === i ? "ring-vmart-red" : "ring-white/20"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  {product.category} · {product.subcategory}
                </p>
                <h3 className="mt-1 font-display text-2xl text-white">{product.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Stars value={product.rating} />
                  <span className="text-xs text-zinc-500">
                    {product.reviews.toLocaleString("en-IN")} reviews
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">
                    {formatINR(product.salePrice ?? product.price)}
                  </span>
                  {product.salePrice && (
                    <span className="text-sm text-zinc-500 line-through">
                      {formatINR(product.price)}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {product.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      aria-label={c.name}
                      className={cn(
                        "h-8 w-8 rounded-full ring-2 transition-all",
                        color === c.name ? "ring-vmart-red" : "ring-white/20"
                      )}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={cn(
                        "min-w-11 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors",
                        size === s
                          ? "border-vmart-red bg-vmart-red text-white"
                          : "border-white/15 text-zinc-300 hover:border-white/40"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex items-center gap-1 rounded-full bg-white/10 p-1">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/10"
                      aria-label="Decrease"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-7 text-center font-semibold text-white">{qty}</span>
                    <button
                      onClick={() => setQty((q) => Math.min(10, q + 1))}
                      className="grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/10"
                      aria-label="Increase"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (!size) {
                        store.toast("Select a size first", "error");
                        return;
                      }
                      store.addToCart({
                        productId: product.id,
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        salePrice: product.salePrice,
                        image: product.image,
                        size,
                        color,
                        qty,
                      });
                      store.toast(`${product.name} added`, "success");
                      store.closeQuickView();
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-vmart-red py-3 text-sm font-semibold text-white hover:bg-vmart-red-deep"
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to Bag
                  </button>
                </div>
                <button
                  onClick={() => store.closeQuickView()}
                  className="mt-3 text-center text-xs text-vinc-500 hover:text-white"
                >
                  Continue browsing
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
