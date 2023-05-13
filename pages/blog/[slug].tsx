import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import notionServices from "@/lib/notion-services";
import { Post } from "@/utils/types";
import MetaSEO from "@/components/UIElements/MetaSEO";
import MDXComponents from "@/components/MDXComponents";
import rufina from "@/components/UIElements/Font";
interface Article {
  article: MDXRemoteSerializeResult;
  frontmatter: Post;
}

const Article = (props: Article) => {
  const { article, frontmatter } = props;

  return (
    <>
      <MetaSEO
        title={frontmatter.title}
        description={frontmatter.description}
        keywords={frontmatter.tags}
      />

      <div className="max-w-2xl mx-auto pb-10">
        <article>
          <h1
            className={`${rufina.className} mt-6 text-4xl font-bold tracking-normal text-gray-gray-12`}
          >
            {frontmatter.title}
          </h1>
          <div className="prose">
            <MDXRemote {...article} components={MDXComponents} />
          </div>
        </article>
      </div>
    </>
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

  try {
    const article = await notionServices.getBlogPostBySlug(slug);

    if (!article) {
      throw new Error("blog post not found");
    }

    return {
      props: {
        article,
        frontmatter: article.frontmatter,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
