import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import {
  TransactionLimit,
  TransactionPagination,
  TransactionSearch,
  TransactionSort,
  type TransactionOrderParams,
  type TransactionSortParams,
} from "../../components";
import { TransactionTable } from "../../tables/TransactionTable";
import type { TransactionWithRelations } from "../../types";

export const TransactionPage = () => {
  const router = useRouter();

  const queryParams = {
    search: router.query.search as string,
    page: Number(router.query.page) || 1,
    sort: (router.query.sort as TransactionSortParams) || undefined,
    order: (router.query.order as TransactionOrderParams) || undefined,
    limit: Number(router.query.limit) || 15,
  };

  const handleUpdateQuery = (newParams: Partial<typeof queryParams>) => {
    void router.push(
      {
        href: router.asPath,
        pathname: router.pathname,
        query: {
          ...router.query,
          ...newParams,
        },
      },
      undefined,
      { scroll: false },
    );
  };

  const { data: transactions, isLoading: isTransactionsLoading } =
    api.transaction.getAll.useQuery({
      params: {
        ...queryParams,
      },
    });

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard Transaksi"
          description="Halaman ini menampilkan daftar transaksi pembayaran yang dilakukan oleh pelanggan. Informasi yang tersedia meliputi ID transaksi, metode pembayaran, jumlah pembayaran, status pembayaran, dan waktu transaksi."
        >
          <header className="flex flex-col gap-y-5 py-10">
            <div className="flex items-center gap-x-5">
              <TransactionSearch
                initialSearch={queryParams.search}
                onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
              />
            </div>

            <div>
              <div className="flex items-center gap-5">
                <TransactionLimit
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
          </header>
          <main>
            <TransactionTable
              transactions={transactions?.data as TransactionWithRelations[]}
              isTransactionsLoading={isTransactionsLoading}
            />
            <TransactionPagination
              total={transactions?.meta.total ?? 0}
              currentPage={queryParams.page}
              limit={queryParams.limit}
              onPageChange={(page) => handleUpdateQuery({ page })}
            />
          </main>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

TransactionPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
