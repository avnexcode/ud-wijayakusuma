import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { CreateCategoryForm } from "../../forms";

export const CreateCategoryPage = () => {
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Tambah Kategori"
          description="Halaman ini memungkinkan pengguna untuk menambahkan kategori baru dengan memasukkan nama dan deskripsi kategori sebelum menyimpannya."
        >
          <CreateCategoryForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

CreateCategoryPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
