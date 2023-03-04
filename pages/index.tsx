import Head from "next/head";
import { Inter } from "next/font/google";
import notionServices from "@/lib/notion-services";
import { BlogCard } from "@/components/Blog";

export default function Home({ posts }: any) {
  return (
    <>
      <Head>
        <title>Vaishnav Chandurkar</title>
        <meta name="description" content="Portfolio Site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="max-w-2xl mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl leading-[56px]">
            Writing on software design, company building, and the aerospace
            industry.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 leading-7 font-light">
            All of my long-form thoughts on programming, leadership, product
            design, and more, collected in chronological order.
          </p>
        </div>
        {posts && posts.length > 0 && (
          <ul className="flex max-w-3xl flex-col space-y-16 pb-10">
            {posts.map((post) => (
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
  const posts = await notionServices.getAllPublished();
  console.log("posts: ", posts);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
