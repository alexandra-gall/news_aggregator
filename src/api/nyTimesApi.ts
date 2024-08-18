import axios from 'axios';
import { NYTimesApiResponse, NYTimesArticle } from './models.ts';
import { Article } from '../models/models.ts';

const API_KEY = import.meta.env.VITE_NYTIMES_API_KEY;
const BASE_URL = import.meta.env.VITE_NYTIMES_API_URL;

export class NYTimesApi {
  static searchNYTimes = async (
    query: string,
    section?: string,
    beginDate?: string,
    page: number = 0,
    sort: 'newest' | 'oldest' | 'relevance' = 'newest',
  ): Promise<Article[]> => {
    try {
      const response = await axios.get<NYTimesApiResponse>(`${BASE_URL}/articlesearch.json`, {
        params: {
          'api-key': API_KEY,
          q: query,
          fq: section ? `section_name:"${section}"` : null,
          begin_date: beginDate ? beginDate : null,
          page,
          sort,
        },
      });
      return response.data.response.docs.map(NYTimesApi.transformArticle);
    } catch (error) {
      console.error('Error searching NY Times:', error);
      return [];
    }
  };

  private static transformArticle = (article: NYTimesArticle): Article => ({
    id: article._id,
    title: article.headline.main,
    description: article.snippet,
    url: article.web_url,
    urlToImage: `https://www.nytimes.com/${article.multimedia[0]?.url || ''}`,
    publishedAt: article.pub_date,
  });
}