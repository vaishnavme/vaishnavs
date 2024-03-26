import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ParsedUrlQuery } from "querystring";
import MDXComponents from "@/components/MDXComponent";
import MetaSEO from "@/components/UI/MetaSEO";
import TableOfContent from "@/components/UI/TableOfContent";
import { TPostFrontmatter, TTOCItem } from "@/utils/global.types";
import blogService from "@/lib/blog.services";
import helpers from "@/utils/helpers";
import generateOGImage from "@/lib/og.services";

interface IPostContent {
  source: MDXRemoteSerializeResult;
  header: TPostFrontmatter;
  tableOfContent: TTOCItem[];
}

interface IBlogPost {
  post: IPostContent;
  ogImage: string;
}

const Blog = (props: IBlogPost) => {
  const { post, ogImage } = props;

  return (
    <>
      <MetaSEO
        title={`${post.header.title} | Vaishnav's Notebook`}
        description={post.header.summary}
        url={helpers.getAbsoluteURL(post.header.slug)}
        ogImage={`/${ogImage}`}
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

    const ogImage = await generateOGImage({
      title: post.header.title,
      slug: post.header.slug,
      publishedAt: helpers.dateFormatter(post.header.publishedAt),
    });

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        ogImage,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
