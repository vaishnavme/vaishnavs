export interface Posts {
  posts: Post[]
}

export interface Post {
  id: string,
  title: string,
  slug: string,
  description: string,
  date: Date
}
