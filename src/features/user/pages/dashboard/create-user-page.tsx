import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { RegisterForm } from "@/features/auth/forms";

export const CreateUserPage = () => {
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Tambah Pengguna"
          description="Halaman ini memungkinkan admin untuk menambahkan pengguna baru ke dalam sistem. Admin harus mengisi formulir dengan informasi seperti nama, email, dan password sebelum menyimpannya ke dalam database."
        >
          <RegisterForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

CreateUserPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
