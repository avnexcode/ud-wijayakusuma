import { OrderCategory, OrderStatus } from "@prisma/client";
import { z } from "zod";

const orderStatus = Object.values(OrderStatus) as [
  OrderStatus,
  ...OrderStatus[],
];

const orderCategory = Object.values(OrderCategory) as [
  OrderCategory,
  ...OrderCategory[],
];

export const createOrderFormSchema = z.object({
  label: z
    .string()
    .min(1, { message: "Label tidak boleh kosong" })
    .max(100, { message: "Label tidak boleh lebih dari 100 karakter" })
    .toLowerCase(),

  description: z
    .string()
    .max(255, { message: "Deskripsi tidak boleh lebih dari 255 karakter" })
    .optional(),

  total: z
    .string()
    .min(1, { message: "Total pesanan tidak boleh kosong" })
    .max(50, { message: "Total pesanan tidak boleh lebih dari 50 karakter" })
    .regex(/^\d+$/, { message: "Total pesanan hanya boleh berisi angka" }),

  status: z
    .enum(orderStatus, {
      errorMap: () => ({ message: "Status pesanan tidak valid" }),
    })
    .default("PENDING"),

  category: z
    .enum(orderCategory, {
      errorMap: () => ({ message: "Kategori pesanan tidak valid" }),
    })
    .default("WHOLESALE"),

  sending_at: z.coerce.date({
    errorMap: () => ({ message: "Format tanggal pengiriman tidak valid" }),
  }),

  customer_id: z.string().min(1, { message: "Pelanggan tidak boleh kosong" }),

  product_id: z.string().min(1, { message: "Produk tidak boleh kosong" }),
});
export const updateOrderFormSchema = createOrderFormSchema.partial();
