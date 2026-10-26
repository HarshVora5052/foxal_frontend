'use client';

import React from 'react';
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
      <section id="cones" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#F6EFE4] to-[#FAF7F2] border border-[#E3D4BD] p-6 sm:p-10 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="gold" size="sm">
                  Complimentary Ceramic Stand Included
                </Badge>
                <Badge variant="sage" size="sm">
                  Dense Sambrani Smoke
                </Badge>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
                Incense Cones (60 Cones / Box)
              </h2>
              <p className="mt-2 text-sm text-[#7A5230] max-w-xl">
                4 exquisite fragrances (Sandalwood, Lavender, Rose, Jasmine). Handcrafted
                pure dhoop cones that burn for 35-40 minutes each without bamboo or charcoal.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-[#E3D4BD] flex items-center gap-3 shrink-0">
              <Gift className="h-7 w-7 text-[#C8922A]" />
              <div>
                <span className="text-xs font-semibold text-[#0F0D0B] block">
                  Free Luxury Burner
                </span>
                <span className="text-[11px] text-[#7A5230]">
                  Inside every 60-cone box
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cones Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coneProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* ── SECTION 2: PREMIUM INCENSE STICKS (250g) ── */}
      <section id="sticks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0F0D0B] text-[#FAF7F2] p-6 sm:p-10 mb-8 border border-[#C8922A]/30 shadow-lg relative overflow-hidden">
          {/* Subtle gold decoration background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-[#C8922A]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#DFB15B] bg-[#1A1715] px-3 py-1 rounded-full border border-[#C8922A]/40">
                  <Flame className="h-3.5 w-3.5" />
                  Generous 250g Pack (~135 Sticks)
                </span>
                <span className="text-xs text-[#AFA8A2]">
                  · 45-50 Min Slow Combustion
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Premium Incense Sticks (250g)
              </h2>
              <p className="mt-2 text-sm text-[#E7E5E3] max-w-xl">
                6 timeless Vedic scents: Kasturi, Ancient Woods, Royal Oudh, Sukhad Sandal,
                Mogra, and Gugal. 100% natural flower base with zero coal.
              </p>
            </div>

            <div className="bg-[#1A1715] p-4 rounded-2xl border border-[#C8922A]/30 flex items-center gap-4 shrink-0">
              <div className="text-right">
                <span className="text-xs text-[#AFA8A2] block">Special Offer</span>
                <span className="text-2xl font-bold text-[#DFB15B]">
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

        {/* 6 Sticks Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stickProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
