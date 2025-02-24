import { z } from "zod";

export const createCategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama kategori tidak boleh kosong" })
    .max(150, { message: "Nama kategori tidak boleh lebih dari 150 karakter" }),
  description: z
    .string()
    .max(255, { message: "Deskripsi tidak boleh lebih dari 255 karakter" })
    .optional(),
});
export const updateCategoryFormSchema = createCategoryFormSchema.partial();
