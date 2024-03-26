const OGTemplate = ({
  title,
  publishedAt,
}: {
  title: string;
  publishedAt: string;
}) => (
  <div
    style={{
      width: "1200px",
      height: "630px",
      position: "relative",
      padding: "3.5rem",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
    }}
  >
    <div
      style={{
        display: "flex",
        padding: "1.5rem",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "1rem",
        width: "100%",
        height: "100%",
        backgroundColor: "#fafafa",
      }}
    >
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            marginBottom: "2.5rem",
            fontSize: "2rem",
            lineHeight: "1.75rem",
            color: "#212121",
            fontFamily: "Fraunces_144pt_Soft-Regular",
            fontWeight: 400,
          }}
        >
          {publishedAt}
        </p>
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: 400,
            letterSpacing: "-0.025rem",
            fontFamily: "Fraunces_144pt_Soft-Regular",
          }}
        >
          {title}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <p
          style={{
            fontSize: "2rem",
            lineHeight: "1.25rem",
            fontWeight: 600,
            color: "#1F2937",
            marginBottom: "0px",
          }}
        >
          Vaishnav
        </p>
        <p
          style={{
            color: "#4B5563",
            fontSize: "1.8rem",
            lineHeight: "1.25rem",
            fontWeight: 500,
            marginBottom: "0px",
          }}
        >
          vaishnavs.xyz
        </p>
      </div>
    </div>
  </div>
);

export default OGTemplate;
