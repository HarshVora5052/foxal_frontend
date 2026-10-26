'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useAdminStore } from '@/store/useAdminStore';
import { useOrderStore } from '@/store/useOrderStore';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  IndianRupee,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

// Sales data for Recharts
const SALES_DATA = [
  { day: 'Mon', sales: 4200, orders: 28 },
  { day: 'Tue', sales: 5800, orders: 39 },
  { day: 'Wed', sales: 5100, orders: 34 },
  { day: 'Thu', sales: 7400, orders: 50 },
  { day: 'Fri', sales: 8900, orders: 60 },
  { day: 'Sat', sales: 11200, orders: 75 },
  { day: 'Sun', sales: 9800, orders: 66 },
];

export default function AdminDashboardPage() {
  const { products, users, reviews, messages } = useAdminStore();
  const { orders } = useOrderStore();

  const totalRevenue = useMemo(() => {
    return orders.reduce((acc, o) => acc + o.total, 52400);
  }, [orders]);

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => (p.stock_quantity ?? 100) < 50);
  }, [products]);

  const topProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.reviews_count - a.reviews_count)
      .slice(0, 4);
  }, [products]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3D4BD] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
            Executive Overview
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
            Sacred Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#7A5230] mt-1">
            Real-time telemetry, fragrance fulfillment status, and devotee interactions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 bg-[#C8922A] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#B57E1E] transition-all shadow-sm"
          >
            <Package className="h-4 w-4" />
            <span>Manage Products</span>
          </Link>
        </div>
      </div>

      {/* ── KPI CARDS GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-[#E3D4BD] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A5230]">
              Total Revenue
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EBF2ED] text-[#4A6B53]">
              <IndianRupee className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4">
            <span className="font-serif text-3xl font-bold text-[#0F0D0B] block">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] font-semibold text-[#4A6B53] flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +18.4% from last week
            </span>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="bg-white p-5 rounded-3xl border border-[#E3D4BD] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A5230]">
              Total Orders
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF0DC] text-[#C8922A]">
              <ShoppingBag className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4">
            <span className="font-serif text-3xl font-bold text-[#0F0D0B] block">
              {orders.length + 128}
            </span>
            <span className="text-[11px] font-semibold text-[#4A6B53] flex items-center gap-1 mt-1">
              <CheckCircle2 className="h-3 w-3" />
              100% On-time dispatch rate
            </span>
          </div>
        </div>

        {/* KPI 3: Active Products */}
        <div className="bg-white p-5 rounded-3xl border border-[#E3D4BD] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A5230]">
              Catalog Products
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6EFE4] text-[#0F0D0B]">
              <Package className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4">
            <span className="font-serif text-3xl font-bold text-[#0F0D0B] block">
              {products.length}
            </span>
            <span className="text-[11px] text-[#7A5230] mt-1 block">
              All 100% Charcoal-Free
            </span>
          </div>
        </div>

        {/* KPI 4: Registered Users */}
        <div className="bg-white p-5 rounded-3xl border border-[#E3D4BD] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A5230]">
              Registered Devotees
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6EFE4] text-[#7A5230]">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-4">
            <span className="font-serif text-3xl font-bold text-[#0F0D0B] block">
              {users.length + 420}
            </span>
            <span className="text-[11px] font-semibold text-[#C8922A] mt-1 block">
              Active Member Circle
            </span>
          </div>
        </div>
      </div>

      {/* ── SALES LINE CHART & TOP SELLERS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Sales Trend Area Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-[#E3D4BD] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#0F0D0B]">
                Sales &amp; Fulfillment Trajectory
              </h3>
              <p className="text-xs text-[#7A5230]">
                Daily revenue performance across all Indian pin codes.
              </p>
            </div>
            <span className="text-xs font-bold text-[#4A6B53] bg-[#EBF2ED] px-3 py-1 rounded-full border border-[#C7D9CD]">
              Weekly Gross: ₹52,400
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8922A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C8922A" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3D4BD" />
                <XAxis dataKey="day" tick={{ fill: '#7A5230', fontSize: 11 }} />
                <YAxis tick={{ fill: '#7A5230', fontSize: 11 }} tickFormatter={(val) => `₹${val}`} />
                <Tooltip
                  formatter={(val: any) => [`₹${val}`, 'Daily Revenue']}
                  contentStyle={{
                    backgroundColor: '#0F0D0B',
                    borderRadius: '12px',
                    color: '#FAF7F2',
                    border: '1px solid #C8922A',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#C8922A"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 4 Cols: Top Selling Fragrances */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3D4BD]">
            <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">
              Top Selling Fragrances
            </h3>
            <Sparkles className="h-4 w-4 text-[#C8922A]" />
          </div>

          <div className="space-y-3.5">
            {topProducts.map((p, idx) => (
              <div key={p.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0F0D0B] truncate max-w-[170px]">
                    {idx + 1}. {p.name}
                  </span>
                  <span className="font-bold text-[#C8922A]">
                    ₹{p.price} ({p.reviews_count} reviews)
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#F6EFE4] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C8922A] rounded-full"
                    style={{ width: `${Math.min(100, (p.reviews_count / 200) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/products"
              className="text-xs font-bold text-[#C8922A] hover:underline flex items-center justify-center gap-1 w-full text-center"
            >
              <span>View Full Inventory Analysis</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── RECENT ORDERS & LOW-STOCK ALERTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-[#E3D4BD] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-bold text-[#0F0D0B]">
              Recent Orders
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#C8922A] hover:underline"
            >
              See All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E3D4BD] text-[#7A5230] font-semibold">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3D4BD]/60">
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3 font-mono font-bold text-[#0F0D0B]">{o.id}</td>
                    <td className="py-3 text-[#0F0D0B] font-medium">{o.address.fullName}</td>
                    <td className="py-3 text-[#7A5230]">{o.items.length} items</td>
                    <td className="py-3 font-bold text-[#0F0D0B]">₹{o.total}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          o.status === 'Cancelled'
                            ? 'bg-red-100 text-red-700'
                            : o.status === 'Dispatched'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low-Stock Alerts & Action Items (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E3D4BD]">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">
              Warehouse Alerts
            </h3>
          </div>

          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-[#4A6B53] font-medium bg-[#EBF2ED] p-3 rounded-2xl border border-[#C7D9CD]">
                ✨ All 10 natural fragrances are fully stocked above optimal threshold (100+ units).
              </p>
            ) : (
              lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#0F0D0B] block">{p.name}</span>
                    <span className="text-[11px] text-amber-800">
                      Remaining: {p.stock_quantity} units
                    </span>
                  </div>
                  <Link
                    href="/admin/products"
                    className="text-xs font-bold text-[#C8922A] underline"
                  >
                    Restock
                  </Link>
                </div>
              ))
            )}

            <div className="p-4 rounded-2xl bg-[#F6EFE4] border border-[#E3D4BD] text-xs space-y-1">
              <span className="font-bold text-[#0F0D0B] block">Pending Reviews:</span>
              <p className="text-[#7A5230]">
                {reviews.filter((r) => r.status === 'Pending').length} review(s) await moderation.
              </p>
              <Link href="/admin/reviews" className="text-xs font-bold text-[#C8922A] underline block pt-1">
                Moderate Reviews →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
