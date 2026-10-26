'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useOrderStore, Order } from '@/store/useOrderStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Drawer } from '@/components/ui/Drawer';
import {
  Search,
  Download,
  Printer,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Eye,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminOrdersPage() {
  const { orders } = useOrderStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeDrawerOrder, setActiveDrawerOrder] = useState<Order | null>(null);

  // Status & tracking edit state in drawer
  const [drawerStatus, setDrawerStatus] = useState<Order['status']>('Confirmed');
  const [drawerTracking, setDrawerTracking] = useState('');

  const handleOpenDetail = (order: Order) => {
    setActiveDrawerOrder(order);
    setDrawerStatus(order.status);
    setDrawerTracking(order.trackingNumber || '');
  };

  const handleUpdateOrderStatus = () => {
    if (!activeDrawerOrder) return;

    useOrderStore.setState((state) => ({
      orders: state.orders.map((o) =>
        o.id === activeDrawerOrder.id
          ? {
              ...o,
              status: drawerStatus,
              trackingNumber: drawerTracking.trim() || o.trackingNumber,
            }
          : o
      ),
    }));

    setActiveDrawerOrder((prev) =>
      prev
        ? {
            ...prev,
            status: drawerStatus,
            trackingNumber: drawerTracking.trim() || prev.trackingNumber,
          }
        : null
    );

    toast.success(`Order ${activeDrawerOrder.id} updated!`, {
      description: `Status: ${drawerStatus} · Tracking: ${drawerTracking}`,
    });
  };

  const handlePrintInvoice = () => {
    toast.success('Preparing tax invoice print dialog...');
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'Order ID',
      'Date',
      'Customer Name',
      'Phone',
      'City',
      'State',
      'Pincode',
      'Items Count',
      'Total Amount',
      'Payment Method',
      'Payment Status',
      'Order Status',
      'Tracking Number',
    ];

    const rows = filteredOrders.map((o) => [
      `"${o.id}"`,
      `"${o.date}"`,
      `"${o.address.fullName}"`,
      `"${o.address.phone}"`,
      `"${o.address.city}"`,
      `"${o.address.state}"`,
      `"${o.address.pincode}"`,
      o.items.length,
      o.total,
      `"${o.paymentMethod}"`,
      `"${o.paymentStatus}"`,
      `"${o.status}"`,
      `"${o.trackingNumber || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FOXAL_Orders_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Orders CSV dispatched and downloaded successfully.');
  };

  const filteredOrders = useMemo(() => {
    let list = [...orders];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.address.fullName.toLowerCase().includes(q) ||
          o.address.phone.includes(q) ||
          o.address.city.toLowerCase().includes(q)
      );
    }

    if (selectedStatus !== 'all') {
      list = list.filter((o) => o.status === selectedStatus);
    }

    return list;
  }, [orders, searchQuery, selectedStatus]);

  const statusTabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    {
      id: 'Confirmed',
      label: 'Confirmed',
      count: orders.filter((o) => o.status === 'Confirmed').length,
    },
    {
      id: 'Dispatched',
      label: 'Dispatched',
      count: orders.filter((o) => o.status === 'Dispatched').length,
    },
    {
      id: 'Delivered',
      label: 'Delivered',
      count: orders.filter((o) => o.status === 'Delivered').length,
    },
    {
      id: 'Cancelled',
      label: 'Cancelled',
      count: orders.filter((o) => o.status === 'Cancelled').length,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3D4BD] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
            Fulfillment Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
            Orders &amp; Consignments ({orders.length})
          </h1>
          <p className="text-xs text-[#7A5230] mt-1">
            Dispatch sacred parcels across India with real-time courier tracking updates.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={handleExportCSV}
          leftIcon={<FileSpreadsheet className="h-4 w-4 text-[#4A6B53]" />}
          className="shadow-sm border-[#C8922A]/40"
        >
          Export CSV Spreadsheet
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {statusTabs.map((tab) => {
          const isActive = selectedStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold shrink-0 transition-all ${
                isActive
                  ? 'bg-[#0F0D0B] text-white shadow-sm'
                  : 'bg-white text-[#7A5230] border border-[#E3D4BD] hover:bg-[#F6EFE4]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive
                    ? 'bg-[#C8922A] text-white'
                    : 'bg-[#F6EFE4] text-[#7A5230]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E3D4BD] shadow-sm flex items-center gap-3">
        <Search className="h-4 w-4 text-[#7A5230]" />
        <input
          type="text"
          placeholder="Filter orders by ID (FXL-2026-...), customer name, mobile, or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs text-[#0F0D0B] placeholder:text-[#AFA8A2] focus:outline-none"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-[#AFA8A2]">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#E3D4BD] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-[#E3D4BD] text-[#7A5230] font-semibold">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Devotee Name</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3D4BD]/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-[#7A5230]">
                    No consignments found for this filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#FAF7F2]/60 transition-colors cursor-pointer"
                    onClick={() => handleOpenDetail(order)}
                  >
                    <td className="p-4 font-mono font-bold text-[#0F0D0B]">
                      {order.id}
                    </td>
                    <td className="p-4 text-[#7A5230]">{order.date}</td>
                    <td className="p-4 font-semibold text-[#0F0D0B]">
                      {order.address.fullName}
                    </td>
                    <td className="p-4 text-[#7A5230]">
                      {order.address.city}, {order.address.state}
                    </td>
                    <td className="p-4 text-[#7A5230]">
                      {order.items.length} {order.items.length === 1 ? 'pack' : 'packs'}
                    </td>
                    <td className="p-4 font-bold text-[#0F0D0B]">
                      ₹{order.total}
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-semibold text-[#354E3C] bg-[#EBF2ED] px-2 py-0.5 rounded border border-[#C7D9CD]">
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status === 'Cancelled'
                            ? 'bg-red-100 text-red-700'
                            : order.status === 'Dispatched'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-[#FAF0DC] text-[#C8922A]'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDetail(order)}
                        leftIcon={<Eye className="h-3.5 w-3.5 text-[#C8922A]" />}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ORDER DETAIL SLIDE-IN DRAWER ── */}
      <Drawer
        isOpen={Boolean(activeDrawerOrder)}
        onClose={() => setActiveDrawerOrder(null)}
        title={activeDrawerOrder ? `Consignment ${activeDrawerOrder.id}` : 'Order Detail'}
        subtitle={activeDrawerOrder ? `Placed on ${activeDrawerOrder.date}` : ''}
        maxWidth="lg"
      >
        {activeDrawerOrder && (
          <div className="space-y-6 text-xs">
            {/* Quick Actions (Print Invoice) */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E3D4BD]">
              <span className="font-bold text-[#0F0D0B] text-sm">
                Consignment Telemetry
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrintInvoice}
                leftIcon={<Printer className="h-3.5 w-3.5 text-[#C8922A]" />}
              >
                Print Tax Invoice
              </Button>
            </div>

            {/* Status Change & Tracking updater */}
            <div className="p-4 rounded-2xl bg-[#F6EFE4] border border-[#E3D4BD] space-y-3">
              <span className="font-bold uppercase tracking-wider text-[#7A5230] text-[10px] block">
                Fulfillment Controls
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#0F0D0B] mb-1">
                    Order Status
                  </label>
                  <select
                    value={drawerStatus}
                    onChange={(e) =>
                      setDrawerStatus(e.target.value as Order['status'])
                    }
                    className="w-full rounded-xl border border-[#E3D4BD] bg-white px-3 py-2 text-xs font-semibold text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing / Hand-Rolling</option>
                    <option value="Dispatched">Dispatched from Hub</option>
                    <option value="Delivered">Delivered to Devotee</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#0F0D0B] mb-1">
                    Courier Tracking AWB
                  </label>
                  <input
                    type="text"
                    value={drawerTracking}
                    onChange={(e) => setDrawerTracking(e.target.value)}
                    placeholder="e.g. DELHIVERY-FXL-94819"
                    className="w-full rounded-xl border border-[#E3D4BD] bg-white px-3 py-2 text-xs font-mono text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={handleUpdateOrderStatus}
              >
                Save Consignment Updates
              </Button>
            </div>

            {/* Devotee Shipping Address */}
            <div className="p-4 rounded-2xl bg-white border border-[#E3D4BD] space-y-1">
              <span className="font-bold text-[#0F0D0B] text-xs block mb-1">
                Dispatch Destination:
              </span>
              <p className="font-bold text-sm text-[#0F0D0B]">
                {activeDrawerOrder.address.fullName}
              </p>
              <p className="text-[#7A5230]">
                {activeDrawerOrder.address.street}
                {activeDrawerOrder.address.landmark
                  ? `, ${activeDrawerOrder.address.landmark}`
                  : ''}
              </p>
              <p className="text-[#7A5230]">
                {activeDrawerOrder.address.city}, {activeDrawerOrder.address.state} —{' '}
                {activeDrawerOrder.address.pincode}
              </p>
              <p className="text-[#7A5230] pt-1">
                Mobile: <strong>{activeDrawerOrder.address.phone}</strong>
              </p>
            </div>

            {/* Items in this Order */}
            <div>
              <span className="font-bold text-[#0F0D0B] text-xs block mb-3">
                Consignment Items ({activeDrawerOrder.items.length})
              </span>
              <div className="space-y-2.5 divide-y divide-[#E3D4BD]/60">
                {activeDrawerOrder.items.map(({ product, quantity }) => (
                  <div key={product.id} className="pt-2 first:pt-0 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-[#E3D4BD] bg-white shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-serif text-sm font-bold text-[#0F0D0B] block">
                          {product.name}
                        </span>
                        <span className="text-[10px] text-[#7A5230]">
                          Qty: {quantity} × ₹{product.price} ({product.variant_label})
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-[#0F0D0B]">
                      ₹{product.price * quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD] space-y-2">
              <div className="flex justify-between text-[#7A5230]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#0F0D0B]">
                  ₹{activeDrawerOrder.subtotal}
                </span>
              </div>
              {activeDrawerOrder.discount > 0 && (
                <div className="flex justify-between text-[#354E3C] font-semibold">
                  <span>Festive Discount</span>
                  <span>-₹{activeDrawerOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#7A5230]">
                <span>Shipping Fee</span>
                <span>
                  {activeDrawerOrder.shipping === 0
                    ? 'FREE'
                    : `₹${activeDrawerOrder.shipping}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E3D4BD] flex justify-between font-bold text-[#0F0D0B] text-sm">
                <span>Grand Total</span>
                <span className="text-base text-[#C8922A]">
                  ₹{activeDrawerOrder.total}
                </span>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
