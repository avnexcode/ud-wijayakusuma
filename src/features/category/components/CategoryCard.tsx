import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils";
import { type Category } from "@prisma/client";
import { CalendarIcon, MoveLeft } from "lucide-react";
import { useRouter } from "next/router";

type CategoryCardProps = {
  category?: Category;
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const router = useRouter();
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Nama kategori :{" "}
              <span className="capitalize">{category?.name}</span>
            </h2>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 py-5">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-muted-foreground">
            Deskripsi
          </h3>
          <p className="">
            {category?.description
              ? category.description
              : "Tidak ada deskripsi"}
          </p>
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
            Dibuat: {formatDate(category?.createdAt)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            Diperbarui: {formatDate(category?.updatedAt)}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
