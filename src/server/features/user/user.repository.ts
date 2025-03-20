import { db } from "@/server/db";
import type { RegisterRequest } from "@/server/models";
import type { QueryParams } from "@/server/types/api";

export class UserRepository {
  static findAll = async (params: QueryParams) => {
    const { page, limit, search, sort, order } = params;
    const skip = (page - 1) * limit;

    const totalCount = await this.countAllSearch(search);

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
  };

  static countAllSearch = async (search?: string) => {
    const usersCount = await db.user.count({
      ...(search && {
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    });

    return usersCount;
  };

  static findUniqueId = async (id: string) => {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        email: true,
      },
    });

    return user;
  };

  static countUniqueId = async (id: string) => {
    const userCount = await db.user.count({ where: { id } });

    return userCount;
  };

  static create = async (
    id: string,
    request: Omit<RegisterRequest, "password">,
  ) => {
    const user = await db.user.create({
      data: {
        id,
        name: request.name,
        email: request.email,
      },
    });

    return user;
  };

  static destroy = async (id: string) => {
    const user = await db.user.delete({ where: { id } });

    return user;
  };
}
