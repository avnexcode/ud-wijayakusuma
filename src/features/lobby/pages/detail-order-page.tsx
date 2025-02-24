import { PageContainer, SectionContainer } from "@/components/layouts";
import { OrderCard } from "@/features/order/components";
import { OrderCardSkeleton } from "@/features/order/components/skeleton";
import { api } from "@/utils";
import { useParams } from "next/navigation";

export const DetailOrder = () => {
  const params: { id: string } = useParams();
  const id = params?.id;
  const { data: order, isLoading: isOrderLoading } = api.order.getById.useQuery(
    { id },
    { enabled: !!id },
  );
  return (
    <PageContainer withHeader>
      <SectionContainer padded>
        {isOrderLoading ? <OrderCardSkeleton /> : <OrderCard order={order} />}
      </SectionContainer>
    </PageContainer>
  );
};
