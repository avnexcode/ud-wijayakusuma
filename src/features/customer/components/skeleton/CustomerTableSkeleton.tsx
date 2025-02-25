import { Skeleton } from "@/components/ui/skeleton";
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

export const CustomerTableCellSkeleton = () => {
  return <Skeleton className="h-3 w-full" />;
};

export const CustomerTableSkeleton = () => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <CustomerTableCellSkeleton />
          </TableHead>
          <TableHead>
            <CustomerTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[400px]">
            <CustomerTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[400px]">
            <CustomerTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[200px]">
            <CustomerTableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <CustomerTableBodySkeleton />
    </Table>
  );
};

export const CustomerTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, index) => index,
        render: () => (
          <TableRow>
            <TableCell>
              <CustomerTableCellSkeleton />
            </TableCell>
            <TableCell>
              <CustomerTableCellSkeleton />
            </TableCell>
            <TableCell>
              <CustomerTableCellSkeleton />
            </TableCell>
            <TableCell>
              <CustomerTableCellSkeleton />
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <Skeleton className="h-8 w-[40px]" />
              <Skeleton className="h-8 w-[40px]" />
              <Skeleton className="h-8 w-[40px]" />
            </TableCell>
          </TableRow>
        ),
      })}
    </TableBody>
  );
};
