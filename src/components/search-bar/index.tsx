import { FC, FormEvent, useState } from 'react';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './styles.module.css';

type SearchBarProps = {
  onSearch: (term: string) => void;
};

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search articles..."
        variant="outlined"
        size="small"
        sx={{ flexGrow: 1 }}
      />
      <Button
        sx={{ height: '40px' }}
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </form>
  );
};
