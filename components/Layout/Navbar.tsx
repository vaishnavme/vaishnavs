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
        className="font-display text-3xl transition-all hover:text-purple-500"
      >
        va
      </Link>

      <div className="flex items-center gap-4">
        {navbarlinks.map((page) => (
          <Link
            key={page.label}
            href={page.link}
            className={`transition-all ${
              router.pathname === page.link
                ? "hover:text-purple-500"
                : "text-gray-400 font-light"
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
