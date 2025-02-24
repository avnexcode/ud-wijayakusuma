import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const OrderCardSkeleton = () => {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="space-y-2">
        <Skeleton className="h-8 w-2/3" /> {/* Order label */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-36" /> {/* Status */}
          <Skeleton className="h-5 w-36" /> {/* Category */}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 py-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-36" /> {/* Deskripsi label */}
          <Skeleton className="h-16 w-full" /> {/* Description content */}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" /> {/* Detail Order label */}
            <div className="space-y-1">
              <Skeleton className="h-5 w-48" /> {/* Total */}
              <Skeleton className="h-5 w-64" /> {/* Sending date */}
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-36" /> {/* Relasi label */}
            <div className="space-y-1">
              <Skeleton className="h-5 w-56" /> {/* Customer */}
              <Skeleton className="h-5 w-48" /> {/* Product */}
              <Skeleton className="h-5 w-64" /> {/* Transaction */}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-36" /> {/* Detail Transaksi label */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <Skeleton className="h-12 w-full" /> {/* Total amount */}
            <Skeleton className="h-12 w-full" /> {/* Paid amount */}
            <Skeleton className="h-12 w-full" /> {/* Due amount */}
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-between py-5">
        <Skeleton className="h-5 w-56" /> {/* Back button */}
        <div className="flex w-full flex-col items-center justify-end space-y-1 md:flex-row md:space-x-4 md:space-y-0">
          <Skeleton className="h-5 w-48" /> {/* Created date */}
          <Skeleton className="h-5 w-48" /> {/* Updated date */}
        </div>
      </CardFooter>
    </Card>
  );
};
