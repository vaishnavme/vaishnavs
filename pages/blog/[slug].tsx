import notionServices from "@/lib/notion-services";
import { MDXRemote } from "next-mdx-remote";

const Article = (props) => {
  const { post } = props;

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <article className="prose dark:prose-dark">
        <MDXRemote compiledSource={post.compiledSource} />
      </article>
    </div>
  );
};

export default Article;

export const getStaticPaths = async () => {
  const posts = await notionServices.getAllPublished();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { slug } = params;
  const post = await notionServices.getBlogPostBySlug(slug);

  return {
    props: {
      post,
    },
  };
};
