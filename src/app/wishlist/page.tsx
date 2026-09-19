"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatINR } from "@/lib/utils";

export default function WishlistPage() {
  const store = useStore();
  const items = store.wishlist;

  return (
    <div className="px-5 pb-24 pt-28 lg:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <Heart className="h-7 w-7 text-vmart-red" />
          <h1 className="font-display text-4xl text-white lg:text-5xl">Wishlist</h1>
          <span className="text-sm text-zinc-500">({items.length})</span>
        </div>
        <p className="mt-2 text-zinc-400">Your saved styles in Siwan. Tap to revisit or add to bag.</p>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/5 text-zinc-500">
              <Heart className="h-8 w-8" />
            </div>
            <p className="mt-4 font-display text-2xl text-white">Nothing saved yet</p>
            <Link
              href="/#shop"
              className="mt-5 flex items-center gap-2 rounded-full bg-vmart-red px-6 py-3 text-sm font-semibold text-white"
            >
              Explore styles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-white/10"
                >
                  <Link href={`/product/${item.slug}`} className="relative block aspect-[4/5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        store.toggleWish(item);
                      }}
                      aria-label="Remove from wishlist"
                      className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass-strong text-vmart-red"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </Link>
                  <div className="p-3">
                    <Link href={`/product/${item.slug}`}>
                      <h3 className="truncate text-sm font-semibold text-white">{item.name}</h3>
                    </Link>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-bold text-white">
                        {formatINR(item.salePrice ?? item.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        store.addToCart({
                          productId: item.productId,
                          slug: item.slug,
                          name: item.name,
                          price: item.price,
                          salePrice: item.salePrice,
                          image: item.image,
                          size: "M",
                          color: item.color,
                        });
                        store.toast(`${item.name} added to bag`, "success");
                      }}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
                    >
                      <ShoppingBag className="h-4 w-4" /> Add to Bag
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
