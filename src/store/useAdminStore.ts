'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, PRODUCTS, Category, CATEGORIES } from '@/lib/mock';
import { toast } from 'sonner';

export interface AdminProduct extends Product {
  sku?: string;
  stock_quantity?: number;
  is_active?: boolean;
}

export interface AdminCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  is_active: boolean;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: 'Active' | 'Blocked';
}

export interface AdminReview {
  id: number;
  productName: string;
  productId: number;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface AdminCoupon {
  id: number;
  code: string;
  type: 'flat' | 'percentage';
  value: number;
  minOrder: number;
  expiresAt: string;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
}

export interface AdminMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied';
}

export interface AdminSettings {
  shippingCharge: number;
  freeShippingThreshold: number;
  gstPercentage: number;
  announcementText: string;
  supportEmail: string;
  supportPhone: string;
}

interface AdminState {
  products: AdminProduct[];
  categories: AdminCategory[];
  users: AdminUser[];
  reviews: AdminReview[];
  coupons: AdminCoupon[];
  messages: AdminMessage[];
  settings: AdminSettings;

  // Products CRUD
  addProduct: (product: Omit<AdminProduct, 'id'>) => AdminProduct;
  updateProduct: (id: number, data: Partial<AdminProduct>) => void;
  deleteProduct: (id: number) => void;
  bulkDeleteProducts: (ids: number[]) => void;
  toggleProductFeatured: (id: number) => void;
  toggleProductActive: (id: number) => void;

  // Categories CRUD
  addCategory: (cat: Omit<AdminCategory, 'id' | 'productCount'>) => void;
  updateCategory: (id: number, data: Partial<AdminCategory>) => void;
  deleteCategory: (id: number) => void;

  // Users Management
  toggleUserStatus: (userId: number) => void;

  // Reviews Moderation
  updateReviewStatus: (reviewId: number, status: 'Pending' | 'Approved' | 'Rejected') => void;
  deleteReview: (reviewId: number) => void;

  // Coupons CRUD
  addCoupon: (coupon: Omit<AdminCoupon, 'id' | 'usageCount'>) => void;
  updateCoupon: (id: number, data: Partial<AdminCoupon>) => void;
  deleteCoupon: (id: number) => void;
  toggleCouponActive: (id: number) => void;

  // Messages / Contacts
  addMessage: (
    message: Omit<AdminMessage, 'id' | 'date' | 'status'> & {
      date?: string;
      status?: 'Unread' | 'Replied';
    }
  ) => AdminMessage;
  markMessageReplied: (id: number) => void;
  toggleMessageStatus: (id: number) => void;
  deleteMessage: (id: number) => void;

  // Settings
  updateSettings: (data: Partial<AdminSettings>) => void;
}

// Initial default seed data
const INITIAL_ADMIN_PRODUCTS: AdminProduct[] = PRODUCTS.map((p) => ({
  ...p,
  sku: `FXL-${p.category.toUpperCase()}-${p.id.toString().padStart(3, '0')}`,
  stock_quantity: 120,
  is_active: true,
}));

const INITIAL_CATEGORIES: AdminCategory[] = [
  {
    id: 1,
    name: 'Incense Sticks',
    slug: 'sticks',
    description: '250g Handcrafted sticks (~135 pcs) with pure Ayurvedic herbs and temple flowers.',
    image: '/images/products/sticks/foxal-sukhad-premium-incense-sticks.jpg',
    productCount: 6,
    is_active: true,
  },
  {
    id: 2,
    name: 'Incense Cones',
    slug: 'cones',
    description: '60 Cones per box with complimentary ceramic stand. Dense aromatic smoke.',
    image: '/images/products/cones/foxal-sandalwood-natural-incense-cones.jpg',
    productCount: 4,
    is_active: true,
  },
];

const INITIAL_USERS: AdminUser[] = [
  {
    id: 1,
    name: 'Harsh Vora',
    email: 'harshvora2003@gmail.com',
    phone: '+91 98765 43210',
    ordersCount: 3,
    totalSpent: 894,
    joinedDate: '2026-10-01',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Pooja Sharma',
    email: 'pooja.sharma@example.com',
    phone: '+91 98220 11223',
    ordersCount: 2,
    totalSpent: 596,
    joinedDate: '2026-10-12',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Rajesh Patel',
    email: 'rajesh.patel@gmail.com',
    phone: '+91 94000 55443',
    ordersCount: 5,
    totalSpent: 1490,
    joinedDate: '2026-09-28',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Ananya Deshmukh',
    email: 'ananya.d@rediffmail.com',
    phone: '+91 98111 88990',
    ordersCount: 1,
    totalSpent: 149,
    joinedDate: '2026-10-20',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@outlook.com',
    phone: '+91 99000 12345',
    ordersCount: 0,
    totalSpent: 0,
    joinedDate: '2026-10-25',
    status: 'Blocked',
  },
];

