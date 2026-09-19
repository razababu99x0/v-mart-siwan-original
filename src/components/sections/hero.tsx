"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { MagneticButton } from "@/components/ui";

const Hero3D = dynamic(() => import("./hero-3d"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative h-64 w-64 animate-floaty">
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-vmart-red via-vmart-red-deep to-black shadow-2xl glow-red" />
        <div className="absolute -inset-10 rounded-full bg-vmart-red/20 blur-3xl" />
      </div>
    </div>
  );
}

function SplitText({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.15 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const store = useStore();
  const [mounted, setMounted] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 768px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setLowPower(mq.matches || rmq.matches);
  }, []);

  const hi = store.language === "hi";

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      {/* Aurora + grain */}
      <div className="aurora animate-aurora pointer-events-none absolute inset-0" />
      <div className="noise pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 top-10 h-[40rem] w-[40rem] rounded-full bg-vmart-red/20 blur-[120px]" />

      {/* 3D layer */}
      <motion.div
        style={{ y: reduce ? 0 : y }}
        className="absolute inset-0 lg:left-[38%]"
      >
        {mounted ? <Hero3D reduced={lowPower} interactive={!lowPower} /> : <HeroFallback />}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 pt-28 lg:grid-cols-2">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-vmart-red" />
            V-Mart · Siwan, Bihar
          </motion.div>

          <h1 className="font-poster text-[13vw] leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
            <span className="text-gradient-red">
              <SplitText text="SIWAN," />
            </span>
            <br />
            <span className="text-white">
              <SplitText text="MEET YOUR" />
            </span>
            <br />
            <span className="text-gradient-gold">
              <SplitText text="NEXT LOOK." />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-6 max-w-md text-lg text-zinc-300"
          >
            {hi
              ? "रोज़ का फैशन। अलग अंदाज़। सिवान का आधिकारिक V-Mart स्टोर।"
              : "Everyday fashion. Standout style. The official V-Mart Siwan experience."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="/#shop"
              strength={0.5}
              className="bg-vmart-red text-white shadow-xl shadow-vmart-red/30 hover:bg-vmart-red-deep"
            >
              Shop New Arrivals <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="/#categories"
              strength={0.4}
              className="glass text-white hover:text-vmart-red-soft"
            >
              Explore Collections
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-400"
          >
            {[
              "Free delivery in Siwan",
              "10AM – 10PM daily",
              "COD · UPI · Cards",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-vmart-red" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* spacer for 3D on desktop */}
        <div className="hidden lg:block" aria-hidden />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
          Scroll
        </span>
        <div className="mx-auto flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 rounded-full bg-vmart-red animate-scroll-bounce" />
        </div>
        <ChevronDown className="mx-auto mt-1 h-4 w-4 text-zinc-500" />
      </motion.div>

      {/* Mobile hint to drag */}
      <p className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 text-center text-[11px] text-zinc-500 lg:hidden">
        Drag to orbit the scene ✦
      </p>
    </section>
  );
}
