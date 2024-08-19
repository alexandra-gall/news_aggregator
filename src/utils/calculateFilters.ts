import { CategoryOptions, DateOptions } from '../models/models.ts';

export const calculateCategory = (category: CategoryOptions): string => {
  return category === 'all' ? '' : category;
};

export const calculateDate = (date: DateOptions): string => {
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
