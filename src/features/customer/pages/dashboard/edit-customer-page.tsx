import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { EditCustomerForm } from "../../forms";

export const EditCustomerPageSSR: GetServerSideProps = async ({
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

type EditCustomerPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const EditCustomerPage = ({ id }: EditCustomerPageProps) => {
  return (
    <PageContainer title="Dashboard Pelanggan">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Edit Pelanggan"
          description="Halaman ini digunakan untuk mengedit data pelanggan yang sudah ada. Pengguna dapat memperbarui informasi seperti nama, email, alamat, dan nomor telepon. Setelah melakukan perubahan, pengguna dapat menyimpan data yang diperbarui atau membatalkan perubahan jika diperlukan."
        >
          <EditCustomerForm customerId={id} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

EditCustomerPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as EditCustomerPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
