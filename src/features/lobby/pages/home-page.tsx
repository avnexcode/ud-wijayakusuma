import { PageContainer, SectionContainer } from "@/components/layouts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LobbyOrderTable } from "../tables";

export const HomePage = () => {
  return (
    <PageContainer withHeader>
      <SectionContainer padded>
        <Card className="w-full border-none shadow-none">
          <CardHeader>
            <CardTitle>Daftar Pesanan</CardTitle>
            <CardDescription>Manajemen dan monitoring pesanan</CardDescription>
          </CardHeader>
          <CardContent>
            <LobbyOrderTable />
          </CardContent>
        </Card>
      </SectionContainer>
    </PageContainer>
  );
};
