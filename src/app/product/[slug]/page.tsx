import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import { PRODUCTS } from '@/lib/mock';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: 'Product Not Found | FOXAL',
    };
  }

  const ogTitle = `${product.name} (₹${product.price}) | 100% Charcoal-Free Incense`;
  const ogDesc = `Handcrafted with sacred temple flowers and Ayurvedic herbs. ${product.subtitle}. Burns clean for ${product.burn_time}.`;

  return {
    title: `${product.name} — Pure Natural Incense`,
    description: ogDesc,
    keywords: [
      product.name,
      product.category_name,
      ...product.fragrance_notes,
      'charcoal free incense',
      'temple flower incense',
      'FOXAL India',
    ],
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: `https://www.foxal.in/product/${product.slug}`,
      images: [
        {
          url: product.images[0],
          width: 1000,
          height: 1000,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDesc,
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category);

  // Schema.org Product JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'FOXAL',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.foxal.in/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: '2027-12-31',
      availability: product.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews_count,
    },
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      {/* Product JSON-LD for rich SEO snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb Trail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumbs
            items={[
              { label: 'Shop', href: '/shop' },
              {
                label: product.category_name,
                href: `/shop/${product.category}`,
              },
              { label: product.name },
            ]}
          />
        </div>

        <ProductDetailClient
          product={product}
          relatedProducts={relatedProducts}
        />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
