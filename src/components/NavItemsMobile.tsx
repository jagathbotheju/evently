import { navItems } from "@/lib/navItems";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import NavItems from "./NavItems";

const NavItemsMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 w-[35%]">
        <SheetHeader>
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="logo"
          />
        </SheetHeader>
        <Separator className="border border-gray-50" />
        <NavItems />
      </SheetContent>
    </Sheet>
  );
};

export default NavItemsMobile;
