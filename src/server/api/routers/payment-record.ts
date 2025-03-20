import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { PaymentRecordService } from "@/server/features/payment-record";
import { errorFilter } from "@/server/filters";
import {
  createPaymentRecordRequest,
  updatePaymentRecordRequest,
} from "@/server/validations";
import { z } from "zod";

export const paymentRecordRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const paymentRecord = await PaymentRecordService.getById(id);
        return paymentRecord;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  create: publicProcedure
    .input(z.object({ request: createPaymentRecordRequest }))
    .mutation(async ({ input }) => {
      const { request } = input;
      try {
        const paymentRecord = await PaymentRecordService.create(request);
        return paymentRecord;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        request: updatePaymentRecordRequest,
      }),
    )
    .mutation(async ({ input }) => {
      const { id, request } = input;
      try {
        const paymentRecord = await PaymentRecordService.update(id, request);
        return paymentRecord;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        const paymentRecord = await PaymentRecordService.delete(id);
        return paymentRecord;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
