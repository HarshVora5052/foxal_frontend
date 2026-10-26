import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Skeleton width="220px" height="16px" className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left Gallery Skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <Skeleton height="450px" className="rounded-3xl" />
          <div className="flex gap-3">
            <Skeleton width="80px" height="80px" className="rounded-2xl" />
            <Skeleton width="80px" height="80px" className="rounded-2xl" />
          </div>
        </div>

        {/* Right Details Skeleton */}
        <div className="lg:col-span-6 space-y-6">
          <Skeleton width="140px" height="14px" />
          <Skeleton width="80%" height="42px" />
          <Skeleton width="60%" height="20px" />
          <Skeleton width="40%" height="24px" />

          <Skeleton height="70px" className="rounded-2xl" />

          <div className="space-y-3 pt-4">
            <Skeleton height="48px" className="rounded-xl" />
            <Skeleton height="48px" className="rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
