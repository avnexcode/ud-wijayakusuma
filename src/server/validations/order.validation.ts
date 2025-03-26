import { Discount, OrderCategory, OrderStatus } from "@prisma/client";
import { z } from "zod";

const orderStatus = Object.values(OrderStatus) as [
  OrderStatus,
  ...OrderStatus[],
];

const orderCategory = Object.values(OrderCategory) as [
  OrderCategory,
  ...OrderCategory[],
];

const discount = Object.values(Discount) as [Discount, ...Discount[]];

const baseOrderSchema = z.object({
  label: z.string().min(1).max(100).toLowerCase(),
  description: z.string().optional(),
  total: z.string().min(1).max(50),
  status: z.enum(orderStatus).default("PENDING"),
  category: z.enum(orderCategory).default("WHOLESALE"),
  sendingAt: z.coerce.date(),
  discount: z.enum(discount).default("NONE"),
  totalDiscount: z
    .string()
    .refine((value) => value !== Discount.NONE || /^\d+$/.test(value), {
      message: "Total discount must contain only numbers",
    })
    .optional(),
  customerId: z.string().min(1),
  productId: z.string().min(1),
  transactionId: z.string().optional(),
});

export const createOrderRequest = baseOrderSchema.refine(
  (data) => {
    if (data.discount !== Discount.NONE && !data.totalDiscount) {
      return false;
    }
    return true;
  },
  {
    message: "If discount is provided, totalDiscount is required",
    path: ["totalDiscount"],
  },
);

export const updateOrderRequest = baseOrderSchema.partial();
