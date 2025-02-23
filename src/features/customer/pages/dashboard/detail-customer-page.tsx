import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { useParams } from "next/navigation";
import { CustomerCard } from "../../components";

export const DetailCustomerPage = () => {
  const params: { id: string } = useParams();
  const customerId = params?.id;
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection title="Dashboard - Pelanggan">
          <CustomerCard customerId={customerId} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DetailCustomerPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
