'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useOrderStore, ShippingAddress } from '@/store/useOrderStore';
import { useAuthStore } from '@/store/useAuthStore';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Banknote,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

type CheckoutStep = 'address' | 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscountAmount, getFinalTotal, clearCart } =
    useCartStore();
  const { currentAddress, setAddress, createOrder } = useOrderStore();
  const { user } = useAuthStore();

  const [step, setStep] = useState<CheckoutStep>('address');

  // Address form fields
  const [fullName, setFullName] = useState(
    currentAddress.fullName || user?.name || ''
  );
  const [phone, setPhone] = useState(
    currentAddress.phone || user?.phone || '+91 98765 43210'
  );
  const [street, setStreet] = useState(currentAddress.street || '');
  const [landmark, setLandmark] = useState(currentAddress.landmark || '');
  const [city, setCity] = useState(currentAddress.city || '');
  const [state, setState] = useState(currentAddress.state || 'Gujarat');
  const [pincode, setPincode] = useState(currentAddress.pincode || '');
  const [addressError, setAddressError] = useState<string | null>(null);

  // Shipping selection
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>(
    'standard'
  );

  // Payment selection
  const [paymentOption, setPaymentOption] = useState<
    'cod' | 'upi' | 'card'
  >('cod');

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shippingFee = shippingMethod === 'express' ? 49 : subtotal >= 499 ? 0 : 49;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
        <AnnouncementBar />
        <Header />
        <main className="flex-1 max-w-md mx-auto px-4 py-20 text-center">
          <h2 className="font-serif text-3xl font-bold text-[#0F0D0B] mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-[#7A5230] mb-6">
            Please add your favorite natural incense sticks or cones before proceeding to checkout.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="md">
              Return to Shop
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Address step validation
  const handleProceedToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setAddressError(null);

    if (!fullName.trim() || !phone.trim() || !street.trim() || !city.trim()) {
      setAddressError('Please fill in all required shipping address fields.');
      return;
    }

    // 6-digit Indian PIN code check
    if (!/^\d{6}$/.test(pincode.trim())) {
      setAddressError('Please enter a valid 6-digit Indian PIN code (e.g. 380009).');
      return;
    }

    const updatedAddress: ShippingAddress = {
      fullName,
      phone,
      street,
      landmark,
      city,
      state,
      pincode,
    };
    setAddress(updatedAddress);
    setStep('shipping');
  };

  // Place Order handler
  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);

    setTimeout(() => {
      const order = createOrder({
        items,
        subtotal,
        discount,
        shipping: shippingFee,
        total: grandTotal,
        address: {
          fullName,
          phone,
          street,
          landmark,
          city,
          state,
          pincode,
        },
        paymentMethod:
          paymentOption === 'cod'
            ? 'Cash on Delivery (COD)'
            : paymentOption === 'upi'
            ? 'UPI (GooglePay / PhonePe)'
            : 'Net Banking / Card',
        paymentStatus: paymentOption === 'cod' ? 'Pending COD' : 'Paid',
      });

      clearCart();
      setIsPlacingOrder(false);
      router.push(`/checkout/success?order_id=${order.id}`);
    }, 1200);
  };

  const stepsList = [
    { id: 'address', label: '1. Address', icon: <MapPin className="h-4 w-4" /> },
    { id: 'shipping', label: '2. Shipping', icon: <Truck className="h-4 w-4" /> },
    { id: 'payment', label: '3. Payment', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'review', label: '4. Review', icon: <CheckCircle2 className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Step Indicator Bar */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-2 text-center">
            {stepsList.map((s, idx) => {
              const isActive = step === s.id;
              const isPassed =
                (step === 'shipping' && idx === 0) ||
                (step === 'payment' && idx <= 1) ||
                (step === 'review' && idx <= 2);

              return (
                <div key={s.id} className="flex flex-col items-center">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition-all mb-1.5 ${
                      isActive
                        ? 'bg-[#0F0D0B] text-white shadow-md ring-4 ring-[#C8922A]/20'
                        : isPassed
                        ? 'bg-[#C8922A] text-white'
                        : 'bg-[#F6EFE4] text-[#AFA8A2] border border-[#E3D4BD]'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[11px] font-semibold hidden sm:inline ${
                      isActive ? 'text-[#0F0D0B]' : 'text-[#7A5230]'
                    }`}
                  >
                    {s.label.split('. ')[1]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols: Step Container */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3D4BD] shadow-sm">
            {/* STEP 1: ADDRESS */}
            {step === 'address' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F6EFE4] text-[#C8922A]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#0F0D0B]">
                      Delivery Address
                    </h2>
                    <p className="text-xs text-[#7A5230]">
                      Where should we dispatch your sacred fragrances?
                    </p>
                  </div>
                </div>

                {addressError && (
                  <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
                    {addressError}
                  </div>
                )}

                <form onSubmit={handleProceedToShipping} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name *"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Harsh Vora"
                    />
                    <Input
                      label="Mobile Number (for delivery SMS) *"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <Input
                    label="Flat, House no., Building, Company, Apartment *"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. 104 Shanti Niketan, Ashram Road"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Landmark (Optional)"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Gandhi Ashram"
                    />
                    <Input
                      label="City *"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Ahmedabad"
                    />
                    <Input
                      label="PIN Code (6 digits) *"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 380009"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A5230] mb-1.5">
                        State *
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full rounded-xl border border-[#E3D4BD] bg-white px-4 py-2.5 text-sm text-[#0F0D0B] focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                      >
                        {[
                          'Gujarat',
                          'Maharashtra',
                          'Delhi',
                          'Karnataka',
                          'Uttar Pradesh',
                          'West Bengal',
                          'Rajasthan',
                          'Tamil Nadu',
                          'Kerala',
                          'Punjab',
                          'Madhya Pradesh',
                          'Other State',
                        ].map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E3D4BD] flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      Continue to Shipping
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2: SHIPPING */}
            {step === 'shipping' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F6EFE4] text-[#C8922A]">
                    <Truck className="h-4 w-4" />
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#0F0D0B]">
                      Shipping Method
                    </h2>
                    <p className="text-xs text-[#7A5230]">
                      Select your preferred delivery speed across India
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-[#C8922A] bg-[#FBF5EA]/50 shadow-sm'
                        : 'border-[#E3D4BD] hover:border-[#C8922A]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="text-[#C8922A] focus:ring-[#C8922A]"
                      />
                      <div>
                        <span className="font-bold text-sm text-[#0F0D0B] block">
                          Standard Eco Delivery (3-5 Business Days)
                        </span>
                        <span className="text-xs text-[#7A5230]">
                          Dispatched via Delhivery / Bluedart with SMS tracking
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-[#354E3C]">
                      {subtotal >= 499 ? 'FREE' : '₹49'}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-[#C8922A] bg-[#FBF5EA]/50 shadow-sm'
                        : 'border-[#E3D4BD] hover:border-[#C8922A]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="text-[#C8922A] focus:ring-[#C8922A]"
                      />
                      <div>
                        <span className="font-bold text-sm text-[#0F0D0B] block flex items-center gap-2">
                          Priority Sacred Dispatch (2-3 Days Air Express)
                          <span className="text-[10px] bg-[#C8922A] text-white px-2 py-0.5 rounded-full font-bold">
                            Fast
                          </span>
                        </span>
                        <span className="text-xs text-[#7A5230]">
                          Handpicked &amp; packed within 6 hours with priority transit
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-[#0F0D0B]">₹49</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-[#E3D4BD] flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setStep('address')}
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                  >
                    Back to Address
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    onClick={() => setStep('payment')}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 'payment' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F6EFE4] text-[#C8922A]">
                    <CreditCard className="h-4 w-4" />
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#0F0D0B]">
                      Payment Method
                    </h2>
                    <p className="text-xs text-[#7A5230]">
                      100% Safe &amp; Encrypted checkout
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {/* Option 1: Cash on Delivery */}
                  <label
                    onClick={() => setPaymentOption('cod')}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentOption === 'cod'
                        ? 'border-[#C8922A] bg-[#FBF5EA]/50 shadow-sm'
                        : 'border-[#E3D4BD] hover:border-[#C8922A]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentOption === 'cod'}
                        onChange={() => setPaymentOption('cod')}
                        className="text-[#C8922A] focus:ring-[#C8922A]"
                      />
                      <div className="flex items-center gap-2.5">
                        <Banknote className="h-5 w-5 text-[#C8922A]" />
                        <div>
                          <span className="font-bold text-sm text-[#0F0D0B] block">
                            Cash on Delivery (Pay upon arrival)
                          </span>
                          <span className="text-xs text-[#7A5230]">
                            Pay via Cash or UPI QR to courier at your doorstep
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#354E3C] bg-[#EBF2ED] px-2 py-0.5 rounded border border-[#C7D9CD]">
                      No Extra Fee
                    </span>
                  </label>

                  {/* Option 2: UPI */}
                  <label
                    onClick={() => setPaymentOption('upi')}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentOption === 'upi'
                        ? 'border-[#C8922A] bg-[#FBF5EA]/50 shadow-sm'
                        : 'border-[#E3D4BD] hover:border-[#C8922A]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentOption === 'upi'}
                        onChange={() => setPaymentOption('upi')}
                        className="text-[#C8922A] focus:ring-[#C8922A]"
                      />
                      <div className="flex items-center gap-2.5">
                        <Smartphone className="h-5 w-5 text-[#C8922A]" />
                        <div>
                          <span className="font-bold text-sm text-[#0F0D0B] block">
                            Instant UPI Payment (GPay, PhonePe, Paytm)
                          </span>
                          <span className="text-xs text-[#7A5230]">
                            Fastest verification &amp; priority warehouse queuing
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Option 3: Net Banking / Cards */}
                  <label
                    onClick={() => setPaymentOption('card')}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentOption === 'card'
                        ? 'border-[#C8922A] bg-[#FBF5EA]/50 shadow-sm'
                        : 'border-[#E3D4BD] hover:border-[#C8922A]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentOption === 'card'}
                        onChange={() => setPaymentOption('card')}
                        className="text-[#C8922A] focus:ring-[#C8922A]"
                      />
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="h-5 w-5 text-[#C8922A]" />
                        <div>
                          <span className="font-bold text-sm text-[#0F0D0B] block">
                            Credit / Debit Cards &amp; Net Banking
                          </span>
                          <span className="text-xs text-[#7A5230]">
                            Visa, Mastercard, RuPay &amp; all major Indian banks
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t border-[#E3D4BD] flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setStep('shipping')}
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                  >
                    Back to Shipping
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    onClick={() => setStep('review')}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & PLACE ORDER */}
            {step === 'review' && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F6EFE4] text-[#C8922A]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#0F0D0B]">
                      Final Order Review
                    </h2>
                    <p className="text-xs text-[#7A5230]">
                      Please verify your address, shipping speed, and payment method
                    </p>
                  </div>
                </div>

                {/* Address Summary */}
                <div className="p-4 rounded-2xl bg-[#F6EFE4] border border-[#E3D4BD] mb-4 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-[#0F0D0B]">
                    <span>Dispatch Address:</span>
                    <button
                      onClick={() => setStep('address')}
                      className="text-[#C8922A] underline"
                    >
                      Change
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-[#0F0D0B]">{fullName}</p>
                  <p className="text-[#7A5230]">
                    {street}, {landmark ? `${landmark}, ` : ''}
                    {city}, {state} — {pincode}
                  </p>
                  <p className="text-[#7A5230]">Phone: {phone}</p>
                </div>

                {/* Payment & Shipping Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
                  <div className="p-4 rounded-2xl bg-[#F6EFE4] border border-[#E3D4BD]">
                    <span className="font-bold text-[#0F0D0B] block mb-1">
                      Payment Mode:
                    </span>
                    <span className="text-[#354E3C] font-semibold">
                      {paymentOption === 'cod'
                        ? 'Cash on Delivery (Pay at Doorstep)'
                        : paymentOption === 'upi'
                        ? 'Instant UPI'
                        : 'Cards / Net Banking'}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F6EFE4] border border-[#E3D4BD]">
                    <span className="font-bold text-[#0F0D0B] block mb-1">
                      Delivery Estimate:
                    </span>
                    <span className="text-[#0F0D0B] font-semibold">
                      {shippingMethod === 'express'
                        ? 'Priority Air (2-3 Business Days)'
                        : 'Standard Surface (3-5 Business Days)'}
                    </span>
                  </div>
                </div>

                {/* Items preview list */}
                <div className="space-y-3 mb-6 divide-y divide-[#E3D4BD]/60">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between pt-2 first:pt-0"
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
                            Qty: {quantity} × ₹{product.price}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-[#0F0D0B]">
                        ₹{product.price * quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E3D4BD] flex items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={() => setStep('payment')}
                    leftIcon={<ArrowLeft className="h-4 w-4" />}
                  >
                    Back to Payment
                  </Button>

                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    isLoading={isPlacingOrder}
                    onClick={handlePlaceOrder}
                    rightIcon={<Sparkles className="h-4 w-4" />}
                    className="font-bold px-8 shadow-lg shadow-[#C8922A]/20"
                  >
                    Place Sacred Order (₹{grandTotal})
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right 4 Cols: Sticky Order Summary */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#E3D4BD] shadow-sm sticky top-24 space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#0F0D0B] pb-3 border-b border-[#E3D4BD]">
              Cart Breakdown
            </h3>

            <div className="space-y-2.5 text-xs text-[#7A5230]">
              <div className="flex justify-between">
                <span>Items Subtotal ({items.length})</span>
                <span className="font-semibold text-[#0F0D0B]">₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#354E3C] font-semibold">
                  <span>Sacred Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-[#354E3C]">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E3D4BD] flex justify-between text-base font-bold text-[#0F0D0B]">
                <span>To Pay</span>
                <span className="text-2xl text-[#C8922A]">₹{grandTotal}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E3D4BD] space-y-2 text-[11px] text-[#7A5230]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#354E3C] shrink-0" />
                <span>100% Charcoal-Free · Safe Breathing Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#C8922A] shrink-0" />
                <span>Hand-packed in eco-friendly moisture boxes</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
