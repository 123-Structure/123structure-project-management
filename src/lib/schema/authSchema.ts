import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().nullable(),
});

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
