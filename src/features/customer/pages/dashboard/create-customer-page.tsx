import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { CreateCustomerForm } from "../../forms/CreateCustomerForm";

export const CreateCustomerPage = () => {
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Tambah Pelanggan"
          description="Halaman ini digunakan untuk menambahkan pelanggan baru ke dalam sistem. Pengguna harus mengisi formulir dengan informasi yang diperlukan, seperti nama, email, alamat, dan nomor telepon. Setelah data diisi dengan benar, pengguna dapat menyimpan informasi pelanggan yang baru dibuat."
        >
          <CreateCustomerForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

CreateCustomerPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
