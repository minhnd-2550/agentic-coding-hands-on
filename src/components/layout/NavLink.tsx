"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
};

export function NavLink({ href, label, className = "" }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      data-active={isActive ? "true" : "false"}
      className={`text-sm font-medium transition-colors duration-200 px-3 py-2 rounded ${
        isActive
          ? "text-[#FFEA9E] underline underline-offset-8"
          : "text-white hover:bg-white/10"
      } ${className}`}
      onClick={(e) => {
        if (isActive) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      {label}
    </Link>
  );
}
