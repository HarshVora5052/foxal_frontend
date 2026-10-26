'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/mock';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { Heart, ShoppingBag, Eye, Clock } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
}) => {
  const { addItem, toggleWishlist, isInWishlist } = useCartStore();
  const isFavorite = isInWishlist(product.id);

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
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <Badge variant="gold" size="sm">
              {product.badge}
            </Badge>
          )}
          <Badge variant="sale" size="sm">
            {product.discount_percent}% OFF
          </Badge>
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#0F0D0B] shadow-sm hover:scale-110 active:scale-95 transition-all"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-[#7A5230] hover:text-red-500'
            }`}
          />
        </button>

        {/* Quick view button overlay */}
        {onQuickView && (
          <div className="absolute inset-x-0 bottom-3 px-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              type="button"
              variant="charcoal"
              size="sm"
              fullWidth
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              leftIcon={<Eye className="h-3.5 w-3.5 text-[#DFB15B]" />}
              className="text-xs backdrop-blur-md bg-[#0F0D0B]/90"
            >
              Quick View
            </Button>
          </div>
        )}
      </Link>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 justify-between">
        <div>
          {/* Category & Variant */}
          <div className="flex items-center justify-between text-[11px] text-[#7A5230] mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[#C8922A]">
              {product.category_name}
            </span>
            <span className="flex items-center gap-1 font-medium bg-[#F6EFE4] px-2 py-0.5 rounded-full border border-[#E3D4BD]">
              <Clock className="h-3 w-3 text-[#7A5230]" />
              {product.burn_time.split(' ')[0]}
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
              score={product.rating}
              reviewsCount={product.reviews_count}
              size="sm"
            />
          </div>

          {/* Fragrance notes tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.fragrance_notes.slice(0, 3).map((note) => (
              <span
                key={note}
                className="text-[10px] bg-[#F6EFE4] text-[#7A5230] px-2 py-0.5 rounded-md font-medium border border-[#E3D4BD]/60"
              >
                {note}
              </span>
            ))}
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
              addItem(product, 1);
            }}
            leftIcon={<ShoppingBag className="h-4 w-4" />}
            className="shadow-sm font-semibold tracking-wide"
          >
            Add to Sacred Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};
