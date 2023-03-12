interface MetaSEO {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

const MetaSEO = (props: MetaSEO) => {
  const { title = "", description = "", keywords = "", ogImage = "" } = props;
  return (
    <>
      <title>{`${title}`}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Vaishnav" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@vaishnavs0" />
      <meta name="twitter:title" content={title} />

      <meta property="twitter:description" content={description} />

      {ogImage ? (
        <>
          <meta property="twitter:image" content={ogImage} />
          <meta property="og:image" content={ogImage} />
        </>
      ) : null}

      {keywords ? <meta name="keywords" content={keywords} /> : null}
    </>
  );
};

export default MetaSEO;
