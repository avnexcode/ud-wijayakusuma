import { type z } from "zod";
import type {
  loginRequest,
  registerRequest,
} from "../validations/auth.validation";

export type RegisterRequest = z.infer<typeof registerRequest>;
export type LoginRequest = z.infer<typeof loginRequest>;
