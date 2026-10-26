'use client';

import React, { useState } from 'react';
import { useAdminStore, AdminReview } from '@/store/useAdminStore';
import { Button } from '@/components/ui/Button';
import {
  Star,
  CheckCircle2,
  XCircle,
  Trash2,
  Filter,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminReviewsPage() {
  const { reviews, updateReviewStatus, deleteReview } = useAdminStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredReviews = reviews.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this customer review?')) {
      deleteReview(id);
    }
  };

  const pendingCount = reviews.filter((r) => r.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3D4BD] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
            Community Voice
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
            Reviews Moderation ({reviews.length})
          </h1>
          <p className="text-xs text-[#7A5230] mt-1">
            Audit testimonials, approve genuine spiritual experiences, and block spam.
          </p>
        </div>

        {pendingCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>{pendingCount} Pending Review(s)</span>
          </span>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'Pending', 'Approved', 'Rejected'].map((status) => {
          const isActive = filterStatus === status;
          const count =
            status === 'all'
              ? reviews.length
              : reviews.filter((r) => r.status === status).length;

          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold shrink-0 transition-all ${
                isActive
                  ? 'bg-[#0F0D0B] text-white shadow-sm'
                  : 'bg-white text-[#7A5230] border border-[#E3D4BD] hover:bg-[#F6EFE4]'
              }`}
            >
              <span>{status === 'all' ? 'All Reviews' : status}</span>
              <span
                className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive
                    ? 'bg-[#C8922A] text-white'
                    : 'bg-[#F6EFE4] text-[#7A5230]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.length === 0 ? (
          <div className="md:col-span-2 py-16 text-center bg-white rounded-3xl border border-[#E3D4BD] p-8">
            <p className="text-xs text-[#7A5230]">
              No customer reviews found matching &ldquo;{filterStatus}&rdquo;.
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl border border-[#E3D4BD] p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="font-serif text-sm font-bold text-[#0F0D0B] block">
                      {review.productName}
                    </span>
                    <span className="text-[11px] text-[#7A5230]">
                      by {review.userName} ({review.userEmail}) · {review.date}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      review.status === 'Approved'
                        ? 'bg-[#EBF2ED] text-[#4A6B53] border border-[#C7D9CD]'
                        : review.status === 'Rejected'
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {review.status}
                  </span>
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1 my-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-[#C8922A] text-[#C8922A]'
                          : 'text-[#E3D4BD]'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-[#0F0D0B] leading-relaxed italic bg-[#FAF7F2] p-3 rounded-2xl border border-[#E3D4BD]/60 mt-3">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Moderation Actions */}
              <div className="pt-4 border-t border-[#E3D4BD] mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {review.status !== 'Approved' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => updateReviewStatus(review.id, 'Approved')}
                      leftIcon={<CheckCircle2 className="h-3.5 w-3.5" />}
                      className="text-xs bg-[#4A6B53] hover:bg-[#354E3C]"
                    >
                      Approve
                    </Button>
                  )}

                  {review.status !== 'Rejected' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateReviewStatus(review.id, 'Rejected')}
                      leftIcon={<XCircle className="h-3.5 w-3.5 text-red-500" />}
                      className="text-xs border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Reject
                    </Button>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-2 text-[#AFA8A2] hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Delete Review"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
