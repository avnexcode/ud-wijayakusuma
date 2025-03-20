import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { convertCurrency, formatDate } from "@/utils";
import { type OrderCategory, type OrderStatus } from "@prisma/client";
import {
  CalendarIcon,
  CreditCard,
  MoveLeft,
  Package,
  User,
} from "lucide-react";
import { useRouter } from "next/router";
import type { OrderWithAllRelations } from "../types";

// Helper function to format order status
const formatOrderStatus = (status: OrderStatus) => {
  const statusMap: Record<OrderStatus, { label: string; className: string }> = {
    PENDING: { label: "Menunggu", className: "text-yellow-500" },
    SUCCESS: { label: "Berhasil", className: "text-green-500" },
  };

  return statusMap[status] || { label: status, className: "" };
};

// Helper function to format order category
const formatOrderCategory = (category: OrderCategory) => {
  const categoryMap: Record<OrderCategory, string> = {
    RETAIL: "Ecer",
    WHOLESALE: "Grosir",
  };

  return categoryMap[category] || category;
};

type OrderCardProps = {
  order?: OrderWithAllRelations;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  const router = useRouter();
  const orderStatus = order
    ? formatOrderStatus(order.status)
    : { label: "", className: "" };
  const orderCategory = order ? formatOrderCategory(order.category) : "";

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Label: <span className="capitalize">{order?.label}</span>
            </h2>
            <div className="mt-2 flex items-center">
              <span className={`font-medium ${orderStatus.className}`}>
                Status: {orderStatus.label}
              </span>
              <span className="mx-2">•</span>
              <span className="font-medium">Kategori: {orderCategory}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 py-5">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-muted-foreground">
            Deskripsi
          </h3>
          <p className="">
            {order?.description ? order.description : "Tidak ada deskripsi"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-muted-foreground">
              Detail Order
            </h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Total:</span>
                <span>{order?.total}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  Tanggal Pengiriman:
                </span>
                <span>{formatDate(order?.sendingAt)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-muted-foreground">
              Relasi
            </h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <User size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Pelanggan:</span>
                <span className="capitalize">{order?.customer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Produk:</span>
                <span>{order?.product.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Transaksi:</span>
                <span>
                  {order?.transaction
                    ? `${convertCurrency(order.transaction.totalAmount)} (${order.transaction.status === "UNPAID" ? "Belum Dibayar" : order.transaction.status === "PARTIALLY_PAID" ? "Dalam Cicilan" : "Dibayar"})`
                    : "Tidak tersedia"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {order?.transaction && (
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-muted-foreground">
              Detail Transaksi
            </h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <div>
                <span className="text-muted-foreground">Total Tagihan:</span>
                <p>{convertCurrency(order.transaction.totalAmount)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Sudah Dibayar:</span>
                <p>
                  {order.transaction.amountPaid
                    ? convertCurrency(order.transaction.amountPaid)
                    : "Rp 0"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Sisa Pembayaran:</span>
                <p>
                  {order.transaction.amountDue
                    ? convertCurrency(order.transaction.amountDue)
                    : "Rp 0"}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <Separator />
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
            Dibuat: {formatDate(order?.createdAt)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            Diperbarui: {formatDate(order?.updatedAt)}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
