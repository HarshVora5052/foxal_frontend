'use client';

import React, { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Settings,
  Truck,
  Percent,
  Megaphone,
  Mail,
  Phone,
  Save,
  RotateCcw,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useAdminStore();

  const [shippingCharge, setShippingCharge] = useState(settings.shippingCharge);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(
    settings.freeShippingThreshold
  );
  const [gstPercentage, setGstPercentage] = useState(settings.gstPercentage);
  const [announcementText, setAnnouncementText] = useState(
    settings.announcementText
  );
  const [supportEmail, setSupportEmail] = useState(settings.supportEmail);
  const [supportPhone, setSupportPhone] = useState(settings.supportPhone);

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (shippingCharge < 0 || freeShippingThreshold < 0 || gstPercentage < 0) {
      toast.error('Financial values cannot be negative.');
      return;
    }

    if (!announcementText.trim()) {
      toast.error('Announcement banner text cannot be empty.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      updateSettings({
        shippingCharge: Number(shippingCharge),
        freeShippingThreshold: Number(freeShippingThreshold),
        gstPercentage: Number(gstPercentage),
        announcementText: announcementText.trim(),
        supportEmail: supportEmail.trim(),
        supportPhone: supportPhone.trim(),
      });
      setIsLoading(false);
      toast.success('Storefront operational parameters updated successfully!');
    }, 600);
  };

  const handleResetDefaults = () => {
    if (confirm('Reset store parameters to sacred factory defaults?')) {
      setShippingCharge(49);
      setFreeShippingThreshold(499);
      setGstPercentage(18);
      setAnnouncementText('Free shipping above Rs.499 | 100% Charcoal-Free Natural Incense');
      setSupportEmail('care@foxal.in');
      setSupportPhone('+91 98765 43210');
      toast.info('Parameters restored to default values. Click Save to apply.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3D4BD] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8922A] block mb-1">
            Global Configuration
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F0D0B]">
            Storefront Settings
          </h1>
          <p className="text-xs text-[#7A5230] mt-1">
            Configure logistics thresholds, GST tax percentages, and the rotating top announcement banner.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleResetDefaults}
          leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
        >
          Reset Defaults
        </Button>
      </div>

      {/* Live Announcement Banner Preview */}
      <div className="bg-white p-5 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#7A5230]">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
            <Megaphone className="h-3.5 w-3.5 text-[#C8922A]" />
            Live Announcement Bar Preview
          </span>
          <span className="text-[10px] text-[#4A6B53] font-semibold">Active at top of all pages</span>
        </div>

        <div className="bg-[#0F0D0B] text-white py-2 px-4 rounded-xl text-center text-xs font-medium border border-[#C8922A]/40 flex items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[#DFB15B]" />
          <span>{announcementText || 'Your announcement banner will appear here...'}</span>
          <Sparkles className="h-3.5 w-3.5 text-[#DFB15B]" />
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: Logistics & Delivery Thresholds */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3D4BD]">
              <Truck className="h-5 w-5 text-[#C8922A]" />
              <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">
                Logistics &amp; Shipping Charges
              </h3>
            </div>

            <Input
              label="Standard Shipping Fee (₹)"
              type="number"
              required
              value={shippingCharge}
              onChange={(e) => setShippingCharge(Number(e.target.value))}
              helperText="Fee charged when order subtotal is below the free-shipping threshold."
            />

            <Input
              label="Free Shipping Cart Threshold (₹)"
              type="number"
              required
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
              helperText="Orders at or above this amount receive 100% Free Express Delivery."
            />
          </div>

          {/* Box 2: Tax & Taxation */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3D4BD]">
              <Percent className="h-5 w-5 text-[#4A6B53]" />
              <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">
                Taxation &amp; GST Compliance
              </h3>
            </div>

            <Input
              label="GST Percentage (%)"
              type="number"
              required
              value={gstPercentage}
              onChange={(e) => setGstPercentage(Number(e.target.value))}
              helperText="Applicable GST rate included in listed sale price (e.g. 18%)."
            />

            <div className="p-4 rounded-2xl bg-[#EBF2ED] text-xs text-[#354E3C] border border-[#C7D9CD] space-y-1">
              <span className="font-bold block">Automatic Compliance:</span>
              <p>
                All incense invoices generated in checkout and admin automatically calculate
                CGST (9%) + SGST (9%) or IGST (18%) according to Indian interstate tax laws.
              </p>
            </div>
          </div>

          {/* Box 3: Announcement Text */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3D4BD]">
              <Megaphone className="h-5 w-5 text-[#C8922A]" />
              <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">
                Announcement Bar Banner
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A5230] mb-1.5">
                Top Bar Notice Text *
              </label>
              <textarea
                required
                rows={3}
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="e.g. Free shipping above Rs.499 | 100% Natural Charcoal-Free Incense"
                className="w-full rounded-xl border border-[#E3D4BD] bg-white p-3 text-xs text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
              />
            </div>
          </div>

          {/* Box 4: Contact & Support Channels */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3D4BD] shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3D4BD]">
              <ShieldCheck className="h-5 w-5 text-[#4A6B53]" />
              <h3 className="font-serif text-lg font-bold text-[#0F0D0B]">
                Official Support Channels
              </h3>
            </div>

            <Input
              label="Support Email Address"
              type="email"
              required
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
            />

            <Input
              label="WhatsApp Support Helpline"
              required
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="bg-white p-4 rounded-3xl border border-[#E3D4BD] shadow-sm flex items-center justify-between">
          <span className="text-xs text-[#7A5230]">
            Modifications take effect immediately across all storefront sessions.
          </span>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            leftIcon={<Save className="h-4 w-4" />}
            className="shadow-sm font-bold px-8"
          >
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
