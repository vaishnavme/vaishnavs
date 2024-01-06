import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";
import MDXComponents from "@/components/MDXComponent";
import MetaSEO from "@/components/UI/MetaSEO";
import TableOfContent from "@/components/UI/TableOfContent";
import { TPostFrontmatter, TTOCItem } from "@/utils/global.types";
import blogService from "@/lib/blog.services";

interface IPostContent {
  source: MDXRemoteSerializeResult;
  header: TPostFrontmatter;
  tableOfContent: TTOCItem[];
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
        ogImage={post.header.image}
      />

      <div className="relative mb-10">
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
  const posts = await blogService.getAllPublished();

  const paths = posts.map((post) => ({
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
    const post = await blogService.getPostBySlug(slug);

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
