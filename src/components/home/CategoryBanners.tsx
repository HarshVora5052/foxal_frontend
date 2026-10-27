'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/mock';
import { ArrowRight } from 'lucide-react';

export const CategoryBanners: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1.5">
          Two Sacred Collections
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F0D0B]">
          Shop by Category
        </h2>
        <div className="mx-auto mt-3 h-0.5 w-14 bg-[#C8922A]/40" />
        <p className="mt-3 text-xs sm:text-sm text-[#7A5230]">
          Whether you prefer traditional long-burning sticks for daily puja or
          concentrated aromatic cones with a complimentary ceramic stand.
        </p>
      </div>

      {/* 2 Compact Category Cards (Light Luxury Aesthetic Inspired by Reference) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto">
        {CATEGORIES.map((cat) => {
          const isSticks = cat.id === 'sticks';

          return (
            <div
              key={cat.id}
              className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#E3D4BD] bg-white p-2.5 sm:p-4 shadow-sm hover:shadow-md hover:border-[#C8922A] transition-all duration-300"
            >
              {/* Inner Framed Image Container (Full Image Visible with Rounded Border) */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-xl sm:rounded-2xl border border-[#E3D4BD]/80 bg-[#FAF7F2] overflow-hidden mb-3 p-2 sm:p-3">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  priority={isSticks}
                  sizes="(max-width: 640px) 50vw, 380px"
                  className="w-full h-full object-contain p-1.5 sm:p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Subtle Charcoal-Free Tag (No Sale Tag) */}
                <div className="absolute top-2 left-2 z-10 pointer-events-none">
                  <span className="text-[9px] sm:text-[11px] font-semibold text-[#354E3C] bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full border border-[#C7D9CD] shadow-xs">
                    {isSticks ? '250g Pack' : '60 Cones'}
                  </span>
                </div>
              </div>

              {/* Category Details */}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-[#C8922A] block mb-1">
                    FOXAL Natural Incense
                  </span>

                  <h3 className="font-serif text-sm sm:text-lg font-bold text-[#0F0D0B] line-clamp-1 group-hover:text-[#C8922A] transition-colors mb-0.5">
                    {cat.name}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-[#7A5230] line-clamp-1 mb-2 font-sans">
                    {isSticks ? '100% Charcoal-Free · 6 Flavours' : 'Handcrafted · Free Burner'}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F2EAE0]">
                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-2.5">
                    <span className="text-[11px] sm:text-xs text-[#AFA8A2] line-through">
                      Rs. 199
                    </span>
                    <strong className="text-xs sm:text-base font-bold text-[#0F0D0B]">
                      Rs. {cat.starting_price}
                    </strong>
                  </div>

                  {/* Clean Pill Action Button */}
                  <Link
                    href={`#${cat.id}`}
                    className="w-full py-2 sm:py-2.5 px-3 rounded-full border border-[#0F0D0B] bg-white hover:bg-[#0F0D0B] text-[#0F0D0B] hover:text-white transition-all text-center text-xs sm:text-sm font-semibold shadow-xs flex items-center justify-center gap-1.5 group-hover:border-[#C8922A] group-hover:bg-[#C8922A] group-hover:text-white"
                  >
                    <span>Explore</span>
                    <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
