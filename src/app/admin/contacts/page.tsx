'use client';

import React, { useState, useMemo } from 'react';
import { useAdminStore, AdminMessage } from '@/store/useAdminStore';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import {
  Mail,
  CheckCircle2,
  Trash2,
  Phone,
  Calendar,
  User,
  MessageSquare,
  Search,
  ExternalLink,
  Download,
  Filter,
  Clock,
  Sparkles,
  Send,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminContactsPage() {
  const { messages, markMessageReplied, toggleMessageStatus, deleteMessage } =
    useAdminStore();
  const [filter, setFilter] = useState<'all' | 'Unread' | 'Replied'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMessage, setActiveMessage] = useState<AdminMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  // Search & Status Filter
  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesFilter = filter === 'all' || m.status === filter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.phone && m.phone.toLowerCase().includes(q)) ||
        (m.message && m.message.toLowerCase().includes(q)) ||
        (m.subject && m.subject.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [messages, filter, searchQuery]);

  const unreadCount = messages.filter((m) => m.status === 'Unread').length;
  const repliedCount = messages.filter((m) => m.status === 'Replied').length;

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Delete contact inquiry from "${name}"?`)) {
      deleteMessage(id);
      if (activeMessage && activeMessage.id === id) {
        setActiveMessage(null);
      }
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMessage) return;

    markMessageReplied(activeMessage.id);
    toast.success(`Reply recorded for ${activeMessage.name} (${activeMessage.email})`);
    setActiveMessage(null);
    setReplyText('');
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (messages.length === 0) {
      toast.error('No contact inquiries to export.');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Comment / Message', 'Date', 'Status'];
    const rows = messages.map((m) => [
      m.id,
      `"${(m.name || '').replace(/"/g, '""')}"`,
      `"${(m.email || '').replace(/"/g, '""')}"`,
      `"${(m.phone || '').replace(/"/g, '""')}"`,
      `"${(m.subject || '').replace(/"/g, '""')}"`,
      `"${(m.message || '').replace(/"/g, '""')}"`,
      `"${m.date || ''}"`,
      m.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `foxal-contacts-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Contacts CSV exported successfully!');
  };

  const cleanPhoneForWhatsApp = (phoneStr: string) => {
    return phoneStr.replace(/[^0-9]/g, '');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3D4BD] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
            Customer Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B] flex items-center gap-3">
            <span>Contacts &amp; Inquiries</span>
            <span className="text-sm font-sans font-semibold bg-[#0F0D0B] text-[#FAF7F2] px-3 py-0.5 rounded-full">
              {messages.length}
            </span>
          </h1>
          <p className="text-xs text-[#7A5230] mt-1">
            All messages, feedback, and customer queries dispatched via the public /contact form.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="rounded-full border-[#C8922A]/40 text-[#7A5230] hover:bg-[#F6EFE4]"
          >
            <Download className="h-3.5 w-3.5 mr-1.5 text-[#C8922A]" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E3D4BD] shadow-sm">
          <span className="text-xs font-medium text-[#7A5230] block">Total Contacts</span>
          <span className="font-serif text-2xl font-bold text-[#0F0D0B] mt-1 block">
            {messages.length}
          </span>
          <span className="text-[11px] text-[#AFA8A2] mt-1 block">Lifetime submissions</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3D4BD] shadow-sm">
          <span className="text-xs font-medium text-[#7A5230] block">Unread / Pending</span>
          <span className="font-serif text-2xl font-bold text-[#C8922A] mt-1 block">
            {unreadCount}
          </span>
          <span className="text-[11px] text-amber-700 mt-1 block">Requires staff attention</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3D4BD] shadow-sm">
          <span className="text-xs font-medium text-[#7A5230] block">Replied &amp; Resolved</span>
          <span className="font-serif text-2xl font-bold text-emerald-600 mt-1 block">
            {repliedCount}
          </span>
          <span className="text-[11px] text-emerald-700 mt-1 block">Satisfied devotees</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3D4BD] shadow-sm">
          <span className="text-xs font-medium text-[#7A5230] block">Avg Response Target</span>
          <span className="font-serif text-2xl font-bold text-[#0F0D0B] mt-1 block">
            &lt; 24 Hrs
          </span>
          <span className="text-[11px] text-[#AFA8A2] mt-1 block">Customer care SLA</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E3D4BD] shadow-sm">
        <div className="flex items-center gap-2">
          {(['all', 'Unread', 'Replied'] as const).map((st) => {
            const isActive = filter === st;
            const count =
              st === 'all'
                ? messages.length
                : st === 'Unread'
                ? unreadCount
                : repliedCount;

            return (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0F0D0B] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#7A5230] border border-[#E3D4BD] hover:bg-[#F6EFE4]'
                }`}
              >
                <span>{st === 'all' ? 'All Contacts' : st}</span>
                <span
                  className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive
                      ? 'bg-[#C8922A] text-white'
                      : 'bg-[#EADECB] text-[#7A5230]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A5230]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone, comment..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-[#E3D4BD] bg-[#FAF7F2] text-xs text-[#0F0D0B] placeholder-[#AFA8A2] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
          />
        </div>
      </div>

      {/* Inquiries List */}
      <div className="bg-white rounded-2xl border border-[#E3D4BD] shadow-sm overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-16 px-4">
            <MessageSquare className="h-12 w-12 text-[#C8922A]/40 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">
              No contact inquiries found
            </h3>
            <p className="text-xs text-[#7A5230] mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `No contact messages match "${searchQuery}". Try clearing the search.`
                : 'Customer queries submitted from /contact will appear here automatically.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E3D4BD]">
            {filteredMessages.map((msg) => {
              const isUnread = msg.status === 'Unread';
              const cleanPhone = cleanPhoneForWhatsApp(msg.phone || '');

              return (
                <div
                  key={msg.id}
                  className={`p-5 sm:p-6 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    isUnread ? 'bg-[#FDFBF7] hover:bg-[#F9F4EB]' : 'hover:bg-[#FAF7F2]'
                  }`}
                >
                  {/* Left: Devotee Avatar & Details */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div
                      className={`h-11 w-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${
                        isUnread
                          ? 'bg-[#0F0D0B] text-[#DFB15B] border-[#C8922A]'
                          : 'bg-[#F6EFE4] text-[#7A5230] border-[#E3D4BD]'
                      }`}
                    >
                      {msg.name ? msg.name[0].toUpperCase() : 'C'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-serif text-base font-bold text-[#0F0D0B] truncate">
                          {msg.name || 'Anonymous Customer'}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isUnread
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          {msg.status}
                        </span>
                        <span className="text-[11px] text-[#AFA8A2] flex items-center gap-1 ml-auto md:ml-0">
                          <Clock className="h-3 w-3" />
                          {msg.date}
                        </span>
                      </div>

                      {/* Contact metadata */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#7A5230] mb-2">
                        <span className="flex items-center gap-1 font-medium">
                          <Mail className="h-3.5 w-3.5 text-[#C8922A]" />
                          <a
                            href={`mailto:${msg.email}`}
                            className="hover:underline hover:text-[#C8922A]"
                          >
                            {msg.email}
                          </a>
                        </span>
                        {msg.phone && (
                          <span className="flex items-center gap-1 font-medium">
                            <Phone className="h-3.5 w-3.5 text-emerald-600" />
                            <a
                              href={`tel:${msg.phone}`}
                              className="hover:underline hover:text-[#0F0D0B]"
                            >
                              {msg.phone}
                            </a>
                          </span>
                        )}
                      </div>

                      {/* Comment preview */}
                      <p className="text-xs text-[#3E3834] bg-white/70 p-3 rounded-xl border border-[#E3D4BD]/80 line-clamp-2 leading-relaxed">
                        &ldquo;{msg.message}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    {/* WhatsApp CTA */}
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                          msg.name
                        )},%20thank%20you%20for%20contacting%20FOXAL!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    )}

                    {/* Email CTA */}
                    <a
                      href={`mailto:${msg.email}?subject=Regarding%20your%20inquiry%20to%20FOXAL`}
                      className="p-2 rounded-full bg-[#F6EFE4] text-[#C8922A] hover:bg-[#EADECB] border border-[#E3D4BD] transition-colors"
                      title="Send Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>

                    {/* View Details */}
                    <button
                      onClick={() => setActiveMessage(msg)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#0F0D0B] text-white hover:bg-[#272320] transition-colors"
                    >
                      View Inquiry
                    </button>

                    {/* Toggle Status */}
                    <button
                      onClick={() => toggleMessageStatus(msg.id)}
                      className={`p-2 rounded-full border transition-colors ${
                        isUnread
                          ? 'bg-white text-emerald-600 border-emerald-300 hover:bg-emerald-50'
                          : 'bg-white text-amber-600 border-amber-300 hover:bg-amber-50'
                      }`}
                      title={isUnread ? 'Mark as Replied' : 'Mark as Unread'}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(msg.id, msg.name)}
                      className="p-2 rounded-full text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details & Quick Reply Modal */}
      {activeMessage && (
        <Modal
          isOpen={true}
          onClose={() => setActiveMessage(null)}
          title="Customer Inquiry Details"
        >
          <div className="space-y-6 text-[#0F0D0B]">
            {/* Header info */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E3D4BD] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg font-bold text-[#0F0D0B]">
                  {activeMessage.name}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    activeMessage.status === 'Unread'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {activeMessage.status}
                </span>
              </div>
              <div className="text-xs text-[#7A5230] space-y-1">
                <p>
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${activeMessage.email}`}
                    className="text-[#C8922A] underline"
                  >
                    {activeMessage.email}
                  </a>
                </p>
                {activeMessage.phone && (
                  <p>
                    <strong>Phone / WhatsApp:</strong>{' '}
                    <a
                      href={`https://wa.me/${cleanPhoneForWhatsApp(activeMessage.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 underline"
                    >
                      {activeMessage.phone}
                    </a>
                  </p>
                )}
                <p>
                  <strong>Received:</strong> {activeMessage.date}
                </p>
              </div>
            </div>

            {/* Comment Message */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A5230] mb-2">
                Comment / Message
              </label>
              <div className="p-4 rounded-2xl bg-white border border-[#E3D4BD] text-xs text-[#3E3834] leading-relaxed whitespace-pre-wrap shadow-inner font-sans">
                {activeMessage.message}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E3D4BD]">
              <div className="flex items-center gap-2">
                {activeMessage.phone && (
                  <a
                    href={`https://wa.me/${cleanPhoneForWhatsApp(
                      activeMessage.phone
                    )}?text=Hello%20${encodeURIComponent(
                      activeMessage.name
                    )},%20we%20received%20your%20inquiry%20regarding%20FOXAL.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Reply on WhatsApp
                  </a>
                )}
                <a
                  href={`mailto:${activeMessage.email}?subject=Regarding%20your%20FOXAL%20inquiry`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#FAF7F2] text-[#0F0D0B] border border-[#E3D4BD] hover:bg-[#F6EFE4] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[#C8922A]" />
                  Reply via Email
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toggleMessageStatus(activeMessage.id);
                    setActiveMessage(null);
                  }}
                  className="rounded-full"
                >
                  {activeMessage.status === 'Unread'
                    ? 'Mark as Replied'
                    : 'Mark as Unread'}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveMessage(null)}
                  className="rounded-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
