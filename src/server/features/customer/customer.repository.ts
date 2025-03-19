import { db } from "@/server/db";
import type {
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "@/server/models/customer.model";
import type { QueryParams } from "@/server/types/api";

export class CustomerRepository {
  static findAll = async (params: QueryParams) => {
    const { page, limit, search, sort, order } = params;
    const skip = (page - 1) * limit;

    const totalCount = await db.customer.count({
      ...(search && {
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    });

    const customers = await db.customer.findMany({
      take: limit,
      skip,
      ...(search && {
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
      orderBy: {
        [sort]: order,
      },
    });

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: customers,
      meta: {
        total: totalCount,
        limit,
        page,
        last_page: lastPage,
      },
    };
  };

  static findUniqueId = async (id: string) => {
    const customer = await db.customer.findUnique({
      where: { id: id },
    });

    return customer;
  };

  static countUniqueId = async (id: string) => {
    const customerCount = await db.customer.count({ where: { id } });

    return customerCount;
  };

  static countUniqueEmail = async (email: string) => {
    const customerCount = await db.customer.count({ where: { email } });

    return customerCount;
  };

  static countUniqueName = async (name: string) => {
    const customerCount = await db.customer.count({ where: { name } });

    return customerCount;
  };

  static countUniquePhone = async (phone: string) => {
    const customerCount = await db.customer.count({ where: { phone } });

    return customerCount;
  };

  static insert = async (request: CreateCustomerRequest) => {
    const customer = await db.customer.create({ data: request });

    return customer;
  };

  static update = async (id: string, request: UpdateCustomerRequest) => {
    const customer = await db.customer.update({ where: { id }, data: request });

    return customer;
  };

  static delete = async (id: string) => {
    const customer = await db.customer.delete({ where: { id } });

    return customer;
  };
}
