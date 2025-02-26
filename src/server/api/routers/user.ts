import { errorFilter } from "@/server/filters";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getProfile: privateProcedure.query(async ({ ctx }) => {
    try {
      const { db, user } = ctx;
      const profile = await db.user.findUnique({
        where: { id: user?.id },
        select: { email: true },
      });
      return profile;
    } catch (error) {
      return errorFilter(error);
    }
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
    } catch (error) {
      return errorFilter(error);
    }
  }),
});
