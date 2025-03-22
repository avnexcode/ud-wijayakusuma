import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const DashboardPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type DashboardPageProps = {
  sidebarDefaultOpen: boolean;
};

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
    <PageContainer title="Dashboard">
      <SectionContainer padded>
        <DashboardSection title="Dashboard">
          <h1>Hello Dashboard</h1>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
