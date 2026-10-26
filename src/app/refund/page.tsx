import React from 'react';
import type { Metadata } from 'next';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Refund & Return Policy | FOXAL',
  description: 'Understand FOXAL return, exchange and replacement guidelines for natural incense products.',
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Refund Policy' },
          ]}
          className="mb-8"
        />

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
              Customer Assurance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
              Refund &amp; Replacement Policy
            </h1>
            <p className="text-xs text-[#7A5230] mt-1">
              Last updated: October 2026
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#5A534E] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#0F0D0B]">
                1. 7-Day Damaged Transit Replacement
              </h2>
              <p>
                Because our incense sticks and cones are organic botanical products, we
                cannot accept returns on unsealed packs once opened. However, if your package
                arrives physically damaged, broken, or with missing items, we will dispatch
                a <strong>100% free replacement</strong> within 48 hours.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#0F0D0B]">
                2. How to Request a Replacement
              </h2>
              <p>
                Simply send a photo of the damaged parcel and your Order ID to{' '}
                <a href="mailto:care@foxal.in" className="text-[#C8922A] underline font-semibold">
                  care@foxal.in
                </a>{' '}
                or WhatsApp our support line at <strong>+91 98765 43210</strong> within 7 days
                of delivery.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#0F0D0B]">
                3. Refund Processing
              </h2>
              <p>
                Approved refunds are processed back to your original source of payment
                (UPI, Net Banking, or Card) within <strong>5-7 business days</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
