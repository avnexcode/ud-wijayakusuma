import {
  TableLimit,
  TablePagination,
  TableSearch,
} from "@/components/fragments";
import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks";
import { api } from "@/utils";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import {
  UserSort,
  type UserOrderParams,
  type UserSortParams,
} from "../../components";
import { UserTable } from "../../tables";

export const UserPage = () => {
  const { queryParams, handleUpdateQuery } = useQueryParams<
    UserSortParams,
    UserOrderParams
  >();

  const {
    data: users,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = api.user.getAll.useQuery(
    {
      params: {
        ...queryParams,
      },
    },
    { refetchOnWindowFocus: false },
  );

  return (
    <PageContainer title="Dashboard Pengguna">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Pengguna"
          description="Halaman ini menampilkan daftar pengguna yang memiliki akses ke dashboard. Informasi yang tersedia meliputi nama dan email."
        >
          <header className="flex max-w-4xl flex-col gap-y-5 py-10">
            <div className="flex items-center gap-x-5">
              <Link href={"/settings/user/create"} className="w-full">
                <Button className="w-full">
                  <CirclePlus />
                  Tambahkan Pengguna
                </Button>
              </Link>

              <div className="flex items-center gap-5">
                <TableLimit
                  currentLimit={queryParams.limit}
                  onLimitChange={(limit) =>
                    handleUpdateQuery({ limit, page: 1 })
                  }
                />

                <UserSort
                  currentSort={queryParams.sort}
                  currentOrder={queryParams.order}
                  onSortChange={(sort) => handleUpdateQuery({ sort })}
                  onOrderChange={(order) => handleUpdateQuery({ order })}
                />
              </div>
            </div>

            <TableSearch
              placeholder="pengguna"
              initialSearch={queryParams.search}
              onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
            />
          </header>

          <main>
            <UserTable
              users={users?.data}
              isUsersLoading={isUsersLoading}
              refetchUsers={refetchUsers}
            />
          </main>

          <footer className="py-5">
            <TablePagination
              total={users?.meta.total ?? 0}
              currentPage={queryParams.page}
              limit={queryParams.limit}
              onPageChange={(page) => handleUpdateQuery({ page })}
            />
          </footer>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

UserPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
