import { z } from "zod";

export const createPaymentRecordRequest = z.object({
  amount: z.string().min(1),
  transaction_id: z.string().min(1),
  note_image_url: z.string().base64(),
});

export const updatePaymentRecordRequest = createPaymentRecordRequest.partial();
