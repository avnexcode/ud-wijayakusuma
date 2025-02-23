import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CustomerCardSkeleton = () => (
  <Card className="w-full border-none shadow-none">
    <CardHeader>
      <CardTitle>
        <Skeleton className="h-6 w-40" />
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {[...Array<undefined>(4)].map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter className="mt-10 place-content-end space-x-10 text-sm text-muted-foreground">
      {[...Array<undefined>(2)].map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-32" />
        </div>
      ))}
    </CardFooter>
  </Card>
);
