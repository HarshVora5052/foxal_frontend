'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Sparkles, RotateCcw } from 'lucide-react';

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Shop error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center p-8 rounded-3xl bg-white border border-[#E3D4BD] shadow-card">
        <Sparkles className="h-12 w-12 text-[#C8922A] mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-[#0F0D0B]">
          A Temporary Interruption
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#7A5230]">
          We encountered an issue fetching the sacred incense collection.
          Please try refreshing or returning to our home sanctuary.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            size="md"
            onClick={() => reset()}
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="secondary" size="md">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
