import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { api } from "@/utils";
import { useParams } from "next/navigation";
import { ProductCardSkeleton } from "../../components/skeleton";
import { ProductCard } from "../../components";

export const DetailProductPage = () => {
  const params: { id: string } = useParams();
  const id = params?.id;

  const { data: product, isLoading: isProductLoading } =
    api.product.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection title="Dashboard - Detail Produk">
          {isProductLoading ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DetailProductPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
