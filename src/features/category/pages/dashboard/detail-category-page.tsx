import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { api } from "@/utils";
import { useParams } from "next/navigation";
import { CategoryCard } from "../../components";
import { CategoryCardSkeleton } from "../../components/skeleton";

export const DetailCategoryPage = () => {
  const params: { id: string } = useParams();
  const id = params?.id;

  const { data: category, isLoading: isCategoryLoading } =
    api.category.getById.useQuery({ id }, { enabled: !!id });

  return (
    <PageContainer>
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
  return <DashboardLayout>{page}</DashboardLayout>;
};
