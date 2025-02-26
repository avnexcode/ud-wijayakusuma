import { z } from "zod";

const passwordSchema = z
  .string()
  .min(1, "Password tidak boleh kosong.")
  .min(8, "Password harus minimal 8 karakter.")
  .max(150, "Password tidak boleh lebih dari 150 karakter.")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "Password harus mengandung minimal satu huruf besar, satu huruf kecil, satu angka, dan satu karakter khusus.",
  });

const emailSchema = z
  .string()
  .email("Silakan masukkan alamat email yang valid.")
  .min(1, "Email tidak boleh kosong.")
  .max(150, "Email tidak boleh lebih dari 150 karakter..")
  .trim()
  .toLowerCase();

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nama tidak boleh kosong.")
      .max(100, "Nama tidak boleh lebih dari 100 karakter")
      .trim()
      .toLowerCase(),
    email: emailSchema,
    password: passwordSchema,
    confirm_password: z.string().min(1, "Silakan konfirmasi password Anda."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password tidak cocok.",
    path: ["confirm_password"],
  });

export const loginFormSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, "Password tidak boleh kosong.")
    .min(8, "Password harus minimal 8 karakter."),
});
