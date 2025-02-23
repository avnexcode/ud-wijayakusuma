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

export const CategoryTableCellSkeleton = () => {
  return <Skeleton className="h-3 w-full" />;
};

export const CategoryTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <CategoryTableCellSkeleton />
          </TableHead>
          <TableHead>
            <CategoryTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[200px]">
            <CategoryTableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <CategoryTableBodySkeleton />
    </Table>
  );
};

export const CategoryTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, index) => index,
        render: () => <CategoryTableItemSkeleton />,
      })}
    </TableBody>
  );
};

export const CategoryTableItemSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <CategoryTableCellSkeleton />
      </TableCell>
      <TableCell>
        <CategoryTableCellSkeleton />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Skeleton className="h-8 w-[40px]" />
        <Skeleton className="h-8 w-[40px]" />
        <Skeleton className="h-8 w-[40px]" />
      </TableCell>
    </TableRow>
  );
};
