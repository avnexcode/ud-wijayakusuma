import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils";
import { type Customer } from "@prisma/client";
import { CalendarIcon, Mail, MapPin, MoveLeft, Phone } from "lucide-react";
import { useRouter } from "next/router";

type CustomerCardProps = {
  customer?: Customer;
};

export const CustomerCard = ({ customer }: CustomerCardProps) => {
  const router = useRouter();
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Nama pelanggan:{" "}
              <span className="capitalize">{customer?.name}</span>
            </h2>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 py-5">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-muted-foreground">
            Informasi Kontak
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{customer?.email ?? "Tidak ada email"}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{customer?.phone}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-muted-foreground">Alamat</h3>
          <div className="flex items-start">
            <MapPin className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <p className="">{customer?.address}</p>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-between py-5">
        <Button
          size={"sm"}
          variant={"ghost"}
          className="flex items-center gap-2 text-nowrap text-base text-muted-foreground"
          onClick={() => router.back()}
        >
          <MoveLeft size={20} />
          Kembali ke halaman sebelumnya
        </Button>
        <div className="flex w-full flex-col items-center justify-end space-y-1 text-base md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            Dibuat: {formatDate(customer?.createdAt)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            Diperbarui: {formatDate(customer?.updatedAt)}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
