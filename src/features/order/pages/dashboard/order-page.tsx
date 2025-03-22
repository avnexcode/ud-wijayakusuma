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
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks";
import { api } from "@/utils/api";
import { CirclePlus } from "lucide-react";
import { type GetServerSideProps } from "next";
import Link from "next/link";
import {
  OrderSort,
  type OrderOrderParams,
  type OrderSortParams,
} from "../../components";
import { OrderTable } from "../../tables";

export const OrderPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type OrderPageProps = {
  sidebarDefaultOpen: boolean;
};

export const OrderPage = () => {
  const { queryParams, handleUpdateQuery } = useQueryParams<
    OrderSortParams,
    OrderOrderParams
  >();

  const {
    data: orders,
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = api.order.getAll.useQuery(
    {
      params: {
        ...queryParams,
      },
    },
    { refetchOnWindowFocus: false },
  );

  return (
    <PageContainer title="Dashboard Pesanan">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Pesanan"
          description="Halaman ini menampilkan daftar pesanan yang telah dibuat oleh pelanggan. Informasi yang ditampilkan meliputi nomor pesanan, nama pelanggan, status pesanan, total harga, dan tanggal pemesanan."
        >
          <header className="flex flex-col gap-y-5 py-10">
            <div className="flex items-center gap-x-5">
              <Link href={"/dashboard/order/create"}>
                <Button className="min-w-[150px]">
                  <CirclePlus />
                  Buat Pesanan
                </Button>
              </Link>

              <TableSearch
                placeholder="pesanan"
                initialSearch={queryParams.search}
                onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
              />
            </div>

            <div>
              <div className="flex items-center gap-5">
                <TableLimit
                  currentLimit={queryParams.limit}
                  onLimitChange={(limit) =>
                    handleUpdateQuery({ limit, page: 1 })
                  }
                />

                <OrderSort
                  currentSort={queryParams.sort}
                  currentOrder={queryParams.order}
                  onSortChange={(sort) => handleUpdateQuery({ sort })}
                  onOrderChange={(order) => handleUpdateQuery({ order })}
                />
              </div>
            </div>
          </header>

          <main>
            <OrderTable
              orders={orders?.data}
              isOrdersLoading={isOrdersLoading}
              refetchOrders={refetchOrders}
            />
          </main>

          <footer className="py-5">
            <TablePagination
              total={orders?.meta.total ?? 0}
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

OrderPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as OrderPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
