import Link from "next/link";
import { GetStaticProps } from "next";
import blogService from "@/lib/blog.services";
import font from "@/components/UI/Font";
import helpers from "@/utils/helpers";
import { TPostFrontmatter, TPosts } from "@/utils/global.types";

const Home = (props: TPosts) => {
  const { posts } = props;

  return (
    <div>
      <div className="mb-10">
        <h1 className={`${font.rufina} text-5xl mb-5`}>Blog</h1>
        <p className="text-gray-400 text-base font-light">
          Writings about my journey as a developer, learning through the
          products I build, and life experiences.
        </p>
      </div>

      <ul>
        {posts.map((post: TPostFrontmatter) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className=" border-b border-gray-100 block py-4"
            >
              <h2 className={`${font.rufina} text-[28px]`}>{post.title}</h2>
              <div className="text-sm font-light text-gray-400 mt-2">
                <p className="mb-4 text-sm">
                  {helpers.dateFormatter(post.publishedAt)} •{" "}
                  <span>{post.readTime.text}</span>
                </p>
                <p>{post.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const allArticles = await blogService.getAllPublished();

    return {
      props: {
        posts: JSON.parse(JSON.stringify(allArticles)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
