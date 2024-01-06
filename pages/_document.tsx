import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Rufina&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/peerlist-mask-icon.svg" color="#fdffde" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon512.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon512.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/favicon512.png" />
        <link rel="icon" sizes="192x192" href="/favicon512.png" />
        <link rel="icon" sizes="128x128" href="/favicon512.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
