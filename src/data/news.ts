export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content, can include Instagram embed codes
  imageUrl: string;
  date: string;
  author: string;
  tags: string[];
}

export const newsPosts: NewsPost[] = [];

export const getNewsPostBySlug = (slug: string): NewsPost | undefined => {
  return newsPosts.find(post => post.slug === slug);
};
