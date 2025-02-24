import { PageContainer, SectionContainer } from "@/components/layouts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  OrderOrderParams,
  OrderSortParams,
} from "@/features/order/components";
import {
  OrderLimit,
  OrderPagination,
  OrderSearch,
  OrderSort,
} from "@/features/order/components";
import { api } from "@/utils";
import { useRouter } from "next/router";
import { LobbyOrderTable } from "../tables";
export const HomePage = () => {
  const router = useRouter();

  const queryParams = {
    search: router.query.search as string,
    page: Number(router.query.page) || 1,
    sort: (router.query.sort as OrderSortParams) || undefined,
    order: (router.query.order as OrderOrderParams) || undefined,
    limit: Number(router.query.limit) || 15,
  };
  const { data: orders, isLoading: isOrdersLoading } =
    api.order.getAll.useQuery({
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
    <PageContainer withHeader>
      <SectionContainer padded>
        <Card className="w-full border-none shadow-none">
          <CardHeader>
            <CardTitle>Daftar Pesanan</CardTitle>
            <CardDescription>Manajemen dan monitoring pesanan</CardDescription>
          </CardHeader>
          <CardContent>
            <header className="flex flex-col gap-y-5 py-10">
              <div className="flex items-center gap-x-5">
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
              <LobbyOrderTable
                orders={orders?.data}
                isOrdersLoading={isOrdersLoading}
              />
              <OrderPagination
                total={orders?.meta.total ?? 0}
                currentPage={queryParams.page}
                limit={queryParams.limit}
                onPageChange={(page) => handleUpdateQuery({ page })}
              />
            </main>
          </CardContent>
        </Card>
      </SectionContainer>
    </PageContainer>
  );
};
