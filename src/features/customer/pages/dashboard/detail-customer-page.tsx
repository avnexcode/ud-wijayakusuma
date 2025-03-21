import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { api } from "@/utils";
import { type GetServerSideProps } from "next";
import { CustomerCard } from "../../components";
import { CustomerCardSkeleton } from "../../components/skeleton";

export const DetailCustomerPageSSR: GetServerSideProps = async ({
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

type DetailCustomerPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const DetailCustomerPage = ({ id }: DetailCustomerPageProps) => {
  const { data: customer, isLoading: isCustomerLoading } =
    api.customer.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Detail Pelanggan"
          description="Halaman ini menampilkan informasi lengkap tentang seorang pelanggan tertentu. Detail yang disajikan mencakup data pribadi, riwayat transaksi atau pesanan, serta opsi untuk mengedit atau menghapus pelanggan dari sistem. Halaman ini memungkinkan admin untuk mengelola informasi pelanggan secara lebih mendalam."
        >
          {isCustomerLoading ? (
            <CustomerCardSkeleton />
          ) : (
            <CustomerCard customer={customer} />
          )}
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DetailCustomerPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DetailCustomerPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
