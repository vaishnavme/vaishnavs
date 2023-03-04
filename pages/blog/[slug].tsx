import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import notionServices from "@/lib/notion-services";

interface Article {
  article: MDXRemoteSerializeResult;
}

const Article = (props: Article) => {
  const { article } = props;
  return (
    <div className="max-w-2xl mx-auto pb-10">
      <article className="prose dark:prose-dark">
        <MDXRemote {...article} />
      </article>
    </div>
  );
};

export default Article;

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await notionServices.getAllPublished();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

  const article = await notionServices.getBlogPostBySlug(slug);

  return {
    props: {
      article,
    },
  };
};
