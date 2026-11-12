import { z } from "zod";

const httpsUrl = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .refine((val) => val.startsWith("https://"), {
    message: "URL must use https://",
  });

export const courseIdParamSchema = z.object({
  id: z.coerce.number().int().positive("Invalid course ID"),
});

export const courseListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const createCourseSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(5000),
  price: z.coerce.number().min(0, "Price cannot be negative").max(99999),
  thumbnailUrl: httpsUrl,
  instructorName: z.string().trim().max(120).nullable().optional(),
  duration: z.string().trim().max(60).nullable().optional(),
  discountPercent: z.coerce
    .number()
    .int()
    .min(0)
    .max(100)
    .nullable()
    .optional(),
});

export const updateCourseSchema = createCourseSchema.partial();
