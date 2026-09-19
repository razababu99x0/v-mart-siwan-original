"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const store = useStore();
  const open = store.isCartOpen;
  const items = store.cart;
  const subtotal = store.cartSubtotal;
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70]"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={store.closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-zinc-950 ring-1 ring-white/10"
            role="dialog"
            aria-label="Shopping bag"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-2xl text-white">
                <ShoppingBag className="h-5 w-5 text-vmart-red" />
                Your Bag
                <span className="text-sm font-sans text-zinc-500">
                  ({store.cartCount})
                </span>
              </h2>
              <button
                onClick={store.closeCart}
                aria-label="Close bag"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-white/5 text-zinc-500">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <p className="mt-4 font-display text-xl text-white">Your bag is empty</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    Siwan's next look is one tap away.
                  </p>
                  <Link
                    href="/#shop"
                    onClick={store.closeCart}
                    className="mt-5 rounded-full bg-vmart-red px-6 py-3 text-sm font-semibold text-white"
                  >
                    Start shopping
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-3 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-16 rounded-xl object-cover"
                        />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-sm font-semibold text-white">
                              {item.name}
                            </p>
                            <button
                              onClick={() => store.removeFromCart(item.id)}
                              aria-label="Remove"
                              className="text-zinc-500 transition-colors hover:text-vmart-red"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs text-zinc-500">
                            {item.size} · {item.color}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1 rounded-full bg-white/10 p-0.5">
                              <button
                                onClick={() => store.setQty(item.id, item.qty - 1)}
                                aria-label="Decrease"
                                className="grid h-7 w-7 place-items-center rounded-full text-white hover:bg-white/10"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold text-white">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => store.setQty(item.id, item.qty + 1)}
                                aria-label="Increase"
                                className="grid h-7 w-7 place-items-center rounded-full text-white hover:bg-white/10"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-white">
                              {formatINR((item.salePrice ?? item.price) * item.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-white/10 px-5 py-4">
                <div className="flex items-center justify-between text-sm text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{formatINR(subtotal)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm text-zinc-400">
                  <span>Delivery</span>
                  <span className="font-semibold text-white">
                    {shipping === 0 ? "FREE" : formatINR(shipping)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="font-display text-lg text-white">Total</span>
                  <span className="font-display text-lg text-vmart-red-soft">
                    {formatINR(total)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={store.closeCart}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-vmart-red py-3.5 text-sm font-semibold text-white transition-colors hover:bg-vmart-red-deep"
                >
                  Checkout <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-2 text-center text-[11px] text-zinc-500">
                  Free delivery on orders above ₹999 in Siwan
                </p>
              </footer>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
