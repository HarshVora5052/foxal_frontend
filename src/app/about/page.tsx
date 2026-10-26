import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Sparkles, ShieldCheck, Heart, Leaf, ArrowRight, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Sacred Story | About FOXAL Organics India',
  description:
    'Learn how FOXAL is reviving ancient Indian agarbatti traditions by upcycling sacred temple flowers, utilizing Gir cow dung and creating pure, charcoal-free dhoop.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'About FOXAL' },
          ]}
          className="mb-8"
        />

        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-2">
            Purity · Tradition · Clean Air
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F0D0B] leading-tight">
            Restoring Devotion to Its Purest Form
          </h1>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#C8922A]/40" />
          <p className="mt-6 text-sm sm:text-base text-[#7A5230] leading-relaxed">
            FOXAL was founded on a simple revelation: spiritual prayer should purify
            your mind and home, never poison your lungs with black coal soot.
          </p>
        </div>

        {/* 2 Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className="relative h-96 sm:h-[480px] w-full rounded-3xl overflow-hidden border border-[#E3D4BD] shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000&auto=format&fit=crop"
              alt="Temple flowers upcycling"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
              The Crisis of River Temple Waste
            </h2>
            <p className="text-xs sm:text-sm text-[#5A534E] leading-relaxed">
              Every single day, hundreds of tons of sacred floral garlands—hibiscus, roses,
              marigolds, and jasmine offered with pure love to deities—are immersed in Indian
              rivers. Rotting floral waste chokes aquatic ecosystems and releases methane.
            </p>
            <p className="text-xs sm:text-sm text-[#5A534E] leading-relaxed">
              At FOXAL, our team partners with temple trusts in Gujarat and Uttar Pradesh.
              We reverently gather these sanctified blooms, dry them under the Indian sun,
              and crush them into an organic aromatic foundation for our incense sticks and
              dhoop cones.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E3D4BD] flex items-center gap-3">
                <Leaf className="h-6 w-6 text-[#4A6B53]" />
                <div>
                  <span className="font-serif text-lg font-bold text-[#0F0D0B] block">
                    1.2M+ Blooms
                  </span>
                  <span className="text-[11px] text-[#7A5230]">Saved from rivers</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E3D4BD] flex items-center gap-3">
                <Heart className="h-6 w-6 text-[#C8922A]" />
                <div>
                  <span className="font-serif text-lg font-bold text-[#0F0D0B] block">
                    100+ Artisans
                  </span>
                  <span className="text-[11px] text-[#7A5230]">Dignified women livelihood</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Principles of FOXAL */}
        <div className="rounded-3xl bg-[#0F0D0B] text-white p-8 sm:p-14 border border-[#C8922A]/30 mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-serif text-3xl font-bold text-white">
              The 4 Sacred Pledges
            </h3>
            <p className="text-xs text-[#AFA8A2] mt-2">
              Our uncompromising promise behind every stick and cone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#1A1715] border border-[#272320]">
              <span className="text-xl font-bold text-[#DFB15B] block mb-1">01</span>
              <h4 className="font-serif text-base font-bold text-white mb-2">
                0% Charcoal &amp; Coal
              </h4>
              <p className="text-xs text-[#AFA8A2]">
                Guaranteed zero petroleum binders, coal dust or black soot.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A1715] border border-[#272320]">
              <span className="text-xl font-bold text-[#DFB15B] block mb-1">02</span>
              <h4 className="font-serif text-base font-bold text-white mb-2">
                Desi Gir Cow Dung
              </h4>
              <p className="text-xs text-[#AFA8A2]">
                Infused with Vedic organic cow dung for natural air sterilization.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A1715] border border-[#272320]">
              <span className="text-xl font-bold text-[#DFB15B] block mb-1">03</span>
              <h4 className="font-serif text-base font-bold text-white mb-2">
                Therapeutic Oils
              </h4>
              <p className="text-xs text-[#AFA8A2]">
                Pure Mysore Sandal, Kannauj Rose and Himalayan Oudh extracts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A1715] border border-[#272320]">
              <span className="text-xl font-bold text-[#DFB15B] block mb-1">04</span>
              <h4 className="font-serif text-base font-bold text-white mb-2">
                Accessible Luxury
              </h4>
              <p className="text-xs text-[#AFA8A2]">
                Generous 250g packs and 60-cone boxes at everyday ₹149 pricing.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/shop">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Explore Our Collection (₹149)
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
