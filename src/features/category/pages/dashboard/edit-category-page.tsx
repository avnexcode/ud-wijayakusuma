import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { EditCategoryForm } from "../../forms";
import { useParams } from "next/navigation";

export const EditCategoryPage = () => {
  const params: { id: string } = useParams();
  const id = params?.id;
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Edit Kategori"
          description="Halaman ini digunakan untuk mengubah informasi kategori yang sudah ada. Pengguna dapat mengedit nama kategori dan deskripsi sebelum menyimpan perubahan."
        >
          <EditCategoryForm categoryId={id} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

EditCategoryPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
