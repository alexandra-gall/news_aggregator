import { FC, useState, useEffect } from 'react';
import { ArticleCard } from '../article-card';
import { SearchBar } from '../search-bar';
import { FilterOptions } from '../filter-options';
import { NewsApi } from '../../api/newsApi.ts';
import { GuardianApi } from '../../api/guardianApi.ts';
import { NYTimesApi } from '../../api/nyTimesApi.ts';
import { Article, CategoryOptions, DateOptions, Filters } from '../../models/models.ts';
import styles from './styles.module.css';

export const ArticleList: FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    date: 'all',
    category: 'all',
    source: 'all',
  });

  const calculateCategory = (category: CategoryOptions): string => {
    return category === 'all' ? '' : category;
  };

  const calculateDate = (date: DateOptions): string => {
    switch (date) {
      case 'all':
        return '';
      case '1':
        return new Date(Date.now() - 86400 * 1000).toISOString();
      case '7':
        return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      case '30':
        return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response: Article[] = [];
        let responseAll: Array<Article[]> = [];
        const category = calculateCategory(filters.category);
        const date = calculateDate(filters.date);
        switch (filters.source) {
          case 'gardian':
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
                NewsApi.searchNews(searchTerm || 'we', category, date),
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

    fetchArticles();
  }, [filters.date, filters.category, filters.source, searchTerm]);

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
