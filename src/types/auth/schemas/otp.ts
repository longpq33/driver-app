import { z } from 'zod';

// Send OTP
export const sendOtpSchema = z.object({
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số'),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;

// Verify OTP (Login/Register)
export const verifyOtpSchema = z.object({
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số'),
  otp: z.string().length(6, 'Mã OTP phải có 6 số'),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

// Login with OTP
export const loginWithOtpSchema = verifyOtpSchema;

export type LoginWithOtpInput = z.infer<typeof loginWithOtpSchema>;
