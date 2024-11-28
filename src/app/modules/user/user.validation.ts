import { z } from 'zod';
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

export default userValidation;
