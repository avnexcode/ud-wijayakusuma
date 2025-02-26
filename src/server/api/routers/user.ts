import { supabaseAdminClient } from "@/lib/supabase/server";
import { errorFilter } from "@/server/filters";
import { queryParams } from "@/server/validations";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getProfile: privateProcedure.query(async ({ ctx }) => {
    const { db, user } = ctx;
    try {
      const profile = await db.user.findUnique({
        where: { id: user?.id },
        select: { email: true },
      });
      return profile;
    } catch (error) {
      return errorFilter(error);
    }
  }),

  getAll: publicProcedure
    .input(z.object({ params: queryParams }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { params } = input;
      const { page, limit, search, sort, order } = params;
      try {
        const skip = (page - 1) * limit;

        const totalCount = await db.user.count({
          ...(search && {
            where: {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
              ],
            },
          }),
        });

        const users = await db.user.findMany({
          take: limit,
          skip,
          ...(search && {
            where: {
              OR: [{ name: { contains: search, mode: "insensitive" } }],
            },
          }),
          orderBy: {
            [sort]: order,
          },
        });

        const lastPage = Math.ceil(totalCount / limit);

        return {
          data: users,
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

  delete: privateProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { id } = input;
      await db.$transaction(async (tx) => {
        try {
          const userExists = await tx.user.count({ where: { id } });
          if (userExists === 0) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Pengguna dengan ID : ${id} tidak ditemukan`,
            });
          }
          await supabaseAdminClient.auth.admin.deleteUser(id);
          await tx.user.delete({ where: { id } });
        } catch (error) {
          return errorFilter(error);
        }
      });
    }),
});
