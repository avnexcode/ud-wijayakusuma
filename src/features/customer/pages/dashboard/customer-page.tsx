import {
  DashboardLayout,
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
  CustomerLimit,
  CustomerSearch,
  CustomerSort,
  type CustomerOrderParams,
  type CustomerSortParams,
} from "../../components";
import { CustomerPagination } from "../../components/CustomerPagination";
import { CustomerTable } from "../../tables";

export const CustomerPage = () => {
  const { queryParams, handleUpdateQuery } = useUpdateQuery<
    CustomerSortParams,
    CustomerOrderParams
  >();

  const {
    data: customers,
    isLoading: isCustomersLoading,
    refetch: refetchCustomers,
  } = api.customer.getAll.useQuery({
    params: {
      ...queryParams,
    },
  });

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Pelanggan"
          description="Halaman ini menampilkan daftar seluruh pelanggan yang terdaftar dalam sistem. Pengguna dapat melihat informasi dasar seperti nama, email, alamat, dan nomor telepon pelanggan. Selain itu, tersedia fitur pencarian, filter, dan tombol untuk menambahkan pelanggan baru atau melihat detail lebih lanjut."
          className="gap-y-5"
        >
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
