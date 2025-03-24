import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { renderElements } from "@/utils/render-elements";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenu } from "./sidebar-menu";
import { SidebarAction } from "./SidebarAction";
import { SidebarGroup } from "./SidebarGroup";

export function Sidebar() {
  const pathname = usePathname();

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
        <SidebarAction />
      </SidebarContent>
    </SidebarComponent>
  );
}
