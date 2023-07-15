'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useSignupMutation } from '@/redux/features/auth/authApi';
import { Navigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();
  const [messageApi, contextHolder] = message.useMessage();

  const successMsg = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const errorMsg = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  const [signup, { data, isSuccess, isLoading }] = useSignupMutation();

  if (isSuccess) {
    Cookies.set('token', data?.data?.accessToken);
    return <Navigate to="/login" replace={true} />;
  }

  const onSubmit = (formData: SignupFormInputs) => {
    if (formData?.password !== formData?.confirmPassword) {
      errorMsg('Password and confirm password do not match');
      return;
    }
    const { confirmPassword, ...data } = formData;
    signup(data);
  };
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />
  );

  return (
    <>
      {contextHolder}
      <div className={cn('grid gap-6', className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <div>
                <Label className="sr-only" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
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
                  placeholder="Enter your phone number"
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
                  placeholder="Enter your address"
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
                placeholder="Enter your email"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p>{errors.email.message}</p>}
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p>{errors.password.message}</p>}
              <Input
                id="confirmPassword"
                placeholder="Confirm password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                })}
              />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button>
              {isLoading ? <Spin indicator={antIcon} /> : 'Create Account'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
