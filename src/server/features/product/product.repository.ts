import { db } from "@/server/db";
import type {
  CreateProductRequest,
  UpdateProductRequest,
} from "@/server/models";
import type { QueryParams } from "@/server/types/api";

export class ProductRepository {
  static findAll = async (params: QueryParams) => {
    const { page, limit, search, sort, order } = params;

    const skip = (page - 1) * limit;

    const totalCount = await this.countAllSearch(search);

    const products = await db.product.findMany({
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
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: products,
      meta: {
        total: totalCount,
        limit,
        page,
        last_page: lastPage,
      },
    };
  };

  static countAllSearch = async (search?: string) => {
    const productsCount = await db.product.count({
      ...(search && {
        where: {
          OR: [{ name: { contains: search, mode: "insensitive" } }],
        },
      }),
    });

    return productsCount;
  };

  static findUniqueId = async (id: string) => {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return product;
  };

  static findUniqueSlug = async (slug: string) => {
    const product = await db.product.findUnique({ where: { slug } });

    return product;
  };

  static countUniqueId = async (id: string) => {
    const productCount = await db.product.count({ where: { id } });

    return productCount;
  };

  static countUniqueName = async (slug: string) => {
    const productCount = await db.product.count({ where: { slug } });

    return productCount;
  };

  static countUniqueSlug = async (slug: string) => {
    const productCount = await db.product.count({ where: { slug } });

    return productCount;
  };

  static countSimilarSlug = async (slug: string) => {
    const productCount = await db.product.count({
      where: {
        slug: {
          startsWith: slug,
        },
      },
    });

    return productCount;
  };

  static insert = async (request: CreateProductRequest & { slug: string }) => {
    const product = await db.product.create({ data: request });

    return product;
  };

  static update = async (
    id: string,
    request: UpdateProductRequest & { slug: string },
  ) => {
    const product = await db.product.update({ where: { id }, data: request });

    return product;
  };

  static destroy = async (id: string) => {
    const product = await db.product.delete({ where: { id } });

    return product;
  };
}
