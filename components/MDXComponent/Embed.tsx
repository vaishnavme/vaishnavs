interface IEmbed {
  src: string;
  title?: string;
  type?: string;
}

const YouTube = ({ src, title }: { src: string; title?: string }) => (
  <div className="w-full h-full">
    <iframe
      width="100%"
      height="100%"
      src={src}
      className="aspect-video rounded-lg"
      title={title}
      allow="encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
);

const CodeSandbox = ({ src, title }: { src: string; title?: string }) => (
  <div className="w-full h-full">
    <iframe
      width="100%"
      height="100%"
      src={src}
      className="rounded-lg h-96"
      title={title}
      allow="encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
);

const Embed = (props: IEmbed) => {
  const { src, type, title = "" } = props;

  switch (type) {
    case "YOUTUBE": {
      return <YouTube src={src} title={title} />;
    }

    case "CODESANDBOX": {
      return <CodeSandbox src={src} title={title} />;
    }

    default:
      return null;
  }
};

export default Embed;
