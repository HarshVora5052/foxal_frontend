'use client';

import React from 'react';
import { Star } from 'lucide-react';

export interface RatingProps {
  score: number; // e.g. 4.9
  maxScore?: number;
  reviewsCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  score,
  maxScore = 5,
  reviewsCount,
  size = 'sm',
  showScore = true,
  className = '',
}) => {
  const starSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }[size];

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size];

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5 text-[#C8922A]" aria-label={`${score} out of ${maxScore} stars`}>
        {Array.from({ length: maxScore }).map((_, index) => {
          const filled = index + 1 <= Math.floor(score);
          const hasHalf = !filled && index < score;

          return (
            <Star
              key={index}
              className={`${starSizes} ${
                filled
                  ? 'fill-[#C8922A] text-[#C8922A]'
                  : hasHalf
                  ? 'fill-[#C8922A]/50 text-[#C8922A]'
                  : 'text-[#E3D4BD] fill-transparent'
              }`}
            />
          );
        })}
      </div>

      {showScore && (
        <span className={`font-semibold text-[#0F0D0B] ${textSizes}`}>
          {score.toFixed(1)}
        </span>
      )}

      {reviewsCount !== undefined && (
        <span className={`text-[#7A5230] ${textSizes}`}>
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};
