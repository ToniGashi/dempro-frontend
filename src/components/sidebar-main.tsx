"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { UserRound, File, CalendarPlus2, MessagesSquare } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";

const useMenuItems = () => {
  return useMemo(() => {
    const allItems = [
      // {
      //   title: "Notifications",
      //   icon: <Bell stroke="#3c6e71" />,
      //   url: `/notifications`,
      // },
      {
        title: "Projects",
        icon: <File stroke="#3c6e71" />,
        url: `/projects`,
      },
      // {
      //   title: "Chat",
      //   icon: <MessageCircle stroke="#3c6e71" />,
      //   url: `/chat`,
      // },
      {
        title: "Threads",
        icon: <MessagesSquare stroke="#3c6e71" />,
        url: `/threads`,
      },
      // {
      //   title: "Community",
      //   icon: <Users stroke="#3c6e71" />,
      //   url: `/community`,
      // },
      // {
      //   title: "Calendar",
      //   icon: <CalendarPlus2 stroke="#3c6e71" />,
      //   url: `/calendar`,
      // },
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
