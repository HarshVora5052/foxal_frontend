'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);
  const { settings } = useAdminStore();

  const messages = [
    {
      icon: <Sparkles className="h-3.5 w-3.5 text-[#DFB15B]" />,
      text: settings?.announcementText || 'Free Express Shipping on Orders Above ₹499 Across India',
    },
    {
      icon: <ShieldCheck className="h-3.5 w-3.5 text-[#DFB15B]" />,
      text: '100% Charcoal-Free · Handcrafted with Sacred Temple Flowers',
    },
    {
      icon: <Flame className="h-3.5 w-3.5 text-[#DFB15B]" />,
      text: 'Festive Offer: Flat 25% Off All Incense Sticks & Cones — Now ₹149',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="relative z-30 bg-[#0F0D0B] text-[#FAF7F2] py-2 px-3 text-center border-b border-[#C8922A]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[22px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-medium tracking-wide"
          >
            {messages[index]?.icon}
            <span>{messages[index]?.text}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
