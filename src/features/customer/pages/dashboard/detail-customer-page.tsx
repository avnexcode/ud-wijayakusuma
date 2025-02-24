import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { useParams } from "next/navigation";
import { CustomerCard } from "../../components";

export const DetailCustomerPage = () => {
  const params: { id: string } = useParams();
  const customerId = params?.id;
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Detail Pelanggan"
          description="Halaman ini menampilkan informasi lengkap tentang seorang pelanggan tertentu. Detail yang disajikan mencakup data pribadi, riwayat transaksi atau pesanan, serta opsi untuk mengedit atau menghapus pelanggan dari sistem. Halaman ini memungkinkan admin untuk mengelola informasi pelanggan secara lebih mendalam."
        >
          <CustomerCard customerId={customerId} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DetailCustomerPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
