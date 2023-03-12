import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-zinc-50 text-black dark:bg-black dark:text-zinc-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
