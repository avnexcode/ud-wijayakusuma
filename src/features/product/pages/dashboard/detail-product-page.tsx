import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { api } from "@/utils";
import { type GetServerSideProps } from "next";
import { ProductCard } from "../../components";
import { ProductCardSkeleton } from "../../components/skeleton";

export const DetailProductPageSSR: GetServerSideProps = async ({
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

type DetailProductPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const DetailProductPage = ({ id }: DetailProductPageProps) => {
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
  const pageProps = page.props as DetailProductPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
