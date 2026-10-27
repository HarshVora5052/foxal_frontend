'use client';

import React, { useState } from 'react';
import { REVIEWS } from '@/lib/mock';
import { Card } from '@/components/ui/Card';
import { Rating } from '@/components/ui/Rating';
import { ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReviewsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = REVIEWS[currentIndex];

  return (
    <section className="pt-14 sm:pt-20 pb-10 sm:pb-12 bg-[#F6EFE4]/60 border-t border-[#E3D4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-2">
            Trusted by Devotees &amp; Homes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
            Words of Reverence
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#C8922A]/40" />
          <p className="mt-4 text-sm text-[#7A5230]">
            Over 15,000+ Indian households burn FOXAL daily without sneezing,
            headaches, or soot. Here is what they say:
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-3xl mx-auto relative">
          <Card
            variant="glass"
            className="p-8 sm:p-12 border border-[#E3D4BD] bg-[#FAF7F2] shadow-card relative overflow-hidden"
          >
            <Quote className="absolute top-6 right-6 h-16 w-16 text-[#EADECB]/60 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {/* Rating & Product Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <Rating score={current.rating} showScore={false} size="md" />
                  <span className="text-xs bg-[#EBF2ED] text-[#354E3C] px-3 py-1 rounded-full font-semibold border border-[#C7D9CD] flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified Buyer · {current.product_name}
                  </span>
                </div>

                {/* Headline */}
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0F0D0B] mb-3 leading-snug">
                  &ldquo;{current.headline}&rdquo;
                </h4>

                {/* Comment */}
                <p className="text-sm sm:text-base text-[#5A534E] leading-relaxed mb-6 font-sans">
                  {current.comment}
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E3D4BD]">
                  <div>
                    <h5 className="font-serif text-base font-bold text-[#0F0D0B]">
                      {current.name}
                    </h5>
                    <p className="text-xs text-[#7A5230]">{current.location}</p>
                  </div>
                  <span className="text-xs text-[#AFA8A2]">{current.date}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>

          {/* Controls: Prev & Next buttons */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-1.5">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-6 bg-[#C8922A]'
                      : 'w-2 bg-[#EADECB] hover:bg-[#C8922A]/50'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                className="p-2.5 rounded-full bg-white border border-[#E3D4BD] text-[#0F0D0B] hover:bg-[#F6EFE4] hover:text-[#C8922A] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextReview}
                className="p-2.5 rounded-full bg-white border border-[#E3D4BD] text-[#0F0D0B] hover:bg-[#F6EFE4] hover:text-[#C8922A] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                aria-label="Next review"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
