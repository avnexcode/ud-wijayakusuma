import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { CreateProductForm } from "../../forms";

export const CreateProductPage = () => {
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Tambah Produk"
          description="Halaman ini memungkinkan pengguna untuk menambahkan produk baru ke dalam sistem. Pengguna harus mengisi formulir dengan informasi seperti nama produk, kategori, harga, stok, dan deskripsi sebelum menyimpannya ke dalam database."
        >
          <CreateProductForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

CreateProductPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
