'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  Flame,
  X,
  Sparkles,
  ArrowRight,
  User,
} from 'lucide-react';
import { searchProducts } from '@/lib/products';
import { Product } from '@/lib/mock';
import { Modal } from '@/components/ui/Modal';
import { MobileNav } from '@/components/layout/MobileNav';
import Image from 'next/image';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInternalMobileOpen, setIsInternalMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { getTotalItems, openCart, wishlist, addItem } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const totalCartItems = getTotalItems();
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced live search suggestions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      const results = await searchProducts(searchQuery);
      setSuggestions(results);
      setIsSearching(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/90 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(15,13,11,0.06)] border-b border-[#E3D4BD]/80 py-3'
            : 'bg-[#FAF7F2] border-b border-[#E3D4BD]/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile hamburger menu */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={onOpenMobileMenu || (() => setIsInternalMobileOpen(true))}
                className="p-2 -ml-2 rounded-xl text-[#0F0D0B] hover:bg-[#F6EFE4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                aria-label="Open mobile navigation"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-3 select-none">
                <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white/90 p-0.5 border border-[#E3D4BD]/80 shadow-sm group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="FOXAL Natural Incense"
                    width={48}
                    height={48}
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#0F0D0B] group-hover:text-[#7A5230] transition-colors leading-none">
                    FOXAL
                  </span>
                  <span className="text-[9px] tracking-[0.22em] uppercase font-semibold text-[#C8922A] mt-0.5">
                    Natural Incense
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation: Home, Products, Contact us */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#272320]">
              <Link
                href="/"
                className="hover:text-[#C8922A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#C8922A] after:transition-all font-semibold"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="hover:text-[#C8922A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#C8922A] after:transition-all font-semibold"
              >
                Products
              </Link>
              <Link
                href="/contact"
                className="hover:text-[#C8922A] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#C8922A] after:transition-all font-semibold"
              >
                Contact us
              </Link>
            </nav>

            {/* Actions: Search, Wishlist, Log Icon, and Cart (After Login) */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl text-[#272320] hover:text-[#C8922A] hover:bg-[#F6EFE4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                aria-label="Search fragrances"
                title="Search fragrances"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-xl text-[#272320] hover:text-[#C8922A] hover:bg-[#F6EFE4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                aria-label={`Wishlist (${wishlistCount} items)`}
                title="Sacred Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C8922A] text-[10px] font-bold text-white shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Log icon (Sign In / Account) */}
              <Link
                href={isAuthenticated ? '/account' : '/login'}
                className="p-2.5 rounded-xl text-[#272320] hover:text-[#C8922A] hover:bg-[#F6EFE4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                aria-label={isAuthenticated ? 'My Account' : 'Sign In'}
                title={isAuthenticated ? `Account (${user?.name || 'Member'})` : 'Sign In'}
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Cart Button: Visible strictly AFTER login */}
              {isAuthenticated && (
                <button
                  onClick={openCart}
                  className="relative flex items-center gap-2 bg-[#0F0D0B] text-[#FAF7F2] hover:bg-[#272320] px-3.5 py-2 rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] animate-in fade-in duration-300"
                  aria-label={`Sacred cart (${totalCartItems} items)`}
                  title="View Sacred Cart"
                >
                  <ShoppingBag className="h-4 w-4 text-[#DFB15B]" />
                  <span className="hidden sm:inline text-xs font-semibold">Cart</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C8922A] text-[11px] font-bold text-white">
                    {totalCartItems}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Quick Search Modal with Debounced Live Suggestions */}
      <Modal
        isOpen={isSearchOpen}
        onClose={() => {
          setIsSearchOpen(false);
          setSearchQuery('');
          setSuggestions([]);
        }}
        title="Find Your Sacred Aroma"
        description="Search by aroma note (Oudh, Sandalwood, Rose), collection, or ingredient."
        maxWidth="lg"
      >
        <form onSubmit={handleSearchSubmit} className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#7A5230]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Try 'Oudh', 'Mogra', 'Cones', 'Temple Flowers'..."
            className="w-full rounded-xl border border-[#E3D4BD] bg-white pl-11 pr-10 py-3 text-sm text-[#0F0D0B] placeholder:text-[#AFA8A2] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSuggestions([]);
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#AFA8A2] hover:text-[#0F0D0B]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>

        {/* Live Debounced Suggestions */}
        {searchQuery.trim() ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-[#7A5230] uppercase tracking-wider">
                {isSearching
                  ? 'Seeking fragrance...'
                  : `Found ${suggestions.length} Suggestions`}
              </p>
              {suggestions.length > 0 && (
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-xs font-semibold text-[#C8922A] hover:underline flex items-center gap-1"
                >
                  View full search page
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>

            {suggestions.length === 0 && !isSearching ? (
              <div className="py-8 text-center">
                <p className="text-sm text-[#7A5230]">
                  No matching fragrances found for &ldquo;{searchQuery}&rdquo;.
                </p>
                <div className="mt-4">
                  <Link
                    href="/shop"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-xs font-semibold text-[#C8922A] underline"
                  >
                    Browse complete collection
                  </Link>
                </div>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F6EFE4] transition-colors border border-transparent hover:border-[#E3D4BD]"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-[#E3D4BD] shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="font-serif text-sm font-semibold text-[#0F0D0B] line-clamp-1">
                          {product.name}
                        </h5>
                        <p className="text-[11px] text-[#7A5230]">
                          {product.variant_label} ·{' '}
                          <strong className="text-[#C8922A]">
                            ₹{product.price}
                          </strong>
                        </p>
                      </div>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        addItem(product, 1);
                        setIsSearchOpen(false);
                      }}
                      className="text-xs font-semibold bg-[#C8922A] text-white px-3 py-1.5 rounded-lg hover:bg-[#B57E1E] transition-colors shrink-0 ml-2"
                    >
                      Add ₹{product.price}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-xs font-semibold text-[#7A5230] uppercase tracking-wider mb-2.5">
              Popular Fragrance Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Kasturi',
                'Royal Oudh',
                'Sandalwood Cones',
                'Rose Kannauj',
                'Gugal Vedic',
                'Ancient Woods',
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="text-xs bg-[#F6EFE4] hover:bg-[#EADECB] text-[#7A5230] px-3 py-1.5 rounded-full border border-[#E3D4BD] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Internal Mobile Drawer (Active whenever Header is used standalone) */}
      {!onOpenMobileMenu && (
        <MobileNav
          isOpen={isInternalMobileOpen}
          onClose={() => setIsInternalMobileOpen(false)}
        />
      )}
    </>
  );
};
