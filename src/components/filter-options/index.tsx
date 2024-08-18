import { FC } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { DateOptions, CategoryOptions, SourceOptions, Filters } from '../../models/models.ts';
import styles from './styles.module.css';

type FilterOptionsProps = {
  onFilterChange: (filters: Partial<Filters>) => void;
  filters: Filters;
};

type SelectOptions = {
  value: DateOptions | CategoryOptions | SourceOptions;
  name: string;
}

const dateOptions: SelectOptions[] = [
  { value: 'all', name: 'All' },
  { value: '1', name: 'Last 24 hours' },
  { value: '7', name: 'Last 7 days' },
  { value: '30', name: 'Last 30 days' },
];

const categoryOptions: SelectOptions[] = [
  { value: 'all', name: 'All' },
  { value: 'business', name: 'Business' },
  { value: 'technology', name: 'Technology' },
  { value: 'sports', name: 'Sports' },
  { value: 'entertainment', name: 'Entertainment' },
];

const sourceOptions: SelectOptions[] = [
  { value: 'all', name: 'All' },
  { value: 'gardian', name: 'The Guardian' },
  { value: 'the-new-york-times', name: 'The New York Times' },
  { value: 'news-api', name: 'News from different sources' },
];


export const FilterOptions: FC<FilterOptionsProps> = ({ onFilterChange, filters }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className={styles.filterOptions}>
      <FormControl variant="outlined" size="small" sx={{ flexGrow: 1 }}>
        <InputLabel id="date-label">Date</InputLabel>
        <Select
          labelId="date-label"
          name="date"
          onChange={handleChange}
          label="Date"
          value={filters.date}
        >
          {dateOptions.map(date => (
            <MenuItem key={date.value} value={date.value}>{date.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small" sx={{ flexGrow: 1 }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          name="category"
          onChange={handleChange}
          label="Category"
          value={filters.category}
        >
          {categoryOptions.map(category => (
            <MenuItem key={category.value} value={category.value}>{category.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small" sx={{ flexGrow: 1 }}>
        <InputLabel id="source-label">Source</InputLabel>
        <Select
          labelId="source-label"
          name="source"
          onChange={handleChange}
          label="Source"
          value={filters.source}
        >
          {sourceOptions.map(source => (
            <MenuItem key={source.value} value={source.value}>{source.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
