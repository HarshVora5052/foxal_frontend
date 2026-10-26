import React from 'react';
import type { Metadata } from 'next';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Truck, ShieldCheck, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | FOXAL',
  description: 'Learn about FOXAL shipping rates, free delivery thresholds above ₹499 and delivery timelines across India.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shipping Policy' },
          ]}
          className="mb-8"
        />

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
              Transparent Logistics
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
              Shipping &amp; Delivery Policy
            </h1>
            <p className="text-xs text-[#7A5230] mt-1">
              Last updated: October 2026
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#5A534E] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#0F0D0B]">
                1. Free Shipping Threshold
              </h2>
              <p>
                We offer <strong>FREE Express Surface Shipping</strong> on all domestic
                orders with a cart value of <strong>₹499 or higher</strong> across India.
                For orders below ₹499, a nominal flat shipping fee of <strong>₹49</strong> is
                applied to cover packaging and transit logistics.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#0F0D0B]">
                2. Order Dispatch Timeline
              </h2>
              <p>
                All orders are processed and hand-packed at our facility in Gujarat within
                <strong> 24 business hours</strong> of order placement. You will receive an
                SMS and email containing your live tracking ID as soon as the courier scans
                your parcel.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#0F0D0B]">
                3. Estimated Delivery Times
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Metro Cities (Delhi, Mumbai, Bengaluru, Chennai, Kolkata):</strong> 2 to 4 business days.</li>
                <li><strong>Tier 2 &amp; Tier 3 Cities:</strong> 3 to 5 business days.</li>
                <li><strong>Northeast &amp; Remote Destinations:</strong> 5 to 7 business days.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-[#0F0D0B]">
                4. Safe Transit Packaging
              </h2>
              <p>
                Every 250g pack and 60-cone box is sealed in biodegradable moisture-barrier
                pouches and rigid boxes to prevent stick breakage or moisture absorption
                during transit.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
