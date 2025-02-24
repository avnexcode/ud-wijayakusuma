import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { EditOrderForm } from "../../forms/EditOrderForm";
import { useParams } from "next/navigation";

export const EditOrderPage = () => {
  const params: { id: string } = useParams();
  const id = params?.id;
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Edit Pesanan"
          description="Halaman ini memungkinkan pengguna untuk mengedit pesanan yang sudah ada. Pengguna dapat memperbarui informasi pesanan seperti menambah atau menghapus produk, mengubah jumlah item, memperbarui status pesanan, dan menyesuaikan total harga sebelum menyimpan perubahan."
        >
          <EditOrderForm orderId={id} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

EditOrderPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
