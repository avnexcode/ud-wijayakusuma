import {
  SidebarGroup as SidebarGroupComponent,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { renderElements } from "@/utils/render-elements";
import { SidebarItem } from "./SidebarItem";
import { type SidebarMenuItemType } from "./sidebar-menu";

type SidebarGroupProps = {
  pathname: string;
  label: string;
  menu: SidebarMenuItemType[];
};

export const SidebarGroup = (props: SidebarGroupProps) => {
  return (
    <SidebarGroupComponent>
      <SidebarGroupLabel>{props.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {renderElements({
            of: props.menu,
            keyExtractor: (menu) => menu.title,
            render: (menu) => (
              <SidebarItem
                pathname={props.pathname}
                type={menu.type}
                title={menu.title}
                url={menu.url}
                icon={menu.icon}
                subMenu={menu.subMenu ?? []}
                active={menu.active}
              />
            ),
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroupComponent>
  );
};
