import { ReactNode } from "react";
import Navbar from "./Navbar";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const { children } = props;

  return (
    <div className="mx-auto max-w-2xl">
      <Navbar />
      <main className="p-4 my-10">{children}</main>
    </div>
  );
};

export default Layout;
