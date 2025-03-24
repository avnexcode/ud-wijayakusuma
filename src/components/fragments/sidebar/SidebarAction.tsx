import {
  SidebarGroup as SidebarGroupComponent,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { supabase } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/router";

export const SidebarAction = () => {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    void router.replace("/login");
  };
  return (
    <SidebarGroupComponent>
      <SidebarGroupLabel>Aksi</SidebarGroupLabel>
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
  );
};
