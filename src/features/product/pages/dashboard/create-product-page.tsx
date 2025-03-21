import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { CreateProductForm } from "../../forms";

export const CreateProductPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type CreateProductPageProps = {
  sidebarDefaultOpen: boolean;
};

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
  const pageProps = page.props as CreateProductPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
