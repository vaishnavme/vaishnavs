import helpers from "@/utils/helpers";
import Head from "next/head";

interface IMetaSEO {
  title: string;
  description: string;
  ogImage?: string;
  url?: string;
}

const defaultImage = helpers.getAbsoluteURL("vaishnavs.png");

const MetaSEO = (props: IMetaSEO) => {
  const {
    title = "",
    description = "",
    ogImage = defaultImage,
    url = process.env.NEXT_PUBLIC_FE_URL,
  } = props;
  return (
    <Head>
      {/* <!-- Primary Meta Tags --> */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="@vaishnavs0" />
      <meta name="twitter:site" content="@vaishnavs0" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {ogImage ? (
        <>
          <meta name="twitter:image" content={ogImage} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="628" />
        </>
      ) : null}
    </Head>
  );
};

export default MetaSEO;
