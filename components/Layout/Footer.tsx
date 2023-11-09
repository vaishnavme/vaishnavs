const footerlinks = [
  {
    name: "Peerlist",
    link: "https://peerlist.io/vaishnavs",
  },
  {
    name: "Github",
    link: "https://github.com/vaishnavme",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/vaishnavs0",
  },
];

const Footer = () => (
  <div className="mb-auto flex flex-col justify-end h-full">
    <footer className="flex items-center justify-between text-xs text-gray-500 py-6 px-4 border-t">
      <div>©{new Date().getFullYear()} Vaishnav </div>
      <div>
        <ul className="flex items-center justify-between gap-4">
          {footerlinks.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-all duration-200"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  </div>
);

export default Footer;
