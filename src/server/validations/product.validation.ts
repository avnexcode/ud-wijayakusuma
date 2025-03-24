import { OrderCategory } from "@prisma/client";
import { z } from "zod";

const orderCategory = Object.values(OrderCategory) as [
  OrderCategory,
  ...OrderCategory[],
];

export const createProductRequest = z.object({
  name: z.string().min(1).max(150),
  price: z.string().min(1).max(50),
  description: z.string().optional(),
  categoryId: z.string(),
  orderCategory: z.enum(orderCategory).default("WHOLESALE"),
});

export const updateProductRequest = createProductRequest.partial();
