import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const PaymentRecordCardSkeleton = () => {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-3/4" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-1/2" />
        </div>

        <Separator />

        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <div className="relative w-full overflow-hidden rounded-md">
            <Skeleton className="h-[300px] w-full rounded-md" />
          </div>
        </div>
      </CardContent>

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
