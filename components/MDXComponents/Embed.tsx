import { useState } from "react";

interface IEmbed {
  src: string;
  title?: string;
}
const Embed = (props: IEmbed) => {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-full">
      <iframe
        width="100%"
        height="100%"
        src={props.src}
        className="aspect-video rounded-lg"
        title=""
        allow="encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export default Embed;
