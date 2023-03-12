import Head from "next/head";
import notionServices from "@/lib/notion-services";
import { BlogCard } from "@/components/Blog";
import { Post, Posts } from "@/utils/types";
import rufina from "@/components/UIElements/font";

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
        <title>{`${metaOG.title}`}</title>
        <meta name="description" content={metaOG.description} />
        <meta name="keywords" content="Peerlist, Project, Proof of work" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaOG.title} />
        {/* <meta property="og:image" content={metaOG.ogImage} /> */}
        <meta property="og:description" content={metaOG.description} />
        <meta property="og:site_name" content="Peerlist" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PeerlistHQ" />
        <meta name="twitter:title" content={metaOG.title} />
        {/* <meta property="twitter:image" content={metaOG.ogImage} /> */}
        <meta property="twitter:description" content={metaOG.description} />
      </Head>
      <div>
        <div className="max-w-2xl mb-10">
          <h1
            className={`${rufina.className} text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100`}
          >
            My Journey in Software Development Through Projects, Tutorials, and
            Insights
          </h1>
          {/* <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 leading-7 font-light">
            All of my long-form thoughts on programming, leadership, product
            design, and more, collected in chronological order.
            Exploring the World of Software Development Through Projects, Tutorials, and Insights
          </p> */}
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
