export type Category =
  | "News"
  | "Gossip"
  | "Music"
  | "Movies"
  | "Fashion"
  | "Reality TV"
  | "Relationships";

export type Post = {
  slug: string;
  title: string;
  subheadline?: string;
  excerpt: string;
  author: string;
  date: string; // ISO string
  readTime: number; // minutes
  category: Category;
  tags: string[];
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  content: string[]; // paragraphs / embeds markdown-ish
  featured?: boolean;
  trending?: boolean;
  popular?: boolean;
};

export const categories: Category[] = [
  "News",
  "Gossip",
  "Music",
  "Movies",
  "Fashion",
  "Reality TV",
  "Relationships",
];
