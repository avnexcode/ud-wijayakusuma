import { type z } from "zod";
import type {
  createCategoryRequest,
  updateCategoryRequest,
} from "../validations";

export type CreateCategoryRequest = z.infer<typeof createCategoryRequest>;
export type UpdateCategoryRequest = z.infer<typeof updateCategoryRequest>;
