'use client';

import React, { useState } from 'react';
import { FAQS } from '@/lib/mock';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1); // first open by default

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="pt-10 sm:pt-14 pb-16 sm:pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <Badge variant="gold" size="md" className="mb-3">
          Knowledge &amp; Clarity
        </Badge>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto mt-4 h-0.5 w-16 bg-[#C8922A]/40" />
        <p className="mt-4 text-sm sm:text-base text-[#7A5230]">
          Everything you need to know about our ingredients, temple flower upcycling, and delivery.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-[#C8922A]/60 bg-white shadow-sm'
                  : 'border-[#E3D4BD] bg-[#FAF7F2] hover:border-[#C8922A]/30'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8922A]"
              >
                <span className="font-serif text-lg sm:text-xl font-bold text-[#0F0D0B] pr-4">
                  {faq.question}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F6EFE4] text-[#C8922A] transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#0F0D0B] text-white' : ''
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#5A534E] leading-relaxed border-t border-[#E3D4BD]/40 pt-4 font-sans">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
