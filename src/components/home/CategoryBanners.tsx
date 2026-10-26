'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/mock';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

export const CategoryBanners: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-2">
          Two Sacred Collections
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
          Shop by Category
        </h2>
        <div className="mx-auto mt-4 h-0.5 w-16 bg-[#C8922A]/40" />
        <p className="mt-4 text-sm sm:text-base text-[#7A5230]">
          Whether you prefer traditional long-burning sticks for daily puja or
          concentrated aromatic cones with a complimentary ceramic stand.
        </p>
      </div>

      {/* 2 Vertical Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
        {CATEGORIES.map((cat) => {
          const isSticks = cat.id === 'sticks';

          return (
            <Card
              key={cat.id}
              isHoverable
              className="group flex flex-col rounded-3xl border border-[#E3D4BD] bg-[#0F0D0B] shadow-card transition-all duration-500 hover:shadow-2xl hover:border-[#C8922A]/70 overflow-hidden"
            >
              {/* Dedicated Upper Product Image Showcase (Full Packaging View) */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[4/5] overflow-hidden bg-[#1A1715]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  priority={isSticks}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Floating Badges */}
                <div className="absolute top-4 inset-x-4 sm:top-5 sm:inset-x-5 flex items-center justify-between z-10 pointer-events-none gap-2">
                  <div className="bg-[#0F0D0B]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#DFB15B] border border-[#C8922A]/40 shadow-sm flex items-center gap-1.5 shrink-0">
                    {isSticks ? (
                      <Flame className="h-3.5 w-3.5 text-[#DFB15B]" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5 text-[#DFB15B]" />
                    )}
                    <span>100% Charcoal-Free</span>
                  </div>

                  <div className="bg-[#FAF7F2]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0F0D0B] border border-[#E3D4BD] shadow-sm shrink-0">
                    {cat.item_count} Fragrances
                  </div>
                </div>
              </div>

              {/* Lower Details Area (Clean, Unobscured Text) */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#141210] to-[#0F0D0B] text-[#FAF7F2] border-t border-[#272320]">
                <div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#DFB15B] mb-1.5">
                    {cat.tagline}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                    {cat.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#CFCAC6] line-clamp-2 mb-4 font-sans leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="inline-block mb-6 px-3 py-1 rounded-lg bg-[#FAF7F2]/10 backdrop-blur-sm border border-[#E3D4BD]/20 text-xs text-[#DFB15B] font-medium">
                    {cat.specs}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#272320]">
                  <div>
                    <span className="text-[11px] text-[#AFA8A2] block">
                      Starting from
                    </span>
                    <div className="flex items-baseline gap-2">
                      <strong className="text-xl sm:text-2xl text-[#DFB15B] font-bold">
                        ₹{cat.starting_price}
                      </strong>
                      <span className="line-through text-xs text-[#7F7771]">
                        ₹199
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`#${cat.id}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold bg-[#C8922A] hover:bg-[#DFB15B] text-white hover:text-[#0F0D0B] px-5 py-2.5 rounded-xl transition-all shadow-md group-hover:scale-105"
                  >
                    Explore {cat.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
