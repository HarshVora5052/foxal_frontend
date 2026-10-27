'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Sparkles, Heart, Leaf } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-20 sm:py-28 bg-[#0F0D0B] text-[#FAF7F2] relative overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C8922A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase with 2 overlapping images */}
          <div className="relative">
            <div className="relative h-96 sm:h-[460px] w-full rounded-3xl overflow-hidden border border-[#C8922A]/30 shadow-2xl">
              <Image
                src="/images/products/foxal-jasmine-incense-cones-flatlay.jpg"
                alt="Handcrafting organic natural incense sticks"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0B] via-transparent to-transparent opacity-80" />
            </div>

            {/* Overlapping small card */}
            <div className="absolute -bottom-4 right-2 sm:-bottom-8 sm:right-6 bg-[#FAF7F2] text-[#0F0D0B] p-4 sm:p-5 rounded-2xl border border-[#C8922A]/40 shadow-2xl max-w-[250px] sm:max-w-xs">
              <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#C8922A] uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Sacred Mission</span>
              </div>
              <p className="text-xs text-[#5A534E] leading-relaxed">
                Over <strong>1.2 Million temple blossoms</strong> saved from river pollution
                and reincarnated as sacred incense.
              </p>
            </div>
          </div>

          {/* Story Narrative Content */}
          <div className="space-y-6">
            <Badge variant="gold" size="md">
              Born from Devotion
            </Badge>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#FAF7F2]">
              Reviving India&apos;s Ancient Incense Science
            </h2>

            <div className="h-0.5 w-16 bg-[#C8922A]" />

            <p className="text-sm sm:text-base text-[#CFCAC6] leading-relaxed font-sans">
              For centuries, Indian sages burned <em>Dhoop</em> crafted with dried flower
              petals, guggul resin, and sacred medicinal roots during prayer and meditation.
              Tragically, the modern industrial revolution replaced these sacred botanicals
              with cheap powdered charcoal and synthetic alcohol dips.
            </p>

            <p className="text-sm sm:text-base text-[#CFCAC6] leading-relaxed font-sans">
              <strong>FOXAL was born to restore that sanctity.</strong> We partner directly
              with temple trusts in Gujarat and Uttar Pradesh to collect discarded floral
              offerings. Rural women artisans carefully separate the sacred petals, sun-dry
              them, and hand-roll them with Ayurvedic gums and pure essential oils.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#272320]">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A1715] text-[#DFB15B] shrink-0">
                  <Leaf className="h-4 w-4" />
                </span>
                <div>
                  <span className="text-xs font-bold text-white block">
                    Zero Waste Process
                  </span>
                  <span className="text-[11px] text-[#AFA8A2]">
                    100% biodegradable &amp; plastic-free
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1A1715] text-[#DFB15B] shrink-0">
                  <Heart className="h-4 w-4" />
                </span>
                <div>
                  <span className="text-xs font-bold text-white block">
                    Women Artisan Guild
                  </span>
                  <span className="text-[11px] text-[#AFA8A2]">
                    Fair wages &amp; dignified livelihoods
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
