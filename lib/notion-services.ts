import { Client, isFullPage } from "@notionhq/client";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from 'rehype-prism-plus';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Database, Post } from "@/utils/types";

const { NotionToMarkdown } = require("notion-to-md");

const notion = new Client({
  auth: process.env.NOTION_SECRET
})
const n2m = new NotionToMarkdown({ notionClient: notion });

const notionServices = {
  getAllPublished: async() => {
    const notionArticlesList = await notion.databases.query({
      database_id: `${process.env.NOTION_DATABASE_ID}`,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true
        }
      },
      sorts: [{
        property: 'Date',
        direction: "descending"
      }]
    });
    const notionArticles = notionArticlesList.results.map((notionData) => notionServices.getPageMetaData(notionData));
    return notionArticles;
  },
  getPageMetaData: (post: Database | any) => {
    return {
      id: post.id,
      title: post.properties.Name.title[0].plain_text,
      slug: post.properties.slug.rich_text[0]?.plain_text,
      description: post.properties.Description.rich_text[0]?.plain_text,
      date: post.properties.Created.created_time
    }
  },
  getBlogPostBySlug: async(slug: string) => {
    const response = await notion.databases.query({
      database_id: `${process.env.NOTION_DATABASE_ID}`,
      filter: {
        property: "slug",
        formula: {
          string: {
            equals: slug,
          },
        },
      }
    });
    const record= response.results[0];

    const frontmatter = notionServices.getPageMetaData(record);

    const markdownBlocks = await n2m.pageToMarkdown(frontmatter.id);
    const markdownStrings = n2m.toMarkdownString(markdownBlocks);

    const { content, data } = matter(markdownStrings);
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
                className: ['anchor'],
              },
            },
          ],
        ],
        format: 'mdx',
      },
      scope: data,
    });

    return {
      ...mdxSource,
      frontmatter
    }
  }
}

export default notionServices;