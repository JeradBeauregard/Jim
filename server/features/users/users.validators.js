import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(2).max(30),
  email: z.string().email(),
  passwordHash: z.string().min(1),     // later: password instead
  roles: z.array(z.string()).optional()
});

export const updateUserSchema = z.object({
  username: z.string().min(2).max(30).optional(),
  email: z.string().email().optional(),
  passwordHash: z.string().min(1).optional(),
  roles: z.array(z.string()).optional()
});