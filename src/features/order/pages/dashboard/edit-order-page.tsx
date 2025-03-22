import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { EditOrderForm } from "../../forms/EditOrderForm";

export const EditOrderPageSSR: GetServerSideProps = async ({ req, params }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  const { id } = params as { id: string };

  return {
    props: { sidebarDefaultOpen, id },
  };
};

type EditOrderPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const EditOrderPage = ({ id }: EditOrderPageProps) => {
  return (
    <PageContainer title="Dashboard Pesanan">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Form Edit Pesanan"
          description="Halaman ini memungkinkan pengguna untuk mengedit pesanan yang sudah ada. Pengguna dapat memperbarui informasi pesanan seperti menambah atau menghapus produk, mengubah jumlah item, memperbarui status pesanan, dan menyesuaikan total harga sebelum menyimpan perubahan."
        >
          <EditOrderForm orderId={id} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

EditOrderPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as EditOrderPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
