import { TransactionStatus } from "@prisma/client";
import { z } from "zod";

const transactionStatus = Object.values(TransactionStatus) as [
  TransactionStatus,
  ...TransactionStatus[],
];

export const createTransactionRequest = z.object({
  totalAmount: z.string().min(1),
  amount: z.string().min(1),
  amountDue: z.string().min(1),
  orderId: z.string().min(1),
});

export const updateTransactionRequest = createTransactionRequest
  .partial()
  .extend({
    amountPaid: z.string().min(1).default("0").optional(),
    status: z.enum(transactionStatus).default("UNPAID").optional(),
  });
