import { FC } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Filters } from '../../models/models.ts';
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
          <MenuItem value="">All</MenuItem>
          <MenuItem value="1">Last 24 hours</MenuItem>
          <MenuItem value="7">Last 7 days</MenuItem>
          <MenuItem value="30">Last 30 days</MenuItem>
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
          <MenuItem value="">All</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="technology">Technology</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="entertainment">Entertainment</MenuItem>
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
          <MenuItem value="">All</MenuItem>
          <MenuItem value="gardian">The Guardian</MenuItem>
          <MenuItem value="the-new-york-times">The New York Times</MenuItem>
          <MenuItem value="news-api">News from different sources</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
