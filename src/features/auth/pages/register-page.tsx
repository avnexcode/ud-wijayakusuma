import { PageContainer, SectionContainer } from "@/components/layouts";
import { RegisterForm } from "../forms";

export const RegisterPage = () => {
  return (
    <PageContainer>
      <SectionContainer
        padded
        container
        className="max-h-screen min-h-screen items-center justify-center"
      >
        <RegisterForm />
      </SectionContainer>
    </PageContainer>
  );
};
