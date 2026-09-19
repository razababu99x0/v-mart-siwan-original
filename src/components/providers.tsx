"use client";

import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { SearchOverlay } from "@/components/search-overlay";
import { Toaster } from "@/components/toaster";
import { ScrollProgress } from "@/components/scroll-progress";
import { PromoBar } from "@/components/promo-bar";
import { Cursor } from "@/components/cursor";
import { QuickView } from "@/components/quick-view";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <PromoBar />
      <Navbar />
      <main id="top" className="relative">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <QuickView />
      <Toaster />
      <Cursor />
    </>
  );
}
