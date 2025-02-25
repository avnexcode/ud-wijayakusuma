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

export const ProductTableCellSkeleton = () => {
  return <Skeleton className="h-3 w-full" />;
};

export const ProductTableSkeleton = () => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <ProductTableCellSkeleton />
          </TableHead>
          <TableHead>
            <ProductTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[300px]">
            <ProductTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[300px]">
            <ProductTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[200px]">
            <ProductTableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <ProductTableBodySkeleton />
    </Table>
  );
};

export const ProductTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, index) => index,
        render: () => (
          <TableRow>
            <TableCell>
              <ProductTableCellSkeleton />
            </TableCell>
            <TableCell>
              <ProductTableCellSkeleton />
            </TableCell>
            <TableCell>
              <ProductTableCellSkeleton />
            </TableCell>
            <TableCell>
              <ProductTableCellSkeleton />
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
