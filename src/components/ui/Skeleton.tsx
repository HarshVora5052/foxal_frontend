'use client';

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantStyles = {
    rect: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded-md h-4 w-full',
  }[variant];

  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-[#F6EFE4] via-[#FAF7F2] to-[#F6EFE4] ${variantStyles} ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
};
