import fs from 'fs';
import RSS from "rss";
import blogService from "./blog.services";

const generateRSSFeed = async() => {
  const site_url = 'https://vaishnavs.vercel.app';

  const feedOptions = {
    title: 'Blog posts | RSS Feed',
    description: 'Writings about my journey as a developer, learning through the products I build, and life experiences.',
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
  };

  const feed = new RSS(feedOptions);

  const allBlogPosts = await blogService.getAllPublished();

  allBlogPosts.map((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `${site_url}/blog/${post.slug}`,
      date: post.publishedAt
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true}))
}

export default generateRSSFeed;