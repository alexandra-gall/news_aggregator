import axios from 'axios';
import { NewsApiArticle, NewsApiResponse } from './models.ts';
import { Article } from '../models/models.ts';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = import.meta.env.VITE_NEWS_API_URL;

export class NewsApi {
  static searchNews = async (search: string, category?: string, published_after?: string): Promise<Article[]> => {
    try {
      let updatedCategory;
      if (category) {
        updatedCategory = category === 'technology' ? 'tech' : category;
      } else {
        updatedCategory = null;
      }
      const response = await axios.get<NewsApiResponse>(`${BASE_URL}/all`, {
        params: {
          api_token: API_KEY,
          search,
          categories: updatedCategory,
          published_after: published_after ? published_after : null,
          limit: 3,
        },
      });
      return response.data.data.map(NewsApi.transformArticle);
    } catch (error) {
      console.error('Error searching news:', error);
      return [];
    }
  };

  private static transformArticle = (article: NewsApiArticle): Article => ({
    id: article.uuid,
    urlToImage: article.image_url,
    publishedAt: article.published_at,
    ...article,
  });
}
