import {
  TableLimit,
  TablePagination,
  TableSearch,
} from "@/components/fragments";
import {
  DashboardLayout,
  DashboardProductSection,
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
  CategorySort,
  type CategoryOrderParams,
  type CategorySortParams,
} from "../../components";
import { CategoryTable } from "../../tables";

export const CategoryPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type CategoryPageProps = {
  sidebarDefaultOpen: boolean;
};

export const CategoryPage = () => {
  const { queryParams, handleUpdateQuery } = useQueryParams<
    CategorySortParams,
    CategoryOrderParams
  >();

  const { data: categories, isLoading: isCategoriesLoading } =
    api.category.getAll.useQuery(
      {
        params: {
          ...queryParams,
        },
      },
      {
        refetchOnWindowFocus: false,
      },
    );

  return (
    <PageContainer title="Dashboard Kategori">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Kategori "
          description="Halaman ini menampilkan daftar semua kategori produk yang tersedia. Pengguna dapat menambah, mengedit, atau menghapus kategori untuk mengorganisir produk yang ada."
        >
          <DashboardProductSection>
            <header className="flex flex-col gap-y-5 py-10">
              <div className="flex items-center gap-x-5">
                <Link href={"/dashboard/category/create"}>
                  <Button className="min-w-[150px]">
                    <CirclePlus />
                    Tambahkan Category
                  </Button>
                </Link>

                <TableSearch
                  placeholder="kategori"
                  initialSearch={queryParams.search}
                  onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
                />
              </div>

              <div className="flex items-center gap-5">
                <TableLimit
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
            </header>

            <main>
              <CategoryTable
                categories={categories?.data}
                isCategoriesLoading={isCategoriesLoading}
              />
            </main>

            <footer className="py-5">
              <TablePagination
                total={categories?.meta.total ?? 0}
                currentPage={queryParams.page}
                limit={queryParams.limit}
                onPageChange={(page) => handleUpdateQuery({ page })}
              />
            </footer>
          </DashboardProductSection>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

CategoryPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as CategoryPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
