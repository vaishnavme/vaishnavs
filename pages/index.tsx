import Head from "next/head";
import notionServices from "@/lib/notion-services";
import { BlogCard } from "@/components/Blog";
import { Post, Posts } from "@/utils/types";
import rufina from "@/components/UIElements/font";
import MetaSEO from "@/components/UIElements/MetaSEO";

export default function Home(props: Posts) {
  const { posts } = props;

  const metaOG = {
    title: "Vaishnav Chandurkar",
    description: "Software Engineer @Peerlist",
    keywords: "Engineer, Frontend Developer, Developer",
  };

  return (
    <>
      <Head>
        <MetaSEO
          title="Blog | Vaishnav Chandurkar"
          description="Software Engineer @Peerlist"
          keywords="Engineer, Frontend Developer, Developer"
        />
      </Head>
      <div>
        <div className="max-w-2xl mb-10">
          <h1
            className={`${rufina.className} text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100`}
          >
            My Journey in Software Development Through Projects, Tutorials, and
            Insights
          </h1>
        </div>
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
