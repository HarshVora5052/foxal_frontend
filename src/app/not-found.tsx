import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Flame, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col items-center justify-center px-4 py-16 text-center font-sans">
      <div className="max-w-md p-8 sm:p-12 rounded-3xl bg-white border border-[#E3D4BD] shadow-card">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F0D0B] text-[#DFB15B] mx-auto mb-6 shadow-md">
          <Flame className="h-8 w-8" />
        </span>

        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
          Error 404
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B] mb-3">
          Sacred Path Not Found
        </h1>

        <p className="text-xs sm:text-sm text-[#7A5230] leading-relaxed mb-8">
          The page you are looking for does not exist in our temple sanctuary.
          Return home or browse our charcoal-free incense sticks and cones.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button
              variant="primary"
              size="md"
              fullWidth
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button
              variant="charcoal"
              size="md"
              fullWidth
              leftIcon={<ShoppingBag className="h-4 w-4" />}
            >
              Explore Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
