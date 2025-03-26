import { db } from "@/server/db";
import type { CreateOrderRequest, UpdateOrderRequest } from "@/server/models";
import type { QueryParams } from "@/server/types/api";

export class OrderRepository {
  static findAll = async (params: QueryParams) => {
    const { page, limit, search, sort, order } = params;
    const skip = (page - 1) * limit;

    const totalCount = await this.countAllSearch(search);

    const orders = await db.order.findMany({
      take: limit,
      skip,
      ...(search && {
        where: {
          OR: [
            { label: { contains: search, mode: "insensitive" } },
            {
              customer: {
                name: { contains: search, mode: "insensitive" },
              },
            },
            {
              product: {
                name: { contains: search, mode: "insensitive" },
              },
            },
          ],
        },
      }),
      orderBy: {
        [sort]: order,
      },
      include: {
        customer: {
          select: {
            name: true,
            phone: true,
            email: true,
            address: true,
          },
        },
        product: {
          select: {
            name: true,
            orderCategory: true,
          },
        },
        transaction: {
          select: {
            totalAmount: true,
            amount: true,
          },
        },
      },
    });

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: orders,
      meta: {
        total: totalCount,
        limit,
        page,
        last_page: lastPage,
      },
    };
  };

  static countAllSearch = async (search?: string) => {
    const ordersCount = await db.order.count({
      ...(search && {
        where: {
          OR: [
            { label: { contains: search, mode: "insensitive" } },
            {
              customer: {
                name: { contains: search, mode: "insensitive" },
              },
            },
            {
              product: {
                name: { contains: search, mode: "insensitive" },
              },
            },
          ],
        },
      }),
    });

    return ordersCount;
  };

  static findUniqueId = async (id: string) => {
    const order = await db.order.findUnique({
      where: { id },
      include: {
        customer: {
          select: {
            name: true,
            phone: true,
            email: true,
            address: true,
          },
        },
        product: {
          select: {
            name: true,
            orderCategory: true,
          },
        },
        transaction: {
          select: {
            totalAmount: true,
            amount: true,
            status: true,
            amountDue: true,
            amountPaid: true,
          },
        },
      },
    });

    return order;
  };

  static countUniqueId = async (id: string) => {
    const orderCount = await db.order.count({ where: { id } });

    return orderCount;
  };

  static countUniqueLabel = async (label: string) => {
    const orderCount = await db.order.count({ where: { label } });

    return orderCount;
  };

  static insert = async (request: CreateOrderRequest) => {
    const order = await db.order.create({ data: request });

    return order;
  };

  static update = async (id: string, request: UpdateOrderRequest) => {
    const order = await db.order.update({ where: { id }, data: request });

    return order;
  };

  static destroy = async (id: string) => {
    const order = await db.order.delete({ where: { id } });

    return order;
  };
}
