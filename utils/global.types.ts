export type TReadTime = {
  text: string;
  minutes: number;
  time: number;
  word: number;
}

export type TPostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  image: string;
  readTime: TReadTime;
}

export type TPosts = {
  posts: TPostFrontmatter[];
}