import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { errorFilter } from "@/server/filters";
import { queryParams } from "@/server/validations";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const transactionRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        params: queryParams,
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { params } = input;
      const { page, limit, search, sort, order } = params;
      try {
        const skip = (page - 1) * limit;

        const totalCount = await db.transaction.count({
          ...(search && {
            where: {
              OR: [
                {
                  order: {
                    label: { contains: search, mode: "insensitive" },
                  },
                },
              ],
            },
          }),
        });

        const transactions = await db.transaction.findMany({
          take: limit,
          skip,
          ...(search && {
            where: {
              OR: [
                {
                  order: {
                    label: { contains: search, mode: "insensitive" },
                  },
                },
              ],
            },
          }),
          orderBy: {
            order: {
              [sort]: order,
            },
          },
          include: {
            order: {
              select: {
                label: true,
              },
            },
          },
        });

        const lastPage = Math.ceil(totalCount / limit);

        return {
          data: transactions,
          meta: {
            total: totalCount,
            limit,
            page,
            last_page: lastPage,
          },
        };
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { id } = input;
      try {
        const transaction = await db.transaction.findUnique({
          where: { id },
          include: {
            payment_records: true,
            order: {
              select: {
                label: true,
              },
            },
          },
        });

        if (!transaction) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Data transaksi dengan id : ${id} tidak ditemukan`,
          });
        }

        return transaction;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
