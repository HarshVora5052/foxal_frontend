'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter';
import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const resetSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
  });

  const passwordValue = watch('password');

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Your sacred password has been updated!');
      router.push('/login');
    }, 800);
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Ensure your new password is at least 6 characters with good strength."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 6 characters"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
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
          label="Confirm New Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Repeat your new password"
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
          Update Password
        </Button>
      </form>
    </AuthLayout>
  );
}
