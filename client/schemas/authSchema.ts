import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().trim().min(1, "FullName is required"),
  email: z.email("Please enter a valid email"),
  password: z.string().trim().min(8, "Password must be atleast 8 characters"),
});


export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().trim().min(8, "Password must be atleast 8 characters"),
});



export type RegisterFormDTO = z.infer<typeof registerSchema>;
export type LoginFormDTO = z.infer<typeof loginSchema>;