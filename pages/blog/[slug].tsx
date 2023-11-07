import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";
import MDXComponents from "@/components/MDXComponent";
import { TPostFrontmatter } from "@/utils/global.types";
import helpers from "@/utils/helpers";
import MetaSEO from "@/components/UI/MetaSEO";
import notionServices from "@/lib/notion.services";

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
      <div>
        <h1 className="font-display text-5xl leading-[60px] mb-6">
          {post.header.title}
        </h1>
        <p className="text-gray-500 text-sm">
          {helpers.dateFormatter(post.header.publishedAt)} •{" "}
        </p>
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
