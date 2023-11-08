import Link from "next/link";
import { useRouter } from "next/router";

const navbarlinks = [
  {
    label: "blog",
    link: "/",
  },
  {
    label: "about",
    link: "/about",
  },
];

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full flex items-center justify-between p-4">
      <Link
        href="/"
        className="font-display text-3xl transition-all hover:text-pastel-green1 focus:text-pastel-green1"
      >
        <img
          src="/avatar.svg"
          className="w-10 h-10 hover:border rounded-full hover:bg-orange-100 transition-all duration-400 hover:scale-110"
        />
      </Link>

      <div className="flex items-center gap-4">
        {navbarlinks.map((page) => (
          <Link
            key={page.label}
            href={page.link}
            className={`transition-all hover:text-pastel-green1 focus:text-pastel-green1 ${
              router.pathname === page.link
                ? "text-pastel-green1"
                : "text-gray-600"
            }`}
          >
            {page.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
