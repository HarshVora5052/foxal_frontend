'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { RotateCcw } from 'lucide-react';

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Product detail error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center p-8 rounded-3xl bg-white border border-[#E3D4BD] shadow-card">
        <h2 className="font-serif text-2xl font-bold text-[#0F0D0B]">
          Could Not Load Fragrance
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#7A5230]">
          An unexpected error occurred while loading this product. Please try again.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => reset()}
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Retry
          </Button>
          <Link href="/shop">
            <Button variant="secondary" size="md">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
