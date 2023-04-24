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
    <footer className="mb-0 border-t border-zinc-300/20 p-4 sm:p-6 bottom-0">
      <div className="mx-auto max-w-2xl flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {SOCIAL_LINK.map((social) => (
            <Link
              key={social.href}
              href={social.href}
              className="text-xs text-zinc-200 hover:text-white hover:underline transition-all"
            >
              {social.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-zinc-200 hover:text-white ">
          © Vaishnav Chandurkar
        </p>
      </div>
    </footer>
  );
};

export default Footer;
