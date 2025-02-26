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
import { type User } from "@prisma/client";
import { DeleteUserDialog } from "../components/action";
import { UserTableBodySkeleton } from "../components/skeleton";

type UserTableProps = {
  users?: User[];
  isUsersLoading: boolean;
  refetchUsers: () => void;
};

export const UserTable = ({
  users,
  isUsersLoading,
  refetchUsers,
}: UserTableProps) => {
  return (
    <Table>
      <TableCaption>Data Pengguna</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead className="w-[400px]">Email</TableHead>
          <TableHead className="w-[100px]">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      {isUsersLoading && <UserTableBodySkeleton />}
      <TableBody>
        {renderElements({
          of: users,
          keyExtractor: (user) => user.id,
          render: (user, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="capitalize">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="w-[100px] space-x-1 whitespace-nowrap">
                <DeleteUserDialog
                  userId={user.id}
                  refetchUsers={refetchUsers}
                />
              </TableCell>
            </TableRow>
          ),
          isLoading: isUsersLoading,
          fallback: (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Tidak ada data pengguna
              </TableCell>
            </TableRow>
          ),
        })}
      </TableBody>
    </Table>
  );
};
