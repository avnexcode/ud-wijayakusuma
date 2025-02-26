import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { renderElements } from "@/utils/render-elements";
import { LogOut } from "lucide-react";
import { sidebarMenu } from "./sidebar-menu";
import { SidebarGroup } from "./SidebarGroup";
import { SidebarGroup as SidebarGroupComponent } from "@/components/ui/sidebar";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/router";

export function Sidebar() {
  const router = useRouter();
  const logout = async () => {
    await supabase.auth.signOut();
    void router.replace("/login");
  };
  return (
    <SidebarComponent collapsible="icon">
      <SidebarContent>
        <SidebarHeader className="text-nowrap py-4 text-center text-xl font-bold">
          <Link href={"/"}>UD WIJAYAKUSUMA</Link>
        </SidebarHeader>
        {renderElements({
          of: sidebarMenu,
          keyExtractor: (sidebar) => sidebar.label,
          render: (sidebar) => (
            <SidebarGroup label={sidebar.label} menu={sidebar.menu} />
          ),
        })}
        <SidebarGroupComponent className="absolute bottom-5 w-full">
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
