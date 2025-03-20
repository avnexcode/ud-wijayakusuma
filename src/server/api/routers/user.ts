import { UserService } from "@/server/features/user/user.service";
import { errorFilter } from "@/server/filters";
import { queryParams } from "@/server/validations";
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getProfile: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    try {
      const profile = await UserService.getById(user?.id ?? "");
      return profile;
    } catch (error) {
      return errorFilter(error);
    }
  }),

  getAll: publicProcedure
    .input(z.object({ params: queryParams }))
    .query(async ({ input }) => {
      const { params } = input;
      try {
        const users = await UserService.getAll(params);
        return users;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        const user = await UserService.delete(id);
        return user;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
