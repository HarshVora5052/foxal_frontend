'use client';

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'charcoal' | 'secondary' | 'outline' | 'ghost' | 'sage';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const sizeStyles = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2 shadow-sm',
      lg: 'text-base px-7 py-3.5 gap-2.5 shadow-md tracking-wide',
    }[size];

    const variantStyles = {
      primary:
        'bg-[#C8922A] hover:bg-[#B57E1E] text-white shadow-gold/20 hover:shadow-gold/30 hover:shadow-md border border-[#DFB15B]/40',
      charcoal:
        'bg-[#0F0D0B] hover:bg-[#272320] text-[#FAF7F2] border border-[#C8922A]/30 shadow-md',
      secondary:
        'bg-[#F6EFE4] hover:bg-[#EADECB] text-[#0F0D0B] border border-[#E3D4BD]',
      outline:
        'bg-transparent hover:bg-[#F6EFE4]/60 text-[#7A5230] border border-[#C8922A]/40 hover:border-[#C8922A]',
      ghost:
        'bg-transparent hover:bg-[#F6EFE4] text-[#0F0D0B]',
      sage:
        'bg-[#4A6B53] hover:bg-[#354E3C] text-white border border-[#C7D9CD]/30',
    }[variant];

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
