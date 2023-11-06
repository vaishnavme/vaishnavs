const { Client } = require("@notionhq/client");
import { TPostFrontmatter } from "@/utils/global.types";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
})

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

  getPageFrontmatter: (post: any) => {
    const frontMatter = {
      id: post.id, 
      title: post.properties.Name.title[0].plain_text,
      slug: post.properties.slug.rich_text[0].plain_text,
      description: post.properties.Description.rich_text[0].plain_text,
      publishedAt: post.properties.Date.date.start,
    }

    return frontMatter;
  }


}

export default notionServices