import { db } from "@/server/db";
import type {
  CreatePaymentRecordRequest,
  UpdatePaymentRecordRequest,
} from "@/server/models";
import type { QueryParams } from "@/server/types/api";

export class PaymentRecordRepository {
  static findAll = async (params: QueryParams) => null;

  static findUniqueId = async (id: string) => {
    const paymentRecord = await db.paymentRecord.findUnique({
      where: { id },
      include: {
        transaction: true,
      },
    });

    return paymentRecord;
  };

  static insert = async (
    request: CreatePaymentRecordRequest & {
      noteImageUrl: string;
      noteImageName: string;
    },
  ) => {
    const paymentRecord = await db.paymentRecord.create({
      data: request,
    });

    return paymentRecord;
  };

  static update = async (id: string, request: UpdatePaymentRecordRequest) => {
    const paymentRecord = await db.paymentRecord.update({
      where: { id },
      data: request,
    });

    return paymentRecord;
  };

  static destroy = async (id: string) => {
    const paymentRecord = await db.paymentRecord.delete({ where: { id } });

    return paymentRecord;
  };
}
