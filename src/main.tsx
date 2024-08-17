import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import { ArticleList } from './components/article-list';
import { PersonalizationSettings } from './components/personalization-settings';
import { ErrorPage } from './components/error-page';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <ArticleList />,
        },
        {
          path: "/personalize",
          element: <PersonalizationSettings />,
        },
      ],
    },
  ],
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
