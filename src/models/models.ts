export type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
};

export type Filters = {
  date: string;
  category: string;
  source: string;
};

export type UserSettings = {
  sources: string[];
  categories: string[];
};
