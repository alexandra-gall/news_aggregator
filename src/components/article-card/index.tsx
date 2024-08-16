import { FC } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import styles from './styles.module.css';


interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className={styles.articleCard}>
      <CardMedia
        component="img"
        height="140"
        image={article.urlToImage || 'https://via.placeholder.com/300x200'}
        alt={article.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {new Date(article.publishedAt).toLocaleDateString()}
        </Typography>
        <Button size="small" color="primary" href={article.url} target="_blank" rel="noopener noreferrer">
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};
