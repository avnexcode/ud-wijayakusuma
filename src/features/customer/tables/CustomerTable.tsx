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
import { type Customer } from "@prisma/client";
import { ScanEye, SquarePen } from "lucide-react";
import Link from "next/link";
import { DeleteCustomerDialog } from "../components/action";
import { CustomerTableBodySkeleton } from "../components/skeleton";

type CustomerTableProps = {
  customers?: Customer[];
  isCustomersLoading: boolean;
};

export const CustomerTable = ({
  customers = [],
  isCustomersLoading = false,
}: CustomerTableProps) => {
  return (
    <Table>
      <TableCaption>List data pelanggan</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead className="w-[400px]">No Handphone</TableHead>
          <TableHead className="w-[400px]">Email</TableHead>
          <TableHead className="w-[200px]">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      {isCustomersLoading ? (
        <CustomerTableBodySkeleton />
      ) : (
        <TableBody>
          {renderElements({
            of: customers,
            keyExtractor: (customer) => customer.id,
            render: (customer, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="capitalize">{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.email ?? "-"}</TableCell>
                <TableCell className="space-x-1">
                  <Link href={`/dashboard/customer/${customer.id}/detail`}>
                    <Button variant={"outline"} size={"sm"}>
                      <ScanEye />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/customer/${customer.id}/edit`}>
                    <Button variant={"outline"} size={"sm"}>
                      <SquarePen />
                    </Button>
                  </Link>
                  <DeleteCustomerDialog customerId={customer.id} />
                </TableCell>
              </TableRow>
            ),
            isLoading: isCustomersLoading,
            fallback: (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Tidak ada data pelanggan
                </TableCell>
              </TableRow>
            ),
          })}
        </TableBody>
      )}
    </Table>
  );
};
