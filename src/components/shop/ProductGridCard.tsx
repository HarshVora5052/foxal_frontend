'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/mock';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { Heart, ShoppingBag, Eye, Clock, Sparkles } from 'lucide-react';

export interface ProductGridCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductGridCard: React.FC<ProductGridCardProps> = ({
  product,
  onQuickView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, toggleWishlist, isInWishlist } = useCartStore();
  const isFavorite = isInWishlist(product.id);

  const hasSecondImage = product.images.length > 1;
  const displayImage =
    isHovered && hasSecondImage ? product.images[1] : product.images[0];

  return (
    <Card
      isHoverable
      variant="default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col h-full bg-[#FAF7F2] rounded-2xl border border-[#E3D4BD]/80 overflow-hidden"
    >
      {/* Product Image with Hover Image Swap */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-white block"
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges: Sale %, New, Sold Out, Bestseller */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {!product.in_stock ? (
            <Badge variant="charcoal" size="sm">
              Sold Out
            </Badge>
          ) : (
            <>
              {product.badge && (
                <Badge variant="gold" size="sm">
                  {product.badge}
                </Badge>
              )}
              {product.discount_percent > 0 && (
                <Badge variant="sale" size="sm">
                  {product.discount_percent}% OFF
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Wishlist Heart */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#0F0D0B] shadow-sm hover:scale-110 active:scale-95 transition-all"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-colors ${
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-[#7A5230] hover:text-red-500'
            }`}
          />
        </button>

        {/* Quick View Button overlay */}
        {onQuickView && (
          <div className="absolute inset-x-0 bottom-2.5 px-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
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
              leftIcon={<Eye className="h-3 w-3 text-[#DFB15B]" />}
              className="text-[11px] py-1.5 bg-[#0F0D0B]/90 backdrop-blur-md"
            >
              Quick View
            </Button>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 justify-between">
        <div>
          {/* Category & Burn Time */}
          <div className="flex items-center justify-between text-[10px] text-[#7A5230] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#C8922A] truncate max-w-[100px]">
              {product.category_name}
            </span>
            <span className="flex items-center gap-0.5 bg-[#F6EFE4] px-1.5 py-0.5 rounded-full border border-[#E3D4BD]">
              <Clock className="h-2.5 w-2.5" />
              {product.burn_time.split(' ')[0]}
            </span>
          </div>

          {/* Name */}
          <Link href={`/product/${product.slug}`}>
            <h4 className="font-serif text-sm sm:text-base font-bold text-[#0F0D0B] line-clamp-1 group-hover:text-[#C8922A] transition-colors leading-snug">
              {product.name}
            </h4>
          </Link>

          {/* Fragrance Notes */}
          <div className="mt-1.5 flex flex-wrap gap-1">
            {product.fragrance_notes.slice(0, 2).map((note) => (
              <span
                key={note}
                className="text-[9px] bg-[#F6EFE4] text-[#7A5230] px-1.5 py-0.5 rounded font-medium border border-[#E3D4BD]/60"
              >
                {note}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="mt-2">
            <Rating
              score={product.rating}
              reviewsCount={product.reviews_count}
              size="sm"
            />
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-[#E3D4BD]/60">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#0F0D0B]">
                ₹{product.price}
              </span>
              <span className="text-[11px] text-[#AFA8A2] line-through">
                ₹{product.mrp}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-[#354E3C] bg-[#EBF2ED] px-1.5 py-0.5 rounded border border-[#C7D9CD]">
              -₹{product.mrp - product.price}
            </span>
          </div>

          <Button
            type="button"
            variant={product.in_stock ? 'primary' : 'secondary'}
            size="sm"
            fullWidth
            disabled={!product.in_stock}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (product.in_stock) addItem(product, 1);
            }}
            leftIcon={<ShoppingBag className="h-3.5 w-3.5" />}
            className="text-xs py-2 font-semibold"
          >
            {product.in_stock ? 'Add to Cart' : 'Sold Out'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
