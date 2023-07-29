import Link from "next/link";

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
  return (
    <nav className="w-full flex items-center justify-between p-4">
      <Link href="/">VA</Link>

      <div className="flex items-center gap-4">
        {navbarlinks.map((page) => (
          <Link key={page.label} href={page.link}>
            {page.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