const INITIAL_REVIEWS: AdminReview[] = [
  {
    id: 1,
    productName: 'Kasturi Premium Incense Sticks',
    productId: 1,
    userName: 'Kavita Menon',
    userEmail: 'kavita.m@gmail.com',
    rating: 5,
    comment: 'The scent reminds me of Badrinath temple during morning prayers. Truly zero black soot!',
    date: '2026-10-22',
    status: 'Approved',
  },
  {
    id: 2,
    productName: 'Sandalwood Dhoop Cones',
    productId: 7,
    userName: 'Ramesh K.',
    userEmail: 'ramesh.k@gmail.com',
    rating: 5,
    comment: 'The complimentary ceramic stand is so thoughtful and the fragrance lasts for hours.',
    date: '2026-10-23',
    status: 'Approved',
  },
  {
    id: 3,
    productName: 'Royal Oudh Sacred Sticks',
    productId: 3,
    userName: 'Sneha Patel',
    userEmail: 'sneha.p@yahoo.com',
    rating: 4,
    comment: 'Very deep and meditative aroma. Great for evening puja.',
    date: '2026-10-25',
    status: 'Pending',
  },
  {
    id: 4,
    productName: 'Lavender Serenity Cones',
    productId: 8,
    userName: 'Anonymous Bot',
    userEmail: 'spam@botmail.xyz',
    rating: 1,
    comment: 'Check out cheap discounts at someurl.com',
    date: '2026-10-26',
    status: 'Rejected',
  },
];

const INITIAL_COUPONS: AdminCoupon[] = [
  {
    id: 1,
    code: 'SACRED50',
    type: 'flat',
    value: 50,
    minOrder: 299,
    expiresAt: '2026-12-31',
    usageLimit: 500,
    usageCount: 84,
    isActive: true,
  },
  {
    id: 2,
    code: 'FESTIVE10',
    type: 'percentage',
    value: 10,
    minOrder: 499,
    expiresAt: '2026-11-15',
    usageLimit: 200,
    usageCount: 42,
    isActive: true,
  },
  {
    id: 3,
    code: 'DIWALI100',
    type: 'flat',
    value: 100,
    minOrder: 799,
    expiresAt: '2026-11-05',
    usageLimit: 100,
    usageCount: 99,
    isActive: false,
  },
];

const INITIAL_MESSAGES: AdminMessage[] = [
  {
    id: 1,
    name: 'Anand R.',
    email: 'anand.r@corporate.in',
    phone: '+91 98765 00112',
    subject: 'Corporate / Festive Gifting',
    message: 'We are planning 200 Diwali hampers for our employees. Could you share bulk customization pricing?',
    date: '2026-10-26 14:30',
    status: 'Unread',
  },
  {
    id: 2,
    name: 'Sunita Joshi',
    email: 'sunita.j@gmail.com',
    phone: '+91 94222 33445',
    subject: 'Product Inquiry',
    message: 'Can the incense cones be used in air-conditioned meditation rooms without smoke detectors triggering?',
    date: '2026-10-25 10:15',
    status: 'Replied',
  },
];

