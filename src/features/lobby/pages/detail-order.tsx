import { PageContainer, SectionContainer } from "@/components/layouts";
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
        <h1>{order?.label}</h1>
      </SectionContainer>
    </PageContainer>
  );
};
