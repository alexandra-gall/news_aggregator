import { FC, useState, useEffect, useRef } from 'react';
import { ArticleCard } from '../ArticleCard';
import { SearchBar } from '../SearchBar';
import { FilterOptions } from '../FilterOptions';
import { NewsApi } from '../../api/newsApi.ts';
import { GuardianApi } from '../../api/guardianApi.ts';
import { NYTimesApi } from '../../api/nyTimesApi.ts';
import { Article, Filters } from '../../models/models.ts';
import { useSettings } from '../../context/useSettings.ts';
import { calculateCategory, calculateDate } from '../../utils/helpers/filters.helpers.ts';
import styles from './styles.module.css';

export const ArticleList: FC = () => {
  const { settings } = useSettings();

  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    date: 'all',
    ...settings,
  });

  const hasPageBeenRendered = useRef(false);

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...settings,
    }));
  }, [settings]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response: Article[] = [];
        let responseAll: Array<Article[]> = [];
        const category = calculateCategory(filters.category);
        const date = calculateDate(filters.date);
        switch (filters.source) {
          case 'guardian':
            response = await GuardianApi.searchGuardian(searchTerm || 'general', category, date);
            break;
          case 'news-api':
            response = await NewsApi.searchNews(searchTerm || 'general', category, date);
            break;
          case 'the-new-york-times':
            response = await NYTimesApi.searchNYTimes(searchTerm || 'general', category, date);
            break;
          case 'all':
            responseAll = await Promise.all(
              [
                NewsApi.searchNews(searchTerm || 'general', category, date),
                GuardianApi.searchGuardian(searchTerm || 'general', category, date),
                NYTimesApi.searchNYTimes(searchTerm || 'general', category, date),
              ]);
            response = responseAll.flat();
            break;
        }
        setArticles([...response]);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    if (hasPageBeenRendered.current) {
      fetchArticles();
    }
    hasPageBeenRendered.current = true;
  }, [filters, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <>
      <div className={styles.optionsContainer}>
        <SearchBar onSearch={handleSearch} />
        <FilterOptions onFilterChange={handleFilterChange} filters={filters} />
      </div>
      <div className={styles.articleList}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
};
