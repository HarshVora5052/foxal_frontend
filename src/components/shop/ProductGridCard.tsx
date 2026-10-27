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
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';

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
          style={{ objectFit: 'contain' }}
          className="object-contain p-2.5 sm:p-3 transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges: Sold Out only */}
        {!product.in_stock && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <Badge variant="charcoal" size="sm">
              Sold Out
            </Badge>
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          type="button"
          onClick={handleWishlistClick}
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


      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 justify-between">
        <div>
          {/* Category */}
          <div className="text-[10px] text-[#7A5230] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#C8922A] truncate max-w-[100px]">
              {product.category_name || (product.category === 'cones' ? 'Incense Cones' : 'Incense Sticks')}
            </span>
          </div>

          {/* Name */}
          <Link href={`/product/${product.slug}`}>
            <h4 className="font-serif text-sm sm:text-base font-bold text-[#0F0D0B] line-clamp-1 group-hover:text-[#C8922A] transition-colors leading-snug">
              {product.name}
            </h4>
          </Link>

          {/* Rating */}
          <div className="mt-2">
            <Rating
              score={Number(product.rating) || 4.9}
              reviewsCount={Number(product.reviews_count) || 120}
              size="sm"
            />
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-[#E3D4BD]/60">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#0F0D0B]">
                ₹{Number(product.price) || 149}
              </span>
              <span className="text-[11px] text-[#AFA8A2] line-through">
                ₹{Number(product.mrp) || 199}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-[#354E3C] bg-[#EBF2ED] px-1.5 py-0.5 rounded border border-[#C7D9CD]">
              -₹{Math.max(0, (Number(product.mrp) || 199) - (Number(product.price) || 149))}
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
              if (!isAuthenticated) {
                toast.error('Please sign in to add items to your cart');
                openAuthModal('login');
                return;
              }
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
