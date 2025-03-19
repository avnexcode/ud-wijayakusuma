import { type z } from "zod";
import type {
  createCustomerRequest,
  updateCustomerRequest,
} from "../validations";

export type CreateCustomerRequest = z.infer<typeof createCustomerRequest>;
export type UpdateCustomerRequest = z.infer<typeof updateCustomerRequest>;