const INITIAL_SETTINGS: AdminSettings = {
  shippingCharge: 49,
  freeShippingThreshold: 499,
  gstPercentage: 18,
  announcementText: 'Free shipping above Rs.499 | 100% Charcoal-Free Natural Incense',
  supportEmail: 'care@foxal.in',
  supportPhone: '+91 98765 43210',
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      products: INITIAL_ADMIN_PRODUCTS,
      categories: INITIAL_CATEGORIES,
      users: INITIAL_USERS,
      reviews: INITIAL_REVIEWS,
      coupons: INITIAL_COUPONS,
      messages: INITIAL_MESSAGES,
      settings: INITIAL_SETTINGS,

      // Products
      addProduct: (data) => {
        const nextId = Math.max(0, ...get().products.map((p) => p.id)) + 1;
        const newProduct: AdminProduct = {
          ...data,
          id: nextId,
          sku: data.sku || `FXL-${data.category.toUpperCase()}-${nextId.toString().padStart(3, '0')}`,
          stock_quantity: data.stock_quantity ?? 100,
          is_active: data.is_active ?? true,
        };

        set((state) => ({
          products: [newProduct, ...state.products],
        }));

        toast.success(`Product "${newProduct.name}" created!`, {
          description: 'It is now active and accessible on the storefront.',
        });

        return newProduct;
      },

      updateProduct: (id, data) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
        }));
        toast.success('Product updated successfully.');
      },

      deleteProduct: (id) => {
        const p = get().products.find((item) => item.id === id);
        set((state) => ({
          products: state.products.filter((item) => item.id !== id),
        }));
        toast.info(`Product "${p?.name || id}" removed.`);
      },

      bulkDeleteProducts: (ids) => {
        set((state) => ({
          products: state.products.filter((item) => !ids.includes(item.id)),
        }));
        toast.info(`${ids.length} products deleted.`);
      },

      toggleProductFeatured: (id) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, is_featured: !p.is_featured } : p
          ),
        }));
      },

      toggleProductActive: (id) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, is_active: !p.is_active } : p
          ),
        }));
      },

      // Categories
      addCategory: (data) => {
        const nextId = Math.max(0, ...get().categories.map((c) => c.id)) + 1;
        const newCat: AdminCategory = {
          ...data,
          id: nextId,
          productCount: 0,
        };
        set((state) => ({
          categories: [...state.categories, newCat],
        }));
        toast.success(`Category "${newCat.name}" added.`);
      },

      updateCategory: (id, data) => {
        set((state) => ({
          categories: state.categories.map((c) => (c.id === id ? { ...c, ...data } : c)),
        }));
        toast.success('Category updated.');
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));
        toast.info('Category deleted.');
      },

      // Users
      toggleUserStatus: (userId) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId
              ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' }
              : u
          ),
        }));
        toast.success('User status updated.');
      },

      // Reviews
      updateReviewStatus: (reviewId, status) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === reviewId ? { ...r, status } : r
          ),
        }));
        toast.success(`Review status set to ${status}.`);
      },

      deleteReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.filter((r) => r.id !== reviewId),
        }));
        toast.info('Review deleted.');
      },

      // Coupons
      addCoupon: (data) => {
        const nextId = Math.max(0, ...get().coupons.map((c) => c.id)) + 1;
        const newCoupon: AdminCoupon = {
          ...data,
          id: nextId,
          usageCount: 0,
        };
        set((state) => ({
          coupons: [newCoupon, ...state.coupons],
        }));
        toast.success(`Coupon code "${newCoupon.code}" created.`);
      },

      updateCoupon: (id, data) => {
        set((state) => ({
          coupons: state.coupons.map((c) => (c.id === id ? { ...c, ...data } : c)),
        }));
        toast.success('Coupon updated.');
      },

      deleteCoupon: (id) => {
        set((state) => ({
          coupons: state.coupons.filter((c) => c.id !== id),
        }));
        toast.info('Coupon deleted.');
      },

      toggleCouponActive: (id) => {
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === id ? { ...c, isActive: !c.isActive } : c
          ),
        }));
      },

      // Messages / Contacts
      addMessage: (data) => {
        const nextId = Date.now();
        const now = new Date();
        const dateStr =
          data.date ||
          now.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }) +
            ' ' +
            now.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            });

        const newMessage: AdminMessage = {
          id: nextId,
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          subject: data.subject || 'Website Inquiry',
          message: data.message,
          date: dateStr,
          status: data.status || 'Unread',
        };

        set((state) => ({
          messages: [newMessage, ...state.messages],
        }));

        return newMessage;
      },

      markMessageReplied: (id) => {
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === id ? { ...m, status: 'Replied' } : m
          ),
        }));
        toast.success('Marked as replied.');
      },

      toggleMessageStatus: (id) => {
        set((state) => ({
          messages: state.messages.map((m) =>
            m.id === id
              ? { ...m, status: m.status === 'Unread' ? 'Replied' : 'Unread' }
              : m
          ),
        }));
        toast.success('Status updated.');
      },

      deleteMessage: (id) => {
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        }));
        toast.info('Message deleted from contacts inbox.');
      },

      // Settings
      updateSettings: (data) => {
        set((state) => ({
          settings: { ...state.settings, ...data },
        }));
        toast.success('Admin settings updated successfully.');
      },
    }),
    {
      name: 'foxal-admin-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
