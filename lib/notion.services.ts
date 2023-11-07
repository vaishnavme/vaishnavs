const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { TPostFrontmatter } from "@/utils/global.types";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const notionServices = {
  getAllPublished: async() => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const allPosts = response.results.map((post: TPostFrontmatter) => notionServices.getPageFrontmatter(post));
    return allPosts;
  },

  getPostBySlug: async(slug: string) => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "slug",
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    });

    const notionPage = response.results[0];
    const frontMatter = notionServices.getPageFrontmatter(notionPage);

    const markdownBlocks = await n2m.pageToMarkdown(notionPage.id);
    const markdownString = n2m.toMarkdownString(markdownBlocks);

    const { content } = matter(markdownString.parent);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          rehypeCodeTitles,
          rehypePrism,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["anchor"],
              },
            },
          ],
        ],
        format: "mdx",
      },
      scope: frontMatter,
    });
    
    return {
      header: frontMatter,
      source: mdxSource
    }
  },

  getPageFrontmatter: (post: any) => {
    const frontMatter = {
      id: post.id, 
      title: post.properties.Name.title[0].plain_text,
      slug: post.properties.slug.rich_text[0].plain_text,
      description: post.properties.Description.rich_text[0].plain_text,
      publishedAt: post.properties.Date.date.start,
    }

    return frontMatter;
  },

}

export default notionServices