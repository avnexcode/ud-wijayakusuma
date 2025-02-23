import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { EditCustomerForm } from "../../forms";
import { useParams } from "next/navigation";

export const EditCustomerPage = () => {
  const params: { id: string } = useParams();
  const customerId = params?.id;
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection title="Dashboard - Pelanggan">
          <EditCustomerForm customerId={customerId} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

EditCustomerPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
