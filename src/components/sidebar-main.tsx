"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import {
  UserRound,
  Bell,
  File,
  MessageCircle,
  Users,
  CalendarPlus2,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";

const useMenuItems = () => {
  return useMemo(() => {
    const allItems = [
      {
        title: "Profile",
        icon: <UserRound stroke="#3c6e71" />,
        url: `/profile`,
        route: "dashboard",
      },
      {
        title: "Notifications",
        icon: <Bell stroke="#3c6e71" />,
        url: `/notifications`,
        route: "dashboard",
      },
      {
        title: "Documents",
        icon: <File stroke="#3c6e71" />,
        url: `/documents`,
        route: "dashboard",
      },
      {
        title: "Chat",
        icon: <MessageCircle stroke="#3c6e71" />,
        url: `/chat`,
        route: "dashboard",
      },
      {
        title: "Groups",
        icon: <Users stroke="#3c6e71" />,
        url: `/groups`,
        route: "dashboard",
      },
      {
        title: "Calendar",
        icon: <CalendarPlus2 stroke="#3c6e71" />,
        url: `/calendar`,
        route: "dashboard",
      },
    ];

    // const mainItems = allItems.filter((item) => hasAccess(item.route));

    return { allItems };
  }, []);
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
            <Link className="w-full! flex p-7" href={item.url}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
