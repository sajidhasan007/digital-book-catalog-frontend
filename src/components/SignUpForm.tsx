'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit = (data: SignupFormInputs) => {
    console.log(data);
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div>
              <Label className="sr-only" htmlFor="email">
                Name
              </Label>
              <Input
                id="name"
                placeholder="e.g: Sajid hasan"
                type="text"
                autoCapitalize="none"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="e.g: Sajid hasan"
                type="text"
                autoCapitalize="none"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <Label className="sr-only" htmlFor="phoneNumber">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                placeholder="e.g: 01*******60"
                type="text"
                autoCapitalize="none"
                {...register('phoneNumber', {
                  required: 'Phone Number is required',
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <Label className="sr-only" htmlFor="address">
                Address
              </Label>
              <Input
                id="address"
                placeholder="e.g: Dhaka, Bangladesh"
                type="text"
                autoCapitalize="none"
                {...register('address', { required: 'Address is required' })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <Input
              id="password"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <Button>Create Account</Button>
        </div>
      </form>
    </div>
  );
}
