import { PageContainer, SectionContainer } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/router";

export const Error500Page = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.reload();
  };

  const handleGoHome = () => {
    void router.push("/");
  };

  return (
    <PageContainer>
      <SectionContainer
        container
        className="h-screen max-h-screen justify-center"
      >
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
            <span className="text-5xl">500</span>
          </div>

          <Heading size={"h3"} className="mb-3">
            Kesalahan Server
          </Heading>

          <p className="mb-8 max-w-md text-zinc-500 dark:text-zinc-400">
            Maaf, telah terjadi kesalahan pada server kami. Tim teknis kami
            sedang bekerja untuk menyelesaikan masalah ini.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="outline"
              onClick={handleRefresh}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Muat Ulang Halaman
            </Button>

            <Button variant="default" onClick={handleGoHome}>
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};
