import { PRODUCTS, Product, CATEGORIES, Category, Review } from './mock';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ProductFilterParams {
  category?: string;
  fragrance?: string;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  in_stock?: boolean;
  sort?: 'popular' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function getBaseProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('foxal-admin-store');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.state?.products && Array.isArray(parsed.state.products)) {
          return parsed.state.products;
        }
      }
    } catch (_e) {
      // ignore
    }
  }
  return PRODUCTS;
}

/**
 * Filter & sort in-memory (used as fallback or when mock/local data is active)
 */
function filterLocalProducts(params: ProductFilterParams): PaginatedProducts {
  let list = [...getBaseProducts()];

  // Category filter
  if (params.category && params.category !== 'all') {
    const cat = params.category.toLowerCase();
    list = list.filter(
      (p) =>
        p.category === cat ||
        p.slug.includes(cat) ||
        (cat === 'sticks' && p.category === 'sticks') ||
        (cat === 'cones' && p.category === 'cones')
    );
  }

  // Fragrance note filter
  if (params.fragrance) {
    const frag = params.fragrance.toLowerCase();
    list = list.filter((p) =>
      p.fragrance_notes.some((note) => note.toLowerCase().includes(frag))
    );
  }

  // Price range filter
  if (params.min_price !== undefined) {
    list = list.filter((p) => p.price >= params.min_price!);
  }
  if (params.max_price !== undefined) {
    list = list.filter((p) => p.price <= params.max_price!);
  }

  // Rating filter
  if (params.min_rating !== undefined && params.min_rating > 0) {
    list = list.filter((p) => p.rating >= params.min_rating!);
  }

  // In-stock filter
  if (params.in_stock) {
    list = list.filter((p) => p.in_stock);
  }

  // Search keyword
  if (params.search && params.search.trim()) {
    const q = params.search.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category_name.toLowerCase().includes(q) ||
        p.fragrance_notes.some((n) => n.toLowerCase().includes(q)) ||
        p.ingredients.some((i) => i.toLowerCase().includes(q))
    );
  }

  // Sorting
  switch (params.sort) {
    case 'price_asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      list.sort((a, b) => b.id - a.id);
      break;
    case 'popular':
    default:
      list.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0) || b.reviews_count - a.reviews_count);
      break;
  }

  const page = Math.max(1, params.page || 1);
  const limit = params.limit || 12;
  const total = list.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginated = list.slice(startIndex, startIndex + limit);

  return {
    products: paginated,
    total,
    page,
    limit,
    totalPages,
  };
}

/**
 * Fetch products list (Laravel API with fallback)
 */
export async function getProducts(params: ProductFilterParams = {}): Promise<PaginatedProducts> {
  const query = new URLSearchParams();
  if (params.category) query.set('category', params.category);
  if (params.fragrance) query.set('fragrance', params.fragrance);
  if (params.min_price) query.set('min_price', params.min_price.toString());
  if (params.max_price) query.set('max_price', params.max_price.toString());
  if (params.min_rating) query.set('min_rating', params.min_rating.toString());
  if (params.in_stock) query.set('in_stock', '1');
  if (params.sort) query.set('sort', params.sort);
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());
  if (params.search) query.set('search', params.search);

  try {
    const res = await fetch(`${BACKEND_URL}/api/products?${query.toString()}`, {
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (res.ok) {
      const json = await res.json();

      // Case 1: Standard Laravel API response: { success: true, data: [...] }
      if (json.success && Array.isArray(json.data)) {
        return {
          products: json.data,
          total: json.data.length,
          page: 1,
          limit: json.data.length,
          totalPages: 1,
        };
      }

      // Case 2: Laravel Resource Collection with pagination: { success: true, data: { data: [...], total, ... } }
      if (json.success && json.data && Array.isArray(json.data.data)) {
        return {
          products: json.data.data,
          total: json.data.total ?? json.data.data.length,
          page: json.data.current_page ?? 1,
          limit: json.data.per_page ?? json.data.data.length,
          totalPages: json.data.last_page ?? 1,
        };
      }

      // Case 3: Custom object with .products array: { success: true, data: { products: [...] } }
      if (json.success && json.data && Array.isArray(json.data.products)) {
        return {
          products: json.data.products,
          total: json.data.total ?? json.data.products.length,
          page: json.data.page ?? 1,
          limit: json.data.limit ?? json.data.products.length,
          totalPages: json.data.totalPages ?? 1,
        };
      }

      // Case 4: Direct array: [ ... ]
      if (Array.isArray(json)) {
        return {
          products: json,
          total: json.length,
          page: 1,
          limit: json.length,
          totalPages: 1,
        };
      }
    }
  } catch (_err) {
    // Backend API is offline or unreachable — fallback gracefully to local data
  }

  return filterLocalProducts(params);
}

/**
 * Fetch single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products/${slug}`, {
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch (_err) {
    // Fallback to local products
  }

  const found = getBaseProducts().find((p) => p.slug === slug);
  return found || null;
}

/**
 * Fetch related products (same category, excluding current product)
 */
export async function getRelatedProducts(currentId: number, category: string, limit = 4): Promise<Product[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products?category=${category}&limit=${limit + 1}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data?.products) {
        return json.data.products.filter((p: Product) => p.id !== currentId).slice(0, limit);
      }
    }
  } catch (_err) {
    // Fallback
  }

  return getBaseProducts().filter((p) => p.id !== currentId && p.category === category).slice(0, limit);
}

/**
 * Live search suggestions (debounced)
 */
export async function searchProducts(keyword: string): Promise<Product[]> {
  if (!keyword || !keyword.trim()) return [];
  const q = keyword.trim().toLowerCase();

  try {
    const res = await fetch(`${BACKEND_URL}/api/products/search?q=${encodeURIComponent(q)}`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch (_err) {
    // Fallback
  }

  return getBaseProducts().filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category_name.toLowerCase().includes(q) ||
      p.fragrance_notes.some((n) => n.toLowerCase().includes(q))
  ).slice(0, 6);
}

/**
 * Available fragrance notes for filters
 */
export const AVAILABLE_FRAGRANCES = [
  'Musk',
  'Oudh',
  'Sandalwood',
  'Cedarwood',
  'Rose',
  'Jasmine',
  'Mogra',
  'Gugal',
  'Lavender',
  'Vetiver',
];
