'use client';

import React from 'react';
import Image from 'next/image';
import { PRODUCTS, Product } from '@/lib/mock';
import { ProductCard } from '@/components/home/ProductCard';
import { Sparkles, Flame, CheckCircle2, Gift } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface CategoryShowcaseProps {
  onQuickView: (product: Product) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onQuickView }) => {
  const stickProducts = PRODUCTS.filter((p) => p.category === 'sticks');
  const coneProducts = PRODUCTS.filter((p) => p.category === 'cones');

  return (
    <div className="space-y-24 py-16">
      {/* ── SECTION 1: INCENSE CONES (60 CONES / BOX) ── */}
      <section id="cones" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#F6EFE4] to-[#FAF7F2] border border-[#E3D4BD] p-5 sm:p-8 md:p-10 mb-6 sm:mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C8922A] bg-white px-3 py-1 rounded-full border border-[#E3D4BD]">
                  <Sparkles className="h-3.5 w-3.5" />
                  60 Cones / Box + Free Holder
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
                Incense Cones
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#7A5230] max-w-xl leading-relaxed">
                4 exquisite fragrances (Sandalwood, Lavender, Rose, Jasmine). Handcrafted
                pure dhoop cones made with consecrated temple flowers.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E3D4BD] flex items-center justify-between sm:justify-start gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <Gift className="h-6 w-6 text-[#C8922A] shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#0F0D0B] block">
                    Free Luxury Burner
                  </span>
                  <span className="text-[11px] text-[#7A5230]">
                    Inside every 60-cone box
                  </span>
                </div>
              </div>
              <span className="bg-[#EBF2ED] text-[#354E3C] text-[11px] font-bold px-2 py-0.5 rounded border border-[#C7D9CD]">
                ₹149
              </span>
            </div>
          </div>
        </div>

        {/* Full-width Responsive Cones Banner (100% visible on mobile & desktop) */}
        <div className="relative w-full aspect-[1024/373] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E3D4BD] mb-8 shadow-sm bg-[#0F0D0B]">
          <Image
            src="/images/banners/foxal-incense-cones-banner.png"
            alt="FOXAL Natural Incense Cones Collection"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 95vw, 1280px"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex sm:hidden items-center justify-between text-xs text-[#7A5230] mb-3 px-1">
          <span className="font-medium">4 Cones</span>
        </div>

        {/* 4 Cones: Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex sm:grid overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 gap-4 sm:gap-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2 lg:grid-cols-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {coneProducts.map((product) => (
            <div
              key={product.id}
              className="w-[78vw] max-w-[280px] sm:w-auto sm:max-w-none shrink-0 snap-start flex flex-col"
            >
              <ProductCard
                product={product}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: PREMIUM INCENSE STICKS (250g) ── */}
      <section id="sticks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Full-width Responsive Sticks Banner (100% visible on mobile & desktop) */}
        <div className="relative w-full aspect-[1024/373] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C8922A]/30 mb-8 shadow-md bg-[#0F0D0B]">
          <Image
            src="/images/banners/foxal-incense-sticks-banner.png"
            alt="FOXAL Premium Incense Sticks Collection"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 95vw, 1280px"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="rounded-2xl sm:rounded-3xl bg-[#0F0D0B] text-[#FAF7F2] p-5 sm:p-8 md:p-10 mb-6 sm:mb-8 border border-[#C8922A]/30 shadow-lg relative overflow-hidden">
          {/* Subtle gold decoration background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-[#C8922A]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#DFB15B] bg-[#1A1715] px-3 py-1 rounded-full border border-[#C8922A]/40">
                  <Flame className="h-3.5 w-3.5" />
                  Generous 250g Pack (~135 Sticks)
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white">
                Premium Incense Sticks
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#E7E5E3] max-w-xl leading-relaxed">
                6 timeless Vedic scents: Kasturi, Ancient Woods, Royal Oudh, Sukhad Sandal,
                Mogra, and Gugal. 100% natural flower base with zero coal.
              </p>
            </div>

            <div className="bg-[#1A1715] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#C8922A]/30 flex items-center justify-between sm:justify-start gap-4 shrink-0">
              <div>
                <span className="text-[11px] text-[#AFA8A2] block">Special Offer</span>
                <span className="text-xl sm:text-2xl font-bold text-[#DFB15B]">
                  ₹149{' '}
                  <span className="text-xs line-through text-[#7F7771]">
                    ₹199
                  </span>
                </span>
              </div>
              <span className="bg-[#4A6B53] text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                25% OFF
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex sm:hidden items-center justify-between text-xs text-[#7A5230] mb-3 px-1">
          <span className="font-medium">6 Sacred Fragrances</span>
        </div>

        {/* 6 Sticks: Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex sm:grid overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 gap-4 sm:gap-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {stickProducts.map((product) => (
            <div
              key={product.id}
              className="w-[78vw] max-w-[280px] sm:w-auto sm:max-w-none shrink-0 snap-start flex flex-col"
            >
              <ProductCard
                product={product}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
