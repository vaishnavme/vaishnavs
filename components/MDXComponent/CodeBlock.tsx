import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useRef,
  useState,
} from "react";

const CodeBlock = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) => {
  const codeBlockWrapperRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const copyCodeBlock = () => {
    if (!codeBlockWrapperRef?.current) return;

    const preElement =
      codeBlockWrapperRef.current?.getElementsByTagName("pre")?.[0];

    if (!preElement?.textContent) return;

    navigator.clipboard.writeText(preElement.textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div ref={codeBlockWrapperRef} className="relative">
      {props.children}
      <div className="absolute transition-all ease-in-out divide-x divide-zinc-700 flex items-center top-0 right-0 text-white bg-zinc-800 rounded-lg shadow-2xl border border-zinc-700">
        {copied ? (
          <div className={`text-xs font-normal px-4`}>Copied</div>
        ) : null}
        <button
          type="button"
          onClick={copyCodeBlock}
          className="w-10 h-[38px] p-1 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
            <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;
