import { db } from "@/server/db";
import type {
  CreateTransactionRequest,
  UpdateTransactionRequest,
} from "@/server/models";
import type { QueryParams } from "@/server/types/api";

export class TransactionRepository {
  static findAll = async (params: QueryParams) => {
    const { page, limit, search, sort, order } = params;
    const skip = (page - 1) * limit;

    const totalCount = await this.countAllSearch(search);

    const transactions = await db.transaction.findMany({
      take: limit,
      skip,
      ...(search && {
        where: {
          OR: [
            {
              order: {
                label: { contains: search, mode: "insensitive" },
              },
            },
          ],
        },
      }),
      orderBy: {
        order: {
          [sort]: order,
        },
      },
      include: {
        order: {
          select: {
            label: true,
          },
        },
      },
    });

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: transactions,
      meta: {
        total: totalCount,
        limit,
        page,
        last_page: lastPage,
      },
    };
  };

  static countAllSearch = async (search?: string) => {
    const transactionsCount = await db.transaction.count({
      ...(search && {
        where: {
          OR: [
            {
              order: {
                label: { contains: search, mode: "insensitive" },
              },
            },
          ],
        },
      }),
    });

    return transactionsCount;
  };

  static findUniqueId = async (id: string) => {
    const transaction = await db.transaction.findUnique({
      where: { id },
      include: {
        payment_records: true,
        order: {
          select: {
            label: true,
          },
        },
      },
    });

    return transaction;
  };

  static findUniqueOrderId = async (orderId: string) => {
    const transaction = await db.transaction.findUnique({ where: { orderId } });

    return transaction;
  };

  static countUniqueId = async (id: string) => {
    const countTransaction = await db.transaction.count({ where: { id } });

    return countTransaction;
  };

  static insert = async (request: CreateTransactionRequest) => {
    const transaction = await db.transaction.create({
      data: request,
    });

    return transaction;
  };

  static update = async (id: string, request: UpdateTransactionRequest) => {
    const transaction = await db.transaction.update({
      where: { id },
      data: request,
    });

    return transaction;
  };

  static destroy = async (id: string) => {
    const transaction = await db.transaction.delete({ where: { id } });

    return transaction;
  };
}
