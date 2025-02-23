import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api, formatDate } from "@/utils";
import { CustomerCardSkeleton } from "./skeleton";

type CustomerCardProps = {
  customerId: string;
};

export const CustomerCard = ({ customerId }: CustomerCardProps) => {
  const { data: customer, isLoading: isCustomerLoading } =
    api.customer.getById.useQuery(
      { id: customerId },
      { enabled: !!customerId },
    );

  if (isCustomerLoading) return <CustomerCardSkeleton />;

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Detail Customer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nama</p>
            <p className="font-medium capitalize">{customer?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{customer?.email ?? "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Alamat</p>
            <p className="font-medium capitalize">{customer?.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Telepon</p>
            <p className="font-medium">{customer?.phone}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-10 place-content-end space-x-10 text-sm text-muted-foreground">
        <div>
          <p className="text-sm text-gray-500">Tanggal Dibuat</p>
          <p className="font-medium">{formatDate(customer?.created_at)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Terakhir Diperbarui</p>
          <p className="font-medium">{formatDate(customer?.updated_at)}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
