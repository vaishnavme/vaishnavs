import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout(props) {
  const { children } = props;
  return (
    <>
      <div className="mx-auto max-w-6xl px-0 md:px-6 lg:px-10 w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20 min-h-screen">
        <div className="pt-4">
          <Navbar />
        </div>
        <main className="max-w-5xl mx-auto px-4 md:px-10 pt-28">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
