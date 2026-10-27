'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { BannerSlider } from '@/components/home/BannerSlider';
import { CategoryBanners } from '@/components/home/CategoryBanners';
import { BestSellers } from '@/components/home/BestSellers';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { BrandStory } from '@/components/home/BrandStory';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { QuickViewModal } from '@/components/home/QuickViewModal';
import { Product } from '@/lib/mock';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans selection:bg-[#C8922A] selection:text-white w-full max-w-full overflow-x-hidden">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Luxury Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* 4. Hero Section with Floating Smoke Animation & Dual CTAs */}
        <Hero />

        {/* 5. Official FOXAL Promotional Banners Carousel */}
        <BannerSlider />

        {/* 6. Shop by Category Banners (Sticks 250g vs Cones 60 pcs) */}
        <CategoryBanners />

        {/* 7. Best Sellers Carousel / Filter Grid */}
        <BestSellers onQuickView={(p) => setQuickViewProduct(p)} />

        {/* 8 & 9. Category Showcase (Incense Cones & Premium Incense Sticks) */}
        <CategoryShowcase onQuickView={(p) => setQuickViewProduct(p)} />


        {/* 11. Brand Story (Sacred Temple Flowers & Indian Artisan Guild) */}
        <BrandStory />

        {/* 12. FAQ Accordion */}
        <FaqAccordion />
      </main>

      {/* 15. Rich Footer */}
      <Footer />

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer />
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
