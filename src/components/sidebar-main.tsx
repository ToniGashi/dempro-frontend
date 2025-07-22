"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { File, Flag, MessagesSquare } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { useRoles } from "@/hooks/use-roles";
import { UserRole } from "@/lib/roles";

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  url: string;
  requiredRole?: UserRole; // only this role
  requiredRoles?: UserRole[]; // (any of these roles)
  hideForRoles?: UserRole[]; // hide for specific roles
};

const useMenuItems = () => {
  const { hasRole, hasRoles } = useRoles();
  return useMemo(() => {
    const allItems: MenuItem[] = [
      {
        title: "Projects",
        icon: <File stroke="currentColor" />,
        url: `/projects`,
        requiredRoles: [
          UserRole.ADMIN,
          UserRole.CONTRIBUTOR,
          UserRole.REVIEWER,
          UserRole.USER,
        ],
      },
      {
        title: "Threads",
        icon: <MessagesSquare stroke="currentColor" />,
        url: `/threads`,
        requiredRoles: [
          UserRole.ADMIN,
          UserRole.CONTRIBUTOR,
          UserRole.REVIEWER,
          UserRole.USER,
        ],
      },
      {
        title: "Flagged Content",
        icon: <Flag stroke="currentColor" />,
        url: `/flagged-content`,
        requiredRoles: [UserRole.ADMIN, UserRole.REVIEWER],
      },
    ];

    const filteredItems = allItems.filter((item) => {
      if (item.requiredRole && !hasRole(item.requiredRole)) {
        return false;
      }
      // (exact match - user must have one of these roles)
      if (item.requiredRoles && !hasRoles(item.requiredRoles)) {
        return false;
      }
      if (item.hideForRoles && hasRoles(item.hideForRoles)) {
        return false;
      }

      return true;
    });

    return { allItems: filteredItems };
  }, [hasRole, hasRoles]);
};

export const SidebarMain = () => {
  const pathname = usePathname();

  const { allItems } = useMenuItems();

  return (
    <SidebarMenu className=" w-full p-2">
      {allItems.map((item) => (
        <SidebarMenuItem key={item.title} className="h-16 w-full! flex-auto!">
          <SidebarMenuButton
            asChild
            isActive={item.url === pathname}
            tooltip={item.title}
            className="h-16! w-full!"
          >
            <Link
              className="w-full! flex p-7 text-dpro-primary"
              href={item.url}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
