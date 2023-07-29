import matter from "gray-matter";
import readingTime from "reading-time";
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
        ...data,
        readTime,
        slug: article.replace(".mdx", '')
      }
      return frontMatter;
    })

    return allArticles;
  }
}

export default blogService;