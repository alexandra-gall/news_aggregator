import { Options } from '../../models/models.ts';

export const dateOptions: Options[] = [
  { value: 'all', name: 'All' },
  { value: '1', name: 'Last 24 hours' },
  { value: '7', name: 'Last 7 days' },
  { value: '30', name: 'Last 30 days' },
];
