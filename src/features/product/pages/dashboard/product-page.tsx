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
  ProductSort,
  type ProductOrderParams,
  type ProductSortParams,
} from "../../components";
import { ProductTable } from "../../tables";

export const ProductPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type ProductPageProps = {
  sidebarDefaultOpen: boolean;
};

export const ProductPage = () => {
  const { queryParams, handleUpdateQuery } = useQueryParams<
    ProductSortParams,
    ProductOrderParams
  >();

  const { data: products, isLoading: isProductsLoading } =
    api.product.getAll.useQuery(
      {
        params: {
          ...queryParams,
        },
      },
      { refetchOnWindowFocus: false },
    );

  return (
    <PageContainer title="Dashboard Produk">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Produk"
          description="Halaman ini menampilkan daftar semua produk yang tersedia dalam sistem. Pengguna dapat melihat informasi seperti nama produk, kategori, harga, stok, dan status produk. Terdapat fitur pencarian, filter, dan tombol untuk menambah produk baru atau mengedit produk yang sudah ada."
        >
          <DashboardProductSection>
            <header className="flex flex-col gap-y-5 py-10">
              <div className="flex items-center gap-x-5">
                <Link href={"/dashboard/product/create"}>
                  <Button className="min-w-[150px]">
                    <CirclePlus />
                    Tambahkan Product
                  </Button>
                </Link>

                <TableSearch
                  placeholder="produk"
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

                <ProductSort
                  currentSort={queryParams.sort}
                  currentOrder={queryParams.order}
                  onSortChange={(sort) => handleUpdateQuery({ sort })}
                  onOrderChange={(order) => handleUpdateQuery({ order })}
                />
              </div>
            </header>

            <main>
              <ProductTable
                products={products?.data}
                isProductsLoading={isProductsLoading}
              />
            </main>

            <footer className="py-5">
              <TablePagination
                total={products?.meta.total ?? 0}
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

ProductPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as ProductPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
