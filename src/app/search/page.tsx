import React from 'react';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGridCard } from '@/components/shop/ProductGridCard';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Search as SearchIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  return {
    title: query
      ? `Search results for "${query}" | FOXAL`
      : 'Search Sacred Incense | FOXAL',
    description: `Discover 100% charcoal-free incense sticks and cones matching "${query}". Handcrafted natural Indian fragrances.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || '';
  const result = await getProducts({ search: query, limit: 24 });
  const products = result.products;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            { label: 'Search Results' },
          ]}
          className="mb-6"
        />

        {/* Search Header */}
        <div className="mb-10 pb-6 border-b border-[#E3D4BD]">
          <div className="flex items-center gap-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[#C8922A]">
            <SearchIcon className="h-4 w-4" />
            <span>Fragrance Search</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
            {query ? (
              <>
                Results for <span className="text-[#C8922A]">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              'Search Our Sacred Collection'
            )}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#7A5230]">
            {query
              ? `Found ${products.length} pure charcoal-free ${
                  products.length === 1 ? 'fragrance' : 'fragrances'
                }`
              : 'Enter a fragrance note, collection name, or ingredient above'}
          </p>
        </div>

        {/* Search Results Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-[#E3D4BD] bg-white p-8">
            <Sparkles className="mx-auto h-12 w-12 text-[#C8922A]/60 mb-3" />
            <h3 className="font-serif text-2xl font-bold text-[#0F0D0B]">
              No fragrances matched &ldquo;{query}&rdquo;
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#7A5230] max-w-sm mx-auto">
              Try searching for popular notes like Oudh, Sandalwood, Kasturi, or Rose.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['Oudh', 'Sandalwood', 'Rose', 'Kasturi', 'Mogra', 'Cones'].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${term}`}
                  className="text-xs bg-[#F6EFE4] hover:bg-[#EADECB] text-[#7A5230] px-3.5 py-1.5 rounded-full border border-[#E3D4BD] transition-colors font-medium"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
            {products.map((product) => (
              <ProductGridCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
