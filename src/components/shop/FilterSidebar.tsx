'use client';

import React from 'react';
import { AVAILABLE_FRAGRANCES } from '@/lib/products';
import { Sparkles, Flame, Check, RotateCcw } from 'lucide-react';

export interface FilterState {
  category: string;
  fragrance: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  sort: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  return (
    <div className="space-y-6">
      {/* Header with reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E3D4BD]">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">Filters</h3>
          <p className="text-xs text-[#7A5230]">{totalResults} products found</p>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#C8922A] hover:text-[#9A6A16] transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Reset All
        </button>
      </div>

      {/* 1. Category */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A5230] mb-3">
          Collection
        </h4>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'All Collections' },
            { id: 'sticks', label: 'Incense Sticks (250g)', icon: <Flame className="h-3.5 w-3.5 text-[#C8922A]" /> },
            { id: 'cones', label: 'Incense Cones (60 pcs)', icon: <Sparkles className="h-3.5 w-3.5 text-[#C8922A]" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onFilterChange({ ...filters, category: item.id })}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                filters.category === item.id
                  ? 'bg-[#0F0D0B] text-white shadow-sm'
                  : 'bg-[#F6EFE4]/60 text-[#0F0D0B] hover:bg-[#F6EFE4]'
              }`}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
              {filters.category === item.id && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Fragrance Notes */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A5230] mb-3">
          Aromatic Note
        </h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onFilterChange({ ...filters, fragrance: '' })}
            className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
              !filters.fragrance
                ? 'bg-[#C8922A] text-white border-[#C8922A] font-semibold'
                : 'bg-white border-[#E3D4BD] text-[#7A5230] hover:border-[#C8922A]'
            }`}
          >
            All Notes
          </button>
          {AVAILABLE_FRAGRANCES.map((note) => {
            const isSelected = filters.fragrance.toLowerCase() === note.toLowerCase();
            return (
              <button
                key={note}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    fragrance: isSelected ? '' : note.toLowerCase(),
                  })
                }
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-[#C8922A] text-white border-[#C8922A] font-semibold'
                    : 'bg-white border-[#E3D4BD] text-[#7A5230] hover:border-[#C8922A]'
                }`}
              >
                {note}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Rating */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A5230] mb-3">
          Minimum Rating
        </h4>
        <div className="space-y-1.5">
          {[
            { value: 0, label: 'All Ratings' },
            { value: 4.8, label: '4.8★ & above' },
            { value: 4.9, label: '4.9★ & above' },
            { value: 5.0, label: '5.0★ Divine Only' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => onFilterChange({ ...filters, minRating: item.value })}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                filters.minRating === item.value
                  ? 'bg-[#FBF5EA] text-[#9A6A16] font-bold border border-[#DFB15B]/50'
                  : 'text-[#7A5230] hover:bg-[#F6EFE4]'
              }`}
            >
              <span>{item.label}</span>
              {filters.minRating === item.value && <Check className="h-3 w-3" />}
            </button>
          ))}
        </div>
      </div>

      {/* 4. In Stock Only Toggle */}
      <div className="pt-2 border-t border-[#E3D4BD]">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onFilterChange({ ...filters, inStockOnly: e.target.checked })
            }
            className="h-4 w-4 rounded text-[#C8922A] focus:ring-[#C8922A] border-[#E3D4BD]"
          />
          <span className="text-xs font-semibold text-[#0F0D0B]">
            In-Stock Items Only
          </span>
        </label>
      </div>
    </div>
  );
};
