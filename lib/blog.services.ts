import fs from "fs";
import matter from "gray-matter";
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

      const { data } = matter(source);

      const frontMatter = {
        ...data,
        slug: article.replace(".mdx", '')
      }
      return frontMatter;
    })

    return allArticles;
  }
}

export default blogService;