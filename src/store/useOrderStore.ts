'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '@/store/useCartStore';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string; // e.g. FXL-2026-84920
  date: string;
  status: 'Confirmed' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  address: ShippingAddress;
  paymentMethod: 'Cash on Delivery (COD)' | 'UPI (GooglePay / PhonePe)' | 'Net Banking / Card';
  paymentStatus: 'Paid' | 'Pending COD';
  trackingNumber: string;
  estimatedDelivery: string;
}

interface OrderStore {
  orders: Order[];
  currentAddress: ShippingAddress;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'cod' | 'upi' | 'card';

  // Actions
  setAddress: (addr: Partial<ShippingAddress>) => void;
  setShippingMethod: (method: 'standard' | 'express') => void;
  setPaymentMethod: (method: 'cod' | 'upi' | 'card') => void;
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber' | 'estimatedDelivery'>) => Order;
  cancelOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const DEFAULT_ADDRESS: ShippingAddress = {
  fullName: 'Harsh Vora',
  phone: '+91 98765 43210',
  street: '104, Shanti Niketan Apts, Ashram Road',
  landmark: 'Near Gandhi Ashram',
  city: 'Ahmedabad',
  state: 'Gujarat',
  pincode: '380009',
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [
        // Seed order for account demonstration
        {
          id: 'FXL-2026-78412',
          date: '2026-10-24',
          status: 'Dispatched',
          items: [
            {
              product: {
                id: 1,
                slug: 'kasturi-incense-sticks-250g',
                name: 'Kasturi Premium Incense Sticks',
                subtitle: 'Mystical Musk & Rare Himalayan Herbs',
                category: 'sticks',
                category_name: 'Incense Sticks',
                variant_label: '250g (Approx. 130-140 Sticks)',
                mrp: 199,
                price: 149,
                discount_percent: 25,
                rating: 4.9,
                reviews_count: 184,
                in_stock: true,
                burn_time: '45 - 50 Minutes',
                fragrance_notes: [],
                ingredients: ['Temple Flowers', 'Natural Resin'],
                description: 'Pure charcoal-free kasturi incense sticks.',
                benefits: ['Calms mind', 'Zero black soot'],
                is_bestseller: true,
                is_featured: true,
                images: [
                  '/images/products/foxal-kasturi-premium-incense-sticks.jpg',
                ],
              },
              quantity: 2,
            },
            {
              product: {
                id: 7,
                slug: 'sandalwood-incense-cones-60pcs',
                name: 'Sandalwood Dhoop Cones',
                subtitle: 'Sacred Mysore Chandan with Ceramic Holder',
                category: 'cones',
                category_name: 'Incense Cones',
                variant_label: '60 Cones / Box + Free Holder',
                mrp: 199,
                price: 149,
                discount_percent: 25,
                rating: 4.9,
                reviews_count: 176,
                in_stock: true,
                burn_time: '',
                fragrance_notes: [],
                ingredients: ['Mysore Sandal Bark', 'Temple Flowers'],
                description: 'Compact, dense and fragrant.',
                benefits: ['PUJA & hawan', 'Ceramic burner plate included'],
                is_bestseller: true,
                is_featured: true,
                images: [
                  '/images/products/cones/foxal-sandalwood-natural-incense-cones.jpg',
                ],
              },
              quantity: 1,
            },
          ],
          subtotal: 447,
          discount: 50,
          shipping: 0,
          total: 397,
          address: DEFAULT_ADDRESS,
          paymentMethod: 'UPI (GooglePay / PhonePe)',
          paymentStatus: 'Paid',
          trackingNumber: 'DELHIVERY-FXL-9481920',
          estimatedDelivery: '29 Oct 2026',
        },
      ],
      currentAddress: DEFAULT_ADDRESS,
      shippingMethod: 'standard',
      paymentMethod: 'cod',

      setAddress: (addr) =>
        set((state) => ({
          currentAddress: { ...state.currentAddress, ...addr },
        })),

      setShippingMethod: (method) => set({ shippingMethod: method }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),

      createOrder: (orderData) => {
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const orderId = `FXL-2026-${randomNum}`;
        const trackingNum = `BLUEDART-FXL-${Math.floor(1000000 + Math.random() * 9000000)}`;

        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        const estimatedDelivery = deliveryDate.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });

        const newOrder: Order = {
          ...orderData,
          id: orderId,
          date: new Date().toISOString().split('T')[0],
          status: 'Confirmed',
          trackingNumber: trackingNum,
          estimatedDelivery,
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      cancelOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status: 'Cancelled' } : o
          ),
        }));
      },

      getOrderById: (orderId) => {
        return get().orders.find((o) => o.id === orderId);
      },
    }),
    {
      name: 'foxal-orders-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
