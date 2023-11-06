import Link from "next/link";
import { GetStaticProps } from "next";
import helpers from "@/utils/helpers";
import { TPostFrontmatter, TPosts } from "@/utils/global.types";
import MetaSEO from "@/components/UI/MetaSEO";
import generateRSSFeed from "@/lib/rss.services";
import notionServices from "@/lib/notion.services";

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
                className="block py-4 group mb-4"
              >
                <h2 className=" text-3xl font-normal tracking-tight font-display transition-all duration-200">
                  {post.title}
                </h2>
                <div className="text-sm text-gray-500 mt-2">
                  <p className="mb-0.5 text-sm">
                    {helpers.dateFormatter(post.publishedAt)}
                  </p>
                  <p>{post.description}</p>
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
    const allPosts = await notionServices.getAllPublished();

    return {
      props: {
        posts: JSON.parse(JSON.stringify(allPosts)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
