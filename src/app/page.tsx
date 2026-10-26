'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { CategoryBanners } from '@/components/home/CategoryBanners';
import { BestSellers } from '@/components/home/BestSellers';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { WhyFoxal } from '@/components/home/WhyFoxal';
import { BrandStory } from '@/components/home/BrandStory';
import { ReviewsSlider } from '@/components/home/ReviewsSlider';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { Newsletter } from '@/components/home/Newsletter';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { QuickViewModal } from '@/components/home/QuickViewModal';
import { Product } from '@/lib/mock';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans selection:bg-[#C8922A] selection:text-white">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Luxury Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 4. Hero Section with Floating Smoke Animation & Dual CTAs */}
        <Hero />

        {/* 6. Shop by Category Banners (Sticks 250g vs Cones 60 pcs) */}
        <CategoryBanners />

        {/* 7. Best Sellers Carousel / Filter Grid */}
        <BestSellers onQuickView={(p) => setQuickViewProduct(p)} />

        {/* 8 & 9. Category Showcase (Incense Cones & Premium Incense Sticks) */}
        <CategoryShowcase onQuickView={(p) => setQuickViewProduct(p)} />

        {/* 10. Why FOXAL (Charcoal vs Natural Comparison Table) */}
        <WhyFoxal />

        {/* 11. Brand Story (Sacred Temple Flowers & Indian Artisan Guild) */}
        <BrandStory />

        {/* 12. Verified Customer Testimonials Slider */}
        <ReviewsSlider />

        {/* 13. FAQ Accordion */}
        <FaqAccordion />

        {/* 14. Newsletter Signup (Claim ₹50 Off) */}
        <Newsletter />
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
