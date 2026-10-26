'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { RotateCcw, Flame } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col items-center justify-center px-4 py-16 text-center font-sans">
      <div className="max-w-md p-8 sm:p-12 rounded-3xl bg-white border border-[#E3D4BD] shadow-card">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F0D0B] text-[#DFB15B] mx-auto mb-6 shadow-md">
          <Flame className="h-8 w-8" />
        </span>

        <h1 className="font-serif text-3xl font-bold text-[#0F0D0B] mb-2">
          Something Went Astray
        </h1>

        <p className="text-xs sm:text-sm text-[#7A5230] leading-relaxed mb-4">
          We encountered an unexpected disruption. Please try refreshing or
          return to the FOXAL sanctuary.
        </p>

        {error?.message && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-xl text-left text-xs font-mono overflow-auto max-h-40 border border-red-200">
            <strong>Error:</strong> {error.message}
            {error.stack && (
              <pre className="mt-2 text-[10px] whitespace-pre-wrap text-red-600">
                {error.stack.slice(0, 300)}
              </pre>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => reset()}
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Try Again
          </Button>
          <Link href="/" className="w-full">
            <Button variant="secondary" size="md" fullWidth>
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
