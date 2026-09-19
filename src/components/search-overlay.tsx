"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/lib/catalogue";
import { formatINR } from "@/lib/utils";

export function SearchOverlay() {
  const store = useStore();
  const [q, setQ] = useState("");
  const open = store.isSearchOpen;

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return products.slice(0, 6);
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.category.toLowerCase().includes(t) ||
          p.subcategory.toLowerCase().includes(t)
      )
      .slice(0, 8);
  }, [q]);

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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => store.setSearchOpen(false)}
          />
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-x-0 top-0 mx-auto max-w-3xl px-4 pt-24"
          >
            <div className="rounded-3xl glass-strong p-4 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <Search className="h-5 w-5 text-vmart-red" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search Siwan's styles… (e.g. saree, sneakers, kurta)"
                  className="w-full bg-transparent text-lg text-white placeholder:text-zinc-500 focus:outline-none"
                />
                <button
                  onClick={() => store.setSearchOpen(false)}
                  aria-label="Close search"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 max-h-[55vh] overflow-y-auto no-scrollbar">
                <p className="px-1 pb-2 text-xs uppercase tracking-widest text-zinc-500">
                  {q ? `${results.length} results` : "Popular right now"}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={() => store.setSearchOpen(false)}
                      className="flex items-center gap-3 rounded-2xl bg-white/5 p-2 transition-colors hover:bg-white/10"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt=""
                        className="h-14 w-12 rounded-lg object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-white">
                          {p.name}
                        </span>
                        <span className="text-xs text-zinc-400">
                          {p.category} · {formatINR(p.salePrice ?? p.price)}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
