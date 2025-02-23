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
import { useEffect } from "react";
import {
  CustomerLimit,
  CustomerSearch,
  CustomerSort,
  type CustomerOrderParams,
  type CustomerSortParams,
} from "../../components";
import { CustomerPagination } from "../../components/CustomerPagination";
import { CustomerTable } from "../../tables";

export const CustomerPage = () => {
  const router = useRouter();

  const queryParams = {
    search: router.query.search as string,
    page: Number(router.query.page) || 1,
    sort: (router.query.sort as CustomerSortParams) || undefined,
    order: (router.query.order as CustomerOrderParams) || undefined,
    limit: Number(router.query.limit) || 15,
  };

  const {
    data: customers,
    isLoading: isCustomersLoading,
    refetch: refetchCustomers,
  } = api.customer.getAll.useQuery(
    {
      params: {
        ...queryParams,
        search: queryParams.search ?? "",
      },
    },
    {
      enabled: router.isReady,
    },
  );

  useEffect(() => {
    void refetchCustomers();
  }, [
    refetchCustomers,
    queryParams.limit,
    queryParams.page,
    queryParams.search,
    queryParams.sort,
    queryParams.order,
  ]);

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
        <DashboardSection title="Dashboard Pelanggan" className="gap-y-5">
          <header className="flex flex-col gap-y-5 py-10">
            <div className="flex items-center gap-x-5">
              <Link href={"/dashboard/customer/create"}>
                <Button className="min-w-[150px]">
                  <CirclePlus />
                  Tambahkan Pelanggan
                </Button>
              </Link>

              <CustomerSearch
                initialSearch={queryParams.search}
                onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
              />
            </div>

            <div>
              <div className="flex items-center gap-5">
                <CustomerLimit
                  currentLimit={queryParams.limit}
                  onLimitChange={(limit) =>
                    handleUpdateQuery({ limit, page: 1 })
                  }
                />

                <CustomerSort
                  currentSort={queryParams.sort}
                  currentOrder={queryParams.order}
                  onSortChange={(sort) => handleUpdateQuery({ sort })}
                  onOrderChange={(order) => handleUpdateQuery({ order })}
                />
              </div>
            </div>
          </header>
          <main>
            <CustomerTable
              customers={customers?.data}
              isCustomersLoading={isCustomersLoading}
              refetchCustomers={refetchCustomers}
            />
            <CustomerPagination
              total={customers?.meta.total ?? 0}
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

CustomerPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
