import { z } from "zod";

export const productQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  "price[gte]": z.coerce.number().optional(),
  "price[lte]": z.coerce.number().optional(),
  sort: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export type ProductQueryParamsDTO = z.infer<typeof productQuerySchema>;
