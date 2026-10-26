import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Flame } from 'lucide-react';

export default function ShopNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center p-8 rounded-3xl bg-white border border-[#E3D4BD] shadow-card">
        <Flame className="h-12 w-12 text-[#C8922A] mx-auto mb-4" />
        <h2 className="font-serif text-3xl font-bold text-[#0F0D0B]">
          Collection Not Found
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#7A5230]">
          The collection category you are seeking does not exist or may have been reorganized.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link href="/shop">
            <Button variant="primary" size="md">
              Browse All Fragrances
            </Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" size="md">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
