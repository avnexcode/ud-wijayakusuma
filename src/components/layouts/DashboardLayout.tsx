import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "../fragments/navbar-dashboard";
import { Sidebar } from "../fragments/sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
  sidebarDefaultOpen?: boolean;
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarDefaultOpen,
}) => {
  return (
    <SidebarProvider defaultOpen={sidebarDefaultOpen ?? false}>
      <Sidebar />
      <main className="w-full">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
};
