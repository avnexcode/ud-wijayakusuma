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
  UserLimit,
  UserSearch,
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
  } = api.user.getAll.useQuery({
    params: {
      ...queryParams,
    },
  });

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Pengguna"
          description="Halaman ini menampilkan daftar pengguna yang memiliki akses ke dashboard. Informasi yang tersedia meliputi nama dan email."
        >
          <header className="flex flex-col gap-y-5 py-10">
            <div className="flex items-center gap-x-5">
              <Link href={"/settings/user/create"}>
                <Button className="min-w-[150px]">
                  <CirclePlus />
                  Tambahkan Pengguna
                </Button>
              </Link>

              <UserSearch
                initialSearch={queryParams.search}
                onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
              />
            </div>

            <div className="flex items-center gap-5">
              <UserLimit
                currentLimit={queryParams.limit}
                onLimitChange={(limit) => handleUpdateQuery({ limit, page: 1 })}
              />

              <UserSort
                currentSort={queryParams.sort}
                currentOrder={queryParams.order}
                onSortChange={(sort) => handleUpdateQuery({ sort })}
                onOrderChange={(order) => handleUpdateQuery({ order })}
              />
            </div>
          </header>
          <UserTable
            users={users?.data}
            isUsersLoading={isUsersLoading}
            refetchUsers={refetchUsers}
          />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

UserPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
