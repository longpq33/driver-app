import { z } from 'zod';

// Register with password
export const registerSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
});

export type RegisterInput = z.infer<typeof registerSchema>;

// Register with OTP - Step 1: Send OTP (no OTP code required)
export const sendRegisterOtpSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
});

export type SendRegisterOtpInput = z.infer<typeof sendRegisterOtpSchema>;

// Register with OTP - Step 2: Verify OTP (includes OTP code)
export const registerWithOtpSchema = z.object({
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số'),
  otp: z.string().length(6, 'Mã OTP phải có 6 số'),
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
});

export type RegisterWithOtpInput = z.infer<typeof registerWithOtpSchema>;
