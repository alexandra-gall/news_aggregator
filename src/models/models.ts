export type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
};

export type DateOptions = 'all' | '1' | '7' | '30';
export type CategoryOptions = 'all' | 'business' | 'technology' | 'sports' | 'entertainment';
export type SourceOptions = 'all' | 'gardian' | 'the-new-york-times' | 'news-api';

export type Filters = {
  date: DateOptions;
  category: CategoryOptions;
  source: SourceOptions;
};

export type UserSettings = {
  source: SourceOptions;
  category: CategoryOptions;
};