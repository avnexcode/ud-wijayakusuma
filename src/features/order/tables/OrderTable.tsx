import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderElements } from "@/utils/render-elements";
import { CalendarIcon, ScanEye, SquarePen } from "lucide-react";
import Link from "next/link";
import { DeleteOrderDialog } from "../components/action/DeleteOrderDialog";
import { OrderTableBodySkeleton } from "../components/skeleton/OrderTableSkeleton";
import type { OrderWithRelations } from "../types";
import { convertCurrency } from "@/utils/convert-currency";
import { formatDate } from "@/utils";

type OrderTableProps = {
  orders?: OrderWithRelations[];
  isOrdersLoading: boolean;
  refetchOrders: () => void;
};

export const OrderTable = ({
  orders,
  isOrdersLoading,
  refetchOrders,
}: OrderTableProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Label</TableHead>
          <TableHead className="w-[400px]">Pelanggan</TableHead>
          <TableHead className="w-[400px]">Produk</TableHead>
          <TableHead className="w-[150px]">Total Pesanan</TableHead>
          <TableHead className="w-[300px]">Total Harga</TableHead>
          <TableHead className="w-[300px]">Tanggal Pengiriman</TableHead>
          <TableHead className="w-[200px]">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      {isOrdersLoading && <OrderTableBodySkeleton />}
      <TableBody>
        {renderElements({
          of: orders,
          keyExtractor: (order) => order.id,
          render: (order, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="capitalize">{order.label}</TableCell>
              <TableCell className="capitalize">
                {order.customer.name}
              </TableCell>
              <TableCell className="capitalize">{order.product.name}</TableCell>
              <TableCell className="capitalize">{order.total}</TableCell>
              <TableCell className="capitalize">
                {convertCurrency(order.transaction?.total_amount ?? "")}
              </TableCell>
              <TableCell className="flex items-center gap-2 capitalize">
                <CalendarIcon className="h-4 w-4" />
                {formatDate(order.sending_at)}
              </TableCell>
              <TableCell className="space-x-1">
                <Link href={`/dashboard/order/${order.id}/detail`}>
                  <Button variant={"outline"} size={"sm"}>
                    <ScanEye />
                  </Button>
                </Link>
                <Link href={`/dashboard/order/${order.id}/edit`}>
                  <Button variant={"outline"} size={"sm"}>
                    <SquarePen />
                  </Button>
                </Link>
                <DeleteOrderDialog
                  orderId={order.id}
                  refetchOrders={refetchOrders}
                />
              </TableCell>
            </TableRow>
          ),
          isLoading: isOrdersLoading,
          fallback: (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Tidak ada data pesanan
              </TableCell>
            </TableRow>
          ),
        })}
      </TableBody>
    </Table>
  );
};
