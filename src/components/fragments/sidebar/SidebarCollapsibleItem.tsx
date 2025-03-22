import { Icon } from "@/components/ui/icon";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { isPathMatchingPattern } from "@/utils";
import { type icons } from "lucide-react";
import Link from "next/link";
import { type SidebarSubMenuItemType } from "./sidebar-menu";

type SidebarCollapsibleItemProps = {
  pathname: string;
  setCollapsibleOpen: (isCollapsibleOpen: boolean) => void;
} & SidebarSubMenuItemType;

export const SidebarCollapsibleItem = ({
  ...props
}: SidebarCollapsibleItemProps) => {
  const isExactMatch = props.pathname === props.url;

  const isActivePatternMatch =
    Array.isArray(props.active) &&
    props.active.some((activePattern) =>
      isPathMatchingPattern(props.pathname, activePattern),
    );

  const activeLink = isExactMatch || isActivePatternMatch;

  return (
    <SidebarMenuButton asChild isActive={activeLink}>
      <Link href={props.url}>
        <Icon
          name={props.icon as keyof typeof icons}
          size={40}
          className="mr-1"
        />
        <span>{props.title}</span>
      </Link>
    </SidebarMenuButton>
  );
};
