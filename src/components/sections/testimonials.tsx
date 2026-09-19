"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/ui";
import { picsum } from "@/lib/utils";

const reviews = [
  {
    name: "Aman Kumar",
    role: "Engineering student, Siwan",
    quote:
      "The festive kurta I ordered was delivered to my PIN in 2 days. Fit was perfect and the red detailing is gorgeous.",
    rating: 5,
    seed: "vmt-aman",
  },
  {
    name: "Priya Singh",
    role: "Teacher, Babunia More",
    quote:
      "V-Mart Siwan's new arrivals are so on-trend. The wrap dress got me so many compliments at the wedding!",
    rating: 5,
    seed: "vmt-priya",
  },
  {
    name: "Rahul Verma",
    role: "Shop owner, Chhapra Road",
    quote:
      "Finally a store that understands Siwan style. The 3D preview on the site is addictive — I keep browsing.",
    rating: 4,
    seed: "vmt-rahul",
  },
  {
    name: "Sunita Devi",
    role: "Homemaker, Pal Nagar",
    quote:
      "Bought infant bodysuits for my grandson. Super soft and the click-to-call support helped me pick sizes.",
    rating: 5,
    seed: "vmt-sunita",
  },
  {
    name: "Vikash Sah",
    role: "College student, Siwan",
    quote:
      "The sneakers are unreal for the price. Free delivery and COD made it a no-brainer.",
    rating: 5,
    seed: "vmt-vikash",
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="section-warm px-5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Real Siwan looks"
            title={
              <>
                Straight from the <span className="text-vmart-red">streets of Siwan.</span>
              </>
            }
            subtitle="What your neighbours are saying after shopping with V-Mart Siwan."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviews.map((r) => (
                <div
                  key={r.name}
                  className="min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
                >
                  <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/5">
                    <Quote className="h-7 w-7 text-vmart-red/30" />
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-zinc-700">
                      “{r.quote}”
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={picsum(r.seed, 120, 120)}
                        alt={r.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-zinc-900">{r.name}</p>
                        <p className="text-xs text-zinc-500">{r.role}</p>
                      </div>
                      <div className="ml-auto flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={
                              i < r.rating
                                ? "h-3.5 w-3.5 fill-vmart-gold text-vmart-gold"
                                : "h-3.5 w-3.5 text-zinc-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={scrollPrev}
              aria-label="Previous"
              className="grid h-10 w-10 place-items-center rounded-full bg-zinc-900 text-white hover:bg-vmart-red"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === selected ? "w-6 bg-vmart-red" : "w-2 bg-zinc-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              aria-label="Next"
              className="grid h-10 w-10 place-items-center rounded-full bg-zinc-900 text-white hover:bg-vmart-red"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
