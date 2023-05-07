import Link from "next/link";
import helpers from "@/utils/helpers";
import { Post } from "@/utils/types";
import Icon from "../UIElements/SVGIcons";

interface IBlogCardProps {
  post: Post;
}

const BlogCard = (props: IBlogCardProps) => {
  const { post } = props;

  const date = helpers.getDate(post.date);

  return (
    <article className="group">
      <div className="md:col-span-3 group relative flex flex-col items-start">
        <h2 className="text-sm sm:text-base text-zinc-100">
          <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl rounded-md"></div>
          <Link href={`/blog/${post.slug}`}>
            <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
            <span className="relative z-10">{post.title}</span>
          </Link>
        </h2>

        <p className="relative z-10 mt-2 text-sm text-zinc-400 line-clamp-2">
          {post.description}
        </p>
        <div
          aria-hidden="true"
          className="relative z-10 mt-4 flex items-center text-sm font-medium gap-1"
        >
          Read article
          <Icon.ArrowRight
            className="group-hover:translate-x-1 transition-all"
            size={14}
            strokeWidth={2}
          />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
