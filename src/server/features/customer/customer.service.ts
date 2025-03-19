import { type QueryParams } from "@/server/types/api";
import { CustomerRepository } from "./customer.repository";
import { TRPCError } from "@trpc/server";
import type {
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "@/server/models/customer.model";

export class CustomerService {
  static getAll = async (params: QueryParams) => {
    const customers = await CustomerRepository.findAll(params);
    return customers;
  };

  static getById = async (id: string) => {
    const customer = await CustomerRepository.findUniqueId(id);

    if (!customer) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Data pelanggan dengan id : ${id} tidak ditemukan`,
      });
    }

    return customer;
  };

  static create = async (request: CreateCustomerRequest) => {
    if (request.email) {
      const customerExistsByEmail = await CustomerRepository.countUniqueEmail(
        request.email,
      );

      if (customerExistsByEmail !== 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Alamat email sudah digunakan pelanggan lain",
        });
      }
    }

    const customerExistsByPhone = await CustomerRepository.countUniquePhone(
      request.phone,
    );

    if (customerExistsByPhone !== 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Nomor HP sudah digunakan pelanggan lain",
      });
    }

    const customerExistsByName = await CustomerRepository.countUniqueName(
      request.name,
    );

    if (customerExistsByName !== 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Nama pelanggan sudah digunakan",
      });
    }

    const customer = await CustomerRepository.insert(request);

    return customer;
  };

  static update = async (id: string, request: UpdateCustomerRequest) => {
    const customerExists = await this.getById(id);

    if (request.email && request.email !== customerExists.email) {
      const customerExistsByEmail = await CustomerRepository.countUniqueEmail(
        request.email,
      );

      if (customerExistsByEmail !== 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Alamat email sudah digunakan pelanggan lain",
        });
      }
    }

    if (request.phone && request.phone !== customerExists.phone) {
      const customerExistsByPhone = await CustomerRepository.countUniquePhone(
        request.phone,
      );
      if (customerExistsByPhone !== 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Nomor HP sudah digunakan pelanggan lain",
        });
      }
    }

    if (request.name && request.name !== customerExists.name) {
      const customerExistsByName = await CustomerRepository.countUniqueName(
        request.name,
      );
      if (customerExistsByName !== 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Nama pelanggan sudah digunakan",
        });
      }
    }

    const customer = await CustomerRepository.update(id, request);

    return customer;
  };

  static delete = async (id: string) => {
    const customerExists = await CustomerRepository.countUniqueId(id);

    if (customerExists === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Data pelanggan dengan id : ${id} tidak ditemukan`,
      });
    }

    const customer = await CustomerRepository.delete(id);

    return customer.id;
  };
}
