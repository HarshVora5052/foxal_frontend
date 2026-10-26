'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (values: ForgotFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      toast.success('Password reset link sent to ' + values.email);
    }, 800);
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter the email associated with your sacred account, and we will dispatch a secure reset link."
    >
      {isSent ? (
        <div className="text-center py-6 space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EBF2ED] text-[#4A6B53]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#0F0D0B]">
            Reset Link Dispatched
          </h3>
          <p className="text-xs text-[#7A5230] leading-relaxed">
            Please check your inbox. If an account matches that address, instructions
            to reset your password have been delivered.
          </p>
          <div className="pt-4">
            <Link href="/login">
              <Button variant="primary" size="md">
                Return to Sign In
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            errorMessage={errors.email?.message}
            {...register('email')}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="mt-6"
          >
            Dispatch Reset Link
          </Button>

          <div className="pt-4 border-t border-[#E3D4BD] text-center text-xs text-[#7A5230]">
            Remembered your credentials?{' '}
            <Link href="/login" className="font-bold text-[#C8922A] hover:underline">
              Sign In Instead
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
