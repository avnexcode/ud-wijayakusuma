import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { api } from "@/utils";
import { useParams } from "next/navigation";
import { OrderCardSkeleton } from "../../components/skeleton";
import { OrderCard } from "../../components";

export const DetailOrderPage = () => {
  const params: { id: string } = useParams();
  const id = params?.id;
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
  return <DashboardLayout>{page}</DashboardLayout>;
};
