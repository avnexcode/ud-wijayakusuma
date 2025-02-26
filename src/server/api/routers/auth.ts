import { supabaseAdminClient } from "@/lib/supabase/server";
import { registerRequest } from "@/server/validations/auth.validation";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { errorFilter } from "@/server/filters";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerRequest)
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { name, email, password } = input;

      await db.$transaction(async (tx) => {
        let userId = "";

        try {
          console.log({ input });
          const { data, error } =
            await supabaseAdminClient.auth.admin.createUser({
              email,
              password,
              email_confirm: true,
            });

          if (data.user) userId = data.user?.id;

          if (error) throw error;

          await tx.user.create({
            data: {
              id: userId,
              email,
              name,
            },
          });
        } catch (error) {
          if (userId) {
            await supabaseAdminClient.auth.admin.deleteUser(userId);
          }
          console.log("Error from register : ", error);
          return errorFilter(error);
        }
      });
    }),
});
