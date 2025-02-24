import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { useParams } from "next/navigation";
import { EditProductForm } from "../../forms";

export const EditProductPage = () => {
  const params: { id: string } = useParams();
  const id = params?.id;

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Edit Produk"
          description="Halaman ini digunakan untuk memperbarui informasi produk yang sudah ada. Pengguna dapat mengubah nama produk, deskripsi, harga, stok, dan kategori. Setelah perubahan dilakukan, pengguna dapat menyimpan atau membatalkan perubahan."
        >
          <EditProductForm productId={id} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

EditProductPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
