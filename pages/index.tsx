import Link from "next/link";
import { GetStaticProps } from "next";
import blogService from "@/lib/blog.services";

const Home = (props) => {
  const { posts } = props;

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
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
