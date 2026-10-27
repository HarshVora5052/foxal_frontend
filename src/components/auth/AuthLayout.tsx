'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center items-center px-4 py-8 sm:py-12 font-sans">
      <div className="w-full max-w-md">
        {/* Top Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="group flex flex-col items-center gap-2 select-none">
            <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-white p-1 border border-[#E3D4BD] shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="FOXAL Natural Incense"
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#0F0D0B] block leading-none">
                FOXAL
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#C8922A] mt-1 block">
                Natural Incense
              </span>
            </div>
          </Link>
        </div>

        {/* Centered Auth Card */}
        <div className="bg-white rounded-3xl border border-[#E3D4BD] p-6 sm:p-8 shadow-card">
          <div className="mb-6 text-center">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0D0B]">
              {title}
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-[#7A5230]">
              {subtitle}
            </p>
          </div>

          {children}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A5230] hover:text-[#C8922A] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
