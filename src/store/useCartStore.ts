'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/mock';
import api from '@/lib/api';
import { toast } from 'sonner';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  wishlist: number[];
  isCartOpen: boolean;
  quickViewProduct: Product | null;
  couponCode: string | null;
  couponDiscount: number;

  // Cart Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  // Coupon Actions
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Drawer & Modal Controls
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setQuickViewProduct: (product: Product | null) => void;

  // Wishlist Actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;

  // Server Sync
  syncWithServer: () => Promise<void>;

  // Derived helpers
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getFinalTotal: () => number;
  getSavings: () => number;
  getShippingFee: () => number;
  getFreeShippingThresholdRemaining: () => number;
}

const FREE_SHIPPING_THRESHOLD = 499;
const FLAT_SHIPPING_FEE = 49;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      isCartOpen: false,
      quickViewProduct: null,
      couponCode: null,
      couponDiscount: 0,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          let updatedItems: CartItem[];

          if (existingIndex > -1) {
            updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
          } else {
            updatedItems = [...state.items, { product, quantity }];
          }

          return { items: updatedItems, isCartOpen: true };
        });

        toast.success(`Added to sacred cart: ${product.name}`, {
          description: `${quantity} × ₹${product.price} (Saved ₹${
            (product.mrp - product.price) * quantity
          })`,
          duration: 2500,
        });

        // Trigger background sync
        get().syncWithServer().catch(() => {});
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
        toast.info('Item removed from cart');
        get().syncWithServer().catch(() => {});
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
        get().syncWithServer().catch(() => {});
      },

      clearCart: () =>
        set({ items: [], couponCode: null, couponDiscount: 0 }),

      applyCoupon: (code: string) => {
        const cleaned = code.trim().toUpperCase();
        if (cleaned === 'SACRED50') {
          set({ couponCode: cleaned, couponDiscount: 50 });
          toast.success('Coupon SACRED50 applied! ₹50 festive discount saved.');
          return true;
        } else if (cleaned === 'FESTIVE10') {
          const discount = Math.round(get().getSubtotal() * 0.1);
          set({ couponCode: cleaned, couponDiscount: discount });
          toast.success(`Coupon FESTIVE10 applied! ₹${discount} (10%) discount saved.`);
          return true;
        } else {
          toast.error('Invalid sacred coupon code. Try SACRED50.');
          return false;
        }
      },

      removeCoupon: () => {
        set({ couponCode: null, couponDiscount: 0 });
        toast.info('Coupon removed.');
      },

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),

      toggleWishlist: (product: Product) => {
        set((state) => {
          const exists = state.wishlist.includes(product.id);
          if (exists) {
            toast.info(`Removed from saved favorites: ${product.name}`);
            return { wishlist: state.wishlist.filter((id) => id !== product.id) };
          } else {
            toast.success(`Saved to sacred wishlist: ${product.name}`);
            return { wishlist: [...state.wishlist, product.id] };
          }
        });
      },

      isInWishlist: (productId: number) => {
        return get().wishlist.includes(productId);
      },

      syncWithServer: async () => {
        try {
          const itemsPayload = get().items.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
          }));
          await api.post('/cart/sync', { items: itemsPayload });
        } catch (_err) {
          // Offline or unauthenticated guest cart persists in localStorage
        }
      },

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
      },

      getDiscountAmount: () => {
        return get().couponDiscount;
      },

      getFinalTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },

      getSavings: () => {
        const productSavings = get().items.reduce(
          (acc, item) =>
            acc + (item.product.mrp - item.product.price) * item.quantity,
          0
        );
        return productSavings + get().couponDiscount;
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
        return FLAT_SHIPPING_FEE;
      },

      getFreeShippingThresholdRemaining: () => {
        const subtotal = get().getSubtotal();
        return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
      },
    }),
    {
      name: 'foxal-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        wishlist: state.wishlist,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
      }),
    }
  )
);
