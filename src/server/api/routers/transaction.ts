import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TransactionService } from "@/server/features/transaction";
import { errorFilter } from "@/server/filters";
import { queryParams } from "@/server/validations";
import { z } from "zod";

export const transactionRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        params: queryParams,
      }),
    )
    .query(async ({ input }) => {
      const { params } = input;
      try {
        const transactions = await TransactionService.getAll(params);
        return transactions;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const transaction = await TransactionService.getById(id);
        return transaction;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
