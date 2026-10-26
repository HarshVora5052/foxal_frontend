'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/lib/mock';
import { ProductGridCard } from '@/components/shop/ProductGridCard';
import { FilterSidebar, FilterState } from '@/components/shop/FilterSidebar';
import { FilterDrawer } from '@/components/shop/FilterDrawer';
import { QuickViewModal } from '@/components/home/QuickViewModal';
import { SlidersHorizontal, ChevronDown, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ShopClientProps {
  initialProducts: Product[];
  initialCategory?: string;
  categoryTitle?: string;
  categorySubtitle?: string;
}

const ITEMS_PER_PAGE = 8;

export const ShopClient: React.FC<ShopClientProps> = ({
  initialProducts = [],
  initialCategory = 'all',
  categoryTitle = 'All Sacred Incense',
  categorySubtitle = '100% Charcoal-free sticks and pure dhoop cones handcrafted in India',
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    fragrance: '',
    minPrice: 0,
    maxPrice: 300,
    minRating: 0,
    inStockOnly: false,
    sort: 'popular',
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    const safeList = Array.isArray(initialProducts) ? initialProducts : [];
    let result = [...safeList];

    // Category
    if (filters.category && filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Fragrance
    if (filters.fragrance) {
      const f = filters.fragrance.toLowerCase();
      result = result.filter((p) =>
        p.fragrance_notes.some((note) => note.toLowerCase().includes(f))
      );
    }

    // Rating
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // In Stock
    if (filters.inStockOnly) {
      result = result.filter((p) => p.in_stock);
    }

    // Sorting
    switch (filters.sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
      default:
        result.sort(
          (a, b) =>
            (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0) ||
            b.reviews_count - a.reviews_count
        );
        break;
    }

    return result;
  }, [initialProducts, filters]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      fragrance: '',
      minPrice: 0,
      maxPrice: 300,
      minRating: 0,
      inStockOnly: false,
      sort: 'popular',
    });
    setCurrentPage(1);
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    Boolean(filters.fragrance) ||
    filters.minRating > 0 ||
    filters.inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Philosophy */}
      <div className="mb-8 pb-6 border-b border-[#E3D4BD]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1.5">
              100% Charcoal-Free Shop
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
              {categoryTitle}
            </h1>
            <p className="mt-2 text-sm text-[#7A5230] max-w-2xl font-sans">
              {categorySubtitle}
            </p>
          </div>

          {/* Special Festive Banner Tag */}
          <div className="bg-[#FAF7F2] border border-[#C8922A]/40 rounded-2xl p-3 px-4 flex items-center gap-3 shrink-0 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0F0D0B] text-[#DFB15B]">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <span className="text-xs font-bold text-[#0F0D0B] block">
                Festive Rate: Flat ₹149
              </span>
              <span className="text-[11px] text-[#354E3C] font-semibold">
                Free shipping on orders above ₹499
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Desktop Sidebar (Left) + Product Grid (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#E3D4BD] shadow-sm sticky top-24">
          <FilterSidebar
            filters={filters}
            onFilterChange={(newF) => {
              setFilters(newF);
              setCurrentPage(1);
            }}
            onReset={handleResetFilters}
            totalResults={filteredProducts.length}
          />
        </aside>

        {/* Products Area */}
        <div className="lg:col-span-3">
          {/* Top Bar: Controls, Active Tags & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-[#FAF7F2] p-3 rounded-2xl border border-[#E3D4BD]">
            {/* Mobile Filter Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-[#0F0D0B] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#DFB15B]" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="h-2 w-2 rounded-full bg-[#DFB15B]" />
                )}
              </button>

              <span className="text-xs text-[#7A5230] font-medium hidden sm:inline">
                Showing{' '}
                <strong className="text-[#0F0D0B]">{filteredProducts.length}</strong>{' '}
                sacred items
              </span>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-[#7A5230] font-medium">Sort by:</span>
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value })
                }
                className="rounded-xl border border-[#E3D4BD] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

          {/* Active Filter Pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-[#7A5230]">Active filters:</span>
              {filters.category !== 'all' && (
                <span className="inline-flex items-center gap-1 text-xs bg-[#F6EFE4] text-[#0F0D0B] px-2.5 py-1 rounded-full border border-[#E3D4BD]">
                  Category: {filters.category}
                  <button
                    onClick={() =>
                      setFilters({ ...filters, category: 'all' })
                    }
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.fragrance && (
                <span className="inline-flex items-center gap-1 text-xs bg-[#F6EFE4] text-[#0F0D0B] px-2.5 py-1 rounded-full border border-[#E3D4BD]">
                  Aroma: {filters.fragrance}
                  <button
                    onClick={() => setFilters({ ...filters, fragrance: '' })}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.minRating > 0 && (
                <span className="inline-flex items-center gap-1 text-xs bg-[#F6EFE4] text-[#0F0D0B] px-2.5 py-1 rounded-full border border-[#E3D4BD]">
                  {filters.minRating}★ &amp; above
                  <button
                    onClick={() => setFilters({ ...filters, minRating: 0 })}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.inStockOnly && (
                <span className="inline-flex items-center gap-1 text-xs bg-[#F6EFE4] text-[#0F0D0B] px-2.5 py-1 rounded-full border border-[#E3D4BD]">
                  In Stock Only
                  <button
                    onClick={() =>
                      setFilters({ ...filters, inStockOnly: false })
                    }
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#C8922A] underline hover:text-[#9A6A16] ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid: 2 col mobile, 3 tablet, 4 desktop */}
          {paginatedProducts.length === 0 ? (
            <div className="py-20 text-center rounded-3xl border border-[#E3D4BD] bg-white p-8">
              <Sparkles className="mx-auto h-12 w-12 text-[#C8922A]/60 mb-3" />
              <h3 className="font-serif text-2xl font-bold text-[#0F0D0B]">
                No fragrances matched your selection
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#7A5230] max-w-sm mx-auto">
                Try loosening your filters or explore our all-time favorite bestsellers.
              </p>
              <div className="mt-6">
                <Button variant="primary" size="md" onClick={handleResetFilters}>
                  Reset All Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3.5 sm:gap-6">
              {paginatedProducts.map((product) => (
                <ProductGridCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className="p-2.5 rounded-xl border border-[#E3D4BD] bg-white text-[#7A5230] hover:bg-[#F6EFE4] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-9 w-9 rounded-xl text-xs font-semibold transition-all ${
                      currentPage === pageNum
                        ? 'bg-[#0F0D0B] text-white shadow-sm'
                        : 'border border-[#E3D4BD] bg-white text-[#7A5230] hover:bg-[#F6EFE4]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className="p-2.5 rounded-xl border border-[#E3D4BD] bg-white text-[#7A5230] hover:bg-[#F6EFE4] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <FilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={(newF) => {
          setFilters(newF);
          setCurrentPage(1);
        }}
        onReset={handleResetFilters}
        totalResults={filteredProducts.length}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
