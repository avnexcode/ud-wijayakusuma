import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  OrderLimit,
  OrderPagination,
  OrderSearch,
  OrderSort,
  type OrderOrderParams,
  type OrderSortParams,
} from "../../components";
import { OrderTable } from "../../tables";

export const OrderPage = () => {
  const router = useRouter();

  const queryParams = {
    search: router.query.search as string,
    page: Number(router.query.page) || 1,
    sort: (router.query.sort as OrderSortParams) || undefined,
    order: (router.query.order as OrderOrderParams) || undefined,
    limit: Number(router.query.limit) || 15,
  };

  const {
    data: orders,
    isLoading: isOrdersLoading,
    refetch: refetchOrders,
  } = api.order.getAll.useQuery({
    params: {
      ...queryParams,
    },
  });

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

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection title="Dashboard Pemesanan">
          <header className="flex flex-col gap-y-5 py-10">
            <div className="flex items-center gap-x-5">
              <Link href={"/dashboard/order/create"}>
                <Button className="min-w-[150px]">
                  <CirclePlus />
                  Buat Pesanan
                </Button>
              </Link>

              <OrderSearch
                initialSearch={queryParams.search}
                onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
              />
            </div>

            <div>
              <div className="flex items-center gap-5">
                <OrderLimit
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
            <OrderPagination
              total={orders?.meta.total ?? 0}
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

OrderPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
