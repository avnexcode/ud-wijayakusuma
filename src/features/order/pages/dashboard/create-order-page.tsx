import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { CreateOrderForm } from "../../forms/CreateOrderForm";

export const CreateOrderPage = () => {
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Tambah Pesanan"
          description="Halaman ini digunakan untuk membuat pesanan baru dari pelanggan. Pengguna dapat memilih pelanggan, menambahkan produk ke dalam pesanan, menentukan jumlah produk, dan menghitung total harga. Setelah semua informasi diisi, pesanan dapat disimpan ke dalam sistem."
        >
          <CreateOrderForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

CreateOrderPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
