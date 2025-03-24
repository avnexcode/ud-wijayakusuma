import type { CreateOrderRequest, UpdateOrderRequest } from "@/server/models";
import type { QueryParams } from "@/server/types/api";
import { TRPCError } from "@trpc/server";
import { ProductService } from "../product";
import { TransactionService } from "../transaction";
import { OrderRepository } from "./order.repository";

export class OrderService {
  static getAll = async (params: QueryParams) => {
    const orders = await OrderRepository.findAll(params);

    return orders;
  };

  static getById = async (id: string) => {
    const order = await OrderRepository.findUniqueId(id);

    if (!order) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Data pesanan dengan id : ${id} tidak ditemukan`,
      });
    }

    return order;
  };

  static create = async (request: CreateOrderRequest) => {
    const existingOrder = await OrderRepository.countUniqueLabel(request.label);

    if (existingOrder !== 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Label untuk pesanan ini sudah digunakan",
      });
    }

    const product = await ProductService.getById(request.productId);

    let order = await OrderRepository.insert({
      ...request,
      category: product.orderCategory,
    });

    const totalAmount = Number(product?.price) * Number(order.total);

    const transaction = await TransactionService.create({
      orderId: order.id,
      totalAmount: String(totalAmount),
      amountDue: String(totalAmount),
    });

    order = await OrderRepository.update(order.id, {
      transactionId: transaction.id,
    });

    return order;
  };

  static update = async (id: string, request: UpdateOrderRequest) => {
    const existingOrder = await OrderRepository.findUniqueId(id);

    if (!existingOrder) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Data pesanan dengan ID : ${id} tidak ditemukan`,
      });
    }

    if (request.label && request.label !== existingOrder.label) {
      const labelExists = await OrderRepository.countUniqueLabel(request.label);

      if (labelExists !== 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Label pesanan ini sudah digunakan",
        });
      }
    }

    let order = await OrderRepository.update(id, request);

    if (request.productId || request.total) {
      const product = await ProductService.getById(
        request.productId ?? existingOrder.productId,
      );

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Data produk tidak ditemukan",
        });
      }

      order = await OrderRepository.update(id, {
        ...request,
        category: product.orderCategory,
      });

      const transaction = await TransactionService.getByOrderId(id);

      const newTotal = request.total ?? existingOrder.total;
      const totalAmount = Number(product.price) * Number(newTotal);
      const amountDue = totalAmount - Number(transaction?.amountPaid);

      await TransactionService.update(existingOrder.transactionId!, {
        totalAmount: String(totalAmount),
        amountDue: String(amountDue),
      });
    }

    return order;
  };

  static delete = async (id: string) => {
    const existingOrder = await this.getById(id);

    await TransactionService.delete(existingOrder.transactionId!);

    const order = await OrderRepository.destroy(id);

    return order;
  };
}
