import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fraunces } from "@/pages/_app";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const { children } = props;

  return (
    <div
      className={`${fraunces.variable} mx-auto max-w-2xl flex flex-col h-screen`}
    >
      <Navbar />
      <main className="p-4 my-10 pb-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
