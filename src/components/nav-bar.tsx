"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogIn, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const links = [
  { name: "Home", href: "/" },
  {
    name: "About us",
    href: "/about-us",
  },
  { name: "Templates", href: "/templates" },
];

export default function NavBar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <nav className="flex h-8 bg-dpro-primary w-full z-100 justify-between items-center p-10 fixed">
      <Link href="/" className="text-3xl font-extrabold text-white">
        DemPro
      </Link>

      <div className="flex gap-8 text-white text-xl font-bold items-center">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn("hover:underline", {
                underline: pathname === link.href,
              })}
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}

        {user?.isActivated ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full hover:bg-white/10"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-white text-dpro-primary text-base">
                    {user.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-1 z-100" align="end">
              <div className="flex flex-col">
                <Link
                  href="/profile"
                  className="flex hover:bg-dpro-accent items-center h-auto text-lg px-2 gap-2 py-3"
                >
                  <User className="mr-2 size-6" />
                  Profile
                </Link>
                <button
                  className="flex items-center px-2 py-3 gap-2 text-lg hover:text-red-700"
                  onClick={logout}
                >
                  <LogIn className="mr-2 size-6" />
                  Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link
            className="text-white flex items-center hover:underline"
            href="/signin"
          >
            <LogIn className="size-6" />
            <span className="ml-2 hidden sm:inline">Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
