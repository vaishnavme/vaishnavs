import Head from "next/head";

interface IMetaSEO {
  title: string;
  description: string;
  ogImage?: string;
}

const MetaSEO = (props: IMetaSEO) => {
  const { title = "", description = "", ogImage = null } = props;
  return (
    <Head>
      {/* <!-- Primary Meta Tags --> */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://vaishnavs.vercel.io" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://vaishnavs.vercel.io" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {ogImage && <meta property="twitter:image" content={ogImage} />}
    </Head>
  );
};

export default MetaSEO;
