import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const EditCategoryFormSkeleton = () => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-5">
        <EditCategoryFormInnerSkeleton />
        <div className="space-y-4">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-[5rem] w-full" />
        </div>
      </CardContent>
      <CardFooter className="mt-10 place-content-end gap-5">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  );
};
export const EditCategoryFormInnerSkeleton = () => {
  return [...new Array<undefined>(1)].map((_, index) => (
    <div className="space-y-4" key={index}>
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-9 w-full" />
    </div>
  ));
};
