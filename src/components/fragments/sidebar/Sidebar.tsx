import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup as SidebarGroupComponent,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { supabase } from "@/lib/supabase/client";
import { renderElements } from "@/utils/render-elements";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { sidebarMenu } from "./sidebar-menu";
import { SidebarGroup } from "./SidebarGroup";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await supabase.auth.signOut();
    void router.replace("/login");
  };

  return (
    <SidebarComponent collapsible="icon">
      <SidebarContent>
        <SidebarHeader className="text-nowrap py-4 text-center text-xl font-bold">
          <Link href={"/"} className="ml-0.5 flex items-center gap-3">
            <span>UD</span>
            <span>WIJAYAKUSUMA</span>
          </Link>
        </SidebarHeader>
        {renderElements({
          of: sidebarMenu,
          keyExtractor: (sidebar) => sidebar.label,
          render: (sidebar) => (
            <SidebarGroup
              label={sidebar.label}
              menu={sidebar.menu}
              pathname={pathname}
            />
          ),
        })}
        <SidebarGroupComponent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="py-5" onClick={logout}>
                  <LogOut />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroupComponent>
      </SidebarContent>
    </SidebarComponent>
  );
}
