import { ThemeToggle } from "@/components/actions/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/utils";

export const Navbar = () => {
  const { data: profile, isLoading: isProfileLoading } =
    api.user.getProfile.useQuery();
  return (
    <nav className="flex w-full items-center justify-between px-2 py-3">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="" />
        <h1>Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        {isProfileLoading && <Skeleton className="h-4 w-64" />}
        <span>{profile?.email}</span>
        <ThemeToggle />
      </div>
    </nav>
  );
};
