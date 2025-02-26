import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { EditCustomerForm } from "../../forms";
import { useParams } from "next/navigation";

export const EditCustomerPage = () => {
  const params: { id: string } = useParams();
  const id = params?.id;

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Edit Pelanggan"
          description="Halaman ini digunakan untuk mengedit data pelanggan yang sudah ada. Pengguna dapat memperbarui informasi seperti nama, email, alamat, dan nomor telepon. Setelah melakukan perubahan, pengguna dapat menyimpan data yang diperbarui atau membatalkan perubahan jika diperlukan."
        >
          <EditCustomerForm customerId={id} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

EditCustomerPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
