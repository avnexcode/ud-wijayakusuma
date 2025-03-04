import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const CustomerCardSkeleton = () => {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="space-y-2">
        <Skeleton className="h-8 w-2/3" />
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 py-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" /> {/* Informasi Kontak label */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Skeleton className="mr-2 h-4 w-4 rounded-full" />{" "}
              {/* Email icon */}
              <Skeleton className="h-5 w-56" /> {/* Email content */}
            </div>
            <div className="flex items-center">
              <Skeleton className="mr-2 h-4 w-4 rounded-full" />{" "}
              {/* Phone icon */}
              <Skeleton className="h-5 w-40" /> {/* Phone content */}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-24" /> {/* Alamat label */}
          <div className="flex items-start">
            <Skeleton className="mr-2 h-4 w-4 flex-shrink-0 rounded-full" />{" "}
            {/* Address icon */}
            <Skeleton className="h-16 w-full" /> {/* Address content */}
          </div>
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
