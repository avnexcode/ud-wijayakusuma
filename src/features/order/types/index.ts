import { type z } from "zod";
import type { createOrderFormSchema, updateOrderFormSchema } from "../schemas";
import type { Prisma } from "@prisma/client";

export type CreateOrderFormSchema = z.infer<typeof createOrderFormSchema>;
export type UpdateOrderFormSchema = z.infer<typeof updateOrderFormSchema>;

export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    customer: {
      select: {
        name: true;
        phone: true;
        email: true;
        address: true;
      };
    };
    product: {
      select: {
        name: true;
        orderCategory: true;
      };
    };
    transaction: {
      select: {
        totalAmount: true;
        amount: true;
      };
    };
  };
}>;

export type OrderWithAllRelations = Prisma.OrderGetPayload<{
  include: {
    customer: {
      select: {
        name: true;
        phone: true;
        email: true;
        address: true;
      };
    };
    product: {
      select: {
        name: true;
        orderCategory: true;
      };
    };
    transaction: {
      select: {
        amount: true;
        totalAmount: true;
        amountDue: true;
        amountPaid: true;
        status: true;
      };
    };
  };
}>;
