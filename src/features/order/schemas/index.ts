import { Discount, OrderStatus } from "@prisma/client";
import { z } from "zod";

const orderStatus = Object.values(OrderStatus) as [
  OrderStatus,
  ...OrderStatus[],
];

const discount = Object.values(Discount) as [Discount, ...Discount[]];

export const createOrderFormSchema = z
  .object({
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

    discount: z.enum(discount).default("NONE"),

    totalDiscount: z
      .string()
      .refine((value) => value !== Discount.NONE || /^\d+$/.test(value), {
        message: "Total diskon hanya boleh berisi angka",
      })
      .optional(),

    sendingAt: z.coerce.date({
      errorMap: () => ({ message: "Format tanggal pengiriman tidak valid" }),
    }),

    customerId: z.string().min(1, { message: "Pelanggan tidak boleh kosong" }),

    productId: z.string().min(1, { message: "Produk tidak boleh kosong" }),
  })
  .superRefine((data, ctx) => {
    if (data.discount !== Discount.NONE && !data.totalDiscount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Total diskon harus diisi jika ada diskon",
        path: ["totalDiscount"],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Pilih total diskon yang sesuai",
        path: ["discount"],
      });
    }

    if (data.discount === Discount.NONE && data.totalDiscount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Total diskon harus kosong jika tidak ada diskon",
        path: ["totalDiscount"],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Hapus total diskon jika tidak memilih diskon",
        path: ["discount"],
      });
    }
  });

export const updateOrderFormSchema = createOrderFormSchema;
