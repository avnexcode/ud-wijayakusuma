import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const EditCustomerFormSkeleton = () => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-5">
        <EditCustomerFormInnerSkeleton />
      </CardContent>
      <CardFooter className="mt-10 place-content-end gap-5">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[200px]" />
      </CardFooter>
    </Card>
  );
};

export const EditCustomerFormInnerSkeleton = () => {
  return [...new Array<undefined>(4)].map((_, index) => (
    <div className="space-y-4" key={index}>
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-9 w-full" />
    </div>
  ));
};
