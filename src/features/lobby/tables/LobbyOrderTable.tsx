import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrderWithRelations } from "@/features/order/types";
import { formatDate, renderElements } from "@/utils";
import { CalendarIcon, ScanEye } from "lucide-react";
import Link from "next/link";
import { LobbyOrderTableBodySkeleton } from "../components/skeleton";
import {
  getCategoryBadge,
  getCategoryLabel,
  getStatusColor,
  getStatusLabel,
} from "../../order/utils";

type LobbyOrderTableProps = {
  orders?: OrderWithRelations[];
  isOrdersLoading: boolean;
};

export const LobbyOrderTable = ({
  orders,
  isOrdersLoading,
}: LobbyOrderTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Label</TableHead>
          <TableHead>Pelanggan</TableHead>
          <TableHead className="w-[200px]">No HP Pelanggan</TableHead>
          <TableHead className="w-[200px]">Total</TableHead>
          <TableHead className="w-[150px]">Kategori</TableHead>
          <TableHead className="w-[150px]">Status</TableHead>
          <TableHead className="w-[200px]">Tanggal Pengiriman</TableHead>
          <TableHead className="w-[50px]">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      {isOrdersLoading && <LobbyOrderTableBodySkeleton />}
      <TableBody>
        {renderElements({
          of: orders,
          keyExtractor: (order) => order.id,
          render: (order, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium capitalize">
                {order.label}
                {order.description && (
                  <p className="text-sm text-zinc-500">{order.description}</p>
                )}
              </TableCell>
              <TableCell className="capitalize">
                {order.customer.name}
              </TableCell>
              <TableCell>{order.customer.phone}</TableCell>
              <TableCell>{order.total} </TableCell>
              <TableCell>
                <Badge variant={getCategoryBadge(order.category)}>
                  {getCategoryLabel(order.category)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(order.status)} text-white`}
                >
                  {getStatusLabel(order.status)}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {formatDate(order.sendingAt)}
              </TableCell>
              <TableCell>
                <Link href={`/${order.id}/detail`}>
                  <Button variant={"outline"} size={"sm"}>
                    <ScanEye />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ),
          isLoading: isOrdersLoading,
          fallback: (
            <TableRow>
              <TableCell colSpan={9} className="py-8 text-center text-zinc-500">
                Tidak ada data pesanan
              </TableCell>
            </TableRow>
          ),
        })}
      </TableBody>
    </Table>
  );
};
