'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { PRODUCTS } from '@/lib/mock';
import { ProductGridCard } from '@/components/shop/ProductGridCard';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { wishlist, addItem } = useCartStore();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    savedProducts.forEach((p) => addItem(p, 1));
    toast.success(`Added ${savedProducts.length} items to your sacred cart!`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            { label: 'Saved Wishlist' },
          ]}
          className="mb-6"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E3D4BD] gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
              Personal Favourites
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
              Sacred Wishlist ({savedProducts.length})
            </h1>
          </div>

          {savedProducts.length > 0 && (
            <Button
              variant="charcoal"
              size="md"
              onClick={handleAddAllToCart}
              leftIcon={<ShoppingBag className="h-4 w-4 text-[#DFB15B]" />}
            >
              Add All to Cart
            </Button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-[#E3D4BD] bg-white p-8 max-w-lg mx-auto shadow-sm">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F6EFE4] text-[#C8922A] border border-[#C8922A]/30">
              <Heart className="h-9 w-9 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#0F0D0B]">
              Your sacred wishlist is empty
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#7A5230] max-w-xs mx-auto">
              Tap the heart icon on any incense stick or cone to keep your favorite aromas saved here.
            </p>
            <div className="mt-6">
              <Link href="/shop">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Explore Fragrances
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
            {savedProducts.map((product) => (
              <ProductGridCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
