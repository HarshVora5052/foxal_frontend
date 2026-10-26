'use client';

import React, { useState } from 'react';
import { useAdminStore, AdminCoupon } from '@/store/useAdminStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Tag, Trash2, Edit, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCouponsPage() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon, toggleCouponActive } =
    useAdminStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<AdminCoupon | null>(null);

  const [code, setCode] = useState('');
  const [type, setType] = useState<'flat' | 'percentage'>('flat');
  const [value, setValue] = useState(50);
  const [minOrder, setMinOrder] = useState(299);
  const [expiresAt, setExpiresAt] = useState('2026-12-31');
  const [usageLimit, setUsageLimit] = useState(500);
  const [isActive, setIsActive] = useState(true);

  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setCode('');
    setType('flat');
    setValue(50);
    setMinOrder(299);
    setExpiresAt('2026-12-31');
    setUsageLimit(500);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: AdminCoupon) => {
    setEditingCoupon(c);
    setCode(c.code);
    setType(c.type);
    setValue(c.value);
    setMinOrder(c.minOrder);
    setExpiresAt(c.expiresAt);
    setUsageLimit(c.usageLimit);
    setIsActive(c.isActive);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error('Coupon code is required.');
      return;
    }

    const cleanCode = code.trim().toUpperCase();

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, {
        code: cleanCode,
        type,
        value: Number(value),
        minOrder: Number(minOrder),
        expiresAt,
        usageLimit: Number(usageLimit),
        isActive,
      });
    } else {
      addCoupon({
        code: cleanCode,
        type,
        value: Number(value),
        minOrder: Number(minOrder),
        expiresAt,
        usageLimit: Number(usageLimit),
        isActive,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number, couponCode: string) => {
    if (confirm(`Are you sure you want to delete coupon code "${couponCode}"?`)) {
      deleteCoupon(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3D4BD] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
            Promotional Engine
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
            Sacred Coupons &amp; Vouchers ({coupons.length})
          </h1>
          <p className="text-xs text-[#7A5230] mt-1">
            Manage discount vouchers tested across storefront checkout and cart drawer.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleOpenAdd}
          leftIcon={<Plus className="h-4 w-4" />}
          className="shadow-sm"
        >
          Create New Coupon
        </Button>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-[#E3D4BD] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-[#E3D4BD] text-[#7A5230] font-semibold">
              <tr>
                <th className="p-4">Coupon Code</th>
                <th className="p-4">Discount Value</th>
                <th className="p-4">Min. Cart Value</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Redemptions</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3D4BD]/60">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FAF0DC] text-[#C8922A]">
                        <Tag className="h-3.5 w-3.5" />
                      </span>
                      <strong className="font-mono text-xs text-[#0F0D0B] tracking-wider">
                        {coupon.code}
                      </strong>
                    </div>
                  </td>

                  <td className="p-4 font-bold text-[#0F0D0B]">
                    {coupon.type === 'flat' ? `₹${coupon.value} Flat Off` : `${coupon.value}% Off`}
                  </td>

                  <td className="p-4 text-[#7A5230]">₹{coupon.minOrder}</td>

                  <td className="p-4 text-[#7A5230]">{coupon.expiresAt}</td>

                  <td className="p-4 font-semibold text-[#0F0D0B]">
                    {coupon.usageCount} / {coupon.usageLimit}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleCouponActive(coupon.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                        coupon.isActive
                          ? 'bg-[#EBF2ED] text-[#4A6B53] border border-[#C7D9CD]'
                          : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
                      }`}
                    >
                      {coupon.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </td>

                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(coupon)}
                        className="p-1.5 text-[#7A5230] hover:text-[#0F0D0B]"
                        title="Edit Coupon"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(coupon.id, coupon.code)}
                        className="p-1.5 text-[#AFA8A2] hover:text-red-600"
                        title="Delete Coupon"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Coupon Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCoupon ? 'Edit Coupon Code' : 'Create Promotional Coupon'}
        description="Active coupon codes can be entered by customers on the Cart and Checkout pages."
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Coupon Code (Auto-Uppercase) *"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g. DIWALI50"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A5230] mb-1.5">
                Discount Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'flat' | 'percentage')}
                className="w-full rounded-xl border border-[#E3D4BD] bg-white px-3 py-2.5 text-xs text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
              >
                <option value="flat">Flat Discount (₹)</option>
                <option value="percentage">Percentage Discount (%)</option>
              </select>
            </div>

            <Input
              label={type === 'flat' ? 'Discount Amount (₹) *' : 'Discount Percent (%) *'}
              type="number"
              required
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Minimum Order Value (₹) *"
              type="number"
              required
              value={minOrder}
              onChange={(e) => setMinOrder(Number(e.target.value))}
            />

            <Input
              label="Expiry Date *"
              type="date"
              required
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
          </div>

          <Input
            label="Usage Limit *"
            type="number"
            required
            value={usageLimit}
            onChange={(e) => setUsageLimit(Number(e.target.value))}
          />

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F0D0B]">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded text-[#C8922A] focus:ring-[#C8922A]"
              />
              <span>Activate immediately for customer checkout</span>
            </label>
          </div>

          <div className="pt-4 border-t border-[#E3D4BD] flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editingCoupon ? 'Update Coupon' : 'Publish Coupon'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
