import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { api } from "@/utils";
import { type GetServerSideProps } from "next";
import { PaymentRecordCard } from "../../components";
import { PaymentRecordCardSkeleton } from "../../components/skeleton";
import type { PaymentRecordWithRelations } from "../../types";

export const DetailPaymentRecordPageSSR: GetServerSideProps = async ({
  req,
  params,
}) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  const { id } = params as { id: string };

  return {
    props: { sidebarDefaultOpen, id },
  };
};

type DetailPaymentRecordPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const DetailPaymentRecordPage = ({
  id,
}: DetailPaymentRecordPageProps) => {
  const { data: paymentRecord, isLoading: isPaymentRecordLoading } =
    api.paymentRecord.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer title="Dashboard Riwayat Pembayaran">
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
  const pageProps = page.props as DetailPaymentRecordPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
