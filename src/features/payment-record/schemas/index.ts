import { z } from "zod";

export const createPaymentRecordFormSchema = z.object({
  amount: z
    .string()
    .min(1, { message: "Jumlah pembayaran tidak boleh kosong" }),
});
export const updatePaymentRecordFormSchema =
  createPaymentRecordFormSchema.partial();
