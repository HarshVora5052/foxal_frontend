'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  className = '',
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const sizeStyles = {
    sm: 'h-8 px-1 text-xs',
    md: 'h-10 px-2 text-sm',
  }[size];

  const btnSizes = {
    sm: 'h-6 w-6',
    md: 'h-7 w-7',
  }[size];

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-[#E3D4BD] bg-white shadow-sm select-none ${sizeStyles} ${className}`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center rounded-lg text-[#7A5230] hover:text-[#0F0D0B] hover:bg-[#F6EFE4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${btnSizes}`}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <span className="w-8 text-center font-semibold text-[#0F0D0B]">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`flex items-center justify-center rounded-lg text-[#7A5230] hover:text-[#0F0D0B] hover:bg-[#F6EFE4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${btnSizes}`}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
