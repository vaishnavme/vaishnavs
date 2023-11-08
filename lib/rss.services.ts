import fs from "fs";
import RSS from "rss";
import notionServices from "./notion.services";
import { TPostFrontmatter } from "@/utils/global.types";

const generateRSSFeed = async () => {
  if (process.env.BLOG_ENV === "dev") return;

  const site_url = process.env.SITE_URL || "";

  const feedOptions = {
    title: "Blog posts | RSS Feed",
    description:
      "Writings about my journey as a developer, learning through the products I build, and life experiences.",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
  };

  const feed = new RSS(feedOptions);

  const allBlogPosts = await notionServices.getAllPublished();

  if (allBlogPosts.length) {
    allBlogPosts.map((post: TPostFrontmatter) => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `${site_url}/blog/${post.slug}`,
        date: post.publishedAt,
      });
    });

    fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
  }
};

export default generateRSSFeed;
