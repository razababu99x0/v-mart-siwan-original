import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { NewArrivals } from "@/components/sections/new-arrivals";
import { Stats } from "@/components/sections/stats";
import { ShopTheLook } from "@/components/sections/shop-the-look";
import { Campaign } from "@/components/sections/campaign";
import { Testimonials } from "@/components/sections/testimonials";
import { ShopByBudget } from "@/components/sections/budget";
import { StoreSection } from "@/components/sections/store";
import { MarqueeBar } from "@/components/ui";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string; b?: string }>;
}) {
  const sp = await searchParams;
  const c = sp.c ?? "all";
  const b = sp.b ?? "all";

  return (
    <>
      <Hero />

      <MarqueeBar
        className="border-y border-white/10 bg-zinc-950 py-4"
        items={[
          "Everyday fashion",
          "Standout style",
          "Free delivery in Siwan",
          "New Arrivals weekly",
          "Style in Motion",
        ]}
      />

      <Categories />
      <NewArrivals initialCategory={c} initialTier={b} />
      <Stats />
      <ShopTheLook />
      <Campaign />
      <Testimonials />
      <ShopByBudget />
      <StoreSection />
    </>
  );
}
