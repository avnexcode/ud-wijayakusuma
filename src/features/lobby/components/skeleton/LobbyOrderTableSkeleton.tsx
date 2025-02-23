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

export const LobbyOrderTableCellSkeleton = () => {
  return <Skeleton className="h-3 w-full" />;
};

export const LobbyOrderTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <LobbyOrderTableCellSkeleton />
          </TableHead>
          <TableHead>
            <LobbyOrderTableCellSkeleton />
          </TableHead>
          <TableHead>
            <LobbyOrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[200px]">
            <LobbyOrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[200px]">
            <LobbyOrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[150px]">
            <LobbyOrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[150px]">
            <LobbyOrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[200px]">
            <LobbyOrderTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[50px]">
            <LobbyOrderTableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <LobbyOrderTableBodySkeleton />
    </Table>
  );
};

export const LobbyOrderTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, index) => index,
        render: () => <LobbyOrderTableItemSkeleton />,
      })}
    </TableBody>
  );
};

export const LobbyOrderTableItemSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <LobbyOrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <LobbyOrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <LobbyOrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <LobbyOrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <LobbyOrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <LobbyOrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <LobbyOrderTableCellSkeleton />
      </TableCell>
      <TableCell>
        <LobbyOrderTableCellSkeleton />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Skeleton className="h-8 w-[40px]" />
      </TableCell>
    </TableRow>
  );
};
