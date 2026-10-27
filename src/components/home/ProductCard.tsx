'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/mock';
import { Card } from '@/components/ui/Card';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Heart, ShoppingBag } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
}) => {
  const { addItem, toggleWishlist, isInWishlist } = useCartStore();
  const { isAuthenticated, openAuthModal } = useAuthStore();
  const router = useRouter();
  const isFavorite = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please sign in to save products to your wishlist');
      openAuthModal('login');
      return;
    }
    toggleWishlist(product);
  };

  return (
    <Card
      isHoverable
      variant="default"
      className="group flex flex-col h-full bg-[#FAF7F2] rounded-2xl border border-[#E3D4BD]/80 overflow-hidden"
    >
      {/* Image Container with Badges & Action Buttons */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/5] w-full overflow-hidden bg-white block"
      >
        <Image
          src={product.images?.[0] || '/images/logo.png'}
          alt={product.name || 'FOXAL Incense'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}
          className="object-contain object-center p-3 sm:p-4 transition-transform duration-500 ease-out group-hover:scale-105"
        />



        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#0F0D0B] shadow-sm hover:scale-110 active:scale-95 transition-all"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isFavorite
              ? 'fill-red-500 text-red-500'
              : 'text-[#7A5230] hover:text-red-500'
              }`}
          />
        </button>

      </Link>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 justify-between">
        <div>
          {/* Category */}
          <div className="text-[11px] text-[#7A5230] mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[#C8922A]">
              {product.category_name}
            </span>
          </div>

          {/* Name & Subtitle */}
          <Link href={`/product/${product.slug}`}>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#0F0D0B] line-clamp-1 group-hover:text-[#C8922A] transition-colors">
              {product.name}
            </h4>
          </Link>
          <p className="text-xs text-[#7A5230] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Rating */}
          <div className="mt-2.5">
            <Rating
              score={Number(product.rating) || 4.9}
              reviewsCount={Number(product.reviews_count) || 120}
              size="sm"
            />
          </div>
        </div>

        {/* Pricing & Add To Cart */}
        <div className="mt-5 pt-3 border-t border-[#E3D4BD]/60">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#0F0D0B]">
                ₹{product.price}
              </span>
              <span className="text-xs text-[#AFA8A2] line-through">
                ₹{product.mrp}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#354E3C] bg-[#EBF2ED] px-2 py-0.5 rounded-md border border-[#C7D9CD]">
              Save ₹{product.mrp - product.price}
            </span>
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            fullWidth
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isAuthenticated) {
                toast.error('Please sign in to add items to your cart');
                openAuthModal('login');
                return;
              }
              addItem(product, 1);
            }}
            leftIcon={<ShoppingBag className="h-4 w-4" />}
            className="shadow-sm font-semibold tracking-wide"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};
