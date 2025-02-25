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

export const OrderTableCellSkeleton = () => {
  return <Skeleton className="h-3 w-full" />;
};

export const OrderTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <OrderTableCellSkeleton />
          </TableHead>
          <TableHead>
            <OrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[400px]">
            <OrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[400px]">
            <OrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[150px]">
            <OrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[300px]">
            <OrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[300px]">
            <OrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[200px]">
            <OrderTableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <OrderTableBodySkeleton />
    </Table>
  );
};

export const OrderTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, index) => index,
        render: () => <OrderTableItemSkeleton />,
      })}
    </TableBody>
  );
};

export const OrderTableItemSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <OrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <OrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <OrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <OrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <OrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <OrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <OrderTableCellSkeleton />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Skeleton className="h-8 w-[40px]" />
        <Skeleton className="h-8 w-[40px]" />
        <Skeleton className="h-8 w-[40px]" />
      </TableCell>
    </TableRow>
  );
};
