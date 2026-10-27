'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  Trash2,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
  X,
  Truck,
  RotateCcw,
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [couponInput, setCouponInput] = useState('');

  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getSavings,
    getDiscountAmount,
    getShippingFee,
    getFinalTotal,
    getFreeShippingThresholdRemaining,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const subtotal = getSubtotal();
  const savings = getSavings();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const finalTotal = getFinalTotal();
  const freeShippingRemaining = getFreeShippingThresholdRemaining();
  const thresholdPercent = Math.min(100, Math.round((subtotal / 499) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const ok = applyCoupon(couponInput);
      if (ok) setCouponInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            { label: 'Sacred Cart' },
          ]}
          className="mb-6"
        />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E3D4BD] gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
              Your Selections
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
              Sacred Cart
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-[#7A5230] hover:text-red-600 transition-colors self-start sm:self-auto flex items-center gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="py-20 text-center rounded-3xl border border-[#E3D4BD] bg-white p-8 max-w-lg mx-auto shadow-sm">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F6EFE4] text-[#C8922A] border border-[#C8922A]/30">
              <ShoppingBag className="h-9 w-9 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#0F0D0B]">
              Your sacred cart is empty
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#7A5230] max-w-xs mx-auto">
              Select from our 100% charcoal-free incense sticks (250g) and dhoop cones (60 pcs).
            </p>
            <div className="mt-6 flex justify-center gap-3">
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Items List & Free Shipping Meter */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Bar */}
              <div className="rounded-2xl bg-white p-5 border border-[#E3D4BD] shadow-sm">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-[#7A5230] flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-[#C8922A]" />
                    {freeShippingRemaining === 0 ? (
                      <span className="text-[#354E3C] font-bold">
                        🎉 You unlocked FREE Express Delivery across India!
                      </span>
                    ) : (
                      <span>
                        Add{' '}
                        <strong className="text-[#C8922A]">
                          ₹{freeShippingRemaining}
                        </strong>{' '}
                        more for FREE delivery
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-[#0F0D0B]">
                    {thresholdPercent}%
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#F6EFE4] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#DFB15B] to-[#C8922A] transition-all duration-500 rounded-full"
                    style={{ width: `${thresholdPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="rounded-3xl bg-white border border-[#E3D4BD] overflow-hidden shadow-sm divide-y divide-[#E3D4BD]/60">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 rounded-2xl overflow-hidden border border-[#E3D4BD] bg-white shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8922A]">
                          {product.category_name}
                        </span>
                        <Link href={`/product/${product.slug}`}>
                          <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F0D0B] hover:text-[#C8922A] transition-colors leading-snug">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-[#7A5230] mt-0.5">
                          {product.variant_label}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-[#E3D4BD]/60">
                      <QuantitySelector
                        value={quantity}
                        onChange={(newQ) => updateQuantity(product.id, newQ)}
                        size="md"
                      />

                      <div className="text-right min-w-[90px]">
                        <span className="text-xs text-[#AFA8A2] line-through block">
                          ₹{product.mrp * quantity}
                        </span>
                        <span className="font-serif text-lg font-bold text-[#0F0D0B]">
                          ₹{product.price * quantity}
                        </span>
                      </div>

                      <button
                        onClick={() => removeItem(product.id)}
                        className="p-2 text-[#AFA8A2] hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: Order Summary & Coupon Form */}
            <div className="lg:col-span-4 space-y-6">
              {/* Coupon Box */}
              <div className="rounded-3xl bg-white p-6 border border-[#E3D4BD] shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A5230] flex items-center gap-1.5 mb-3">
                  <Tag className="h-3.5 w-3.5 text-[#C8922A]" />
                  Sacred Coupon Code
                </span>

                {couponCode ? (
                  <div className="flex items-center justify-between bg-[#EBF2ED] p-3 rounded-xl border border-[#C7D9CD]">
                    <div>
                      <span className="text-xs font-bold text-[#354E3C] block">
                        Code: {couponCode}
                      </span>
                      <span className="text-[11px] text-[#4A6B53]">
                        Saving ₹{discount}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="p-1 text-[#7A5230] hover:text-red-600"
                      aria-label="Remove coupon"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SACRED50"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 rounded-xl border border-[#E3D4BD] bg-white px-3 py-2 text-xs uppercase text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                    />
                    <Button type="submit" variant="charcoal" size="sm">
                      Apply
                    </Button>
                  </form>
                )}
                <p className="mt-2 text-[11px] text-[#AFA8A2]">
                  Try code <strong className="text-[#C8922A]">SACRED50</strong> for ₹50 off.
                </p>
              </div>

              {/* Order Summary */}
              <div className="rounded-3xl bg-white p-6 border border-[#E3D4BD] shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#0F0D0B] pb-3 border-b border-[#E3D4BD]">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs text-[#7A5230]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#0F0D0B]">₹{subtotal}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-[#354E3C] font-semibold">
                      <span>Total Savings</span>
                      <span>-₹{savings}</span>
                    </div>
                  )}

                  {discount > 0 && (
                    <div className="flex justify-between text-[#354E3C] font-semibold">
                      <span>Coupon Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <strong className="text-[#354E3C]">FREE</strong>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#E3D4BD] flex justify-between text-base font-bold text-[#0F0D0B]">
                    <span>Grand Total</span>
                    <span className="text-xl text-[#C8922A]">₹{finalTotal}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error('Please sign in to proceed with your purchase');
                      useAuthStore.getState().openAuthModal('login');
                      return;
                    }
                    router.push('/checkout');
                  }}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="mt-4 font-semibold"
                >
                  Proceed to Checkout
                </Button>

                <div className="pt-2 text-center text-[11px] text-[#7A5230] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#354E3C]" />
                  <span>100% Charcoal-Free · Safe &amp; Clean Ash</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
