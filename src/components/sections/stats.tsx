"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Users, Star, Sparkles, Clock } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/ui";

const stats = [
  { icon: Users, value: 50, suffix: "K+", label: "Siwan shoppers styled" },
  { icon: Star, value: 4.9, decimals: 1, label: "Average rating" },
  { icon: Sparkles, value: 15, suffix: "", label: "New drops every week" },
  { icon: Clock, value: 10, suffix: "HR", label: "Open daily for you" },
];

function useCountUp(target: number, active: boolean, decimals = 0, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return decimals ? val.toFixed(decimals) : Math.round(val).toString();
}

function Stat({
  s,
  active,
  index,
}: {
  s: (typeof stats)[number];
  active: boolean;
  index: number;
}) {
  const reduce = useReducedMotion();
  const display = useCountUp(s.value, active, (s as { decimals?: number }).decimals ?? 0);
  return (
    <Reveal delay={index * 0.08}>
      <div className="flex flex-col items-center gap-2 rounded-3xl glass p-6 text-center ring-1 ring-white/10">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-vmart-red/15 text-vmart-red">
          <s.icon className="h-5 w-5" />
        </span>
        <p className="font-poster text-4xl text-white">
          {reduce ? `${s.value}${s.suffix}` : `${display}${s.suffix}`}
        </p>
        <p className="text-sm text-zinc-400">{s.label}</p>
      </div>
    </Reveal>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative bg-ink px-5 py-16 lg:py-20">
      <div className="aurora pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Why Siwan shops with us"
            title={
              <>
                Loved by the <span className="text-gradient-red">neighbourhood.</span>
              </>
            }
          />
        </Reveal>
        <div ref={ref} className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Stat key={s.label} s={s} active={active} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
