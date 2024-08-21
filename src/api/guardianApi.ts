import axios from 'axios';
import { GuardianArticle, GuardianApiResponse } from './models.ts';
import { Article } from '../models/models.ts';

const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const BASE_URL = import.meta.env.VITE_GUARDIAN_API_URL;

export class GuardianApi {
  static searchGuardian = async (query: string, section?: string, fromDate?: string, pageSize: number = 20): Promise<Article[]> => {
    try {
      let updatedSection;
      if (section) {
        updatedSection = section === 'sports' ? 'sport' : section;
      } else {
        updatedSection = null;
      }

      const response = await axios.get<GuardianApiResponse>(`${BASE_URL}/search`, {
        params: {
          'api-key': API_KEY,
          q: query,
          section: updatedSection,
          'from-date': fromDate ? fromDate : null,
          'page-size': pageSize,
          'show-fields': 'thumbnail,trailText',
        },
      });

      return response.data.response.results.map(GuardianApi.transformArticle);
    } catch (error) {
      console.error('Error searching Guardian:', error);
      return [];
    }
  };

  private static transformArticle = (article: GuardianArticle): Article => ({
    id: article.id,
    title: article.webTitle,
    description: article.fields.trailText || '',
    url: article.webUrl,
    urlToImage: article.fields.thumbnail || '',
    publishedAt: article.webPublicationDate,
  });
}