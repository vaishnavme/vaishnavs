import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";
import MDXComponents from "@/components/MDXComponent";
import { TPostFrontmatter } from "@/utils/global.types";
import MetaSEO from "@/components/UI/MetaSEO";
import notionServices from "@/lib/notion.services";
import TableOfContent from "@/components/UI/TableOfContent";

interface IPostContent {
  source: MDXRemoteSerializeResult;
  header: TPostFrontmatter;
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

      <div className="relative">
        <TableOfContent tableOfContent={post.tableOfContent} />
        <h1 className="font-display text-5xl leading-[54px] mb-6">
          {post.header.title}
        </h1>

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
