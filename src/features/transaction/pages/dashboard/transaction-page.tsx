import {
  TableLimit,
  TablePagination,
  TableSearch,
} from "@/components/fragments";
import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { useQueryParams } from "@/hooks";
import { api } from "@/utils/api";
import { type GetServerSideProps } from "next";
import {
  TransactionSort,
  type TransactionOrderParams,
  type TransactionSortParams,
} from "../../components";
import { TransactionTable } from "../../tables/TransactionTable";
import type { TransactionWithRelations } from "../../types";

export const TransactionPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type TransactionPageProps = {
  sidebarDefaultOpen: boolean;
};

export const TransactionPage = () => {
  const { queryParams, handleUpdateQuery } = useQueryParams<
    TransactionSortParams,
    TransactionOrderParams
  >();

  const { data: transactions, isLoading: isTransactionsLoading } =
    api.transaction.getAll.useQuery(
      {
        params: {
          ...queryParams,
        },
      },
      { refetchOnWindowFocus: false },
    );

  return (
    <PageContainer title="Dashboard Transaksi">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard Transaksi"
          description="Halaman ini menampilkan daftar transaksi pembayaran yang dilakukan oleh pelanggan. Informasi yang tersedia meliputi ID transaksi, metode pembayaran, jumlah pembayaran, status pembayaran, dan waktu transaksi."
        >
          <header className="flex max-w-4xl flex-col gap-y-5 pb-10">
            <div className="flex items-center gap-x-5">
              <div className="flex items-center gap-5">
                <TableLimit
                  currentLimit={queryParams.limit}
                  onLimitChange={(limit) =>
                    handleUpdateQuery({ limit, page: 1 })
                  }
                />

                <TransactionSort
                  currentSort={queryParams.sort}
                  currentOrder={queryParams.order}
                  onSortChange={(sort) => handleUpdateQuery({ sort })}
                  onOrderChange={(order) => handleUpdateQuery({ order })}
                />
              </div>
            </div>

            <TableSearch
              placeholder="transaksi"
              initialSearch={queryParams.search}
              onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
            />
          </header>

          <main>
            <TransactionTable
              transactions={transactions?.data as TransactionWithRelations[]}
              isTransactionsLoading={isTransactionsLoading}
            />
          </main>

          <footer className="py-5">
            <TablePagination
              total={transactions?.meta.total ?? 0}
              currentPage={queryParams.page}
              limit={queryParams.limit}
              onPageChange={(page) => handleUpdateQuery({ page })}
            />
          </footer>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

TransactionPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as TransactionPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
