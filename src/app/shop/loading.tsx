import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title skeleton */}
      <div className="mb-8 pb-6 border-b border-[#E3D4BD]">
        <Skeleton width="180px" height="16px" className="mb-2" />
        <Skeleton width="320px" height="40px" className="mb-3" />
        <Skeleton width="480px" height="20px" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block space-y-4">
          <Skeleton height="350px" className="rounded-2xl" />
        </div>

        {/* Product Cards skeleton */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white p-3.5 border border-[#E3D4BD] space-y-3">
                <Skeleton height="220px" className="rounded-xl" />
                <Skeleton width="60%" height="14px" />
                <Skeleton width="85%" height="18px" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton width="40%" height="20px" />
                  <Skeleton width="35%" height="28px" className="rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
