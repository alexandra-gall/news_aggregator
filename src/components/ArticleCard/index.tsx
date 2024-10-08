import { FC } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Article } from '../../models/models.ts';
import placeholderImage from '../../assets/images/news-placeholder-image.svg?url';
import styles from './styles.module.css';

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className={styles.articleCard}>
      <CardMedia
        component="img"
        height="140"
        image={article.urlToImage || placeholderImage}
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
