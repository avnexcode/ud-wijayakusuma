import {
  DashboardLayout,
  DashboardProductSection,
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
  ProductLimit,
  ProductPagination,
  ProductSearch,
  ProductSort,
  type ProductOrderParams,
  type ProductSortParams,
} from "../../components";
import { ProductTable } from "../../tables";

export const ProductPage = () => {
  const router = useRouter();

  const queryParams = {
    search: router.query.search as string,
    page: Number(router.query.page) || 1,
    sort: (router.query.sort as ProductSortParams) || undefined,
    order: (router.query.order as ProductOrderParams) || undefined,
    limit: Number(router.query.limit) || 15,
  };

  const {
    data: products,
    isLoading: isProductsLoading,
    refetch: refetchProducts,
  } = api.product.getAll.useQuery(
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
    void refetchProducts();
  }, [
    refetchProducts,
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
        <DashboardSection title="Dashboard Produk">
          <DashboardProductSection>
            <header className="flex flex-col gap-y-5 py-10">
              <div className="flex items-center gap-x-5">
                <Link href={"/dashboard/product/create"}>
                  <Button className="min-w-[150px]">
                    <CirclePlus />
                    Tambahkan Product
                  </Button>
                </Link>

                <ProductSearch
                  initialSearch={queryParams.search}
                  onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
                />
              </div>

              <div>
                <div className="flex items-center gap-5">
                  <ProductLimit
                    currentLimit={queryParams.limit}
                    onLimitChange={(limit) =>
                      handleUpdateQuery({ limit, page: 1 })
                    }
                  />

                  <ProductSort
                    currentSort={queryParams.sort}
                    currentOrder={queryParams.order}
                    onSortChange={(sort) => handleUpdateQuery({ sort })}
                    onOrderChange={(order) => handleUpdateQuery({ order })}
                  />
                </div>
              </div>
            </header>
            <main>
              <ProductTable
                products={products?.data}
                isProductsLoading={isProductsLoading}
                refetchProducts={refetchProducts}
              />
              <ProductPagination
                total={products?.meta.total ?? 0}
                currentPage={queryParams.page}
                limit={queryParams.limit}
                onPageChange={(page) => handleUpdateQuery({ page })}
              />
            </main>
          </DashboardProductSection>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

ProductPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
