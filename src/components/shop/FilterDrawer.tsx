'use client';

import React from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { FilterSidebar, FilterState } from './FilterSidebar';
import { Button } from '@/components/ui/Button';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Collection"
      subtitle={`${totalResults} pure products available`}
      position="left"
      maxWidth="sm"
    >
      <div className="flex flex-col h-full justify-between pb-6">
        <FilterSidebar
          filters={filters}
          onFilterChange={onFilterChange}
          onReset={onReset}
          totalResults={totalResults}
        />

        <div className="pt-6 mt-6 border-t border-[#E3D4BD]">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onClose}
          >
            Show {totalResults} Products
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
