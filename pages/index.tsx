import Head from "next/head";
import notionServices from "@/lib/notion-services";
import { BlogCard } from "@/components/Blog";
import { Post, Posts } from "@/utils/types";
import MetaSEO from "@/components/UIElements/MetaSEO";
import rufina from "@/components/UIElements/Font";
import Illustration from "@/components/UIElements/SVGIcons/illustrations";

export default function Home(props: Posts) {
  const { posts } = props;

  const metaOG = {
    title: "Vaishnav Chandurkar",
    description: "Software Engineer @Peerlist",
    keywords: "Engineer, Frontend Developer, Developer",
  };

  return (
    <>
      <MetaSEO
        title="Blog | Vaishnav Chandurkar"
        description="Software Engineer @Peerlist"
        keywords="Engineer, Frontend Developer, Developer"
      />
      <div>
        <div className="max-w-2xl mb-10">
          <h1
            className={`${rufina.className} text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100`}
          >
            My Journey in Software Development Through Projects, Tutorials, and
            Insights
          </h1>
        </div>

        {posts && posts.length === 0 ? (
          <div className="max-w-fit flex flex-col items-center">
            <Illustration.Thinking size={200} />
            <span
              className={`${rufina.className} font-thin mt-1 italic text-xs`}
            >
              Thinking... & Writing...
            </span>
          </div>
        ) : null}

        {posts && posts.length > 0 && (
          <ul className="flex max-w-3xl flex-col space-y-16 pb-10">
            {posts.map((post: Post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const posts = await notionServices.getAllPublished();

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (apiError) {
    return {
      props: {
        posts: null,
      },
    };
  }
}
