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

export const TransactionTableCellSkeleton = () => {
  return <Skeleton className="h-3 w-full" />;
};

export const TransactionTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <TransactionTableCellSkeleton />
          </TableHead>
          <TableHead>
            <TransactionTableCellSkeleton />
          </TableHead>
          <TableHead>
            <TransactionTableCellSkeleton />
          </TableHead>
          <TableHead>
            <TransactionTableCellSkeleton />
          </TableHead>
          <TableHead>
            <TransactionTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[150px]">
            <TransactionTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[100px]">
            <TransactionTableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TransactionTableBodySkeleton />
    </Table>
  );
};

export const TransactionTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, index) => index,
        render: () => <TransactionTableItemSkeleton />,
      })}
    </TableBody>
  );
};

export const TransactionTableItemSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <TransactionTableCellSkeleton />
      </TableCell>
      <TableCell>
        <TransactionTableCellSkeleton />
      </TableCell>
      <TableCell>
        <TransactionTableCellSkeleton />
      </TableCell>
      <TableCell>
        <TransactionTableCellSkeleton />
      </TableCell>
      <TableCell>
        <TransactionTableCellSkeleton />
      </TableCell>
      <TableCell>
        <TransactionTableCellSkeleton />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Skeleton className="h-8 w-[40px]" />
      </TableCell>
    </TableRow>
  );
};
