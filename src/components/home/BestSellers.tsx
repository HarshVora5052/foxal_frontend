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
    <section id="bestsellers" className="py-16 sm:py-24 bg-[#F6EFE4]/60 border-y border-[#E3D4BD]">
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

          {/* Filter Tabs */}
          <div className="inline-flex rounded-xl bg-[#FAF7F2] p-1.5 border border-[#E3D4BD] self-start md:self-auto shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-[#0F0D0B] text-[#FAF7F2] shadow-sm'
                  : 'text-[#7A5230] hover:text-[#0F0D0B]'
              }`}
            >
              All Favorites
            </button>
            <button
              onClick={() => setFilter('sticks')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                filter === 'sticks'
                  ? 'bg-[#0F0D0B] text-[#FAF7F2] shadow-sm'
                  : 'text-[#7A5230] hover:text-[#0F0D0B]'
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              Sticks (250g)
            </button>
            <button
              onClick={() => setFilter('cones')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                filter === 'cones'
                  ? 'bg-[#0F0D0B] text-[#FAF7F2] shadow-sm'
                  : 'text-[#7A5230] hover:text-[#0F0D0B]'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Cones (60 pcs)
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
