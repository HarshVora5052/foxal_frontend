'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/mock';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Rating } from '@/components/ui/Rating';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ShoppingBag, Sparkles, ShieldCheck, Heart } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem, toggleWishlist, isInWishlist } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (!product) return null;

  const isFavorite = isInWishlist(product.id);

  const handleWishlist = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to save products to your wishlist');
      onClose();
      router.push('/login');
      return;
    }
    toggleWishlist(product);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your cart');
      onClose();
      router.push('/login');
      return;
    }
    addItem(product, quantity);
    onClose();
  };

  return (
    <Modal isOpen={!!product} onClose={onClose} maxWidth="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#E3D4BD] bg-white">
          <Image
            src={product.images?.[0] || '/images/logo.png'}
            alt={product.name || 'FOXAL Incense'}
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            style={{ objectFit: 'contain' }}
            className="object-contain p-3 sm:p-4"
          />

        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C8922A]">
              {product.category_name}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0F0D0B] mt-0.5 leading-snug">
              {product.name}
            </h3>
            <p className="text-xs text-[#7A5230] mt-0.5">{product.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <Rating
              score={product.rating}
              reviewsCount={product.reviews_count}
              size="sm"
            />
          </div>

          <div className="flex items-baseline gap-2 pt-1 border-t border-[#E3D4BD]/60">
            <span className="text-2xl font-bold text-[#0F0D0B]">
              ₹{product.price}
            </span>
            <span className="text-sm text-[#AFA8A2] line-through">
              ₹{product.mrp}
            </span>
            <span className="text-xs text-[#354E3C] bg-[#EBF2ED] px-2 py-0.5 rounded font-semibold border border-[#C7D9CD]">
              Save ₹{product.mrp - product.price}
            </span>
          </div>

          <p className="text-xs text-[#5A534E] leading-relaxed line-clamp-3">
            {product.description}
          </p>

          {/* Quantity & CTA */}
          <div className="pt-2 flex items-center gap-3">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              size="md"
            />
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleAddToCart}
              leftIcon={<ShoppingBag className="h-4 w-4" />}
            >
              Add ₹{product.price * quantity}
            </Button>
            <button
              onClick={handleWishlist}
              className="p-2.5 rounded-xl border border-[#E3D4BD] bg-white text-[#7A5230] hover:text-red-500 hover:bg-[#F6EFE4] transition-colors"
              aria-label="Wishlist"
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
