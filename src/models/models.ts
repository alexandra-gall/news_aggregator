export type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
};

export type DateOptions = 'all' | '1' | '7' | '30';
export type CategoryOptions = 'all' | 'science' | 'technology' | 'sports' | 'food' | 'travel';
export type SourceOptions = 'all' | 'guardian' | 'the-new-york-times' | 'news-api';

export interface UserSettings {
  source: SourceOptions;
  category: CategoryOptions;
}

export interface Filters extends UserSettings {
  date: DateOptions;
}

export type Options = {
  value: DateOptions | CategoryOptions | SourceOptions;
  name: string;
}