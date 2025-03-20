import { supabaseAdminClient } from "@/lib/supabase/server";
import type { RegisterRequest } from "@/server/models";
import { UserRepository } from "../user/user.repository";

export class AuthService {
  static register = async (request: RegisterRequest) => {
    let userId = "";

    const { name, email, password } = request;

    const { data, error } = await supabaseAdminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (data.user) userId = data.user?.id;

    if (error) {
      if (userId) {
        await supabaseAdminClient.auth.admin.deleteUser(userId);
      }
      throw error;
    }

    await UserRepository.create(userId, {
      name,
      email,
    });
  };
}
