import { TRPCError } from "@trpc/server";
import { TransactionRepository } from "./transaction.repository";
import type {
  CreateTransactionRequest,
  UpdateTransactionRequest,
} from "@/server/models";
import type { QueryParams } from "@/server/types/api";

export class TransactionService {
  static getAll = async (params: QueryParams) => {
    const transactions = await TransactionRepository.findAll(params);

    return transactions;
  };

  static getById = async (id: string) => {
    const transaction = await TransactionRepository.findUniqueId(id);

    if (!transaction) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Transaksi dengan ID : ${id} tidak ditemukan`,
      });
    }

    return transaction;
  };

  static getByOrderId = async (orderId: string) => {
    const transaction = await TransactionRepository.findUniqueOrderId(orderId);

    if (!transaction) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Transaksi dengan ID pesanan : ${orderId} tidak ditemukan`,
      });
    }

    return transaction;
  };

  static create = async (request: CreateTransactionRequest) => {
    const transaction = await TransactionRepository.insert(request);

    return transaction;
  };

  static update = async (id: string, request: UpdateTransactionRequest) => {
    const existingTransaction = await TransactionRepository.countUniqueId(id);

    if (existingTransaction === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Transaksi dengan ID : ${id} tidak ditemukan`,
      });
    }

    const transaction = await TransactionRepository.update(id, request);

    return transaction;
  };

  static delete = async (id: string) => {
    const existingTransaction = await TransactionRepository.countUniqueId(id);

    if (existingTransaction === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Transaksi dengan ID : ${id} tidak ditemukan`,
      });
    }

    const transaction = await TransactionRepository.destroy(id);

    return transaction;
  };
}
