'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
}) => {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs text-[#7A5230] w-full max-w-full ${className}`}>
      <ol className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 gap-y-1 leading-relaxed">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center hover:text-[#C8922A] transition-colors shrink-0"
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-x-1.5 sm:gap-x-2">
              <ChevronRight className="h-3 w-3 text-[#AFA8A2] shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-[#0F0D0B] break-words line-clamp-1" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#C8922A] transition-colors whitespace-nowrap shrink-0"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
