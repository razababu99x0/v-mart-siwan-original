"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { MapPin, Phone, Clock, Navigation, Store as StoreIcon, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { store as storeInfo } from "@/lib/catalogue";
import { SectionHeading, Reveal } from "@/components/ui";
import { picsum } from "@/lib/utils";

const storePhotos = [
  picsum("vmstore-1", 1200, 800),
  picsum("vmstore-2", 1200, 800),
  picsum("vmstore-3", 1200, 800),
  picsum("vmstore-4", 1200, 800),
];

export function StoreSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [pickup, setPickup] = useState(true);

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
    <section id="store" className="relative scroll-mt-32 bg-ink px-5 py-20 lg:py-28">
      <div className="aurora pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Visit the Store"
            title={
              <>
                Come feel it at <span className="text-gradient-red">Babunia More.</span>
              </>
            }
            subtitle="Touch the fabric, try the fit, meet the team. Your next look is waiting in Siwan."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Info card */}
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl glass-strong p-7 ring-1 ring-white/10">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-vmart-red text-white">
                  <StoreIcon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl text-white">{storeInfo.name}</h3>
                  <p className="text-sm text-zinc-400">Official branch · {storeInfo.branch}</p>
                </div>
              </div>

              <ul className="mt-7 space-y-5 text-sm">
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-vmart-red" />
                  <span className="text-zinc-300">{storeInfo.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-vmart-red" />
                  <a
                    href={storeInfo.phoneHref}
                    className="font-semibold text-white transition-colors hover:text-vmart-red-soft"
                  >
                    {storeInfo.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-vmart-red" />
                  <span className="text-zinc-300">Daily · {storeInfo.hours}</span>
                </li>
              </ul>

              <a
                href={storeInfo.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 flex items-center justify-center gap-2 rounded-full bg-vmart-red py-3.5 text-sm font-semibold text-white transition-colors hover:bg-vmart-red-deep"
              >
                <Navigation className="h-4 w-4" /> Get Directions
              </a>

              {/* Store pickup toggle */}
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-sm font-semibold text-white">Store pickup</p>
                  <p className="text-xs text-zinc-400">
                    {pickup ? "Available — reserve & collect in 2 hours" : "Disabled for this order"}
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={pickup}
                  onClick={() => setPickup((v) => !v)}
                  className={`relative h-7 w-12 rounded-full transition-colors ${
                    pickup ? "bg-vmart-red" : "bg-zinc-700"
                  }`}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 grid h-5 w-5 place-items-center rounded-full bg-white"
                    style={{ left: pickup ? 24 : 4 }}
                  >
                    {pickup && <Check className="h-3 w-3 text-vmart-red" />}
                  </motion.span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl ring-1 ring-white/10">
              <iframe
                title="V-Mart Siwan location"
                src={storeInfo.mapsQuery}
                loading="lazy"
                className="h-72 w-full border-0 lg:h-full"
                style={{ minHeight: 320 }}
              />
            </div>
          </Reveal>
        </div>

        {/* Store photos carousel */}
        <Reveal delay={0.15} className="mt-6">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
              <div className="flex">
                {storePhotos.map((src, i) => (
                  <div key={i} className="relative min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]">
                    <div className="relative aspect-[4/3]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`V-Mart Siwan store ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={scrollPrev}
                aria-label="Previous"
                className="grid h-10 w-10 place-items-center rounded-full glass text-white hover:text-vmart-red"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {storePhotos.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i === selected ? "w-6 bg-vmart-red" : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={scrollNext}
                aria-label="Next"
                className="grid h-10 w-10 place-items-center rounded-full glass text-white hover:text-vmart-red"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
