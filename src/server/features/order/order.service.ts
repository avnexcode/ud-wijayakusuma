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
    let amount: number = totalAmount;

    if (request.discount !== "NONE") {
      switch (request.discount) {
        case "NOMINAL":
          amount = totalAmount - Number(request.totalDiscount);
          break;
        case "PERCENTAGE":
          amount = totalAmount * (1 - Number(request.totalDiscount) / 100);
          break;
        default:
          return amount;
      }
    }

    const transaction = await TransactionService.create({
      orderId: order.id,
      totalAmount: String(totalAmount),
      amount: String(amount),
      amountDue: String(amount),
    });

    order = await OrderRepository.update(order.id, {
      transactionId: transaction.id,
    });

    return order;
  };

  static update = async (id: string, request: UpdateOrderRequest) => {
    const existingOrder = await this.getById(id);

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

    if (
      request.productId ||
      request.total ||
      request.discount ||
      request.totalDiscount
    ) {
      const product = await ProductService.getById(
        request.productId ?? existingOrder.productId,
      );

      const newTotal = request.total ?? existingOrder.total;
      const totalAmount = Number(product.price) * Number(newTotal);
      let amount: number = totalAmount;

      const discountType = request.discount ?? existingOrder.discount;
      const totalDiscount =
        request.totalDiscount ?? existingOrder.totalDiscount;

      if (discountType !== "NONE") {
        switch (discountType) {
          case "NOMINAL":
            amount = totalAmount - Number(totalDiscount);
            break;
          case "PERCENTAGE":
            amount = totalAmount * (1 - Number(totalDiscount) / 100);
            break;
          default:
            return amount;
        }
      }

      const transaction = await TransactionService.getByOrderId(id);
      let status = transaction.status;

      const amountPaid = Number(transaction?.amountPaid) || 0;
      const amountDue = amount - amountPaid;

      if (amount < amountPaid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Jumlah perhitungan tidak sesuai",
        });
      }

      order = await OrderRepository.update(id, {
        ...request,
        category: product.orderCategory,
      });

      if (amountDue === 0) {
        status = "PAID";
      } else if (amountPaid !== amount) {
        status = "PARTIALLY_PAID";
      } else {
        status = "UNPAID";
      }

      await TransactionService.update(existingOrder.transactionId!, {
        status,
        totalAmount: String(totalAmount),
        amount: String(amount),
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
