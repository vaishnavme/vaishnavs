import { TTOCItem } from "@/utils/global.types";
import helpers from "@/utils/helpers";
import Link from "next/link";

interface ITableOfContent {
  tableOfContent: TTOCItem[];
}

const TableOfContent = (props: ITableOfContent) => {
  const { tableOfContent } = props;

  return (
    <div className="bg-white w-64 hidden xl:block xl:fixed left-20 rounded-lg py-4">
      <p className="text-base font-medium mb-4 px-2 font-display">
        Table Of Content
      </p>

      <ul className="w-full block">
        {tableOfContent.map((tocItem) => {
          const link = helpers.generateSlug(tocItem.text);

          return (
            <li className="w-full block" key={link}>
              <Link
                href={`#${link}`}
                className="text-xs font-medium hover:bg-pastel-slate1 hover:text-pastel-green1 focus:bg-pastel-slate1 focus:text-pastel-green1 px-2 py-3 rounded block transition-all duration-200"
              >
                {tocItem.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TableOfContent;
