import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { CreatePaymentRecordForm } from "@/features/payment-record/forms/CreatePaymentRecordForm";
import { PaymentRecordTable } from "@/features/payment-record/tables";
import { api } from "@/utils/api";
import { type GetServerSideProps } from "next";
import { TransactionCard } from "../../components/TransactionCard";
import type { TransactionWithRelations } from "../../types";

export const DetailTransactionPageSSR: GetServerSideProps = async ({
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

type DetailTransactionPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const DetailTransactionPage = ({ id }: DetailTransactionPageProps) => {
  const {
    data: transaction,
    isLoading: isTransactionLoading,
    refetch: refetchTransaction,
  } = api.transaction.getById.useQuery({ id: id }, { enabled: !!id });

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Detail Transaksi"
          description="Halaman ini menampilkan informasi detail mengenai suatu transaksi tertentu, termasuk rincian pembayaran, status, metode pembayaran, serta referensi ke pesanan terkait."
          className="gap-10"
        >
          <TransactionCard
            transaction={transaction as TransactionWithRelations}
            isTransactionLoading={isTransactionLoading}
          />
          <div className="flex flex-col gap-10">
            <CreatePaymentRecordForm
              isLoading={isTransactionLoading}
              isAddPaymentDisabled={transaction?.status === "PAID"}
              transactionId={id}
              refetchTransaction={refetchTransaction}
            />
            <PaymentRecordTable
              refetchTransaction={refetchTransaction}
              paymentRecords={transaction?.payment_records}
              isPaymentRecordsLoading={isTransactionLoading}
            />
          </div>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DetailTransactionPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DetailTransactionPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
