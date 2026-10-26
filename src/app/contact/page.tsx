'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Send,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import api from '@/lib/api';
import { useAdminStore } from '@/store/useAdminStore';
import { toast } from 'sonner';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const addMessage = useAdminStore((s) => s.addMessage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write your comment or message.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Instantly persist to Admin Store (real-time admin panel sync)
      addMessage({
        name: name.trim() || 'Valued Devotee',
        email: email.trim(),
        phone: phone.trim(),
        subject: 'Public Contact Form',
        message: comment.trim(),
      });

      // 2. Also send to backend API if available
      try {
        await api.post('/contact', {
          name: name.trim() || 'Valued Devotee',
          email: email.trim(),
          phone: phone.trim(),
          subject: 'Public Contact Form',
          message: comment.trim(),
        });
      } catch (_backendErr) {
        // Handled gracefully via store persistence
      }

      setIsSuccess(true);
      toast.success('Your message has been received with reverence!', {
        description: 'Our customer care team will connect with you within 24 hours.',
      });

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setComment('');
    } catch (err) {
      toast.error('Something went wrong. Please try contacting us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact' },
          ]}
          className="mb-8"
        />

        {/* Heading Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-2">
            Always Here to Assist
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F0D0B]">
            Contact us
          </h1>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#C8922A]/40" />
          <p className="mt-4 text-xs sm:text-sm text-[#7A5230] leading-relaxed">
            Have queries regarding our natural temple flower agarbatti, custom gifting,
            bulk orders, or tracking an order? We would love to hear from you.
          </p>
        </div>

        {/* Form and Contact Information Section */}
        <div className="bg-white rounded-3xl border border-[#E3D4BD] p-6 sm:p-12 shadow-sm space-y-12">
          {/* Exact Form UI from design */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0F0D0B] mb-6">
              Drop Us a Message
            </h2>

            {isSuccess ? (
              <div className="text-center py-12 px-4 bg-[#FAF7F2] rounded-3xl border border-[#E3D4BD] space-y-4">
                <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0F0D0B]">
                  Thank You for Reaching Out
                </h3>
                <p className="text-xs sm:text-sm text-[#7A5230] max-w-md mx-auto leading-relaxed">
                  Your inquiry has been dispatched to our Ahmedabad customer care sanctuary.
                  A sacred representative will respond to your email or WhatsApp within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#0F0D0B] text-white text-xs font-semibold hover:bg-[#272320] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
                {/* Row 1: Name & Email * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="contact-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="w-full px-5 py-3.5 rounded-full border border-[#D5C9B8] bg-transparent text-sm text-[#0F0D0B] placeholder-[#7F7771] focus:outline-none focus:border-[#0F0D0B] focus:ring-1 focus:ring-[#0F0D0B] transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      id="contact-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email *"
                      className="w-full px-5 py-3.5 rounded-full border border-[#D5C9B8] bg-transparent text-sm text-[#0F0D0B] placeholder-[#7F7771] focus:outline-none focus:border-[#0F0D0B] focus:ring-1 focus:ring-[#0F0D0B] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Phone number */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    id="contact-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full px-5 py-3.5 rounded-full border border-[#D5C9B8] bg-transparent text-sm text-[#0F0D0B] placeholder-[#7F7771] focus:outline-none focus:border-[#0F0D0B] focus:ring-1 focus:ring-[#0F0D0B] transition-colors"
                  />
                </div>

                {/* Row 3: Comment */}
                <div>
                  <textarea
                    name="comment"
                    id="contact-comment"
                    required
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comment"
                    className="w-full p-5 rounded-3xl border border-[#D5C9B8] bg-transparent text-sm text-[#0F0D0B] placeholder-[#7F7771] focus:outline-none focus:border-[#0F0D0B] focus:ring-1 focus:ring-[#0F0D0B] transition-colors resize-y leading-relaxed"
                  />
                </div>

                {/* Button: Send */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-[#0F0D0B] text-white text-sm font-semibold tracking-wide hover:bg-[#272320] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F0D0B] transition-all disabled:opacity-70 shadow-sm"
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <hr className="border-[#E3D4BD]" />

          {/* Direct Support Channels */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-2">
              Direct Contact Channels
            </span>
            <h3 className="font-serif text-xl font-bold text-[#0F0D0B] mb-6">
              Get in Touch Directly
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* WhatsApp & Call */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD] space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#0F0D0B]">
                    WhatsApp &amp; Phone
                  </h4>
                  <p className="text-xs text-[#7A5230] mt-1">
                    Mon – Sat, 9:30 AM – 6:30 PM IST
                  </p>
                  <a
                    href="https://wa.me/919427410210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs font-bold text-emerald-700 hover:underline"
                  >
                    +91 942 741 0210 →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD] space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F6EFE4] text-[#C8922A]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#0F0D0B]">
                    Email Us
                  </h4>
                  <p className="text-xs text-[#7A5230] mt-1">
                    Customer &amp; Bulk Inquiries:
                  </p>
                  <a
                    href="mailto:login.foxal@gmail.com"
                    className="inline-block mt-2 text-xs font-bold text-[#C8922A] hover:underline"
                  >
                    login.foxal@gmail.com →
                  </a>
                </div>
              </div>

              {/* Registered Sanctuary */}
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E3D4BD] space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F6EFE4] text-[#7A5230]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#0F0D0B]">
                    Registered Office
                  </h4>
                  <p className="text-xs text-[#7A5230] mt-1 leading-relaxed">
                    01 Paras Row House, nr Krutika School, Madhav Mall, Thakkarnagar, Ahmedabad 382350, GJ, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
