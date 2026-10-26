'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'glass' | 'flat';
  isHoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      isHoverable = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default:
        'bg-[#FBF7F0] border border-[#E3D4BD]/80 shadow-[0_4px_20px_-2px_rgba(15,13,11,0.05)]',
      gold:
        'bg-[#FBF8F2] border border-[#C8922A]/30 shadow-[0_6px_24px_-4px_rgba(200,146,42,0.12)]',
      glass:
        'bg-white/70 backdrop-blur-md border border-[#E3D4BD]/60 shadow-sm',
      flat:
        'bg-[#F6EFE4] border border-transparent',
    }[variant];

    return (
      <motion.div
        ref={ref}
        whileHover={isHoverable ? { y: -4, transition: { duration: 0.2 } } : undefined}
        className={`rounded-2xl overflow-hidden transition-all duration-300 ${variantStyles} ${
          isHoverable ? 'hover:shadow-[0_12px_32px_-4px_rgba(15,13,11,0.1)] hover:border-[#C8922A]/50' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
