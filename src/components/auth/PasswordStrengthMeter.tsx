'use client';

import React from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  if (!password) return null;

  // Calculate score 0 to 4
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Too Weak', color: 'bg-red-400', textColor: 'text-red-500' },
    { label: 'Fair', color: 'bg-amber-400', textColor: 'text-amber-600' },
    { label: 'Good', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { label: 'Strong', color: 'bg-emerald-500', textColor: 'text-emerald-600' },
    { label: 'Sacred Strong', color: 'bg-emerald-600', textColor: 'text-emerald-700' },
  ];

  const currentLevel = levels[score];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1.5 h-1.5 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${
              i < score ? currentLevel.color : 'bg-[#E3D4BD]'
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center text-[10px]">
        <span className="text-[#7A5230]">Password Strength:</span>
        <span className={`font-semibold ${currentLevel.textColor}`}>
          {currentLevel.label}
        </span>
      </div>
    </div>
  );
};
