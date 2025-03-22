import { Icon } from "@/components/ui/icon";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { isPathMatchingPattern } from "@/utils";
import { type icons } from "lucide-react";
import Link from "next/link";
import { type SidebarMenuItemType } from "./sidebar-menu";
import { SidebarCollapsible } from "./SidebarCollapsible";

type SidebarItemProps = {
  pathname: string;
} & SidebarMenuItemType;

export const SidebarItem = (props: SidebarItemProps) => {
  const isExactMatch = props.pathname === props.url;

  const isActivePatternMatch =
    Array.isArray(props.active) &&
    props.active.some((activePattern) =>
      isPathMatchingPattern(props.pathname, activePattern),
    );

  const activeLink = isExactMatch || isActivePatternMatch;

  return (
    <>
      {props.type === "Single" && (
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={activeLink}>
            <Link href={props.url ?? ""}>
              <Icon
                name={props.icon as keyof typeof icons}
                size={40}
                className="mr-1"
              />
              <span>{props.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
      {props.type === "Collapsible" && (
        <SidebarCollapsible
          pathname={props.pathname}
          title={props.title}
          icon={props.icon}
          subMenu={props.subMenu}
        />
      )}
    </>
  );
};
