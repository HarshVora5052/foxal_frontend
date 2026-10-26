'use client';

import React, { useState, useMemo } from 'react';
import { useAdminStore, AdminUser } from '@/store/useAdminStore';
import { useOrderStore } from '@/store/useOrderStore';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Users,
  Search,
  FileSpreadsheet,
  Ban,
  CheckCircle2,
  Eye,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  ShieldCheck,
  ShieldAlert,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminUsersPage() {
  const { users, toggleUserStatus } = useAdminStore();
  const { orders } = useOrderStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Search & Filter
  const filteredUsers = useMemo(() => {
    let list = [...users];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.includes(q)
      );
    }

    if (selectedStatus !== 'all') {
      list = list.filter((u) => u.status === selectedStatus);
    }

    return list;
  }, [users, searchQuery, selectedStatus]);

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'User ID',
      'Name',
      'Email (Decrypted)',
      'Phone (Decrypted)',
      'Orders Count',
      'Total Spent (INR)',
      'Joined Date',
      'Account Status',
    ];

    const rows = filteredUsers.map((u) => [
      u.id,
      `"${u.name}"`,
      `"${u.email}"`,
      `"${u.phone}"`,
      u.ordersCount,
      u.totalSpent,
      `"${u.joinedDate}"`,
      `"${u.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `FOXAL_Registered_Devotees_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Decrypted devotees list exported as CSV spreadsheet.');
  };

  const handleToggleBlock = (u: AdminUser) => {
    const action = u.status === 'Active' ? 'block' : 'unblock';
    if (confirm(`Are you sure you wish to ${action} ${u.name}?`)) {
      toggleUserStatus(u.id);
      if (selectedUser && selectedUser.id === u.id) {
        setSelectedUser({
          ...selectedUser,
          status: selectedUser.status === 'Active' ? 'Blocked' : 'Active',
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3D4BD] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
            Devotee Registry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
            Registered Users ({users.length})
          </h1>
          <p className="text-xs text-[#7A5230] mt-1">
            Complete member records with secure decrypted phone, email, and order history.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={handleExportCSV}
          leftIcon={<FileSpreadsheet className="h-4 w-4 text-[#4A6B53]" />}
          className="shadow-sm border-[#C8922A]/40"
        >
          Export Users CSV
        </Button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E3D4BD] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A5230]" />
          <input
            type="text"
            placeholder="Search by devotee name, decrypted email, or mobile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#E3D4BD] bg-[#FAF7F2] pl-10 pr-4 py-2 text-xs text-[#0F0D0B] placeholder:text-[#AFA8A2] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-[#E3D4BD] bg-white px-3 py-2 text-xs font-semibold text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Blocked">Blocked Only</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-[#E3D4BD] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-[#E3D4BD] text-[#7A5230] font-semibold">
              <tr>
                <th className="p-4">Devotee Name</th>
                <th className="p-4">Email Address (Decrypted)</th>
                <th className="p-4">Mobile (Decrypted)</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Orders Count</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3D4BD]/60">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-[#7A5230]">
                    No registered devotees match your query.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-[#FAF7F2]/60 transition-colors cursor-pointer"
                    onClick={() => setSelectedUser(u)}
                  >
                    <td className="p-4 font-bold text-[#0F0D0B]">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-[#0F0D0B] text-[#DFB15B] flex items-center justify-center font-bold text-xs shrink-0">
                          {u.name[0].toUpperCase()}
                        </div>
                        <span>{u.name}</span>
                      </div>
                    </td>

                    <td className="p-4 text-[#0F0D0B] font-mono text-[11px]">
                      {u.email}
                    </td>

                    <td className="p-4 text-[#7A5230] font-mono text-[11px]">
                      {u.phone}
                    </td>

                    <td className="p-4 text-[#7A5230]">{u.joinedDate}</td>

                    <td className="p-4 font-semibold text-[#0F0D0B]">
                      {u.ordersCount} orders
                    </td>

                    <td className="p-4 font-bold text-[#C8922A]">
                      ₹{u.totalSpent}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.status === 'Active'
                            ? 'bg-[#EBF2ED] text-[#4A6B53] border border-[#C7D9CD]'
                            : 'bg-red-100 text-red-700 border border-red-200'
                        }`}
                      >
                        {u.status === 'Active' ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <Ban className="h-3 w-3" />
                        )}
                        <span>{u.status}</span>
                      </span>
                    </td>

                    <td
                      className="p-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="inline-flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedUser(u)}
                          leftIcon={<Eye className="h-3.5 w-3.5 text-[#C8922A]" />}
                        >
                          Profile
                        </Button>

                        <button
                          onClick={() => handleToggleBlock(u)}
                          className={`p-1.5 rounded-lg transition-colors text-xs font-semibold ${
                            u.status === 'Active'
                              ? 'text-red-600 hover:bg-red-50'
                              : 'text-emerald-700 hover:bg-emerald-50'
                          }`}
                          title={u.status === 'Active' ? 'Block User' : 'Unblock User'}
                        >
                          {u.status === 'Active' ? 'Block' : 'Unblock'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── USER PROFILE & ORDER HISTORY MODAL ── */}
      <Modal
        isOpen={Boolean(selectedUser)}
        onClose={() => setSelectedUser(null)}
        title={selectedUser ? `Devotee: ${selectedUser.name}` : 'User Profile'}
        description="Confidential member record with decrypted contact information and purchase history."
        maxWidth="lg"
      >
        {selectedUser && (
          <div className="space-y-6 text-xs">
            {/* Decrypted Contact Grid */}
            <div className="p-4 rounded-2xl bg-[#F6EFE4] border border-[#E3D4BD] space-y-2">
              <span className="font-bold uppercase tracking-wider text-[#7A5230] text-[10px] block">
                Decrypted Master Telemetry
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#E3D4BD]">
                  <Mail className="h-4 w-4 text-[#C8922A] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#7A5230] block">Email</span>
                    <strong className="text-[#0F0D0B] font-mono break-all">
                      {selectedUser.email}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#E3D4BD]">
                  <Phone className="h-4 w-4 text-[#4A6B53] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#7A5230] block">Mobile</span>
                    <strong className="text-[#0F0D0B] font-mono">
                      {selectedUser.phone}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#E3D4BD]">
                  <Calendar className="h-4 w-4 text-[#7A5230] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#7A5230] block">Member Since</span>
                    <strong className="text-[#0F0D0B]">
                      {selectedUser.joinedDate}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#E3D4BD]">
                  <ShoppingBag className="h-4 w-4 text-[#C8922A] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#7A5230] block">Lifetime Value</span>
                    <strong className="text-[#C8922A] font-bold text-sm">
                      ₹{selectedUser.totalSpent}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div>
              <span className="font-bold text-[#0F0D0B] text-xs block mb-3">
                Order History ({selectedUser.ordersCount} Total Dispatches)
              </span>

              <div className="space-y-2">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="p-3 rounded-xl bg-white border border-[#E3D4BD] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono font-bold text-[#0F0D0B] block">
                        {order.id}
                      </span>
                      <span className="text-[10px] text-[#7A5230]">
                        {order.date} · {order.items.length} items
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#0F0D0B] block">
                        ₹{order.total}
                      </span>
                      <span className="text-[10px] font-semibold text-[#4A6B53]">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#E3D4BD] flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleBlock(selectedUser)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors ${
                  selectedUser.status === 'Active'
                    ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {selectedUser.status === 'Active'
                  ? 'Block Member Account'
                  : 'Unblock Member Account'}
              </button>

              <Button
                variant="ghost"
                size="md"
                onClick={() => setSelectedUser(null)}
              >
                Close Profile
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
