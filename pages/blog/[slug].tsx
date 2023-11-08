import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";
import MDXComponents from "@/components/MDXComponent";
import MetaSEO from "@/components/UI/MetaSEO";
import notionServices from "@/lib/notion.services";
import TableOfContent from "@/components/UI/TableOfContent";
import { TPostFrontmatter, TTableOfContent } from "@/utils/global.types";

interface IPostContent {
  source: MDXRemoteSerializeResult;
  header: TPostFrontmatter;
  tableOfContent: TTableOfContent;
}

interface IBlogPost {
  post: IPostContent;
}

const Blog = (props: IBlogPost) => {
  const { post } = props;

  return (
    <>
      <MetaSEO
        title={`${post.header.title} | Vaishnav's Notebook`}
        description={post.header.description}
      />

      <div className="relative mb-10">
        <h1 className="font-display text-4xl xl:text-5xl leading-[54px] mb-6">
          {post.header.title}
        </h1>
        <TableOfContent tableOfContent={post.tableOfContent} />

        <div className="prose my-10">
          <MDXRemote {...post.source} components={MDXComponents} />
        </div>
      </div>
    </>
  );
};

export default Blog;

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await notionServices.getAllPublished();

  const paths = posts.map((post: TPostFrontmatter) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

  try {
    const post = await notionServices.getPostBySlug(slug);

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
