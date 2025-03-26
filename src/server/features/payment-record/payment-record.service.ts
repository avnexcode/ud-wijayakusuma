import { SUPABASE_BUCKET } from "@/lib/supabase/bucket";
import { supabaseAdminClient } from "@/lib/supabase/server";
import type {
  CreatePaymentRecordRequest,
  UpdatePaymentRecordRequest,
} from "@/server/models";
import { type TransactionStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { TransactionService } from "../transaction";
import { PaymentRecordRepository } from "./payment-record.repository";

export class PaymentRecordService {
  static getById = async (id: string) => {
    const paymentRecord = await PaymentRecordRepository.findUniqueId(id);

    if (!paymentRecord) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Riwayat pembayaran dengan id : ${id} tidak ditemukan`,
      });
    }

    return paymentRecord;
  };

  static create = async (request: CreatePaymentRecordRequest) => {
    const transactionExists = await TransactionService.getById(
      request.transactionId,
    );

    if (Number(request.amount) > Number(transactionExists.amountDue)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Nominal pembayaran terlalu besar",
      });
    }

    const timestamp = new Date().getTime().toString();
    const fileName = `note-${request.transactionId}.jpeg`;
    const buffer = Buffer.from(request.noteImageUrl, "base64");

    const { data, error } = await supabaseAdminClient.storage
      .from(SUPABASE_BUCKET.NotePaymentRecord)
      .upload(fileName, buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) throw error;

    const imageUrl = supabaseAdminClient.storage
      .from(SUPABASE_BUCKET.NotePaymentRecord)
      .getPublicUrl(data.path);

    const noteImageUrl = imageUrl.data.publicUrl + "?t=" + timestamp;

    const paymentRecord = await PaymentRecordRepository.insert({
      amount: request.amount,
      transactionId: request.transactionId,
      noteImageUrl: noteImageUrl,
      noteImageName: fileName,
    });

    const amountPaid =
      Number(transactionExists.amountPaid) + Number(request.amount);

    const amountDue = Number(transactionExists.amount) - amountPaid;

    let transactionStatus: TransactionStatus;

    if (amountDue === 0) {
      transactionStatus = "PAID";
    } else {
      transactionStatus = "PARTIALLY_PAID";
    }

    await TransactionService.update(request.transactionId, {
      amountPaid: String(amountPaid),
      amountDue: String(amountDue),
      status: transactionStatus,
    });

    return paymentRecord;
  };

  static update = async (id: string, request: UpdatePaymentRecordRequest) => {
    const existingPaymentRecord = await this.getById(id);

    let amountDifference = 0;
    if (request.amount) {
      amountDifference =
        Number(request.amount) - Number(existingPaymentRecord.amount);
    }

    const transaction = existingPaymentRecord.transaction;
    const newAmountPaid = Number(transaction.amountPaid) + amountDifference;
    const newAmountDue = Number(transaction.amount) - newAmountPaid;

    if (newAmountDue < 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Nominal pembayaran terlalu besar",
      });
    }

    const updateData = { ...request };

    delete updateData.noteImageUrl;

    if (request.noteImageUrl) {
      const timestamp = new Date().getTime().toString();
      const fileName = `note-${transaction.id}.jpeg`;
      const buffer = Buffer.from(request.noteImageUrl, "base64");

      const { data, error } = await supabaseAdminClient.storage
        .from(SUPABASE_BUCKET.NotePaymentRecord)
        .upload(fileName, buffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) throw error;

      const imageUrl = supabaseAdminClient.storage
        .from(SUPABASE_BUCKET.NotePaymentRecord)
        .getPublicUrl(data.path);

      updateData.noteImageUrl = imageUrl.data.publicUrl + "?t=" + timestamp;
    }

    let transactionStatus: TransactionStatus;

    if (newAmountDue === 0) {
      transactionStatus = "PAID";
    } else {
      transactionStatus = "PARTIALLY_PAID";
    }

    const updatedPaymentRecord = await PaymentRecordRepository.update(
      id,
      updateData,
    );

    if (amountDifference !== 0) {
      await TransactionService.update(existingPaymentRecord.transactionId, {
        amountPaid: String(newAmountPaid),
        amountDue: String(newAmountDue),
        status: transactionStatus,
      });
    }

    return updatedPaymentRecord;
  };

  static delete = async (id: string) => {
    const paymentRecordExists = await this.getById(id);

    // if (paymentRecordExists.noteImageUrl) {
    //   const pathUrl = paymentRecordExists.noteImageUrl.split("?")[0];
    //   const url = new URL(pathUrl!);
    //   const pathSegments = url.pathname.split("/");
    //   const fileName = pathSegments[pathSegments.length - 1];
    //   await supabaseAdminClient.storage
    //     .from(SUPABASE_BUCKET.NotePaymentRecord)
    //     .remove([fileName!]);
    // }

    await supabaseAdminClient.storage
      .from(SUPABASE_BUCKET.NotePaymentRecord)
      .remove([paymentRecordExists.noteImageName]);

    const transaction = paymentRecordExists.transaction;
    const newAmountPaid =
      Number(transaction.amountPaid) - Number(paymentRecordExists.amount);
    const newAmountDue = Number(transaction.amount) - newAmountPaid;

    let transactionStatus: TransactionStatus;
    if (newAmountPaid === 0) {
      transactionStatus = "UNPAID";
    } else if (newAmountDue === 0) {
      transactionStatus = "PAID";
    } else {
      transactionStatus = "PARTIALLY_PAID";
    }

    await TransactionService.update(paymentRecordExists.transactionId, {
      amountPaid: String(newAmountPaid),
      amountDue: String(newAmountDue),
      status: transactionStatus,
    });

    const paymentRecord = await PaymentRecordRepository.destroy(id);

    return paymentRecord.id;
  };
}
