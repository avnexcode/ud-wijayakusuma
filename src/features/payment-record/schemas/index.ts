import { z } from "zod";

export const createPaymentRecordFormSchema = z.object({
  amount: z
    .string()
    .min(1, { message: "Jumlah pembayaran tidak boleh kosong" })
    .regex(/^\d+$/, { message: "Jumlah pembayaran hanya boleh berisi angka" }),
  note_image_url: z.instanceof(File).nullable(),
});
export const updatePaymentRecordFormSchema =
  createPaymentRecordFormSchema.partial();
