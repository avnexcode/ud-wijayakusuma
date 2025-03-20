import { type z } from "zod";
import type {
  createTransactionRequest,
  updateTransactionRequest,
} from "../validations";

export type CreateTransactionRequest = z.infer<typeof createTransactionRequest>;
export type UpdateTransactionRequest = z.infer<typeof updateTransactionRequest>;
