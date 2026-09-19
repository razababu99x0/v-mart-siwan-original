"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUp, MapPin, Phone, Send, Globe, AtSign } from "lucide-react";
import { store as storeInfo } from "@/lib/catalogue";

const cols = [
  {
    title: "Shop",
    links: [
      { label: "Men", href: "/?c=men#shop" },
      { label: "Women", href: "/?c=women#shop" },
      { label: "Kids", href: "/?c=kids#shop" },
      { label: "Infants", href: "/?c=infants#shop" },
      { label: "Offers", href: "/#campaign" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Delivery & Returns", href: "/#store" },
      { label: "Size Guide", href: "/#shop" },
      { label: "Track Order", href: "/checkout" },
      { label: "Contact Store", href: storeInfo.phoneHref },
      { label: "FAQs", href: "/#store" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About V-Mart", href: "/" },
      { label: "Siwan Branch", href: "/#store" },
      { label: "Careers", href: "/" },
      { label: "Privacy", href: "/" },
      { label: "Terms", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-zinc-950">
      <div className="aurora pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-vmart-red font-poster text-lg text-white">
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              SIWAN, MEET YOUR NEXT LOOK. Everyday fashion. Standout style.
              <br />
              <span className="text-zinc-500">सिवान, अपना अगला लुक मिलाएं।</span>
            </p>
            <div className="mt-5 flex gap-2">
              {[Send, Globe, AtSign].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="grid h-10 w-10 place-items-center rounded-full glass text-zinc-300 transition-colors hover:text-vmart-red"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Store strip */}
        <div className="mt-12 grid gap-4 rounded-3xl glass p-5 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-vmart-red" />
            <span className="text-sm text-zinc-300">{storeInfo.address}</span>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-vmart-red" />
            <a href={storeInfo.phoneHref} className="text-sm text-zinc-300 hover:text-white">
              {storeInfo.phone}
            </a>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-sm font-semibold text-vmart-gold">OPEN</span>
            <span className="text-sm text-zinc-300">Daily · {storeInfo.hours}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} V-Mart Siwan. A prototype experience. Prices in ₹.
          </p>
          <motion.a
            href="#top"
            whileHover={{ y: -3 }}
            className="flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold text-white"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
