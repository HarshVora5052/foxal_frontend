'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerSlide {
  id: string;
  src: string;
  alt: string;
  href: string;
  title: string;
}

const BANNERS: BannerSlide[] = [
  {
    id: 'master',
    src: '/images/banners/foxal-all-products-banner.png',
    alt: 'FOXAL Premium Sticks & Natural Cones - Pure Fragrance For A Better Tomorrow',
    href: '/shop',
    title: 'All Products Master Collection',
  },
  {
    id: 'sticks',
    src: '/images/banners/foxal-incense-sticks-banner.png',
    alt: 'FOXAL Premium Incense Sticks - 100% Charcoal Free 250g Value Packs',
    href: '#sticks',
    title: 'Premium Incense Sticks',
  },
  {
    id: 'cones',
    src: '/images/banners/foxal-incense-cones-banner.png',
    alt: 'FOXAL Natural Incense Cones - Pure Dhoop with Complimentary Ceramic Stand',
    href: '#cones',
    title: 'Natural Incense Cones',
  },
];

export const BannerSlider: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % BANNERS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  }, []);

  // Smooth automatic rotation every 3.5 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % BANNERS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, currentIdx]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
  };

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      onMouseEnter={() => {
        if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Promotional Banners"
    >
      <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E3D4BD] bg-[#0F0D0B] shadow-md">
        {/* Responsive Aspect Ratio Container (1024x373 = 2.745:1) */}
        {/* This ensures 100% of the banner is visible on Mobile, Tablet & Desktop without any cropping */}
        <div className="relative w-full aspect-[1024/373]">
          {BANNERS.map((banner, idx) => {
            const isActive = idx === currentIdx;

            return (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Link
                  href={banner.href}
                  className="block relative w-full h-full focus:outline-none"
                  title={banner.title}
                >
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 95vw, 1280px"
                    className="w-full h-full object-contain"
                  />
                </Link>
              </div>
            );
          })}

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#0F0D0B]/70 hover:bg-[#0F0D0B] text-white flex items-center justify-center backdrop-blur-sm border border-[#C8922A]/40 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous Banner"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-[#DFB15B]" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#0F0D0B]/70 hover:bg-[#0F0D0B] text-white flex items-center justify-center backdrop-blur-sm border border-[#C8922A]/40 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next Banner"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#DFB15B]" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-2 sm:bottom-4 inset-x-0 z-20 flex items-center justify-center gap-1.5 sm:gap-2 pointer-events-none">
            {BANNERS.map((banner, idx) => {
              const isActive = idx === currentIdx;
              return (
                <button
                  key={banner.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentIdx(idx);
                  }}
                  className={`pointer-events-auto transition-all rounded-full ${
                    isActive
                      ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-[#C8922A] shadow-sm'
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
