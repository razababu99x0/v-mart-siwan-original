"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Zap } from "lucide-react";
import { useStore } from "@/lib/store";

const messages = [
  "🎉 Flat ₹100 OFF on orders above ₹999 — code SIWAN100",
  "🚚 FREE delivery across Siwan on every order",
  "👗 New festive edit just dropped at Babunia More",
  "⏰ Open daily 10AM–10PM · Click-to-call 72900 36224",
];

export function PromoBar() {
  const store = useStore();
  if (!store.promoOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="fixed inset-x-0 top-0 z-[65] overflow-hidden bg-gradient-to-r from-vmart-red-deep via-vmart-red to-vmart-red-deep"
      >
        <div className="flex items-center justify-center gap-3 px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
          <Zap className="hidden h-4 w-4 shrink-0 sm:block" />
          <p className="truncate">{messages[0]}</p>
          <button
            onClick={store.dismissPromo}
            aria-label="Dismiss announcement"
            className="absolute right-3 grid h-6 w-6 place-items-center rounded-full bg-white/15 hover:bg-white/30"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
