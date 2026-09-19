"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check, AlertTriangle, Info } from "lucide-react";
import { useStore } from "@/lib/store";

export function Toaster() {
  const store = useStore();
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[90] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {store.toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="pointer-events-auto flex w-full items-center gap-3 rounded-2xl glass-strong px-4 py-3 text-sm text-white shadow-2xl"
          >
            <span
              className={
                t.tone === "success"
                  ? "text-emerald-400"
                  : t.tone === "error"
                    ? "text-vmart-red"
                    : "text-vmart-red-soft"
              }
            >
              {t.tone === "success" ? (
                <Check className="h-5 w-5" />
              ) : t.tone === "error" ? (
                <AlertTriangle className="h-5 w-5" />
              ) : (
                <Info className="h-5 w-5" />
              )}
            </span>
            <span className="flex-1">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
