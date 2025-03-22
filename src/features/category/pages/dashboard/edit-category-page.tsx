import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { EditCategoryForm } from "../../forms";

export const EditCategoryPageSSR: GetServerSideProps = async ({
  req,
  params,
}) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  const { id } = params as { id: string };

  return {
    props: { sidebarDefaultOpen, id },
  };
};

type EditCategoryPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const EditCategoryPage = ({ id }: EditCategoryPageProps) => {
  return (
    <PageContainer title="Dashboard Kategori">
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
  const pageProps = page.props as EditCategoryPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
