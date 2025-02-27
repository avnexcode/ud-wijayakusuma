import { PageContainer, SectionContainer } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export const Error404Page = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <PageContainer>
      <SectionContainer
        container
        className="h-screen max-h-screen justify-center"
      >
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
            <span className="text-5xl">404</span>
          </div>

          <Heading size={"h3"} className="mb-3">
            Halaman Tidak Ditemukan
          </Heading>

          <p className="mb-8 max-w-md text-zinc-500 dark:text-zinc-400">
            Halaman yang Anda cari mungkin telah dihapus, namanya telah berubah,
            atau sementara tidak tersedia.
          </p>

          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Kembali ke Halaman Sebelumnya
          </Button>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};
