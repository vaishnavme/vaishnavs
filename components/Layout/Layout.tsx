import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ILayoutProps {
  children: ReactNode;
}

function Layout(props: ILayoutProps) {
  const { children } = props;
  return (
    <>
      <div className="w-full h-screen relative">
        <Navbar />
        <main className="max-w-2xl mx-auto p-4">{children}</main>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
