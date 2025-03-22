import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { api } from "@/utils";
import { type GetServerSideProps } from "next";
import { CategoryCard } from "../../components";
import { CategoryCardSkeleton } from "../../components/skeleton";

export const DetailCategoryPageSSR: GetServerSideProps = async ({
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

type DetailCategoryPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const DetailCategoryPage = ({ id }: DetailCategoryPageProps) => {
  const { data: category, isLoading: isCategoryLoading } =
    api.category.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer title="Dashboard Kategori">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Detail Kategori"
          description="Halaman ini menampilkan informasi detail mengenai sebuah kategori produk dalam sistem. Pengguna dapat melihat nama kategori, serta deskripsi dalam kategori tersebut."
        >
          {isCategoryLoading ? (
            <CategoryCardSkeleton />
          ) : (
            <CategoryCard category={category} />
          )}
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DetailCategoryPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DetailCategoryPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
