import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { api } from "@/utils";
import { type GetServerSideProps } from "next";
import { OrderCard } from "../../components";
import { OrderCardSkeleton } from "../../components/skeleton";

export const DetailOrderPageSSR: GetServerSideProps = async ({
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

type DetailOrderPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const DetailOrderPage = ({ id }: DetailOrderPageProps) => {
  const { data: order, isLoading: isOrderLoading } = api.order.getById.useQuery(
    { id },
    { enabled: !!id },
  );

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Detail Pesanan"
          description="Halaman ini memberikan informasi lebih rinci mengenai suatu pesanan, termasuk daftar produk yang dipesan, jumlah, harga per item, metode pembayaran, dan status pengiriman."
        >
          {isOrderLoading ? <OrderCardSkeleton /> : <OrderCard order={order} />}
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DetailOrderPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DetailOrderPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
