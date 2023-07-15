'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import Cookies from 'js-cookie';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [signup, { data, isSuccess, isLoading }] = useLoginMutation();

  if (isSuccess) {
    Cookies.set('token', data?.data?.accessToken);
    Cookies.set('name', data?.data?.name);
    return <Navigate to="/" replace={true} />;
  }

  const onSubmit = (formData: LoginFormInputs) => {
    const data = {
      ...formData,
    };
    signup(data);
  };
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
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
              autoComplete="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <Button>{isLoading ? <Spin indicator={antIcon} /> : 'Login'}</Button>
        </div>
      </form>
    </div>
  );
}
