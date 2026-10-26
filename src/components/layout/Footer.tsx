'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, ShieldCheck, Heart, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F0D0B] text-[#FAF7F2] border-t border-[#C8922A]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand promise strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-[#272320]">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1A1715] text-[#DFB15B] border border-[#C8922A]/30">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h5 className="font-serif text-base font-semibold text-[#FAF7F2]">
                100% Charcoal-Free
              </h5>
              <p className="text-xs text-[#AFA8A2] mt-0.5">
                Zero harmful chemicals, black soot, or respiratory irritants.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1A1715] text-[#DFB15B] border border-[#C8922A]/30">
              <Flame className="h-6 w-6" />
            </span>
            <div>
              <h5 className="font-serif text-base font-semibold text-[#FAF7F2]">
                Sacred Temple Flowers
              </h5>
              <p className="text-xs text-[#AFA8A2] mt-0.5">
                Upcycling sacred offerings from temple rivers into divine fragrance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1A1715] text-[#DFB15B] border border-[#C8922A]/30">
              <Heart className="h-6 w-6" />
            </span>
            <div>
              <h5 className="font-serif text-base font-semibold text-[#FAF7F2]">
                Handcrafted in India
              </h5>
              <p className="text-xs text-[#AFA8A2] mt-0.5">
                Empowering rural women artisans with honorable livelihoods.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14">
          {/* Brand Philosophy */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
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
            </div>
            <p className="text-sm text-[#AFA8A2] leading-relaxed max-w-sm font-sans">
              FOXAL reclaims ancient Indian incense traditions through modern purity.
              Formulated with organic botanicals, Gir cow dung and sacred temple blossoms,
              our sticks and cones are crafted for mindful rituals, prayer, and serene homes.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-[#DFB15B]">
              <MapPin className="h-3.5 w-3.5" />
              <span>Sourced &amp; Hand-rolled in Gujarat &amp; Uttar Pradesh, India</span>
            </div>
          </div>

          {/* Quick Collections */}
          <div>
            <h6 className="font-serif text-base font-semibold text-[#FAF7F2] mb-4 tracking-wide">
              Collections
            </h6>
            <ul className="space-y-2.5 text-xs text-[#AFA8A2]">
              <li>
                <Link href="/shop/sticks" className="hover:text-[#DFB15B] transition-colors">
                  Incense Sticks (250g)
                </Link>
              </li>
              <li>
                <Link href="/shop/cones" className="hover:text-[#DFB15B] transition-colors">
                  Incense Cones (60 pcs)
                </Link>
              </li>
              <li>
                <Link href="/product/kasturi-incense-sticks-250g" className="hover:text-[#DFB15B] transition-colors">
                  Kasturi Agarbatti (250g)
                </Link>
              </li>
              <li>
                <Link href="/product/oudh-incense-sticks-250g" className="hover:text-[#DFB15B] transition-colors">
                  Royal Oudh Sticks (250g)
                </Link>
              </li>
              <li>
                <Link href="/product/sandalwood-incense-cones-60pcs" className="hover:text-[#DFB15B] transition-colors">
                  Sandalwood Cones (60 pcs)
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#DFB15B] transition-colors font-bold text-white">
                  View Full Shop →
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h6 className="font-serif text-base font-semibold text-[#FAF7F2] mb-4 tracking-wide">
              Customer Care
            </h6>
            <ul className="space-y-2.5 text-xs text-[#AFA8A2]">
              <li>
                <Link href="/account" className="hover:text-[#DFB15B] transition-colors">
                  My Orders &amp; Invoices
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#DFB15B] transition-colors">
                  Shipping &amp; Delivery (&gt;₹499 Free)
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-[#DFB15B] transition-colors">
                  Replacements &amp; Refunds
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DFB15B] transition-colors">
                  Contact Customer Care
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#DFB15B] transition-colors">
                  About Our Temple Mission
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/919427410210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <Phone className="h-3 w-3" /> WhatsApp: +91 942 741 0210
                </a>
              </li>
            </ul>
          </div>

          {/* Policies & Verification */}
          <div>
            <h6 className="font-serif text-base font-semibold text-[#FAF7F2] mb-4 tracking-wide">
              Safe &amp; Certified
            </h6>
            <ul className="space-y-2.5 text-xs text-[#AFA8A2]">
              <li>
                <span className="text-[#FAF7F2] font-medium block">
                  ISO 9001:2015 Certified
                </span>
                <span className="text-[11px] text-[#7F7771]">High quality standards</span>
              </li>
              <li>
                <span className="text-[#FAF7F2] font-medium block">
                  100% Non-Toxic Smoke
                </span>
                <span className="text-[11px] text-[#7F7771]">Tested for zero coal soot</span>
              </li>
              <li>
                <span className="text-[#FAF7F2] font-medium block">
                  Secure UPI &amp; Cards
                </span>
                <span className="text-[11px] text-[#7F7771]">256-bit SSL encrypted</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-[#272320] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7F7771] gap-4">
          <p>© {new Date().getFullYear()} FOXAL Organics India. All sacred rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" prefetch={false} className="hover:text-[#DFB15B]">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" prefetch={false} className="hover:text-[#DFB15B]">
              Terms of Service
            </Link>
            <span>·</span>
            <Link href="/refund" prefetch={false} className="hover:text-[#DFB15B]">
              Refund Policy
            </Link>
          </div>
          <div className="flex items-center gap-2">
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
