import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { EditProductForm } from "../../forms";

export const EditProductPageSSR: GetServerSideProps = async ({
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

type EditProductPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const EditProductPage = ({ id }: EditProductPageProps) => {
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
  const pageProps = page.props as EditProductPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
