'use client';

import React from 'react';
import { COMPARISONS } from '@/lib/mock';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Check, X, ShieldCheck, Flame, Heart, Sparkles } from 'lucide-react';

export const WhyFoxal: React.FC = () => {
  return (
    <section id="why-foxal" className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#E3D4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="sage" size="md" className="mb-3">
            Pure Spiritual Health
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
            Why Charcoal-Free Matters
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#C8922A]/40" />
          <p className="mt-4 text-base text-[#7A5230] leading-relaxed">
            Most commercial agarbatti sticks are dipped in industrial coal powder and synthetic
            scents. Burning them indoors releases dangerous particulate matter and toxic fumes.
            Here is how FOXAL restores spiritual purity to your home:
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[650px] rounded-3xl border border-[#E3D4BD] bg-white shadow-card overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-[#F6EFE4] p-5 text-sm font-semibold border-b border-[#E3D4BD]">
              <div className="col-span-4 text-[#7A5230] uppercase tracking-wider text-xs">
                Essential Factor
              </div>
              <div className="col-span-4 text-center text-[#7F7771] flex items-center justify-center gap-1.5">
                <X className="h-4 w-4 text-red-500" />
                <span>Ordinary Charcoal Incense</span>
              </div>
              <div className="col-span-4 text-center text-[#354E3C] flex items-center justify-center gap-1.5 font-bold">
                <Check className="h-4 w-4 text-[#4A6B53]" />
                <span>FOXAL Natural Incense</span>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-[#E3D4BD]/60">
              {COMPARISONS.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 p-5 text-sm items-center hover:bg-[#FAF7F2] transition-colors"
                >
                  <div className="col-span-4 font-serif font-bold text-[#0F0D0B] text-base">
                    {row.feature}
                  </div>
                  <div className="col-span-4 text-center text-xs text-[#7F7771] px-3 bg-red-50/40 py-2 rounded-xl">
                    {row.charcoal}
                  </div>
                  <div className="col-span-4 text-center text-xs font-semibold text-[#354E3C] px-3 bg-[#EBF2ED]/60 py-2 rounded-xl border border-[#C7D9CD]/50">
                    {row.foxal}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Ayurvedic Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="glass" className="p-6 border border-[#E3D4BD]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6EFE4] text-[#C8922A] mb-4">
              <Sparkles className="h-6 w-6" />
            </span>
            <h4 className="font-serif text-xl font-bold text-[#0F0D0B] mb-2">
              Sacred Upcycled Flowers
            </h4>
            <p className="text-xs text-[#7A5230] leading-relaxed">
              We collect fresh rose, marigold, and jasmine garlands offered at revered
              temples, sun-cure them, and convert them into natural cellulose aromatic base.
            </p>
          </Card>

          <Card variant="glass" className="p-6 border border-[#E3D4BD]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6EFE4] text-[#C8922A] mb-4">
              <Flame className="h-6 w-6" />
            </span>
            <h4 className="font-serif text-xl font-bold text-[#0F0D0B] mb-2">
              Desi Gir Cow Dung Base
            </h4>
            <p className="text-xs text-[#7A5230] leading-relaxed">
              In accordance with Vedic Agnihotra science, pure dried cow dung powder
              generates antibacterial fumes that naturally sterilize indoor air.
            </p>
          </Card>

          <Card variant="glass" className="p-6 border border-[#E3D4BD]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6EFE4] text-[#C8922A] mb-4">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h4 className="font-serif text-xl font-bold text-[#0F0D0B] mb-2">
              Zero Synthetic Solvents
            </h4>
            <p className="text-xs text-[#7A5230] leading-relaxed">
              No dipping in phthalates, synthetic musk, or petroleum byproducts.
              Every stick and cone is slow-infused with therapeutic essential extracts.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
