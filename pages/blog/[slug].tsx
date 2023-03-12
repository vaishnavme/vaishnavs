import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Rufina } from "next/font/google";
import { ParsedUrlQuery } from "querystring";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import notionServices from "@/lib/notion-services";
import helpers from "@/utils/helpers";
import { Post } from "@/utils/types";

const rufina = Rufina({
  subsets: ["latin"],
  weight: ["400"],
});

interface Article {
  article: MDXRemoteSerializeResult;
  frontmatter: Post;
}

const Article = (props: Article) => {
  const { article, frontmatter } = props;

  const date = helpers.getDate(frontmatter.date);

  const metaOG = {
    title: frontmatter.title,
    description: frontmatter.description,
  };

  return (
    <>
      <Head>
        <title>{`${frontmatter.title}`}</title>
        <meta name="description" content={metaOG.description} />
        <meta name="keywords" content="Peerlist, Project, Proof of work" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaOG.title} />
        {/* <meta property="og:image" content={metaOG.ogImage} /> */}
        <meta property="og:description" content={metaOG.description} />
        <meta property="og:site_name" content="Peerlist" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PeerlistHQ" />
        <meta
          name="twitter:title"
          content="Peerlist Projects | Proof-of-work"
        />
        {/* <meta property="twitter:image" content={metaOG.ogImage} /> */}
        <meta property="twitter:description" content={metaOG.description} />
      </Head>
      <div className="max-w-2xl mx-auto pb-10">
        <article>
          <time className="order-first flex items-center text-sm text-zinc-400 dark:text-zinc-500">
            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
            <span className="ml-3">{date}</span>
          </time>
          <h1
            className={`${rufina.className} mt-6 text-4xl font-bold tracking-normal text-zinc-800 dark:text-zinc-100`}
          >
            {frontmatter.title}
          </h1>
          <div className="prose dark:prose-dark">
            <MDXRemote {...article} />
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

  const article = await notionServices.getBlogPostBySlug(slug);

  return {
    props: {
      article,
      frontmatter: article.frontmatter,
    },
  };
};
