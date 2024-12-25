import { z } from 'zod';
import { UserStatus } from './user.constant';
const userValidation = z.object({
  id: z.string().optional(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' }),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z.enum(['admin', 'student', 'faculty']).optional(),
  status: z.enum(['in-progress', 'blocked']).optional(),
  isDeleted: z.boolean().optional().default(false),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
export const UserValidation = {
  userValidation,
  changeStatusValidationSchema,
};