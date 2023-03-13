import Head from "next/head";

interface MetaSEO {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

const MetaSEO = (props: MetaSEO) => {
  const { title = "", description = "", keywords = "", ogImage = "" } = props;

  return (
    <Head>
      {/* HTML Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://vaishnavs.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="vaishnavs.vercel.app" />
      <meta property="twitter:url" content="https:vaishnavs.vercel.app" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {ogImage ? (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="twitter:image" content={ogImage} />
        </>
      ) : null}

      {keywords ? <meta name="keywords" content={keywords} /> : null}
    </Head>
  );
};

export default MetaSEO;
