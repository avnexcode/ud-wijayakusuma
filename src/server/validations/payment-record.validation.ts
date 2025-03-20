import { z } from "zod";

export const createPaymentRecordRequest = z.object({
  amount: z.string().min(1),
  transactionId: z.string().min(1),
  noteImageUrl: z.string().base64(),
});

export const updatePaymentRecordRequest = createPaymentRecordRequest.partial();
