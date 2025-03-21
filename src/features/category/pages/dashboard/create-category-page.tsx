import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { CreateCategoryForm } from "../../forms";
import { type GetServerSideProps } from "next";

export const CreateCategoryPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type CreateCategoryPageProps = {
  sidebarDefaultOpen: boolean;
};

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
  const pageProps = page.props as CreateCategoryPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
