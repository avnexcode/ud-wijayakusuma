import { registerRequest } from "@/server/validations";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { errorFilter } from "@/server/filters";
import { z } from "zod";
import { AuthService } from "@/server/features/auth";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ request: registerRequest }))
    .mutation(async ({ input }) => {
      const { request } = input;
      try {
        await AuthService.register(request);
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
