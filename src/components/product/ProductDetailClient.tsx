'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/mock';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { ProductGridCard } from '@/components/shop/ProductGridCard';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import {
  ShoppingBag,
  Heart,
  Share2,
  ShieldCheck,
  Sparkles,
  Flame,
  Truck,
  RotateCcw,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  Gift,
} from 'lucide-react';
import { toast } from 'sonner';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    'description' | 'how_to_use' | 'ingredients' | 'shipping'
  >('description');
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Review form state
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittedReview, setSubmittedReview] = useState(false);

  const buyButtonRef = useRef<HTMLDivElement>(null);

  const { addItem, toggleWishlist, isInWishlist } = useCartStore();
  const { isAuthenticated, openAuthModal } = useAuthStore();
  const isFavorite = isInWishlist(product.id);

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to save products to your wishlist');
      openAuthModal('login');
      return;
    }
    toggleWishlist(product);
  };

  const handleAddToCart = (qty = quantity) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your cart');
      openAuthModal('login');
      return;
    }
    addItem(product, qty);
  };

  // Intersection observer for sticky mobile bar
  useEffect(() => {
    const handleScroll = () => {
      if (!buyButtonRef.current) return;
      const rect = buyButtonRef.current.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Discover ${product.name} — 100% Charcoal-Free Natural Incense by FOXAL`,
          url: window.location.href,
        })
        .catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Sacred link copied to clipboard!');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      toast.error('Please fill in your name and thoughts.');
      return;
    }
    setSubmittedReview(true);
    setIsReviewFormOpen(false);
    toast.success('Thank you for sharing your sacred thoughts!', {
      description: 'Your verified review has been recorded.',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-hidden w-full max-w-full">
      {/* ── Main Product Section (2 Columns) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Gallery without Zoom */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square sm:aspect-[4/5] w-full max-h-[480px] sm:max-h-[580px] overflow-hidden rounded-3xl border border-[#E3D4BD] bg-white shadow-card flex items-center justify-center">
            <Image
              src={product.images?.[activeImageIndex] || '/images/logo.png'}
              alt={product.name || 'FOXAL Incense'}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: 'contain' }}
              className="object-contain object-center p-4 sm:p-6 transition-all duration-200"
            />

            {/* Gallery Navigation arrows */}
            {product.images && product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 backdrop-blur-md text-[#0F0D0B] shadow-sm hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 backdrop-blur-md text-[#0F0D0B] shadow-sm hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails from Backend (Primary Thumbnail + Added Images) */}
          {product.images && product.images.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2 pt-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 w-16 sm:h-22 sm:w-18 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all ${idx === activeImageIndex
                    ? 'border-[#C8922A] shadow-md ring-2 ring-[#C8922A]/30 scale-102'
                    : 'border-[#E3D4BD] opacity-70 hover:opacity-100 hover:border-[#C8922A]/60'
                    }`}
                  aria-label={`Select product image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'contain' }}
                    className="object-contain object-center p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="text-xs text-[#7A5230] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[#C8922A]">
                {product.category_name}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B] leading-tight">
              {product.name}
            </h1>
            <p className="mt-1 text-sm sm:text-base text-[#7A5230] font-sans">
              {product.subtitle}
            </p>

            {/* Rating Stars + Reviews Jump */}
            <div className="mt-3 flex items-center gap-3">
              <Rating
                score={product.rating}
                reviewsCount={product.reviews_count}
                size="md"
              />
              <span className="text-xs text-[#AFA8A2]">·</span>
              <a
                href="#reviews"
                className="text-xs font-semibold text-[#C8922A] underline hover:text-[#9A6A16]"
              >
                Read verified reviews
              </a>
            </div>
          </div>

          {/* Pricing Strip */}
          <div className="rounded-2xl bg-[#F6EFE4] p-3.5 sm:p-4 border border-[#E3D4BD] flex flex-wrap sm:flex-nowrap items-baseline justify-between gap-2.5">
            <div className="flex items-baseline gap-2.5 sm:gap-3 flex-wrap">
              <span className="text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
                ₹{product.price}
              </span>
              <span className="text-sm sm:text-base text-[#AFA8A2] line-through">
                MRP ₹{product.mrp}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#354E3C] bg-[#EBF2ED] px-2.5 py-0.5 rounded border border-[#C7D9CD] whitespace-nowrap">
                Save ₹{product.mrp - product.price} (25% OFF)
              </span>
            </div>
            <span className="text-[11px] sm:text-xs text-[#7A5230] whitespace-nowrap">Inclusive of all taxes</span>
          </div>

          {/* Variant Spec & Stock Status */}
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A5230] block mb-2">
                Packaging Variant:
              </span>
              <div className="inline-flex items-center gap-2 rounded-xl bg-white p-3 border-2 border-[#C8922A] shadow-sm">
                {product.category === 'sticks' ? (
                  <Flame className="h-4 w-4 text-[#C8922A]" />
                ) : (
                  <Gift className="h-4 w-4 text-[#C8922A]" />
                )}
                <span className="text-xs font-bold text-[#0F0D0B]">
                  {product.variant_label}
                </span>
                <Check className="h-4 w-4 text-[#C8922A]" />
              </div>
            </div>

            {/* In-Stock Indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#354E3C]">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>In Stock — Dispatches within 24 hours from Gujarat</span>
            </div>
          </div>

          {/* Quantity Selector + Add to Cart + Buy Now + Wishlist */}
          <div ref={buyButtonRef} className="space-y-3 pt-3 border-t border-[#E3D4BD]">
            {/* Top row: Quantity on Left, Wishlist & Share on Right */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-[#7A5230] uppercase tracking-wider">Quantity:</span>
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  size="md"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleWishlistClick}
                  aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-[#E3D4BD] bg-white text-[#7A5230] hover:text-red-500 hover:bg-[#F6EFE4] transition-colors shadow-sm"
                  title="Save to Wishlist"
                >
                  <Heart
                    className={`h-4.5 w-4.5 sm:h-5 sm:w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
                  />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share product"
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-[#E3D4BD] bg-white text-[#7A5230] hover:text-[#0F0D0B] hover:bg-[#F6EFE4] transition-colors shadow-sm"
                  title="Share"
                >
                  <Share2 className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* CTA: Add to Cart */}
            <div className="pt-1">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => handleAddToCart(quantity)}
                leftIcon={<ShoppingBag className="h-5 w-5 shrink-0" />}
                className="text-base font-bold tracking-wide py-3.5 shadow-md justify-center whitespace-nowrap"
              >
                Add to Cart (₹{product.price * quantity})
              </Button>
            </div>
          </div>

          {/* Trust Guarantees Strip */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-2 text-[11px] sm:text-xs text-[#7A5230]">
            <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-[#E3D4BD] min-w-0">
              <Truck className="h-4 w-4 text-[#C8922A] shrink-0" />
              <span className="truncate sm:whitespace-normal">Free delivery above ₹499</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-[#E3D4BD] min-w-0">
              <ShieldCheck className="h-4 w-4 text-[#354E3C] shrink-0" />
              <span className="truncate sm:whitespace-normal">100% Charcoal-free</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Detailed Tabs: Description, Fragrance, How to Use, Ingredients, Shipping ── */}
      <div className="mt-20 pt-10 border-t border-[#E3D4BD]">
        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 border-b border-[#E3D4BD] pb-4">
          {[
            { id: 'description', label: 'Sacred Story' },
            { id: 'how_to_use', label: 'How to Burn' },
            { id: 'ingredients', label: 'Pure Ingredients' },
            { id: 'shipping', label: 'Shipping & Returns' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${activeTab === tab.id
                ? 'bg-[#0F0D0B] text-white shadow-sm'
                : 'bg-[#F6EFE4] text-[#7A5230] hover:text-[#0F0D0B]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="py-8 text-sm text-[#5A534E] leading-relaxed max-w-4xl">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p className="text-base text-[#0F0D0B] font-serif leading-relaxed">
                {product.description}
              </p>
              <div className="mt-6 pt-4 border-t border-[#E3D4BD]">
                <h4 className="font-serif text-lg font-bold text-[#0F0D0B] mb-3">
                  Spiritual &amp; Mindful Benefits:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#354E3C] font-medium">
                      <Check className="h-4 w-4 text-[#4A6B53] shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}


          {activeTab === 'how_to_use' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#0F0D0B]">
                Ritual Instructions for Clean Burning:
              </h4>
              <ol className="list-decimal pl-5 space-y-2 text-xs text-[#5A534E]">
                <li>Light the tip of the incense stick or cone using a match or diya flame.</li>
                <li>Allow the flame to catch for 5-8 seconds, then gently blow it out.</li>
                <li>Place securely in the provided ceramic holder or an agarbatti stand.</li>
                <li>Keep away from direct fans or drafty currents to ensure prolonged 45+ minute burn.</li>
                <li>The pure white ash can be respectfully returned to garden soil as organic manure.</li>
              </ol>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#0F0D0B]">
                100% Pure Botanical Ingredients:
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#EBF2ED] text-[#354E3C] px-3 py-1.5 rounded-xl font-medium border border-[#C7D9CD]"
                  >
                    🌱 {ing}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#7A5230] mt-3">
                Zero charcoal, zero synthetic fragrance dips, zero phthalates or sulfur.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3 text-xs">
              <p>
                <strong>Express Dispatch:</strong> All orders are dispatched within 24 hours
                from our facility.
              </p>
              <p>
                <strong>Delivery Charges:</strong> Free Express Delivery on orders above ₹499.
                Flat ₹49 for smaller orders.
              </p>
              <p>
                <strong>Safe Transit:</strong> Each 250g pack and 60-cone box is sealed with
                biodegradable moisture-barrier packaging.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Verified Customer Reviews Section with Rating Breakdown & Form ── */}
      <section id="reviews" className="mt-20 pt-12 border-t border-[#E3D4BD]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h3 className="font-serif text-3xl font-bold text-[#0F0D0B]">
              Customer Experiences
            </h3>
            <p className="text-xs text-[#7A5230] mt-1">
              Based on {product.reviews_count} verified purchases across India
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
          >
            {isReviewFormOpen ? 'Close Review Form' : 'Write a Sacred Review'}
          </Button>
        </div>

        {/* Rating Breakdown Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3D4BD] mb-10 shadow-sm">
          {/* Overall Score */}
          <div className="text-center md:text-left md:border-r md:border-[#E3D4BD] md:pr-8">
            <span className="font-serif text-6xl font-bold text-[#0F0D0B] block">
              {product.rating.toFixed(1)}
            </span>
            <div className="mt-2">
              <Rating score={product.rating} showScore={false} size="lg" />
            </div>
            <p className="text-xs text-[#7A5230] mt-2">
              98% of customers would recommend this incense to friends and family.
            </p>
          </div>

          {/* Breakdown Bars */}
          <div className="md:col-span-2 space-y-2 text-xs">
            {[
              { stars: 5, pct: 90 },
              { stars: 4, pct: 8 },
              { stars: 3, pct: 2 },
              { stars: 2, pct: 0 },
              { stars: 1, pct: 0 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <span className="w-12 font-medium text-[#7A5230]">
                  {row.stars} Stars
                </span>
                <div className="h-2 flex-1 rounded-full bg-[#F6EFE4] overflow-hidden">
                  <div
                    className="h-full bg-[#C8922A] rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right font-semibold text-[#0F0D0B]">
                  {row.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Form */}
        {isReviewFormOpen && (
          <div className="rounded-3xl bg-[#F6EFE4] p-6 sm:p-8 border border-[#E3D4BD] mb-10">
            <h4 className="font-serif text-xl font-bold text-[#0F0D0B] mb-2">
              Share Your Thoughts on {product.name}
            </h4>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#7A5230] block mb-1">
                  Your Overall Rating:
                </label>
                <div className="flex gap-1 text-[#C8922A]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-6 w-6 ${star <= newRating
                          ? 'fill-[#C8922A] text-[#C8922A]'
                          : 'text-[#E3D4BD]'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Meera S.)"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="rounded-xl border border-[#E3D4BD] bg-white p-3 text-xs text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                />
                <input
                  type="text"
                  placeholder="Your City (e.g. Pune, Maharashtra)"
                  className="rounded-xl border border-[#E3D4BD] bg-white p-3 text-xs text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                />
              </div>

              <textarea
                required
                rows={4}
                placeholder="What did you love about the aroma, combustion, and clean white ash?"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full rounded-xl border border-[#E3D4BD] bg-white p-3 text-xs text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
              />

              <Button type="submit" variant="primary" size="md">
                Submit Sacred Review
              </Button>
            </form>
          </div>
        )}

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {submittedReview && (
            <div className="p-5 rounded-2xl bg-[#EBF2ED] border border-[#C7D9CD]">
              <div className="flex items-center justify-between mb-2">
                <Rating score={newRating} showScore={false} size="sm" />
                <span className="text-[11px] font-semibold text-[#354E3C]">
                  Just now · Verified Review
                </span>
              </div>
              <h5 className="font-serif text-base font-bold text-[#0F0D0B]">
                {reviewerName}
              </h5>
              <p className="text-xs text-[#5A534E] mt-1">{reviewComment}</p>
            </div>
          )}

          <div className="p-5 rounded-2xl bg-white border border-[#E3D4BD]">
            <div className="flex items-center justify-between mb-2">
              <Rating score={5} showScore={false} size="sm" />
              <span className="text-[11px] text-[#AFA8A2]">2 days ago</span>
            </div>
            <h5 className="font-serif text-base font-bold text-[#0F0D0B]">
              Devika R. · Verified Buyer
            </h5>
            <p className="text-xs text-[#5A534E] mt-1 leading-relaxed">
              Such a soothing aroma! The sticks burn for nearly 50 minutes and leave zero
              black residue on my walls or ceiling. Truly 100% charcoal free.
            </p>
          </div>
        </div>
      </section>

      {/* ── Related Products Carousel / Grid ── */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[#E3D4BD]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C8922A] block mb-1">
                Complementary Fragrances
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F0D0B]">
                You May Also Rever
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductGridCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* ── Sticky Add-to-Cart Bar on Mobile ── */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#E3D4BD] p-3 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 border border-[#E3D4BD]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-[#0F0D0B] truncate block">
                  {product.name}
                </span>
                <span className="text-xs font-bold text-[#C8922A]">
                  ₹{product.price}{' '}
                  <span className="text-[10px] text-[#AFA8A2] line-through">
                    ₹{product.mrp}
                  </span>
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => handleAddToCart(1)}
              leftIcon={<ShoppingBag className="h-3.5 w-3.5" />}
              className="shrink-0 text-xs py-2 px-4 font-semibold"
            >
              Add ₹{product.price}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
