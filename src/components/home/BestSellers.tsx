'use client';

import React, { useState } from 'react';
import { PRODUCTS, Product } from '@/lib/mock';
import { ProductCard } from '@/components/home/ProductCard';
import { Sparkles, Flame, Check } from 'lucide-react';

interface BestSellersProps {
  onQuickView: (product: Product) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onQuickView }) => {
  const [filter, setFilter] = useState<'all' | 'sticks' | 'cones'>('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filter === 'all') return p.is_bestseller;
    return p.is_bestseller && p.category === filter;
  });

  return (
    <section id="bestsellers" className="py-16 sm:py-24 bg-[#F6EFE4]/60 border-y border-[#E3D4BD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Devotee Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
              Best Sellers
            </h2>
            <p className="mt-2 text-sm text-[#7A5230] max-w-lg">
              Our most cherished charcoal-free fragrances, handpicked for daily prayer,
              relaxation and elevating ambient space.
            </p>
          </div>


        </div>

        {/* Product Grid: Horizontal Scroll on Mobile, Grid on Tablet/Desktop */}
        <div className="flex sm:grid overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 gap-4 sm:gap-6 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {filteredProducts.map((product) => (
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
      </div>
    </section>
  );
};
