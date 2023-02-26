import Link from "next/link";
import { helpers } from "utils/helpers";
import Icon from "../UIElements/SVGIcons/icons";

interface IBlogCardProps {
  post: { [key: string]: string };
}

const BlogCard = (props: IBlogCardProps) => {
  const { post } = props;

  const date = helpers.getDate(post.date);

  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <div className="md:col-span-3 group relative flex flex-col items-start">
        <h2 className="text-base font-medium tracking-wide text-zinc-800 dark:text-zinc-100">
          <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
          <Link href={`/blog/${post.slug}`}>
            <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
            <span className="relative z-10">{post.title}</span>
          </Link>
        </h2>

        <time className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
          <span
            className="absolute inset-y-0 left-0 flex items-center"
            aria-hidden="true"
          >
            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
          </span>
          {date}
        </time>
        <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>
        <div
          aria-hidden="true"
          className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
        >
          Read article
          <Icon.CheveronRight size={14} strokeWidth={2} />
        </div>
      </div>
      <time className="mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500">
        {date}
      </time>
    </article>
  );
};

export default BlogCard;
