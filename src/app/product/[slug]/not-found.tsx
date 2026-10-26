import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center p-8 rounded-3xl bg-white border border-[#E3D4BD] shadow-card">
        <Sparkles className="h-12 w-12 text-[#C8922A] mx-auto mb-4" />
        <h2 className="font-serif text-3xl font-bold text-[#0F0D0B]">
          Product Not Found
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#7A5230]">
          The fragrance you are looking for is either out of sacred circulation or the link is incorrect.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link href="/shop">
            <Button variant="primary" size="md">
              Explore Our Collection
            </Button>
          </Link>
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
