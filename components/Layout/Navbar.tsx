import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between p-4">
          <Link href="/">
            <Image
              src="/avatar.webp"
              width={36}
              height={36}
              alt=""
              className="rounded-full"
            />
          </Link>

          <div className="flex items-center gap-4 text-sm font-normal">
            <Link href="/">Blog</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
