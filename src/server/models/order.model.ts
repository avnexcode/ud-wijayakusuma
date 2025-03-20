import { type z } from "zod";
import type { createOrderRequest, updateOrderRequest } from "../validations";

export type CreateOrderRequest = z.infer<typeof createOrderRequest>;
export type UpdateOrderRequest = z.infer<typeof updateOrderRequest>;
