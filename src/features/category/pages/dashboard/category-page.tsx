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
  CategoryLimit,
  CategoryPagination,
  CategorySearch,
  CategorySort,
  type CategoryOrderParams,
  type CategorySortParams,
} from "../../components";
import { CategoryTable } from "../../tables";

export const CategoryPage = () => {
  const router = useRouter();

  const queryParams = {
    search: router.query.search as string,
    page: Number(router.query.page) || 1,
    sort: (router.query.sort as CategorySortParams) || undefined,
    order: (router.query.order as CategoryOrderParams) || undefined,
    limit: Number(router.query.limit) || 15,
  };

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    refetch: refetchCategories,
  } = api.category.getAll.useQuery(
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
    void refetchCategories();
  }, [
    refetchCategories,
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
        <DashboardSection title="Dashboard Kategori Produk">
          <DashboardProductSection>
            <header className="flex flex-col gap-y-5 py-10">
              <div className="flex items-center gap-x-5">
                <Link href={"/dashboard/category/create"}>
                  <Button className="min-w-[150px]">
                    <CirclePlus />
                    Tambahkan Category
                  </Button>
                </Link>

                <CategorySearch
                  initialSearch={queryParams.search}
                  onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
                />
              </div>

              <div>
                <div className="flex items-center gap-5">
                  <CategoryLimit
                    currentLimit={queryParams.limit}
                    onLimitChange={(limit) =>
                      handleUpdateQuery({ limit, page: 1 })
                    }
                  />

                  <CategorySort
                    currentSort={queryParams.sort}
                    currentOrder={queryParams.order}
                    onSortChange={(sort) => handleUpdateQuery({ sort })}
                    onOrderChange={(order) => handleUpdateQuery({ order })}
                  />
                </div>
              </div>
            </header>
            <main>
              <CategoryTable
                categories={categories?.data}
                isCategoriesLoading={isCategoriesLoading}
                refetchCategories={refetchCategories}
              />
              <CategoryPagination
                total={categories?.meta.total ?? 0}
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

CategoryPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
