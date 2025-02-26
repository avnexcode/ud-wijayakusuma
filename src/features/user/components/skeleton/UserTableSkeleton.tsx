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

export const UserTableCellSkeleton = () => {
  return <Skeleton className="h-3 w-full" />;
};

export const UserTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <UserTableCellSkeleton />
          </TableHead>
          <TableHead>
            <UserTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[300px]">
            <UserTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[100px]">
            <UserTableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <UserTableBodySkeleton />
    </Table>
  );
};

export const UserTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, index) => index,
        render: () => <UserTableItemSkeleton />,
      })}
    </TableBody>
  );
};

export const UserTableItemSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <UserTableCellSkeleton />
      </TableCell>
      <TableCell>
        <UserTableCellSkeleton />
      </TableCell>
      <TableCell>
        <UserTableCellSkeleton />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Skeleton className="h-8 w-[40px]" />
      </TableCell>
    </TableRow>
  );
};
