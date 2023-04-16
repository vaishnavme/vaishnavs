import notionServices from "@/lib/notion-services";
import { BlogCard } from "@/components/Blog";
import { Post, Posts } from "@/utils/types";
import MetaSEO from "@/components/UIElements/MetaSEO";
import rufina from "@/components/UIElements/Font";

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
        ogImage="/images/vaishnav_og.png"
      />
      <div className="mt-56">
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

export const getServerSideProps = async () => {
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
};
