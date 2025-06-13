import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface ComponentLinkProps {
  title: string;
  href: string;
  variant: "default" | "secondary";
}

export function ButtonLink({ title, href, variant }: ComponentLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant }), "flex items-center gap-2")}
      href={href}
    >
      {title}
    </Link>
  );
}
