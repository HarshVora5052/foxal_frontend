'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Mail, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      toast.success('Welcome to the FOXAL Sacred Circle!', {
        description: 'Use coupon code SACRED50 at checkout for ₹50 off.',
      });
    }, 800);
  };

  return (
    <section className="py-20 sm:py-24 bg-[#0F0D0B] text-[#FAF7F2] relative overflow-hidden border-t border-[#C8922A]/20">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,146,42,0.15),transparent)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <Badge variant="gold" size="md" className="mb-4">
          Join the Sacred Circle
        </Badge>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Receive ₹50 Off Your First Order
        </h2>

        <p className="text-sm sm:text-base text-[#CFCAC6] max-w-xl mx-auto mb-8 font-sans">
          Subscribe for mindful Ayurvedic fragrance guides, festive temple drops, and
          exclusive subscriber rituals. Zero spam, only spiritual serenity.
        </p>

        {isSubscribed ? (
          <div className="inline-flex items-center gap-2 bg-[#1A1715] text-[#DFB15B] border border-[#C8922A]/40 px-6 py-4 rounded-2xl shadow-lg">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold">
              Thank you! Check your inbox for coupon code:{' '}
              <strong className="text-white">SACRED50</strong>
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
          >
            <div className="relative w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#7F7771]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full rounded-xl border border-[#C8922A]/30 bg-[#1A1715] px-12 py-3.5 text-sm text-[#FAF7F2] placeholder:text-[#7F7771] focus:outline-none focus:ring-2 focus:ring-[#C8922A] focus:border-transparent"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full sm:w-auto shrink-0 px-8 py-3.5 text-sm font-semibold tracking-wide"
            >
              Claim ₹50 Off
            </Button>
          </form>
        )}

        <p className="mt-4 text-[11px] text-[#7F7771]">
          We respect your sacred inbox. Unsubscribe anytime with 1 click.
        </p>
      </div>
    </section>
  );
};
