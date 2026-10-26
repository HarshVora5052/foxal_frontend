'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F6EFE4] via-[#FAF7F2] to-[#FAF7F2] px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      {/* ── Subtle Floating Incense Smoke Waves (Framer Motion, lightweight SVG) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Soft Radial Gold Aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#C8922A]/10 via-[#7A5230]/5 to-transparent blur-3xl" />

        {/* Lightweight Animated Smoke Wisp 1 */}
        <motion.svg
          className="absolute -bottom-10 left-1/4 w-96 h-[600px] opacity-40 text-[#DFB15B]"
          viewBox="0 0 300 600"
          fill="none"
          animate={{
            y: [-20, -70, -20],
            x: [0, 25, 0],
            opacity: [0.25, 0.45, 0.25],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M 150 600 Q 110 450 180 320 T 130 140 T 170 0"
            stroke="url(#smokeGradient)"
            strokeWidth="38"
            strokeLinecap="round"
            filter="blur(16px)"
          />
          <defs>
            <linearGradient id="smokeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#C8922A" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#EADECB" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Lightweight Animated Smoke Wisp 2 */}
        <motion.svg
          className="absolute -bottom-10 right-1/4 w-96 h-[600px] opacity-35 text-[#7A5230]"
          viewBox="0 0 300 600"
          fill="none"
          animate={{
            y: [-10, -60, -10],
            x: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        >
          <path
            d="M 150 600 Q 190 470 120 330 T 180 150 T 130 0"
            stroke="url(#smokeGradient2)"
            strokeWidth="42"
            strokeLinecap="round"
            filter="blur(18px)"
          />
          <defs>
            <linearGradient id="smokeGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#7A5230" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#DFB15B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* ── Hero Foreground Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Natural Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <Badge
            variant="sage"
            size="md"
            icon={<ShieldCheck className="h-3.5 w-3.5 text-[#354E3C]" />}
            className="shadow-sm"
          >
            100% Charcoal-Free · Ayurvedic Dhoop &amp; Agarbatti
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#0F0D0B] tracking-tight leading-[1.08]"
        >
          Breathe the Divine.{' '}
          <span className="block mt-1 bg-gradient-to-r from-[#9A6A16] via-[#C8922A] to-[#7A5230] bg-clip-text text-transparent">
            Free from Charcoal.
          </span>
        </motion.h1>

        {/* Spiritual Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#7A5230] leading-relaxed font-sans"
        >
          Handcrafted in India using sacred temple flowers, pure sandalwood, and Vedic
          herbal resins. Experience serene white aroma without choking coal smoke,
          headaches, or indoor soot.
        </motion.p>

        {/* Dual CTAs & Pricing Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              const el = document.getElementById('bestsellers');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            rightIcon={<ArrowRight className="h-5 w-5" />}
            className="w-full sm:w-auto text-base px-8 py-4 shadow-lg shadow-[#C8922A]/25"
          >
            Shop Best Sellers (₹149)
          </Button>

          <Button
            variant="charcoal"
            size="lg"
            onClick={() => {
              const el = document.getElementById('cones');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            rightIcon={<Sparkles className="h-4 w-4 text-[#DFB15B]" />}
            className="w-full sm:w-auto text-base px-8 py-4"
          >
            Sample 60 Cones Box
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
