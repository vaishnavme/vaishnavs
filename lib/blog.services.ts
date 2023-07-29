import matter from "gray-matter";
import readingTime from "reading-time";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import fs from "fs";
import path from "path";

const blogService = {
  getContentPath: (filePath = '') => {
    const rootPath = process.cwd();
    const contentFolder = path.join(path.join(rootPath, 'content', filePath));
    return contentFolder;
  },

  getAllPublished: async() => {
    const contentPath = blogService.getContentPath();
    const mdxFiles = fs.readdirSync(contentPath);

    const allArticles = mdxFiles.map((article) => {
      const articlePath = blogService.getContentPath(article);
    
      const source = fs.readFileSync(articlePath);

      const { data, content } = matter(source);
      const readTime = readingTime(content);

      const frontMatter = {
        title: data.title,
        summary: data.summary,
        publishedAt: data.publishedAt,
        image: data.image,
        readTime,
        slug: article.replace(".mdx", '')
      }
      return frontMatter;
    })

    return allArticles;
  },

  getAllPostFiles: async() => {
    const contentPath = blogService.getContentPath();
    const mdxFiles = fs.readFileSync(contentPath);

    return mdxFiles;
  },

  getPostBySlug: async(slug: string) => {
    const contentPath = blogService.getContentPath(`${slug}.mdx`);

    const source = fs.readFileSync(contentPath);

    const { data, content } = matter(source);

    const readTime = readingTime(content);

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
      scope: data,
    });

    return {
      source: mdxSource,
      header: {
        ...mdxSource.scope,
        slug, 
        readTime
      }
    }
  }
}

export default blogService;