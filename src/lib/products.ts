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

export function normalizeProduct(raw: any): Product {
  if (!raw) return PRODUCTS[0];

  const categorySlug =
    (typeof raw.category === 'object' && raw.category !== null ? raw.category.slug : raw.category) ||
    '';
  const isCone =
    categorySlug.includes('cone') ||
    raw.category_id === 3 ||
    (raw.name && raw.name.toLowerCase().includes('cone')) ||
    (raw.slug && raw.slug.toLowerCase().includes('cone'));

  const category: 'sticks' | 'cones' = isCone ? 'cones' : 'sticks';
  const category_name: 'Incense Sticks' | 'Incense Cones' = isCone ? 'Incense Cones' : 'Incense Sticks';

  const mrp = Number(raw.mrp) || 199;
  const price = Number(raw.price) || 149;
  const discount_percent =
    raw.discount_percent !== undefined
      ? Number(raw.discount_percent)
      : Math.max(0, Math.round(((mrp - price) / mrp) * 100));

  let fragranceNotes: string[] = [];
  if (Array.isArray(raw.fragrance_notes) && raw.fragrance_notes.length > 0) {
    fragranceNotes = raw.fragrance_notes;
  } else if (typeof raw.fragrance === 'string' && raw.fragrance.trim()) {
    fragranceNotes = raw.fragrance
      .split(/[|,&]/)
      .map((s: string) => s.trim())
      .filter((s: string) => s && !s.toLowerCase().includes('charcoal free'));
  }
  if (fragranceNotes.length === 0) {
    fragranceNotes = isCone
      ? ['Damask Rose', 'Sambac Jasmine', 'Sacred Sandalwood']
      : ['Mysore Sandal', 'Vedic Herbs', 'Temple Resins'];
  }

  let images: string[] = [];
  if (Array.isArray(raw.images) && raw.images.length > 0) {
    images = raw.images
      .filter((img: any) => typeof img === 'string' && img.trim() && !img.includes('unsplash.com'))
      .map((img: string) =>
        img.startsWith('http')
          ? img
          : img.startsWith('/')
            ? img
            : `/${img}`
      );
  } else if (raw.image && typeof raw.image === 'string' && !raw.image.includes('unsplash.com')) {
    images = [raw.image.startsWith('http') || raw.image.startsWith('/') ? raw.image : `/${raw.image}`];
  }

  if (images.length === 0) {
    const nameLower = ((raw.name || '') + ' ' + (raw.slug || '')).toLowerCase();
    if (nameLower.includes('sukhad') || nameLower.includes('chandan')) {
      images = ['/images/products/foxal-sukhad-premium-incense-sticks.jpg'];
    } else if (nameLower.includes('oudh')) {
      images = ['/images/products/foxal-oudh-premium-incense-sticks.jpg'];
    } else if (nameLower.includes('woods')) {
      images = ['/images/products/foxal-woods-premium-incense-sticks.jpg'];
    } else if (nameLower.includes('gugal') || nameLower.includes('sambrani')) {
      images = ['/images/products/foxal-gugal-premium-incense-sticks.jpg'];
    } else if (nameLower.includes('mogra')) {
      images = ['/images/products/foxal-mogra-premium-incense-sticks.jpg'];
    } else if (nameLower.includes('rose') || nameLower.includes('gulab')) {
      images = ['/images/products/foxal-rose-natural-incense-cones.jpg'];
    } else if (nameLower.includes('sandalwood')) {
      images = ['/images/products/foxal-sandalwood-natural-incense-cones.jpg'];
    } else if (nameLower.includes('lavender')) {
      images = ['/images/products/foxal-lavender-natural-incense-cones.jpg'];
    } else if (nameLower.includes('jasmine')) {
      images = ['/images/products/foxal-jasmine-natural-incense-cones.jpg'];
    } else {
      images = [
        isCone
          ? '/images/products/foxal-rose-natural-incense-cones.jpg'
          : '/images/products/foxal-kasturi-premium-incense-sticks.jpg',
      ];
    }
  }

  return {
    id: Number(raw.id) || Math.floor(Math.random() * 10000),
    slug: raw.slug || `foxal-product-${raw.id || 'item'}`,
    name: raw.name || 'FOXAL Sacred Fragrance',
    subtitle:
      raw.subtitle ||
      (isCone
        ? '60 Natural Dhoop Cones with Ceramic Stand'
        : 'Generous 250g Pack (~135 Sticks) 100% Charcoal Free'),
    category,
    category_name,
    variant_label:
      raw.variant_label || (isCone ? '60 Cones / Box' : '250g Value Pack'),
    mrp,
    price,
    discount_percent,
    rating: Number(raw.rating ?? raw.avg_rating ?? 4.9),
    reviews_count: Number(raw.reviews_count ?? 128),
    in_stock:
      raw.in_stock !== undefined
        ? Boolean(raw.in_stock)
        : raw.stock !== undefined
          ? Number(raw.stock) > 0
          : true,
    burn_time:
      raw.burn_time ||
      (isCone ? '35 - 40 Minutes per Cone' : '45 - 50 Minutes'),
    fragrance_notes: [],
    ingredients: Array.isArray(raw.ingredients)
      ? raw.ingredients
      : ['Temple Botanicals', 'Natural Resins', 'Pure Essential Oils'],
    description:
      raw.description ||
      'Handcrafted natural incense made with sacred temple flowers and Ayurvedic herbs. 100% charcoal-free.',
    benefits: Array.isArray(raw.benefits)
      ? raw.benefits
      : ['100% Charcoal Free', 'Zero Coal Smoke', 'Meditation & Puja Safe'],
    badge: raw.badge || (raw.is_featured ? 'Bestseller' : undefined),
    is_bestseller: Boolean(raw.is_bestseller ?? raw.is_featured ?? true),
    is_featured: Boolean(raw.is_featured ?? true),
    images,
  };
}

