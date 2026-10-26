'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Leaf, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const PILLARS = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-[#C8922A]" />,
    title: '100% Charcoal Free',
    desc: 'No black soot, zero carbon monoxide emissions. Clean white ash safe for family and children.',
  },
  {
    icon: <Sparkles className="h-6 w-6 text-[#C8922A]" />,
    title: 'Sacred Temple Flowers',
    desc: 'Rescuing holy temple offerings from river dumping to craft sustainable, divine fragrance.',
  },
  {
    icon: <Leaf className="h-6 w-6 text-[#C8922A]" />,
    title: 'Pure Ayurvedic Herbs',
    desc: 'Enriched with Desi Gir cow dung, camphor, natural resins (Guggul, Loban) & pure essential oils.',
  },
  {
    icon: <Clock className="h-6 w-6 text-[#C8922A]" />,
    title: '45+ Mins Long Lasting',
    desc: 'Densely hand-rolled for prolonged, steady combustion and soothing fragrance sillage.',
  },
];

export const TrustStrip: React.FC = () => {
  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PILLARS.map((item, idx) => (
          <Card
            key={idx}
            variant="default"
            className="p-5 sm:p-6 bg-white/90 backdrop-blur-sm border border-[#E3D4BD] hover:border-[#C8922A]/50 transition-colors shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F6EFE4] border border-[#E3D4BD]">
                {item.icon}
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#0F0D0B] leading-tight">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-[#7A5230] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
