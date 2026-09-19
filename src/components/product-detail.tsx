"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Plus,
  Minus,
  Check,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import type { Product } from "@/lib/catalogue";
import { useStore } from "@/lib/store";
import { cn, formatINR } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { TagBadge, Stars } from "@/components/ui";

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const store = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [spin, setSpin] = useState(false);
  const [openAcc, setOpenAcc] = useState<string | null>("fabric");

  const imgRef = useRef<HTMLDivElement>(null);
  const wished = store.isWished(product.id);
  const price = product.salePrice ?? product.price;
  const mrp = product.salePrice ? product.price : null;
  const off = mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

  function onMove(e: React.MouseEvent) {
    const r = imgRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  function add(goCheckout = false) {
    if (!size) {
      store.toast("Please select a size first", "error");
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
    store.toast(`${product.name} added to bag`, "success");
    if (goCheckout) {
      store.openCart();
    }
  }

  // 360 spin simulation — auto-cycles gallery angles
  useEffect(() => {
    if (!spin) return;
    const id = setInterval(
      () => setActiveImg((i) => (i + 1) % product.gallery.length),
      700
    );
    return () => clearInterval(id);
  }, [spin, product.gallery.length]);

  function toggleSpin() {
    setSpin((s) => !s);
  }

  return (
    <div className="px-5 pb-24 pt-28 lg:pt-32">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/?c=${product.gender}#shop`} className="hover:text-white">
            {product.category}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-zinc-300">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div
              ref={imgRef}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={onMove}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-white/10"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={spin ? "spin" : activeImg}
                  src={product.gallery[activeImg]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full object-cover transition-transform duration-200"
                  style={{
                    transform: zoom ? "scale(1.8)" : "scale(1)",
                    transformOrigin: origin,
                  }}
                />
              </AnimatePresence>

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

              <button
                onClick={toggleSpin}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full glass-strong px-3 py-2 text-xs font-semibold text-white"
              >
                <RefreshCw className={cn("h-3.5 w-3.5", spin && "animate-spin")} />
                360°
              </button>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "aspect-square overflow-hidden rounded-xl ring-1 transition-all",
                    activeImg === i ? "ring-vmart-red" : "ring-white/10 opacity-70 hover:opacity-100"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            {spin && (
              <p className="mt-2 text-center text-xs text-vmart-red-soft">
                360° preview playing — tap again to stop.
              </p>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {product.category} · {product.subcategory}
            </p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-white lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <Stars value={product.rating} />
              <span className="text-sm text-zinc-500">
                {product.reviews.toLocaleString("en-IN")} reviews
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-bold text-white">{formatINR(price)}</span>
              {mrp && (
                <>
                  <span className="text-lg text-zinc-500 line-through">{formatINR(mrp)}</span>
                  <span className="rounded-full bg-vmart-gold/15 px-2.5 py-1 text-sm font-bold text-vmart-gold">
                    Save {off}%
                  </span>
                </>
              )}
            </div>

            {/* Color */}
            <div className="mt-7">
              <p className="text-sm font-semibold text-white">
                Color: <span className="text-zinc-400">{color}</span>
              </p>
              <div className="mt-2 flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    className={cn(
                      "h-9 w-9 rounded-full ring-2 transition-all",
                      color === c.name ? "ring-vmart-red" : "ring-white/20"
                    )}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Size</p>
                <button className="flex items-center gap-1 text-xs text-vmart-red-soft hover:underline">
                  <Ruler className="h-3.5 w-3.5" /> Size guide
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-12 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors",
                      size === s
                        ? "border-vmart-red bg-vmart-red text-white"
                        : "border-white/15 text-zinc-300 hover:border-white/40"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + CTAs */}
            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-white/10 p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold text-white">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-xs text-emerald-400">
                {product.stock > 10 ? "In stock" : `Only ${product.stock} left`}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => add(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Bag
              </button>
              <button
                onClick={() => add(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-vmart-red py-3.5 text-sm font-semibold text-white transition-colors hover:bg-vmart-red-deep"
              >
                Buy Now
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
                    color,
                  });
                  store.toast(wished ? "Removed from wishlist" : "Saved to wishlist");
                }}
                aria-label="Toggle wishlist"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full glass text-white hover:text-vmart-red"
              >
                <Heart className={cn("h-5 w-5", wished && "fill-vmart-red text-vmart-red")} />
              </button>
            </div>

            {/* Trust row */}
            <div className="mt-7 grid grid-cols-3 gap-3 rounded-2xl bg-white/5 p-4 text-center">
              {[
                { icon: Truck, label: "Free delivery" },
                { icon: RotateCcw, label: "7-day return" },
                { icon: ShieldCheck, label: "Authentic" },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-1.5">
                  <t.icon className="h-5 w-5 text-vmart-red" />
                  <span className="text-xs text-zinc-300">{t.label}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="mt-7 divide-y divide-white/10 rounded-2xl bg-white/[0.03]">
              {[
                { id: "fabric", title: "Fabric & Material", body: product.fabric },
                { id: "care", title: "Care Instructions", body: product.care },
                { id: "desc", title: "Description", body: product.description },
              ].map((a) => (
                <div key={a.id}>
                  <button
                    onClick={() => setOpenAcc(openAcc === a.id ? null : a.id)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white"
                  >
                    {a.title}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 text-zinc-500 transition-transform",
                        openAcc === a.id && "rotate-90"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openAcc === a.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm leading-relaxed text-zinc-400">
                          {a.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-20">
          <h2 className="font-display text-3xl text-white lg:text-4xl">
            You may also <span className="text-gradient-red">love</span>
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
