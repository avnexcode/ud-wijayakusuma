import { db } from "@/server/db";
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/server/models";
import type { QueryParams } from "@/server/types/api";

export class CategoryRepository {
  static findAll = async (params: QueryParams) => {
    const { page, limit, search, sort, order } = params;
    const skip = (page - 1) * limit;

    const totalCount = await this.countAllSearch(search);

    const categories = await db.category.findMany({
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
      data: categories,
      meta: {
        total: totalCount,
        limit,
        page,
        last_page: lastPage,
      },
    };
  };

  static countAllSearch = async (search?: string) => {
    const productsCount = await db.category.count({
      ...(search && {
        where: {
          OR: [{ name: { contains: search, mode: "insensitive" } }],
        },
      }),
    });

    return productsCount;
  };

  static findUniqueId = async (id: string) => {
    const category = await db.category.findUnique({ where: { id } });

    return category;
  };

  static findUniqueSlug = async (slug: string) => {
    const category = await db.category.findUnique({ where: { slug } });

    return category;
  };

  static findUniqueName = async (name: string) => {
    const category = await db.category.findUnique({ where: { name } });

    return category;
  };

  static countUniqueId = async (id: string) => {
    const categoryCount = await db.category.count({ where: { id } });

    return categoryCount;
  };

  static countUniqueSlug = async (slug: string) => {
    const categoryCount = await db.category.count({ where: { slug } });

    return categoryCount;
  };

  static countSimilarSlug = async (slug: string) => {
    const categoryCount = await db.category.count({
      where: {
        slug: {
          startsWith: slug,
        },
      },
    });

    return categoryCount;
  };

  static countUniqueName = async (name: string) => {
    const categoryCount = await db.category.count({ where: { name } });

    return categoryCount;
  };

  static insert = async (request: CreateCategoryRequest & { slug: string }) => {
    const category = await db.category.create({ data: request });

    return category;
  };

  static update = async (
    id: string,
    request: UpdateCategoryRequest & { slug: string },
  ) => {
    const category = await db.category.update({ where: { id }, data: request });

    return category;
  };

  static destroy = async (id: string) => {
    const category = await db.category.delete({ where: { id } });

    return category;
  };
}
