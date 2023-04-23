import rufina from "@/components/UIElements/Font";
import notionServices from "@/lib/notion-services";
import { Post, Posts } from "@/utils/types";
import Head from "next/head";

const Auth = (props: Posts) => {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>Blog Dashboard</title>
      </Head>
      <div>
        <h1 className={`${rufina.className} text-2xl font-normal mb-4`}>
          Blog&apos;s Dashboard
        </h1>
        <h2>All article from notion blog database</h2>
        <div className="mt-20">
          {posts && posts.length > 0 && (
            <>
              <div className="grid grid-cols-5 gap-4 w-full py-4 mb-6 border-b border-zinc-300/10">
                <p className="col-span-4">Article Name</p>
                <div className="flex items-center justify-between gap-2">
                  <p>Date</p>
                  <p>Action</p>
                </div>
              </div>
              <ul>
                {posts.map((post: Post) => (
                  <li
                    key={post.slug}
                    className="grid grid-cols-5 gap-4 border-b border-zinc-300/10 hover:bg-zinc-800/50 transition-all rounded py-4"
                  >
                    <h3 className="col-span-4 truncate">{post.title}</h3>
                    <div className="flex items-center justify-between gap-4">
                      <p>Date</p>
                      <button type="button" className="text-sm">
                        Refresh
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;

export const getServerSideProps = async () => {
  try {
    const posts = await notionServices.getAllBlogs();
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (apiError) {
    return {
      notFound: true,
    };
  }
};
