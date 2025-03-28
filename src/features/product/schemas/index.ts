import { OrderCategory } from "@prisma/client";
import { z } from "zod";

const orderCategory = Object.values(OrderCategory) as [
  OrderCategory,
  ...OrderCategory[],
];

export const createProductFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama produk tidak boleh kosong" })
    .max(150, { message: "Nama produk tidak boleh lebih dari 150 karakter" }),
  price: z
    .string()
    .min(1, { message: "Harga tidak boleh kosong" })
    .max(50, { message: "Harga tidak boleh lebih dari 50 karakter" })
    .regex(/^\d+$/, { message: "Harga produk hanya boleh berisi angka" }),
  description: z
    .string()
    .max(255, { message: "Deskripsi tidak boleh lebih dari 255 karakter" })
    .optional(),
  categoryId: z.string().min(1, { message: "Kategori tidak boleh kosong" }),
  orderCategory: z
    .enum(orderCategory, {
      errorMap: () => ({ message: "Kategori pesanan tidak valid" }),
    })
    .default("WHOLESALE"),
});

export const updateProductFormSchema = createProductFormSchema.partial();
