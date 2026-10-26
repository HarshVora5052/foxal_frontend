'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/useAuthStore';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/account';

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { login, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    const result = await login(values);
    if (result.success) {
      router.push(redirectUrl);
    } else {
      setFormError(result.error || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to track orders, manage saved addresses, and access your sacred wishlist."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formError && (
          <div className="rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
            {formError}
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Mail className="h-4 w-4" />}
          errorMessage={errors.email?.message}
          {...register('email')}
        />

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#7A5230]">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-[#C8922A] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-[#AFA8A2]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#AFA8A2]" />
                  )}
                </button>
              }
              errorMessage={errors.password?.message}
              {...register('password')}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="mt-6"
        >
          Sign In to Account
        </Button>

        <div className="pt-4 border-t border-[#E3D4BD] text-center text-xs text-[#7A5230]">
          Don&apos;t have an account yet?{' '}
          <Link
            href={`/register${
              redirectUrl !== '/account' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''
            }`}
            className="font-bold text-[#C8922A] hover:underline"
          >
            Create Sacred Account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
