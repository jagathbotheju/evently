"use client";
import { navItems } from "@/lib/navItems";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="flex md:justify-between w-full flex-col items-start gap-5 md:flex-row">
      {navItems.map((item, index) => {
        const isActive = pathname === item.href;

        return (
          <li
            key={index}
            className={cn(
              "flex-col whitespace-nowrap",
              isActive && "font-bold text-primary"
            )}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
