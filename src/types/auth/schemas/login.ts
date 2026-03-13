import { z } from 'zod';

// Login with password
export const loginSchema = z.object({
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export type LoginInput = z.infer<typeof loginSchema>;
