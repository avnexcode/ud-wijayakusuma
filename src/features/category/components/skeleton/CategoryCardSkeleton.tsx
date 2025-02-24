import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const CategoryCardSkeleton = () => {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="space-y-2">
        <Skeleton className="h-8 w-2/3" />
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 py-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" /> {/* Deskripsi label */}
          <Skeleton className="h-16 w-full" /> {/* Description content */}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-between py-5">
        <Skeleton className="h-5 w-96" /> {/* Back button */}
        <div className="flex w-full flex-col items-center justify-end space-y-1 md:flex-row md:space-x-4 md:space-y-0">
          <Skeleton className="h-5 w-48" /> {/* Created date */}
          <Skeleton className="h-5 w-48" /> {/* Updated date */}
        </div>
      </CardFooter>
    </Card>
  );
};
