'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useOrderStore } from '@/store/useOrderStore';
import { openInvoiceWindow } from '@/lib/invoice';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle2,
  Package,
  Truck,
  Sparkles,
  Download,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || 'FXL-2026-89421';

  const { getOrderById, orders } = useOrderStore();
  const order = getOrderById(orderId) || orders[0];

  const handleDownloadInvoice = () => {
    if (order) {
      toast.success('Opening sacred tax invoice...', {
        description: `Tax Invoice for ${order.id} generated.`,
      });
      openInvoiceWindow(order);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        {/* Celebration Header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#EBF2ED] text-[#4A6B53] border border-[#C7D9CD] shadow-sm animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
            Order Confirmed &amp; Consecrated
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F0D0B]">
            Thank You for Choosing Pure Aroma
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#7A5230] max-w-lg mx-auto">
            Your sacred order has been received. Our artisans in Gujarat will carefully
            hand-pack your charcoal-free incense sticks and cones.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E3D4BD] text-xs shadow-sm">
            <span className="text-[#7A5230]">Order Number:</span>
            <strong className="font-mono text-sm text-[#0F0D0B] tracking-wider">
              {order ? order.id : orderId}
            </strong>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="rounded-3xl bg-white border border-[#E3D4BD] p-6 sm:p-10 shadow-sm space-y-8">
          {/* Tracking Timeline */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#0F0D0B] mb-6 flex items-center gap-2">
              <Package className="h-5 w-5 text-[#C8922A]" />
              Order Status Journey
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: 'Order Confirmed', time: 'Today', done: true },
                { title: 'Hand-Rolled with Devotion', time: 'In Process', done: true },
                { title: 'Dispatched from Hub', time: 'Tomorrow', done: false },
                { title: 'Delivered to Doorstep', time: order?.estimatedDelivery || '3 Days', done: false },
              ].map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                      step.done
                        ? 'bg-[#0F0D0B] text-white shadow-sm'
                        : 'bg-[#F6EFE4] text-[#AFA8A2] border border-[#E3D4BD]'
                    }`}
                  >
                    {step.done ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                  </div>
                  <span className="text-xs font-bold text-[#0F0D0B] block leading-tight">
                    {step.title}
                  </span>
                  <span className="text-[10px] text-[#7A5230] mt-0.5">
                    {step.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E3D4BD] text-xs">
            <div className="p-4 rounded-2xl bg-[#F6EFE4] border border-[#E3D4BD] space-y-1">
              <span className="font-bold text-[#0F0D0B] block mb-1">
                Dispatch Address:
              </span>
              <p className="font-semibold text-[#0F0D0B]">
                {order?.address.fullName}
              </p>
              <p className="text-[#7A5230]">
                {order?.address.street}, {order?.address.landmark ? `${order.address.landmark}, ` : ''}
                {order?.address.city}, {order?.address.state} — {order?.address.pincode}
              </p>
              <p className="text-[#7A5230]">Phone: {order?.address.phone}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6EFE4] border border-[#E3D4BD] space-y-1">
              <span className="font-bold text-[#0F0D0B] block mb-1">
                Payment Details:
              </span>
              <p className="font-semibold text-[#354E3C]">
                Mode: {order?.paymentMethod}
              </p>
              <p className="text-[#7A5230]">
                Payment Status: <strong>{order?.paymentStatus}</strong>
              </p>
              <p className="text-[#7A5230]">
                Tracking Ref: <span className="font-mono">{order?.trackingNumber}</span>
              </p>
            </div>
          </div>

          {/* Purchased Items List */}
          {order && (
            <div className="pt-6 border-t border-[#E3D4BD]">
              <h4 className="font-serif text-base font-bold text-[#0F0D0B] mb-4">
                Items in This Dispatch:
              </h4>
              <div className="space-y-3">
                {order.items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between text-xs py-2 border-b border-[#E3D4BD]/40 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-[#E3D4BD] bg-white">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-[#0F0D0B] block">
                          {product.name}
                        </span>
                        <span className="text-[#7A5230]">
                          Qty: {quantity} · {product.variant_label}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-[#0F0D0B]">
                      ₹{product.price * quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between text-sm font-bold text-[#0F0D0B]">
                <span>Total Amount</span>
                <span className="text-xl text-[#C8922A]">₹{order.total}</span>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-6 border-t border-[#E3D4BD] flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              size="md"
              onClick={handleDownloadInvoice}
              leftIcon={<Download className="h-4 w-4" />}
            >
              Print / Download Invoice
            </Button>

            <Link href="/account">
              <Button variant="charcoal" size="md">
                View in My Account
              </Button>
            </Link>

            <Link href="/shop">
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
