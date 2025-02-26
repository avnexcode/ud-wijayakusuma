import { PageContainer, SectionContainer } from "@/components/layouts";
import { LoginForm } from "../forms";

export const LoginPage = () => {
  return (
    <PageContainer>
      <SectionContainer
        padded
        container
        className="max-h-screen min-h-screen items-center justify-center"
      >
        <LoginForm />
      </SectionContainer>
    </PageContainer>
  );
};
