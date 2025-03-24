import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { RegisterForm } from "@/features/auth/forms";
import { type GetServerSideProps } from "next";

export const CreateUserPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type CreateUserPageProps = {
  sidebarDefaultOpen: boolean;
};

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
  const pageProps = page.props as CreateUserPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
