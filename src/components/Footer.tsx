import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex flex-col text-center p-5 gap-4 items-center">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="logo"
          />
        </Link>

        <p>2023 Evently. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
