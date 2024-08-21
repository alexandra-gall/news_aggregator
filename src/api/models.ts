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

// The News api
export type NewsApiArticle = {
  uuid: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
  published_at: string;
};

export type NewsApiResponse = {
  data: NewsApiArticle[];
  meta: {
    found: number;
    returned: number;
    limit: number;
    page: number;
  };
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