export function getBaseProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('foxal-admin-store');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.state?.products && Array.isArray(parsed.state.products)) {
          return parsed.state.products.map(normalizeProduct);
        }
      }
    } catch (_e) {
      // ignore
    }
  }
  return PRODUCTS.map(normalizeProduct);
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
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();

      // Case 1: Standard Laravel API response: { success: true, data: [...] }
      if (json.success && Array.isArray(json.data)) {
        const normalized = json.data.map(normalizeProduct);
        return {
          products: normalized,
          total: normalized.length,
          page: 1,
          limit: normalized.length,
          totalPages: 1,
        };
      }

      // Case 2: Laravel Resource Collection with pagination: { success: true, data: { data: [...], total, ... } }
      if (json.success && json.data && Array.isArray(json.data.data)) {
        const normalized = json.data.data.map(normalizeProduct);
        return {
          products: normalized,
          total: json.data.total ?? normalized.length,
          page: json.data.current_page ?? 1,
          limit: json.data.per_page ?? normalized.length,
          totalPages: json.data.last_page ?? 1,
        };
      }

      // Case 3: Custom object with .products array: { success: true, data: { products: [...] } }
      if (json.success && json.data && Array.isArray(json.data.products)) {
        const normalized = json.data.products.map(normalizeProduct);
        return {
          products: normalized,
          total: json.data.total ?? normalized.length,
          page: json.data.page ?? 1,
          limit: json.data.limit ?? normalized.length,
          totalPages: json.data.totalPages ?? 1,
        };
      }

      // Case 4: Direct array: [ ... ]
      if (Array.isArray(json)) {
        const normalized = json.map(normalizeProduct);
        return {
          products: normalized,
          total: normalized.length,
          page: 1,
          limit: normalized.length,
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
        return normalizeProduct(json.data);
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
      next: { revalidate: 60 },
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
export const AVAILABLE_flavor = [
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
