import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { CreateOrderForm } from "../../forms/CreateOrderForm";

export const CreateOrderPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type CreateOrderPageProps = {
  sidebarDefaultOpen: boolean;
};

export const CreateOrderPage = () => {
  return (
    <PageContainer title="Dashboard Pesanan">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Tambah Pesanan"
          description="Halaman ini digunakan untuk membuat pesanan baru dari pelanggan. Pengguna dapat memilih pelanggan, menambahkan produk ke dalam pesanan, menentukan jumlah produk, dan menghitung total harga. Setelah semua informasi diisi, pesanan dapat disimpan ke dalam sistem."
        >
          <CreateOrderForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

CreateOrderPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as CreateOrderPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
