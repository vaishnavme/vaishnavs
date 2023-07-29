import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";
import MDXComponents from "@/components/MDXComponent";
import blogService from "@/lib/blog.services";
import { TPostFrontmatter } from "@/utils/global.types";
import helpers from "@/utils/helpers";

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
    <div>
      <h1 className="font-display text-5xl leading-[60px] mb-6">
        {post.header.title}
      </h1>
      <p className="text-gray-400 font-light">
        {helpers.dateFormatter(post.header.publishedAt)} •{" "}
        <span>{post.header.readTime?.text}</span>
      </p>
      <div className="prose my-10">
        <MDXRemote {...post.source} components={MDXComponents} />
      </div>
    </div>
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
    console.log("ERROR: ", err);
    return {
      notFound: true,
    };
  }
};
