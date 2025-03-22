import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  convertCurrency,
  formatDate,
  handleDownload,
  handlePrint,
  processImageUrl,
} from "@/utils";
import { CalendarIcon, Download, MoveLeft, Printer } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import type { PaymentRecordWithRelations } from "../types";

type PaymentRecordCardProps = {
  paymentRecord?: PaymentRecordWithRelations;
};

export const PaymentRecordCard = ({
  paymentRecord,
}: PaymentRecordCardProps) => {
  const router = useRouter();
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Jumlah pembayaran: {convertCurrency(paymentRecord?.amount ?? "0")}
          </h2>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">ID Transaksi</h3>
          <p>{paymentRecord?.transactionId ?? "Tidak ada ID transaksi"}</p>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Bukti Pembayaran</h3>
          {paymentRecord?.noteImageUrl ? (
            <>
              <div className="relative w-full overflow-hidden rounded-md">
                <Image
                  width={500}
                  height={500}
                  src={processImageUrl(paymentRecord.noteImageUrl) ?? ""}
                  alt="Bukti pembayaran"
                  style={{ width: "auto", height: "auto" }}
                  className="rounded-md object-contain"
                  priority
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  onClick={() => handlePrint(paymentRecord.noteImageUrl)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Printer size={16} />
                  Cetak Bukti Pembayaran
                </Button>
                <Button
                  onClick={() => handleDownload(paymentRecord.noteImageUrl)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Unduh Bukti Pembayaran
                </Button>
              </div>
            </>
          ) : (
            <p>Tidak ada bukti pembayaran</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between py-5">
        <Button
          size={"sm"}
          variant={"ghost"}
          className="flex items-center gap-2 text-nowrap text-base text-muted-foreground"
          onClick={() => router.back()}
        >
          <MoveLeft size={20} />
          Kembali ke halaman sebelumnya
        </Button>
        <div className="flex w-full flex-col items-center justify-end space-y-1 text-base md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            Dibuat: {formatDate(paymentRecord?.createdAt)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            Diperbarui: {formatDate(paymentRecord?.updatedAt)}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
