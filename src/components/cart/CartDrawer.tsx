'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { Trash2, Sparkles, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getSavings,
    getDiscountAmount,
    getShippingFee,
    getFinalTotal,
    getFreeShippingThresholdRemaining,
  } = useCartStore();

  const subtotal = getSubtotal();
  const savings = getSavings();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const finalTotal = getFinalTotal();
  const freeShippingRemaining = getFreeShippingThresholdRemaining();
  const thresholdPercent = Math.min(100, Math.round((subtotal / 499) * 100));

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={closeCart}
      title="Sacred Cart"
      subtitle={`${items.length} unique ${items.length === 1 ? 'item' : 'items'}`}
      maxWidth="md"
    >
      {/* Free Shipping Progress Meter */}
      <div className="mb-4 rounded-xl bg-[#F6EFE4] p-3 border border-[#E3D4BD] min-w-0">
        <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
          <span className="font-medium text-[#7A5230] flex items-center gap-1.5 truncate">
            <Sparkles className="h-3.5 w-3.5 text-[#C8922A] shrink-0" />
            {freeShippingRemaining === 0 ? (
              <span className="font-semibold text-[#354E3C] truncate">
                🎉 FREE Express Delivery unlocked!
              </span>
            ) : (
              <span className="truncate">
                Add{' '}
                <strong className="text-[#C8922A]">₹{freeShippingRemaining}</strong> more
                for FREE delivery
              </span>
            )}
          </span>
          <span className="font-bold text-[#0F0D0B] shrink-0">{thresholdPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#EADECB] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#DFB15B] to-[#C8922A] transition-all duration-500 rounded-full"
            style={{ width: `${thresholdPercent}%` }}
          />
        </div>
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="py-14 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F6EFE4] border border-[#C8922A]/30 text-[#C8922A]">
            <ShoppingBag className="h-9 w-9 stroke-[1.5]" />
          </div>
          <h4 className="font-serif text-2xl font-semibold text-[#0F0D0B]">
            Your sacred cart is empty
          </h4>
          <p className="mx-auto mt-2 max-w-xs text-xs text-[#7A5230]">
            Infuse your home with positive energy and charcoal-free tranquility.
          </p>
          <div className="mt-6">
            <Button
              variant="primary"
              size="md"
              onClick={closeCart}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Explore Collection
            </Button>
          </div>
        </div>
      ) : (
        /* Items List */
        <div className="flex flex-col h-full justify-between min-w-0">
          <div className="space-y-3.5 divide-y divide-[#E3D4BD]/60 pb-4 min-w-0">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="pt-3.5 first:pt-0 flex gap-3 min-w-0">
                <div className="relative h-18 w-18 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border border-[#E3D4BD] bg-white">
                  <Image
                    src={product.images?.[0] || '/images/logo.png'}
                    alt={product.name || 'FOXAL item'}
                    fill
                    sizes="80px"
                    className="object-contain p-1.5"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-1.5">
                      <h4 className="font-serif text-sm sm:text-base font-semibold text-[#0F0D0B] leading-snug truncate">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-1 text-[#AFA8A2] hover:text-red-600 transition-colors shrink-0"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#7A5230] mt-0.5 truncate">
                      {product.variant_label}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 gap-2">
                    <QuantitySelector
                      value={quantity}
                      onChange={(newQty) => updateQuantity(product.id, newQty)}
                      size="sm"
                      className="shrink-0"
                    />
                    <div className="text-right shrink-0">
                      <span className="text-[11px] sm:text-xs text-[#AFA8A2] line-through mr-1">
                        ₹{product.mrp * quantity}
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-[#0F0D0B]">
                        ₹{product.price * quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Summary & Checkout CTA */}
          <div className="border-t border-[#E3D4BD] pt-3.5 mt-auto bg-[#FAF7F2] space-y-2.5 min-w-0">
            {savings > 0 && (
              <div className="rounded-lg bg-[#EBF2ED] px-2.5 py-1 text-center text-[11px] sm:text-xs font-semibold text-[#354E3C] border border-[#C7D9CD]">
                ✨ Saving ₹{savings} with special festive pricing!
              </div>
            )}

            <div className="space-y-1.5 text-xs text-[#7A5230]">
              <div className="flex justify-between items-baseline">
                <span>Subtotal</span>
                <span className="font-medium text-[#0F0D0B]">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-baseline text-[#354E3C] font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <strong className="text-[#354E3C]">FREE</strong>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>
              <div className="flex justify-between items-baseline border-t border-[#E3D4BD] pt-2 text-sm font-semibold text-[#0F0D0B]">
                <span>Estimated Total</span>
                <span className="text-base font-bold text-[#C8922A]">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => {
                closeCart();
                if (!isAuthenticated) {
                  toast.error('Please sign in to proceed with your purchase');
                  useAuthStore.getState().openAuthModal('login');
                  return;
                }
                router.push('/checkout');
              }}
              rightIcon={<ArrowRight className="h-4 w-4 shrink-0" />}
              className="text-sm font-semibold py-2.5 shadow-sm justify-center"
            >
              Proceed to Checkout
            </Button>

            <div className="text-center">
              <Link
                href="/cart"
                onClick={closeCart}
                className="text-xs font-semibold text-[#7A5230] hover:text-[#C8922A] underline"
              >
                View Full Cart &amp; Apply Coupons →
              </Link>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A5230]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#354E3C] shrink-0" />
              <span className="truncate">100% Secure Checkout · Charcoal-Free</span>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};
