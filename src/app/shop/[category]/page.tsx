import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/products';
import { ShopClient } from '@/components/shop/ShopClient';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CATEGORY_MAP: Record<
  string,
  {
    internalCategory: string;
    title: string;
    subtitle: string;
    metaTitle: string;
    metaDesc: string;
  }
> = {
  sticks: {
    internalCategory: 'sticks',
    title: 'Incense Sticks (250g Value Pack)',
    subtitle: 'Hand-rolled ~135 sticks per pack. 45-50 min burn time. Kasturi, Woods, Oudh, Sukhad, Mogra, Gugal.',
    metaTitle: 'Natural Incense Sticks (250g) | 100% Charcoal-Free | FOXAL',
    metaDesc: 'Pure Ayurvedic incense sticks made with sacred temple flowers and natural resins. Long 45+ minute burn.',
  },
  'incense-sticks': {
    internalCategory: 'sticks',
    title: 'Incense Sticks (250g Value Pack)',
    subtitle: 'Hand-rolled ~135 sticks per pack. 45-50 min burn time. Kasturi, Woods, Oudh, Sukhad, Mogra, Gugal.',
    metaTitle: 'Natural Incense Sticks (250g) | 100% Charcoal-Free | FOXAL',
    metaDesc: 'Pure Ayurvedic incense sticks made with sacred temple flowers and natural resins. Long 45+ minute burn.',
  },
  cones: {
    internalCategory: 'cones',
    title: 'Incense Cones (60 Cones / Box)',
    subtitle: 'Pure dhoop cones with complimentary ceramic stand. Sandalwood, Lavender, Rose, Jasmine.',
    metaTitle: 'Organic Incense Cones (60 pcs) with Ceramic Stand | FOXAL',
    metaDesc: 'Handcrafted dhoop cones made with pure flower powder. Dense aromatic smoke for home meditation & puja.',
  },
  'incense-cones': {
    internalCategory: 'cones',
    title: 'Incense Cones (60 Cones / Box)',
    subtitle: 'Pure dhoop cones with complimentary ceramic stand. Sandalwood, Lavender, Rose, Jasmine.',
    metaTitle: 'Organic Incense Cones (60 pcs) with Ceramic Stand | FOXAL',
    metaDesc: 'Handcrafted dhoop cones made with pure flower powder. Dense aromatic smoke for home meditation & puja.',
  },
};

export function generateStaticParams() {
  return [
    { category: 'sticks' },
    { category: 'cones' },
    { category: 'incense-sticks' },
    { category: 'incense-cones' },
  ];
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const info = CATEGORY_MAP[params.category.toLowerCase()];
  if (!info) {
    return {
      title: 'Collection Not Found | FOXAL',
    };
  }

  return {
    title: info.metaTitle,
    description: info.metaDesc,
    openGraph: {
      title: info.metaTitle,
      description: info.metaDesc,
      url: `https://www.foxal.in/shop/${params.category}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryKey = params.category.toLowerCase();
  const info = CATEGORY_MAP[categoryKey];

  if (!info) {
    notFound();
  }

  const result = await getProducts({ category: info.internalCategory });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumbs
            items={[
              { label: 'Shop', href: '/shop' },
              { label: info.title },
            ]}
          />
        </div>

        <ShopClient
          initialProducts={result?.products || []}
          initialCategory={info.internalCategory}
          categoryTitle={info.title}
          categorySubtitle={info.subtitle}
        />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
