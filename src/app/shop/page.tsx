import React from 'react';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ShopClient } from '@/components/shop/ShopClient';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Shop All 100% Charcoal-Free Incense Sticks & Cones',
  description:
    'Browse the complete FOXAL collection of natural, charcoal-free agarbatti sticks (250g) and sacred dhoop cones (60 pcs). Handcrafted in India with pure temple flowers. Flat ₹149.',
  keywords: [
    'natural incense sticks',
    'charcoal free dhoop cones',
    'buy incense online India',
    'temple flower incense',
    'agarbatti 250g',
    'FOXAL shop',
  ],
  openGraph: {
    title: 'Shop All 100% Charcoal-Free Incense | FOXAL',
    description:
      'Handcrafted natural incense sticks (250g) and dhoop cones (60 pcs). Organic, non-toxic, and soot-free.',
    url: 'https://www.foxal.in/shop',
  },
};

export default async function ShopPage() {
  const result = await getProducts();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumbs
            items={[
              { label: 'Shop', href: '/shop' },
              { label: 'All Collections' },
            ]}
          />
        </div>

        <ShopClient
          initialProducts={result?.products || []}
          initialCategory="all"
          categoryTitle="All Sacred Fragrances"
          categorySubtitle="Explore all 10 hand-rolled fragrances: 6 Incense Sticks (250g) and 4 Incense Cones (60 pcs with ceramic stand)."
        />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
