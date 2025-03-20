import type { QueryParams } from "@/server/types/api";
import { UserRepository } from "./user.repository";
import { TRPCError } from "@trpc/server";
import { supabaseAdminClient } from "@/lib/supabase/server";

export class UserService {
  static getById = async (id: string) => {
    const user = await UserRepository.findUniqueId(id);

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Pengguna dengan ID : ${id} tidak ditemukan`,
      });
    }

    return user;
  };

  static getAll = async (params: QueryParams) => {
    const users = await UserRepository.findAll(params);

    return users;
  };

  static delete = async (id: string) => {
    const existingUser = await UserRepository.countUniqueId(id);

    if (existingUser === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Pengguna dengan ID : ${id} tidak ditemukan`,
      });
    }

    const res = await supabaseAdminClient.auth.admin.deleteUser(id);

    if (res.error) {
      throw res.error;
    }

    const user = await UserRepository.destroy(id);

    return user;
  };
}
