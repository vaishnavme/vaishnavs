import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Icon from "../UIElements/SVGIcons";

function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-10">
      <nav className="flex items-center justify-between w-full max-w-5xl py-2">
        <Link href="/" className="group">
          <div className="flex items-center gap-2">
            <Image
              src="/images/vaishnav_chandurkar.jpeg"
              width={40}
              height={40}
              alt="Vaishnav Chandurkar"
              className="rounded-full object-cover w-10 h-10 group-hover:shadow-2xl"
            />
            <div>
              <h1 className="font-normal text-base leading-5">Vaishnav</h1>
              <p className="text-xs text-zinc-800 dark:text-zinc-100">
                & I code
              </p>
            </div>
          </div>
        </Link>
        <div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
          >
            {mounted && (
              <>
                {theme === "dark" ? (
                  <Icon.Sun size={20} strokeWidth={1.5} />
                ) : (
                  <Icon.Moon size={20} strokeWidth={1.5} />
                )}
              </>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
