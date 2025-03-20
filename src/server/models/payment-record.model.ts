import { type z } from "zod";
import type {
  createPaymentRecordRequest,
  updatePaymentRecordRequest,
} from "../validations";

export type CreatePaymentRecordRequest = z.infer<
  typeof createPaymentRecordRequest
>;
export type UpdatePaymentRecordRequest = z.infer<
  typeof updatePaymentRecordRequest
>;
