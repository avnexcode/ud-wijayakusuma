import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertCurrency } from "@/utils/convert-currency";
import { formatDate } from "@/utils/format-date";
import { renderElements } from "@/utils/render-elements";
import { type PaymentRecord } from "@prisma/client";
import { PaymentRecordTableBodySkeleton } from "../components/skeleton";
import { EditPaymentRecordForm } from "../forms/EditPaymentRecordForm";
import type { PaymentRecordWithRelations } from "../types";
import { DeletePaymentRecordDialog } from "../components/action";
import { CalendarIcon, ScanEye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PaymentRecordTableProps = {
  paymentRecords?: PaymentRecord[] | PaymentRecordWithRelations[];
  isPaymentRecordsLoading: boolean;
  refetchTransaction: () => void;
};

export const PaymentRecordTable = ({
  paymentRecords,
  isPaymentRecordsLoading,
  refetchTransaction,
}: PaymentRecordTableProps) => {
  return (
    <Table>
      <TableCaption>Data riwayat pembayaran</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Jumlah Dibayar</TableHead>
          <TableHead className="w-[300px]">Tanggal Pembayaran</TableHead>
          <TableHead className="w-[100px]">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      {isPaymentRecordsLoading && <PaymentRecordTableBodySkeleton />}
      <TableBody>
        {renderElements({
          of: paymentRecords,
          keyExtractor: (paymentRecord) => paymentRecord.id,
          render: (paymentRecord, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="capitalize">
                {convertCurrency(paymentRecord.amount)}
              </TableCell>
              <TableCell className="flex w-[300px] items-center gap-2 capitalize">
                <CalendarIcon className="h-4 w-4" />
                {formatDate(paymentRecord.created_at)}
              </TableCell>
              <TableCell className="w-[100px] space-x-1 whitespace-nowrap">
                <Link
                  href={`/dashboard/payment-record/${paymentRecord.id}/detail`}
                >
                  <Button variant={"outline"} size={"sm"}>
                    <ScanEye />
                  </Button>
                </Link>
                <EditPaymentRecordForm
                  paymentRecordId={paymentRecord.id}
                  refetchTransaction={refetchTransaction}
                />
                <DeletePaymentRecordDialog
                  paymentRecordId={paymentRecord.id}
                  refetchTransaction={refetchTransaction}
                />
              </TableCell>
            </TableRow>
          ),
          isLoading: isPaymentRecordsLoading,
          fallback: (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Tidak ada data kategori
              </TableCell>
            </TableRow>
          ),
        })}
      </TableBody>
    </Table>
  );
};
