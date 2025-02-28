import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { api } from "@/utils";
import { useParams } from "next/navigation";
import { PaymentRecordCard } from "../../components";
import { PaymentRecordCardSkeleton } from "../../components/skeleton";
import type { PaymentRecordWithRelations } from "../../types";

export const DetailPaymentRecordPage = () => {
  const params: { id: string } = useParams();
  const id = params?.id;

  const { data: paymentRecord, isLoading: isPaymentRecordLoading } =
    api.paymentRecord.getById.useQuery({ id }, { enabled: !!id });
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Detail Riwayat Pembayaran"
          description="ASD"
        >
          {isPaymentRecordLoading ? (
            <PaymentRecordCardSkeleton />
          ) : (
            <PaymentRecordCard
              paymentRecord={paymentRecord as PaymentRecordWithRelations}
            />
          )}
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DetailPaymentRecordPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
