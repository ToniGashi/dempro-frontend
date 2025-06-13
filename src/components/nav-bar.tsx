"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  {
    name: "About us",
    href: "/about-us",
  },
  { name: "Resources", href: "/resources" },
];
export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="flex h-24 bg-dpro-primary w-full z-100 justify-between items-center p-10">
      <Link href="/" className="text-5xl font-extrabold text-white">
        DemPro
      </Link>
      <div className="flex gap-5 text-white text-3xl font-bold">
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
      </div>
    </nav>
  );
}
