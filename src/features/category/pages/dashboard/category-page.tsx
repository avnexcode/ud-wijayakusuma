import {
  DashboardLayout,
  DashboardProductSection,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { useUpdateQuery } from "@/hooks";
import { api } from "@/utils/api";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
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
  const { queryParams, handleUpdateQuery } = useUpdateQuery<
    CategorySortParams,
    CategoryOrderParams
  >();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    refetch: refetchCategories,
  } = api.category.getAll.useQuery({
    params: {
      ...queryParams,
    },
  });

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
