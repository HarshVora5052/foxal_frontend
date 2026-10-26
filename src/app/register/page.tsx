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
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter';
import { useAuthStore } from '@/store/useAuthStore';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, ArrowRight } from 'lucide-react';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/account';

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { register: registerUser, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (values: RegisterFormValues) => {
    setFormError(null);
    const result = await registerUser(values);
    if (result.success) {
      router.push(redirectUrl);
    } else {
      setFormError(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Join the Sacred Family"
      subtitle="Create an account to enjoy express checkout, member rituals, and order tracking."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formError && (
          <div className="rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
            {formError}
          </div>
        )}

        <Input
          label="Full Name"
          placeholder="e.g. Meera Sharma"
          leftIcon={<UserIcon className="h-4 w-4" />}
          errorMessage={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          leftIcon={<Mail className="h-4 w-4" />}
          errorMessage={errors.email?.message}
          {...register('email')}
        />

        <div>
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 6 characters"
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
          <PasswordStrengthMeter password={passwordValue} />
        </div>

        <Input
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Repeat your password"
          leftIcon={<Lock className="h-4 w-4" />}
          errorMessage={errors.password_confirmation?.message}
          {...register('password_confirmation')}
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
          Create Account
        </Button>

        <div className="pt-4 border-t border-[#E3D4BD] text-center text-xs text-[#7A5230]">
          Already have an account?{' '}
          <Link
            href={`/login${
              redirectUrl !== '/account' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''
            }`}
            className="font-bold text-[#C8922A] hover:underline"
          >
            Sign In Here
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
