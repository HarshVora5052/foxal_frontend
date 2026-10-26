import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function SearchLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Skeleton width="180px" height="16px" className="mb-4" />
      <Skeleton width="340px" height="40px" className="mb-3" />
      <Skeleton width="220px" height="16px" className="mb-10" />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-white p-3.5 border border-[#E3D4BD] space-y-3">
            <Skeleton height="200px" className="rounded-xl" />
            <Skeleton width="50%" height="12px" />
            <Skeleton width="80%" height="16px" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton width="40%" height="20px" />
              <Skeleton width="35%" height="28px" className="rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
