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
          <h1 className="text-3xl mb-5 font-display">Blog</h1>
          <p className="text-gray-600 text-base leading-6">
            Writings about my journey as a developer, learning through the
            products I build, and life experiences.
          </p>
        </div>

        <ul>
          {posts.map((post: TPostFrontmatter) => (
            <li key={post.slug} className="group">
              <Link
                href={`/blog/${post.slug}`}
                className="block p-2 group-hover:bg-pastel-slate1 focus-within:bg-pastel-slate1 focus-within:text-pastel-green1 rounded-md transition-all duration-200"
              >
                <h2 className=" text-xl font-normal group-hover:text-pastel-green1 text-inherit tracking-tight font-display transition-all duration-200 mb-1 mt-0">
                  {post.title}
                </h2>
                <div className="text-sm text-gray-500">
                  <p className="text-xs">
                    {helpers.dateFormatter(post.publishedAt)}
                  </p>
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
