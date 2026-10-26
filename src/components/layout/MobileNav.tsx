'use client';

import React from 'react';
import Link from 'next/link';
import { Drawer } from '@/components/ui/Drawer';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import {
  Home,
  Flame,
  Sparkles,
  ShoppingBag,
  Heart,
  ShieldCheck,
  PhoneCall,
  User,
  Info,
  Truck,
  Mail,
  LogIn,
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { getTotalItems, openCart, wishlist } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const totalCart = getTotalItems();
  const wishlistCount = wishlist.length;

  return (
    <>
      {/* 1. Slide-out Mobile Navigation Drawer */}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title="FOXAL"
        subtitle="100% Charcoal-Free Natural Incense"
        position="left"
        maxWidth="sm"
      >
        <div className="flex flex-col h-full justify-between pb-8">
          <div className="space-y-6">
            {/* Value banner */}
            <div className="rounded-xl bg-[#F6EFE4] p-3.5 border border-[#E3D4BD]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#354E3C]">
                <ShieldCheck className="h-4 w-4 text-[#4A6B53]" />
                <span>Zero Carbon Monoxide · 100% Herbal</span>
              </div>
              <p className="text-[11px] text-[#7A5230] mt-1">
                Handcrafted in India with recycled temple offerings.
              </p>
            </div>

            {/* Navigation links */}
            <div className="space-y-1">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#AFA8A2] px-3 mb-2">
                Main Navigation
              </span>

              {/* Home */}
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0F0D0B] hover:bg-[#F6EFE4] transition-colors"
              >
                <Home className="h-4 w-4 text-[#C8922A]" />
                Home
              </Link>

              {/* Products */}
              <Link
                href="/shop"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0F0D0B] hover:bg-[#F6EFE4] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Flame className="h-4 w-4 text-[#C8922A]" />
                  Products
                </span>
                <span className="text-[11px] bg-[#0F0D0B] text-white px-2 py-0.5 rounded-full font-bold">
                  ₹149
                </span>
              </Link>

              {/* Contact us */}
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0F0D0B] hover:bg-[#F6EFE4] transition-colors"
              >
                <Mail className="h-4 w-4 text-[#C8922A]" />
                Contact us
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#0F0D0B] hover:bg-[#F6EFE4] transition-colors"
              >
                <span className="flex items-center gap-3">
                  <Heart className="h-4 w-4 text-[#C8922A]" />
                  Saved Wishlist
                </span>
                {wishlistCount > 0 && (
                  <span className="text-[11px] bg-[#C8922A] text-white px-2 py-0.5 rounded-full font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account / Log Icon */}
              <Link
                href={isAuthenticated ? '/account' : '/login'}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#0F0D0B] hover:bg-[#F6EFE4] transition-colors"
              >
                <span className="flex items-center gap-3">
                  {isAuthenticated ? (
                    <User className="h-4 w-4 text-[#C8922A]" />
                  ) : (
                    <LogIn className="h-4 w-4 text-[#C8922A]" />
                  )}
                  {isAuthenticated ? (user?.name ? `${user.name} (Account)` : 'My Account') : 'Sign In / Register'}
                </span>
                {isAuthenticated && (
                  <span className="text-[10px] bg-[#4A6B53] text-white px-2 py-0.5 rounded-full font-semibold">
                    Active
                  </span>
                )}
              </Link>

              {/* Cart Drawer Item: Only visible after login */}
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openCart();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0F0D0B] bg-[#F6EFE4] hover:bg-[#EADECB] transition-colors mt-2"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingBag className="h-4 w-4 text-[#C8922A]" />
                    Sacred Cart
                  </span>
                  <span className="text-xs bg-[#C8922A] text-white px-2.5 py-0.5 rounded-full font-bold">
                    {totalCart} {totalCart === 1 ? 'item' : 'items'}
                  </span>
                </button>
              )}
            </div>

            {/* Information & Policies */}
            <div className="space-y-1 pt-3 border-t border-[#E3D4BD]">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#AFA8A2] px-3 mb-2">
                Brand &amp; Support
              </span>

              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 text-sm text-[#272320] hover:bg-[#F6EFE4] rounded-xl transition-colors"
              >
                <Info className="h-4 w-4 text-[#7A5230]" />
                About FOXAL Temple Mission
              </Link>

              <Link
                href="/shipping"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 text-sm text-[#272320] hover:bg-[#F6EFE4] rounded-xl transition-colors"
              >
                <Truck className="h-4 w-4 text-[#7A5230]" />
                Shipping Policy (&gt;₹499 Free)
              </Link>
            </div>
          </div>

          {/* Contact / Help Footer */}
          <div className="pt-6 border-t border-[#E3D4BD] text-xs text-[#7A5230]">
            <p className="flex items-center gap-2 mb-1">
              <PhoneCall className="h-3.5 w-3.5 text-[#C8922A]" />
              Need assistance? WhatsApp Support
            </p>
            <p className="font-semibold text-[#0F0D0B]">+91 98765 43210</p>
            <p className="mt-3 text-[11px] text-[#AFA8A2]">
              Made with pure devotion in Gujarat &amp; Uttar Pradesh, India
            </p>
          </div>
        </div>
      </Drawer>
    </>
  );
};
