// New York Times
export type NYTimesArticle = {
  web_url: string;
  snippet: string;
  multimedia: Array<{
    url: string;
  }>;
  headline: {
    main: string;
  };
  pub_date: string;
  _id: string;
};

export type NYTimesApiResponse = {
  status: string;
  copyright: string;
  response: {
    docs: NYTimesArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
};

// News api
export type NewsApiArticle = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
};

export type NewsApiResponse = {
  articles: NewsApiArticle[];
  status: string;
  totalResults: number;
};

// The Guardian
export type GuardianArticle = {
  id: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  fields: {
    thumbnail?: string;
    trailText?: string;
  };
};

export type GuardianApiResponse = {
  response: {
    status: string;
    total: number;
    results: GuardianArticle[];
  };
};
