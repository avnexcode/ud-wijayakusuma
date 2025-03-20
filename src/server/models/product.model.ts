import { type z } from "zod";
import type {
  createProductRequest,
  updateProductRequest,
} from "../validations";

export type CreateProductRequest = z.infer<typeof createProductRequest>;
export type UpdateProductRequest = z.infer<typeof updateProductRequest>;
