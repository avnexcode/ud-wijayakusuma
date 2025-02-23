import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderElements } from "@/utils/render-elements";

export const PaymentRecordTableCellSkeleton = () => {
  return <Skeleton className="h-3 w-full" />;
};

export const PaymentRecordTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <PaymentRecordTableCellSkeleton />
          </TableHead>
          <TableHead>
            <PaymentRecordTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[300px]">
            <PaymentRecordTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[100px]">
            <PaymentRecordTableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <PaymentRecordTableBodySkeleton />
    </Table>
  );
};

export const PaymentRecordTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, index) => index,
        render: () => <PaymentRecordTableItemSkeleton />,
      })}
    </TableBody>
  );
};

export const PaymentRecordTableItemSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <PaymentRecordTableCellSkeleton />
      </TableCell>
      <TableCell>
        <PaymentRecordTableCellSkeleton />
      </TableCell>
      <TableCell>
        <PaymentRecordTableCellSkeleton />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Skeleton className="h-8 w-[40px]" />
        <Skeleton className="h-8 w-[40px]" />
      </TableCell>
    </TableRow>
  );
};
