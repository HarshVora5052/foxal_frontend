'use client';

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'sage' | 'gold' | 'charcoal' | 'sale' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'sage',
  size = 'sm',
  icon,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wider font-semibold',
    md: 'text-xs px-3 py-1 tracking-wide font-medium',
  }[size];

  const variantStyles = {
    sage: 'bg-[#EBF2ED] text-[#354E3C] border border-[#C7D9CD]',
    gold: 'bg-[#FBF5EA] text-[#9A6A16] border border-[#DFB15B]/50 font-semibold',
    charcoal: 'bg-[#0F0D0B] text-[#FAF7F2] border border-[#C8922A]/30',
    sale: 'bg-red-50 text-red-700 border border-red-200 font-bold',
    outline: 'bg-transparent text-[#7A5230] border border-[#C8922A]/40',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full uppercase transition-colors ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
