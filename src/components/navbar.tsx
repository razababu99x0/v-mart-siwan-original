"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, ShoppingBag, Menu, MapPin, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { store as storeInfo } from "@/lib/catalogue";

const links = [
  { label: "Men", href: "/?c=men#shop" },
  { label: "Women", href: "/?c=women#shop" },
  { label: "Kids", href: "/?c=kids#shop" },
  { label: "Offers", href: "/#campaign" },
];

export function Navbar() {
  const store = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-500",
        store.promoOpen ? "top-9" : "top-0",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-500",
            scrolled ? "glass-strong shadow-2xl shadow-black/40" : "glass"
          )}
        >
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-vmart-red font-poster text-lg text-white shadow-lg shadow-vmart-red/40">
              V
            </span>
            <span className="leading-none">
              <span className="block font-poster text-xl tracking-wide text-white">
                V-MART
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-vmart-red-soft">
                Siwan
              </span>
            </span>
          </Link>

          {/* Center: links (desktop) */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-vmart-red transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-1.5">
            {/* location pill */}
            <Link
              href="/#store"
              className="hidden items-center gap-1.5 rounded-full glass px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:text-white sm:flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              {storeInfo.landmark}, Siwan
            </Link>

            {/* language toggle */}
            <div className="hidden items-center rounded-full glass p-0.5 text-xs font-semibold md:flex">
              {(["en", "hi"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => store.setLanguage(lang)}
                  className={cn(
                    "rounded-full px-2.5 py-1.5 transition-colors",
                    store.language === lang
                      ? "bg-white text-zinc-900"
                      : "text-zinc-400 hover:text-white"
                  )}
                  aria-pressed={store.language === lang}
                >
                  {lang === "en" ? "EN" : "हिं"}
                </button>
              ))}
            </div>

            <IconBtn label="Search" onClick={() => store.setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </IconBtn>
            <Link href="/wishlist" aria-label="Wishlist">
              <IconBtn label="Wishlist">
                <Heart className="h-5 w-5" />
                {store.wishlist.length > 0 && (
                  <CountBadge n={store.wishlist.length} />
                )}
              </IconBtn>
            </Link>
            <button
              onClick={store.openCart}
              aria-label="Open cart"
              className="relative grid h-10 w-10 place-items-center rounded-full glass text-white transition-colors hover:text-vmart-red"
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {store.cartCount > 0 && (
                  <motion.span
                    key={store.cartCount}
                    initial={{ scale: 0, y: -6 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 600, damping: 18 }}
                    className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-vmart-red px-1 text-[10px] font-bold text-white"
                  >
                    {store.cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full glass text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setNavOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 bg-zinc-950 p-6 ring-1 ring-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="font-poster text-2xl text-white">V-MART</span>
                <button
                  onClick={() => setNavOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full glass text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i + 0.1 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setNavOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-4 text-2xl font-display text-white hover:bg-white/5"
                    >
                      {l.label}
                      <span className="text-vmart-red">→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Link
                href="/#store"
                onClick={() => setNavOpen(false)}
                className="mt-auto flex items-center gap-2 rounded-2xl glass px-4 py-3 text-sm text-zinc-300"
              >
                <MapPin className="h-4 w-4 text-emerald-400" />
                {storeInfo.address}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="relative grid h-10 w-10 place-items-center rounded-full glass text-white transition-colors hover:text-vmart-red"
    >
      {children}
    </button>
  );
}

function CountBadge({ n }: { n: number }) {
  return (
    <motion.span
      key={n}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-vmart-red px-1 text-[10px] font-bold text-white"
    >
      {n}
    </motion.span>
  );
}
