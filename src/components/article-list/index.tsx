import { FC, useState, useEffect } from 'react';
import { ArticleCard } from '../article-card';
import { SearchBar } from '../search-bar';
import { FilterOptions } from '../filter-options';
import { NewsApi } from '../../api/newsApi.ts';
import { GuardianApi } from '../../api/guardianApi.ts';
import { NYTimesApi } from '../../api/nyTimesApi.ts';
import { Article, Filters } from '../../models/models.ts';
import styles from './styles.module.css';

export const ArticleList: FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    date: '',
    category: '',
    source: '',
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await Promise.all(
          [
            NewsApi.searchNews(searchTerm || 'general'),
            GuardianApi.searchGuardian(searchTerm || 'general'),
            NYTimesApi.searchNYTimes(searchTerm || 'general'),
          ]);
        setArticles([...response.flat()]);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [searchTerm, filters]);


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
