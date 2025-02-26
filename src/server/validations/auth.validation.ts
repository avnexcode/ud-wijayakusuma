import { z } from "zod";

const passwordSchema = z
  .string()
  .min(1)
  .min(8)
  .max(150)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/);

const emailSchema = z.string().email().min(1).max(150).trim().toLowerCase();

export const registerRequest = z.object({
  name: z.string().min(1).max(100).trim().toLowerCase(),
  email: emailSchema,
  password: passwordSchema,
});

export const loginRequest = z.object({
  email: emailSchema,
  password: z.string().min(1).min(8),
});
