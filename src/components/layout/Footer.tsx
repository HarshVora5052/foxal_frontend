'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F0D0B] text-[#FAF7F2] border-t border-[#C8922A]/20 py-10 sm:py-12 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Clean Row: Logo + 3 Navigation Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#272320]">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3 select-none">
            <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-white p-0.5 border border-[#C8922A]/30 shrink-0 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="FOXAL Natural Incense"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider text-[#FAF7F2] leading-none">
                FOXAL
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-[#DFB15B] mt-0.5">
                Natural Incense
              </span>
            </div>
          </Link>

          {/* Only 3 Links: Home, Products, Contact us */}
          <nav className="flex items-center space-x-8 text-sm font-medium text-[#FAF7F2]">
            <Link
              href="/"
              className="hover:text-[#DFB15B] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="hover:text-[#DFB15B] transition-colors"
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#DFB15B] transition-colors"
            >
              Contact us
            </Link>
          </nav>
        </div>

        {/* Bottom Policy Bar (As-is) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7F7771] gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} FOXAL Organics India. All sacred rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/privacy-policy" prefetch={false} className="hover:text-[#DFB15B] transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" prefetch={false} className="hover:text-[#DFB15B] transition-colors">
              Terms of Service
            </Link>
            <span>·</span>
            <Link href="/refund" prefetch={false} className="hover:text-[#DFB15B] transition-colors">
              Refund Policy
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] bg-[#1A1715] px-2.5 py-1 rounded border border-[#272320]">
              UPI
            </span>
            <span className="text-[11px] bg-[#1A1715] px-2.5 py-1 rounded border border-[#272320]">
              RuPay
            </span>
            <span className="text-[11px] bg-[#1A1715] px-2.5 py-1 rounded border border-[#272320]">
              Visa
            </span>
            <span className="text-[11px] bg-[#1A1715] px-2.5 py-1 rounded border border-[#272320]">
              Mastercard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
