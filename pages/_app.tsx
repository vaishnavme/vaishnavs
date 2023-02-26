import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Layout } from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <ThemeProvider attribute="class">
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}
