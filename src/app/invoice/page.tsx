'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useOrderStore, Order } from '@/store/useOrderStore';
import { numberToWords } from '@/lib/invoice';
import { Printer, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

function InvoiceContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const { orders, getOrderById } = useOrderStore();

  const order: Order = (orderId ? getOrderById(orderId) : orders[0]) || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white p-8 rounded-3xl border border-[#E3D4BD] shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#0F0D0B] mb-2">No Order Found</h2>
          <p className="text-xs text-[#7A5230] mb-6">We could not retrieve an invoice for the requested order ID.</p>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 bg-[#0F0D0B] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#C8922A] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Account
          </Link>
        </div>
      </div>
    );
  }

  const invoiceNo = `INV-${order.id.replace(/^FXL-/, '')}`;
  const totalInWords = numberToWords(order.total);
  const gstRate = 0.05;
  const taxableSubtotal = Math.round((order.subtotal / (1 + gstRate)) * 100) / 100;
  const totalGst = Math.round((order.subtotal - taxableSubtotal) * 100) / 100;
  const cgst = (totalGst / 2).toFixed(2);
  const sgst = (totalGst / 2).toFixed(2);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] p-4 sm:p-8 font-sans print:bg-white print:p-0">
      {/* Top Action Bar (hidden in print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F0D0B] text-white print:hidden shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs text-[#E3D4BD] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Account
          </Link>
          <span className="text-[#7A5230]">|</span>
          <span className="text-xs font-semibold text-[#DFB15B]">Tax Invoice: {order.id}</span>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 bg-[#C8922A] hover:bg-[#B68023] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <Printer className="h-4 w-4" /> Print / Save as PDF
        </button>
      </div>

      {/* Main A4 Invoice Container */}
      <div className="max-w-4xl mx-auto bg-white border border-[#E3D4BD] rounded-3xl p-6 sm:p-10 shadow-sm print:border-none print:shadow-none print:p-0 print:max-w-full">
        {/* Header: Company & Invoice Identity */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b-2 border-[#0F0D0B]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-36 shrink-0">
                <Image
                  src="/logo.png"
                  alt="FOXAL Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8922A] block">
                  Pure Herbal Incense
                </span>
                <span className="text-xs text-[#7A5230]">Temple Flower Formulation</span>
              </div>
            </div>

            <div className="text-xs text-[#7A5230] leading-relaxed max-w-sm">
              <strong className="text-[#0F0D0B] block text-sm">
                FOXAL Organics &amp; Aromatics Pvt. Ltd.
              </strong>
              Survey No. 42, GIDC Phase-2, Near Aji Dam,<br />
              Rajkot, Gujarat - 360003, India<br />
              <span><strong>Phone:</strong> +91 98765 43210</span> &nbsp;|&nbsp;{' '}
              <span><strong>Email:</strong> support@foxal.in</span><br />
              <span><strong>GSTIN:</strong> 24AAACF9821Q1Z4</span> &nbsp;|&nbsp;{' '}
              <span><strong>State Code:</strong> 24 (Gujarat)</span>
            </div>
          </div>

          <div className="w-full sm:w-auto text-left sm:text-right">
            <div className="inline-block p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD] text-left sm:text-right min-w-[240px]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8922A] block">
                TAX INVOICE
              </span>
              <span className="text-[10px] text-[#7A5230] block mb-3">
                Original for Recipient
              </span>

              <div className="text-xs space-y-1">
                <p>
                  <span className="text-[#7A5230]">Invoice No:</span>{' '}
                  <strong className="font-mono text-[#0F0D0B]">{invoiceNo}</strong>
                </p>
                <p>
                  <span className="text-[#7A5230]">Invoice Date:</span>{' '}
                  <strong className="text-[#0F0D0B]">{order.date}</strong>
                </p>
                <p>
                  <span className="text-[#7A5230]">Order ID:</span>{' '}
                  <strong className="font-mono text-[#0F0D0B]">{order.id}</strong>
                </p>
                <p className="pt-1">
                  <span className="text-[#7A5230]">Payment Status:</span>{' '}
                  <span className="font-bold text-[#4A6B53] bg-[#EBF2ED] px-2 py-0.5 rounded-full text-[11px]">
                    {order.paymentStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Billed To & Shipping Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD] text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8922A] block">
              Billed &amp; Shipped To:
            </span>
            <p className="font-bold text-sm text-[#0F0D0B]">{order.address.fullName}</p>
            <p className="text-[#7A5230] leading-relaxed">
              {order.address.street}
              {order.address.landmark ? `, ${order.address.landmark}` : ''}<br />
              {order.address.city}, {order.address.state} — <strong>{order.address.pincode}</strong>
            </p>
            <p className="text-[#7A5230]">
              <strong>Phone:</strong> {order.address.phone}
            </p>
          </div>

          <div className="space-y-1 sm:border-l sm:border-[#E3D4BD] sm:pl-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8922A] block">
              Dispatch &amp; Order Meta:
            </span>
            <p className="text-[#7A5230]">
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p className="text-[#7A5230]">
              <strong>Tracking Ref (AWB):</strong>{' '}
              <span className="font-mono font-bold text-[#0F0D0B]">
                {order.trackingNumber || `IND-FOX-${order.id.slice(-5)}`}
              </span>
            </p>
            <p className="text-[#7A5230]">
              <strong>Place of Supply:</strong> {order.address.state}
            </p>
            <p className="text-[#7A5230]">
              <strong>Estimated Delivery:</strong> {order.estimatedDelivery || '3-4 Business Days'}
            </p>
          </div>
        </div>

        {/* Structured Products Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F0D0B] text-white text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3 rounded-l-lg text-center w-12">#</th>
                <th className="py-2.5 px-3">Item Description</th>
                <th className="py-2.5 px-3 text-center">HSN Code</th>
                <th className="py-2.5 px-3 text-right">Unit Rate</th>
                <th className="py-2.5 px-3 text-center w-20">Quantity</th>
                <th className="py-2.5 px-3 rounded-r-lg text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3D4BD] text-xs">
              {order.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#FAF7F2]/50">
                  <td className="py-3 px-3 text-center text-[#7A5230] font-mono">{idx + 1}</td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#0F0D0B]">{item.product.name}</div>
                    <div className="text-[11px] text-[#7A5230]">
                      Variant: {item.product.variant_label || 'Standard Pack'} · 100% Charcoal-Free
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-[#7A5230]">33074100</td>
                  <td className="py-3 px-3 text-right font-semibold text-[#0F0D0B]">
                    ₹{item.product.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-sm text-[#0F0D0B]">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-[#0F0D0B]">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary & Amount in Words */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 mb-8">
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD] space-y-2 text-xs">
            <span className="font-bold text-[#0F0D0B] block">Amount Chargeable (in words):</span>
            <p className="italic font-semibold text-[#7A5230]">{totalInWords}</p>
            <div className="pt-2 text-[11px] text-[#4A6B53] flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-4 w-4" />
              Certified 100% Charcoal-Free &amp; Pure Temple Flowers
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-[#E3D4BD]/60">
              <span className="text-[#7A5230]">Taxable Value (Subtotal):</span>
              <span className="font-semibold text-[#0F0D0B]">₹{taxableSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E3D4BD]/60">
              <span className="text-[#7A5230]">CGST (2.5%):</span>
              <span className="text-[#0F0D0B]">₹{cgst}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E3D4BD]/60">
              <span className="text-[#7A5230]">SGST (2.5%):</span>
              <span className="text-[#0F0D0B]">₹{sgst}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between py-1 border-b border-[#E3D4BD]/60 text-[#4A6B53]">
                <span>Sacred Blessing Discount:</span>
                <span className="font-semibold">-₹{order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-1 border-b border-[#E3D4BD]/60">
              <span className="text-[#7A5230]">Shipping &amp; Packaging:</span>
              <span className="font-bold text-[#4A6B53]">
                {order.shipping === 0 ? 'FREE' : `₹${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between py-2.5 px-3 rounded-xl bg-[#F6EFE4] border-2 border-[#C8922A] text-sm font-bold text-[#0F0D0B]">
              <span>Grand Total:</span>
              <span className="text-[#C8922A] text-base">₹{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Declaration & Stamp */}
        <div className="pt-6 border-t border-[#E3D4BD] flex flex-col sm:flex-row justify-between items-end gap-6 text-xs text-[#7A5230]">
          <div className="space-y-1 max-w-md">
            <span className="font-bold text-[#0F0D0B] block">Terms &amp; Conditions:</span>
            <p>1. Goods covered under 7-day pure satisfaction guarantee.</p>
            <p>2. Keep products in a cool, dry place away from direct sunlight.</p>
            <p>3. This is a computer-generated tax invoice and requires no physical signature.</p>
          </div>

          <div className="text-center w-full sm:w-auto">
            <div className="inline-block p-3 rounded-xl bg-[#FAF7F2] border-2 border-dashed border-[#C8922A] mb-2">
              <span className="text-[10px] font-bold text-[#C8922A] uppercase tracking-wider block">
                FOXAL AROMATICS PVT LTD
              </span>
              <span className="text-[9px] font-bold text-[#4A6B53]">★ DIGITALLY VERIFIED ★</span>
            </div>
            <span className="block text-[11px] font-bold text-[#0F0D0B]">
              Authorized Signatory
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InvoicePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#7A5230]">Loading sacred tax invoice...</div>}>
      <InvoiceContent />
    </Suspense>
  );
}
