import { FC } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Filters } from '../../models/models.ts';
import { dateOptions } from '../../utils/constants/date.constants.ts';
import { categoryOptions } from '../../utils/constants/categories.constants.ts';
import { sourceOptions } from '../../utils/constants/source.constants.ts';
import styles from './styles.module.css';

type FilterOptionsProps = {
  onFilterChange: (filters: Partial<Filters>) => void;
  filters: Filters;
};

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
