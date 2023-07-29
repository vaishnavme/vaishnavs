import Link from "next/link";
import { GetStaticProps } from "next";
import blogService from "@/lib/blog.services";
import helpers from "@/utils/helpers";
import { TPostFrontmatter, TPosts } from "@/utils/global.types";
import MetaSEO from "@/components/UI/MetaSEO";

const Home = (props: TPosts) => {
  const { posts } = props;

  return (
    <>
      <MetaSEO
        title="Vaishnav's NoteBook"
        description="Writings about my journey as a developer, learning through the
            products I build, and life experiences."
      />
      <div>
        <div className="mb-10">
          <h1 className="text-5xl mb-5 font-display">Blog</h1>
          <p className="text-gray-500 text-base font-light leading-7">
            Writings about my journey as a developer, learning through the
            products I build, and life experiences.
          </p>
        </div>

        <ul>
          {posts.map((post: TPostFrontmatter) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className=" border-b border-gray-100 block py-4 group"
              >
                <h2 className="text-[28px] font-normal tracking-tight font-display group-hover:text-purple-500 transition-all duration-200">
                  {post.title}
                </h2>
                <div className="text-sm text-gray-500 mt-2">
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
    </>
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
