'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useOrderStore, Order } from '@/store/useOrderStore';
import { useCartStore } from '@/store/useCartStore';
import { PRODUCTS } from '@/lib/mock';
import { openInvoiceWindow } from '@/lib/invoice';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  User as UserIcon,
  Package,
  MapPin,
  Heart,
  Lock,
  LogOut,
  Download,
  Calendar,
  Truck,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  ShoppingBag,
} from 'lucide-react';
import { toast } from 'sonner';

type AccountTab = 'orders' | 'profile' | 'addresses' | 'wishlist' | 'security';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateProfile, changePassword } =
    useAuthStore();
  const { orders, cancelOrder } = useOrderStore();
  const { wishlist, addItem } = useCartStore();

  const [activeTab, setActiveTab] = useState<AccountTab>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Profile Form state
  const [name, setName] = useState(user?.name || 'Harsh Vora');
  const [email, setEmail] = useState(user?.email || 'harshvora2003@gmail.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Wishlist products
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ name, email, phone });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }
    await changePassword({
      current_password: currentPassword,
      new_password: newPassword,
    });
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Are you sure you wish to cancel this sacred order?')) {
      cancelOrder(orderId);
      toast.info(`Order ${orderId} has been cancelled.`);
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: 'Cancelled' });
      }
    }
  };

  const handleDownloadInvoice = (order: Order) => {
    toast.success(`Opening sacred tax invoice for ${order.id}...`);
    openInvoiceWindow(order);
  };

  const navItems = [
    { id: 'orders', label: 'My Orders', icon: <Package className="h-4 w-4" />, count: orders.length },
    { id: 'profile', label: 'Profile Details', icon: <UserIcon className="h-4 w-4" /> },
    { id: 'addresses', label: 'Delivery Address', icon: <MapPin className="h-4 w-4" /> },
    { id: 'wishlist', label: 'Saved Wishlist', icon: <Heart className="h-4 w-4" />, count: savedProducts.length },
    { id: 'security', label: 'Password & Security', icon: <Lock className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Account Banner */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F0D0B] via-[#1A1715] to-[#272320] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-[#C8922A]/30 shadow-card">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-[#DFB15B] shrink-0 bg-[#272320]">
              <Image
                src={user?.avatar || '/images/logo.png'}
                alt="Account Avatar"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#DFB15B] block">
                FOXAL Sacred Member
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {user?.name || name}
              </h1>
              <p className="text-xs text-[#AFA8A2] mt-0.5">{user?.email || email}</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await logout();
              router.push('/login');
            }}
            leftIcon={<LogOut className="h-4 w-4 text-[#DFB15B]" />}
            className="text-xs text-white border-white/30 hover:border-white self-start sm:self-auto"
          >
            Sign Out
          </Button>
        </div>

        {/* Account Hub Grid: Left Sidebar + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-4 bg-white p-4 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as AccountTab);
                    setSelectedOrder(null);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0F0D0B] text-white shadow-sm'
                      : 'text-[#7A5230] hover:bg-[#F6EFE4] hover:text-[#0F0D0B]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#DFB15B]' : 'text-[#C8922A]'}>
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                  {item.count !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-[#C8922A] text-white'
                          : 'bg-[#F6EFE4] text-[#7A5230]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Right Main Panel */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3D4BD] shadow-sm">
            {/* ── 1. MY ORDERS TAB ── */}
            {activeTab === 'orders' && (
              <div>
                {selectedOrder ? (
                  /* Single Order Detail View */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-[#E3D4BD]">
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="text-xs font-semibold text-[#C8922A] hover:underline"
                      >
                        ← Back to All Orders
                      </button>
                      <span className="font-mono text-xs font-bold text-[#0F0D0B]">
                        {selectedOrder.id}
                      </span>
                    </div>

                    {/* Timeline */}
                    <div className="p-4 rounded-2xl bg-[#F6EFE4] border border-[#E3D4BD]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#0F0D0B]">
                          Order Status:
                        </span>
                        <Badge
                          variant={
                            selectedOrder.status === 'Cancelled'
                              ? 'charcoal'
                              : 'gold'
                          }
                        >
                          {selectedOrder.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                        <div>
                          <span className="font-bold text-[#0F0D0B] block">
                            Confirmed
                          </span>
                          <span className="text-[10px] text-[#7A5230]">
                            {selectedOrder.date}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-[#0F0D0B] block">
                            Hand-Rolled
                          </span>
                          <span className="text-[10px] text-[#7A5230]">
                            In Workshop
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-[#0F0D0B] block">
                            Dispatched
                          </span>
                          <span className="text-[10px] text-[#7A5230]">
                            {selectedOrder.trackingNumber}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-[#0F0D0B] block">
                            Estimated
                          </span>
                          <span className="text-[10px] text-[#354E3C] font-semibold">
                            {selectedOrder.estimatedDelivery}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-3">
                      <h4 className="font-serif text-base font-bold text-[#0F0D0B]">
                        Items Purchased:
                      </h4>
                      {selectedOrder.items.map(({ product, quantity }) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 rounded-2xl border border-[#E3D4BD] bg-[#FAF7F2]"
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
                              <span className="font-serif text-sm font-bold text-[#0F0D0B] block">
                                {product.name}
                              </span>
                              <span className="text-[11px] text-[#7A5230]">
                                Qty: {quantity} · ₹{product.price} each
                              </span>
                            </div>
                          </div>
                          <span className="font-bold text-sm text-[#0F0D0B]">
                            ₹{product.price * quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total & Action Buttons */}
                    <div className="pt-4 border-t border-[#E3D4BD] flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-[#7A5230] block">
                          Total Amount Paid:
                        </span>
                        <span className="text-xl font-bold text-[#C8922A]">
                          ₹{selectedOrder.total}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(selectedOrder)}
                          leftIcon={<Download className="h-3.5 w-3.5" />}
                        >
                          Download Invoice
                        </Button>

                        {selectedOrder.status !== 'Cancelled' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancelOrder(selectedOrder.id)}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            Cancel Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Orders List */
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#0F0D0B] mb-1">
                      Order History
                    </h3>
                    <p className="text-xs text-[#7A5230] mb-6">
                      Track current shipments and view historical invoices.
                    </p>

                    {orders.length === 0 ? (
                      <p className="py-12 text-center text-xs text-[#7A5230]">
                        You haven&apos;t placed any orders yet.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((o) => (
                          <div
                            key={o.id}
                            className="p-5 rounded-2xl border border-[#E3D4BD] bg-[#FAF7F2] hover:border-[#C8922A]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-xs font-bold text-[#0F0D0B]">
                                  {o.id}
                                </span>
                                <Badge
                                  variant={
                                    o.status === 'Cancelled'
                                      ? 'charcoal'
                                      : 'gold'
                                  }
                                >
                                  {o.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-[#7A5230]">
                                {o.items.length} {o.items.length === 1 ? 'item' : 'items'} ·
                                Placed on {o.date}
                              </p>
                              <p className="text-xs text-[#354E3C] font-semibold mt-1">
                                Est. Delivery: {o.estimatedDelivery}
                              </p>
                            </div>

                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-0 border-[#E3D4BD]/60">
                              <span className="text-base font-bold text-[#0F0D0B]">
                                ₹{o.total}
                              </span>

                              <Button
                                variant="charcoal"
                                size="sm"
                                onClick={() => setSelectedOrder(o)}
                                leftIcon={<Eye className="h-3.5 w-3.5 text-[#DFB15B]" />}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── 2. PROFILE TAB ── */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0F0D0B] mb-1">
                  Profile Details
                </h3>
                <p className="text-xs text-[#7A5230] mb-6">
                  Manage your personal details and contact information.
                </p>

                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="md">
                      Save Profile Changes
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* ── 3. ADDRESSES TAB ── */}
            {activeTab === 'addresses' && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0F0D0B] mb-1">
                  Saved Delivery Address
                </h3>
                <p className="text-xs text-[#7A5230] mb-6">
                  Primary delivery destination for all incense dispatches.
                </p>

                <div className="p-5 rounded-2xl bg-[#F6EFE4] border border-[#E3D4BD] max-w-md space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8922A] block mb-1">
                    Primary Address
                  </span>
                  <p className="font-bold text-sm text-[#0F0D0B]">{name}</p>
                  <p className="text-xs text-[#7A5230]">
                    104, Shanti Niketan Apts, Ashram Road, Near Gandhi Ashram,
                    Ahmedabad, Gujarat — 380009
                  </p>
                  <p className="text-xs text-[#7A5230] pt-1">Contact: {phone}</p>
                </div>
              </div>
            )}

            {/* ── 4. WISHLIST TAB ── */}
            {activeTab === 'wishlist' && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0F0D0B] mb-1">
                  Saved Sacred Wishlist ({savedProducts.length})
                </h3>
                <p className="text-xs text-[#7A5230] mb-6">
                  Your handpicked spiritual favorites.
                </p>

                {savedProducts.length === 0 ? (
                  <p className="py-8 text-center text-xs text-[#7A5230]">
                    Your wishlist is currently empty.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {savedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-2xl border border-[#E3D4BD] bg-[#FAF7F2] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-14 rounded-xl overflow-hidden border border-[#E3D4BD] bg-white shrink-0">
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-serif text-sm font-bold text-[#0F0D0B] block">
                              {p.name}
                            </span>
                            <span className="text-xs font-bold text-[#C8922A]">
                              ₹{p.price}{' '}
                              <span className="line-through text-[10px] text-[#AFA8A2]">
                                ₹{p.mrp}
                              </span>
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => addItem(p, 1)}
                          leftIcon={<ShoppingBag className="h-3.5 w-3.5" />}
                          className="text-xs"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── 5. SECURITY TAB ── */}
            {activeTab === 'security' && (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0F0D0B] mb-1">
                  Password &amp; Security
                </h3>
                <p className="text-xs text-[#7A5230] mb-6">
                  Keep your account safe with a strong, updated password.
                </p>

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />

                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="md">
                      Change Password
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
