import Link from "next/link";
import Icon from "../UIElements/SVGIcons";

const SOCIAL_LINK = [
  {
    label: "Peerlist",
    icon: <Icon.Peerlist size={20} />,
    href: `https://peerlist.io/vaishnavs`,
  },
  {
    label: "Github",
    icon: <Icon.Github strokeWidth={1.2} size={20} />,
    href: `https://github.com/vaishnavme`,
  },
  {
    label: "Twitter",
    icon: <Icon.Twitter strokeWidth={1.2} size={20} />,
    href: `https://twitter.com/vaishnavs0`,
  },
];

const Footer = () => {
  return (
    <footer className="mx-auto max-w-6xl px-0 md:px-6 lg:px-10 w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20 py-10">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-10 ">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            {SOCIAL_LINK.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full bg-white/90 px-3 py-2 hover:shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
              >
                {link.icon}
              </Link>
            ))}
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 text-xs">
            <span className="mr-1">©</span>
            {new Date().getFullYear()} Vaishnav Chandurkar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
