import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import { ArticleList } from './components/ArticleList';
import { PersonalizationSettings } from './components/PersonalizationSettings';
import { ErrorPage } from './components/ErrorPage';
import { SettingsProvider } from './context/SettingsContext.tsx';

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
  {
    basename: "/news_aggregator/",
  },
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
  </StrictMode>,
);
