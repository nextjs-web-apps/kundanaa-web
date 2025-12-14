import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be atleast 6 characters long",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be atleast 6 characters long",
  }),
});

export const LoginSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be atlease 6 characters long",
  }),
});
