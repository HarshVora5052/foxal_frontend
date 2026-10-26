'use client';

import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      id,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#7A5230] mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#7A5230]/70">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full rounded-xl border bg-white/80 px-4 py-2.5 text-sm text-[#0F0D0B] placeholder:text-[#AFA8A2] transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8922A] focus:border-transparent ${
              errorMessage
                ? 'border-red-400 focus:ring-red-400'
                : 'border-[#E3D4BD] hover:border-[#C8922A]/60'
            } ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[#7A5230]/70">
              {rightIcon}
            </div>
          )}
        </div>
        {errorMessage ? (
          <p className="mt-1 text-xs text-red-600 font-medium">{errorMessage}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-[#7F7771]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
