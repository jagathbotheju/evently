import { z } from "zod";

export const EventSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  location: z.string().min(1, "location is required"),
  image: z.string().min(1, "image is required"),
  startDate: z.date(),
  endDate: z.date(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string(),
  categoryId: z.string(),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "e-mail is required")
    .email("please enter valid email address"),
  password: z
    .string()
    .min(1, "password is required")
    .min(6, "password must be at least 6 characters"),
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, "name is required")
      .min(2, "name must be at least 2 characters")
      .max(45, "name must less than 45 characters"),
    email: z
      .string()
      .min(1, "e-mail is required")
      .email("please enter valid email address"),
    password: z
      .string()
      .min(1, "password is required")
      .min(6, "password must be at least 6 characters")
      .max(20, "password cannot exceed 20 characters"),
    confirmPassword: z
      .string()
      .min(1, "password is required")
      .min(6, "password must be at least 6 characters")
      .max(20, "password cannot exceed 20 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });
