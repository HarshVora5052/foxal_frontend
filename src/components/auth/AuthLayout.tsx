'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#FAF7F2] font-sans">
      {/* ── Left Side: Spiritual Brand Canvas (Hidden on small mobile or stacked) ── */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-[#0F0D0B] text-[#FAF7F2] flex-col justify-between p-12 overflow-hidden border-r border-[#C8922A]/20">
        {/* Background Image with atmospheric luxury overlay */}
        <Image
          src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop"
          alt="Sacred Indian Incense"
          fill
          priority
          sizes="45vw"
          className="object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0B] via-[#0F0D0B]/70 to-[#0F0D0B]/40" />

        {/* Top: Brand Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-white p-0.5 border border-[#C8922A]/40 shadow-sm shrink-0 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="FOXAL"
                width={38}
                height={38}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white block leading-none">
                FOXAL
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[#DFB15B] mt-0.5 block">
                Natural Incense
              </span>
            </div>
          </Link>
        </div>

        {/* Middle: Spiritual Quote */}
        <div className="relative z-10 my-auto max-w-sm space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DFB15B] bg-[#1A1715] px-3 py-1 rounded-full border border-[#C8922A]/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Sacred Family Circle</span>
          </div>

          <h3 className="font-serif text-3xl font-bold text-white leading-snug">
            &ldquo;When fragrance is pure, the home becomes a sanctuary.&rdquo;
          </h3>

          <p className="text-xs text-[#CFCAC6] leading-relaxed">
            Join thousands of mindful devotees who choose pure flower dhoop over toxic coal smoke.
          </p>
        </div>

        {/* Bottom: Trust pillars */}
        <div className="relative z-10 pt-6 border-t border-[#272320] flex items-center justify-between text-xs text-[#AFA8A2]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[#DFB15B]" />
            Zero Black Soot
          </span>
          <span>·</span>
          <span>Temple Flowers</span>
          <span>·</span>
          <span>Ayurvedic Herbs</span>
        </div>
      </div>

      {/* ── Right Side: Form Area ── */}
      <div className="lg:col-span-7 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A5230] hover:text-[#C8922A] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Sanctuary</span>
          </Link>

          {/* Form Card Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
              {title}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#7A5230] font-sans">
              {subtitle}
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3D4BD] shadow-card">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
