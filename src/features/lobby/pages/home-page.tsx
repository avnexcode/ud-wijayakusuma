import { PageContainer, SectionContainer } from "@/components/layouts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  OrderSort,
  type OrderOrderParams,
  type OrderSortParams,
} from "@/features/order/components";
import { useQueryParams } from "@/hooks";
import { api } from "@/utils";
import { LobbyOrderTable } from "../tables";
import {
  TableLimit,
  TablePagination,
  TableSearch,
} from "@/components/fragments";
import { type GetServerSideProps } from "next";

export const HomePageSSR: GetServerSideProps = async ({}) => {
  return {
    props: {},
  };
};

export const HomePage = () => {
  const { queryParams, handleUpdateQuery } = useQueryParams<
    OrderSortParams,
    OrderOrderParams
  >();

  const { data: orders, isLoading: isOrdersLoading } =
    api.order.getAll.useQuery(
      {
        params: {
          ...queryParams,
        },
      },
      { refetchOnWindowFocus: false },
    );

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
              <LobbyOrderTable
                orders={orders?.data}
                isOrdersLoading={isOrdersLoading}
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
          </CardContent>
        </Card>
      </SectionContainer>
    </PageContainer>
  );
};
