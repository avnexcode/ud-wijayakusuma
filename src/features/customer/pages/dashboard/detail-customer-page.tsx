import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { useParams } from "next/navigation";
import { CustomerCard } from "../../components";
import { api } from "@/utils";
import { CustomerCardSkeleton } from "../../components/skeleton";

export const DetailCustomerPage = () => {
  const params: { id: string } = useParams();
  const id = params?.id;

  const { data: customer, isLoading: isCustomerLoading } =
    api.customer.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Detail Pelanggan"
          description="Halaman ini menampilkan informasi lengkap tentang seorang pelanggan tertentu. Detail yang disajikan mencakup data pribadi, riwayat transaksi atau pesanan, serta opsi untuk mengedit atau menghapus pelanggan dari sistem. Halaman ini memungkinkan admin untuk mengelola informasi pelanggan secara lebih mendalam."
        >
          {isCustomerLoading ? (
            <CustomerCardSkeleton />
          ) : (
            <CustomerCard customer={customer} />
          )}
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DetailCustomerPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
