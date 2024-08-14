import { FC } from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import styles from './styles.module.css';

export const ErrorPage: FC = () => {
  const error = useRouteError();
  console.error(error);
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div className={styles.container}>
      <Typography mb='20px' variant="h1" color="#3498db">
        Oops!
      </Typography>
      <Typography mb='20px' variant="h5" color="#34495e">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography mb='30px' variant="h6" color='#7f8c8d'>{errorMessage}</Typography>
      <Button
        color="info"
        style={{
          backgroundColor: '#3498db',
          color: '#fff',
          padding: '10px 20px',
        }}
        component={Link}
        to="/"
      >
        Go to Homepage
      </Button>
    </div>
  );
};
