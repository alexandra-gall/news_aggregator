import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { NewsApiArticle, NewsApiResponse } from './models.ts';
import { Article } from '../models/models.ts';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_API_URL;

export class NewsApi {
  static getTopHeadlines = async (query: string, country: string = 'us', category: string[]): Promise<Article[]> => {
    try {
      const response = await axios.get<NewsApiResponse>(`${BASE_URL}/top-headlines`, {
        params: {
          q: query || 'general',
          category: isEmpty(category) ? null : category.join(','),
          country,
          apiKey: API_KEY,
        },
      });
      return response.data.articles.map(NewsApi.transformArticle);
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      return [];
    }
  };

  static searchNews = async (query: string, source?: string, from?: string, language: string = 'en'): Promise<Article[]> => {
    try {
      const response = await axios.get<NewsApiResponse>(`${BASE_URL}/everything`, {
        params: {
          q: query,
          language,
          source,
          from,
          apiKey: API_KEY,
          pageSize: 20,
        },
      });
      return response.data.articles.map(NewsApi.transformArticle);
    } catch (error) {
      console.error('Error searching news:', error);
      return [];
    }
  };

  private static transformArticle = (article: NewsApiArticle): Article => ({
    id: article.url,
    ...article,
  });
}
