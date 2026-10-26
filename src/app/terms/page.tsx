import React from 'react';
import type { Metadata } from 'next';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service | FOXAL Organics India',
  description: 'Terms and conditions for purchasing natural incense sticks and cones from FOXAL.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Terms of Service' },
          ]}
          className="mb-8"
        />

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
              Legal Understanding
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
              Terms of Service
            </h1>
            <p className="text-xs text-[#7A5230] mt-1">
              Last updated: October 2026
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#5A534E] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#0F0D0B]">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or purchasing from FOXAL (www.foxal.in), you agree to be bound
                by these Terms of Service and all applicable Indian consumer laws.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#0F0D0B]">
                2. Product Descriptions &amp; Pricing
              </h2>
              <p>
                We strive for meticulous accuracy in describing our natural incense sticks
                (250g) and cones (60 pcs). Prices are listed in Indian Rupees (INR) and are
                inclusive of all applicable taxes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#0F0D0B]">
                3. Safety &amp; Usage
              </h2>
              <p>
                Incense sticks and cones must always be placed on heat-resistant, fireproof
                surfaces (such as our provided ceramic stands). Never leave burning dhoop
                unattended or near flammable drapery.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
