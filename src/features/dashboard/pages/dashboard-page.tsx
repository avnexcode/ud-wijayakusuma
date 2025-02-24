import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const DashboardPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      void router.replace({ pathname: router.pathname, query: {} }, undefined, {
        shallow: true,
      });
    }
  }, [router]);
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection title="Dashboard">
          <h1>Hello Dashboard</h1>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardPage.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
