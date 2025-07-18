"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogIn, User, Menu, File, MessagesSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const topLinks = [
  { name: "Home", href: "/" },
  { name: "About us", href: "/about-us" },
  { name: "Templates", href: "/templates" },
];

const allItems = [
  {
    title: "Projects",
    icon: <File stroke="#fff" size={18} />,
    url: "/projects",
  },
  {
    title: "Threads",
    icon: <MessagesSquare stroke="#fff" size={18} />,
    url: "/threads",
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50 h-19
        bg-dpro-primary
        flex items-center justify-between
        px-4 sm:px-6 lg:px-10
        py-3 md:py-4
      "
    >
      {/* Logo */}
      <Link href="/" className="text-2xl sm:text-3xl font-extrabold text-white">
        DemPro
      </Link>

      {/* Desktop links + user menu */}
      <div className="hidden md:flex items-center gap-8">
        {topLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-white text-lg font-bold hover:underline px-2 py-1 rounded",
              { underline: pathname === link.href }
            )}
          >
            {link.name}
          </Link>
        ))}

        {user?.isActivated ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="relative p-0 h-10 w-10 rounded-full hover:bg-white/10"
              >
                <Avatar className="h-10 w-10">
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
            <PopoverContent className="w-48 p-1" align="end">
              <div className="flex flex-col">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 text-lg hover:bg-dpro-accent rounded"
                >
                  <User size={18} /> Profile
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 text-lg hover:text-red-700 rounded hover:cursor-pointer"
                >
                  <LogIn size={18} /> Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link
            href="/signin"
            className="flex font-bold items-center gap-2 text-white text-lg hover:underline"
          >
            <LogIn strokeWidth={3} size={20} /> Sign In
          </Link>
        )}
      </div>

      {/* Mobile hamburger menu */}
      <div className="md:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="p-2 text-white">
              <Menu size={24} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-2 bg-dpro-primary">
            <div className="flex flex-col gap-1">
              {/* primary nav links */}
              {topLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-3 py-2 text-white text-base font-bold rounded hover:bg-white/10",
                    { underline: pathname === link.href }
                  )}
                >
                  {link.name}
                </Link>
              ))}

              <hr className="my-2 border-white/30" />

              {/* allItems links */}
              {allItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="flex items-center gap-2 px-3 py-2 text-white text-base rounded hover:bg-white/10"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}

              <hr className="my-2 border-white/30" />

              {/* profile/logout or sign in */}
              {user?.isActivated ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 text-white text-base hover:bg-white/10 rounded"
                  >
                    <User size={18} /> Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 text-white text-base hover:text-red-400 rounded hover:cursor-pointer"
                  >
                    <LogIn size={18} /> Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/signin"
                  className="flex items-center gap-2 px-3 py-2 text-white text-base hover:bg-white/10 rounded"
                >
                  <LogIn size={20} /> Sign In
                </Link>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
