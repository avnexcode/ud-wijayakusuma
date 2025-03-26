import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { convertCurrency, formatDate } from "@/utils";
import type { TransactionStatus } from "@prisma/client";
import type { TransactionWithRelations } from "../types";

export const TransactionStatusBadge = ({
  status,
}: {
  status: TransactionStatus;
}) => {
  const statusColors = {
    UNPAID: "bg-red-500",
    PARTIALLY_PAID: "bg-yellow-500",
    PAID: "bg-green-500",
  };

  const displayStatus =
    status === "PAID"
      ? "LUNAS"
      : status === "PARTIALLY_PAID"
        ? "DALAM CICILAN"
        : "BELUM DIBAYAR";

  return (
    <Badge className={`${statusColors[status]} text-white`}>
      {displayStatus}
    </Badge>
  );
};

export const TransactionCard = ({
  transaction,
  isTransactionLoading,
}: {
  transaction: TransactionWithRelations;
  isTransactionLoading: boolean;
}) => {
  if (isTransactionLoading) {
    return (
      <Card className="w-full border-none shadow-none">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array<undefined>(6)].map((_, index) => (
            <Skeleton key={index} className="h-6 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!transaction) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            Data transaksi tidak ditemukan
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          Detail Transaksi
        </CardTitle>
        <TransactionStatusBadge status={transaction.status} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">ID Transaksi</p>
            <p className="font-medium">{transaction.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Label Pesanan</p>
            <p className="font-medium">{transaction.order.label}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Dibuat</p>
            <p className="font-medium">
              {formatDate(transaction.createdAt, "dateTime")}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Terakhir Diperbarui</p>
            <p className="font-medium">
              {formatDate(transaction.updatedAt, "dateTime")}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Yang Harus Dibayar</p>
            <div className="flex gap-3">
              {transaction.totalAmount !== transaction.amount && (
                <p className="font-medium line-through">
                  {convertCurrency(transaction.totalAmount)}
                </p>
              )}
              <p className="font-medium">
                {convertCurrency(transaction.amount)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Jumlah Dibayar</p>
            <p className="font-medium">
              {transaction.amountPaid
                ? convertCurrency(transaction.amountPaid)
                : "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Sisa Pembayaran</p>
            <p className="font-medium">
              {transaction.amountDue
                ? convertCurrency(transaction.amountDue)
                : "-"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
