import Image from "next/image";
import Link from "next/link";
import AuthButton from "./AuthButton";
import NavItems from "./NavItems";
import NavItemsMobile from "./NavItemsMobile";

const Header = () => {
  return (
    <div className="w-full border-b">
      <div className="max-w-7xl w-full lg:mx-auto container p-5 flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="logo"
          />
        </Link>

        {/* nav items */}
        <nav className="md:flex hidden w-full max-w-xs">
          <NavItems />
        </nav>

        <div className="w-32 justify-end flex gap-3 items-center">
          <AuthButton />
          <nav className="md:hidden flex">
            <NavItemsMobile />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
