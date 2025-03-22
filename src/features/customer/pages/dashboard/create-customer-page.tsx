import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { CreateCustomerForm } from "../../forms/CreateCustomerForm";

export const CreateCustomerPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type CreateCustomerPageProps = {
  sidebarDefaultOpen: boolean;
};

export const CreateCustomerPage = () => {
  return (
    <PageContainer title="Dashboard Pelanggan">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Tambah Pelanggan"
          description="Halaman ini digunakan untuk menambahkan pelanggan baru ke dalam sistem. Pengguna harus mengisi formulir dengan informasi yang diperlukan, seperti nama, email, alamat, dan nomor telepon. Setelah data diisi dengan benar, pengguna dapat menyimpan informasi pelanggan yang baru dibuat."
        >
          <CreateCustomerForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

CreateCustomerPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as CreateCustomerPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
