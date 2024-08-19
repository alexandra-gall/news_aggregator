import { FC, ChangeEvent } from 'react';
import {
  FormControlLabel,
  Button,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
} from '@mui/material';
import { CategoryOptions, SourceOptions } from '../../models/models.ts';
import styles from './styles.module.css';
import { useSettings } from '../../context/useSettings.ts';

type RadioButtonOptions = {
  value: CategoryOptions | SourceOptions;
  name: string;
}

const categoryOptions: RadioButtonOptions[] = [
  { value: 'all', name: 'All' },
  { value: 'business', name: 'Business' },
  { value: 'technology', name: 'Technology' },
  { value: 'sports', name: 'Sports' },
  { value: 'entertainment', name: 'Entertainment' },
];

const sourceOptions: RadioButtonOptions[] = [
  { value: 'all', name: 'All' },
  { value: 'gardian', name: 'The Guardian' },
  { value: 'the-new-york-times', name: 'The New York Times' },
  { value: 'news-api', name: 'News from different sources' },
];

export const PersonalizationSettings: FC = () => {
  const { settings, updateSettings } = useSettings();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateSettings({ ...settings, [name]: value });
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className={styles.personalizationSettings}>
      <Typography variant="h5" mb="20px">Personalize Your News Feed</Typography>
      <Typography variant="h6" mb="8px">Preferred Source</Typography>
      <FormControl>
        <RadioGroup
          name="source"
          value={settings.source}
          onChange={handleChange}
        >
          {sourceOptions.map(source => (
            <FormControlLabel key={source.value} value={source.value} control={<Radio />} label={source.name} />
          ))}
        </RadioGroup>
      </FormControl>

      <Typography variant="h6" m="8px 0">Preferred Category</Typography>
      <FormControl>
        <RadioGroup
          name="category"
          value={settings.category}
          onChange={handleChange}
        >
          {categoryOptions.map(category => (
            <FormControlLabel key={category.value} value={category.value} control={<Radio />} label={category.name} />
          ))}
        </RadioGroup>
      </FormControl>

      <Button sx={{ marginTop: '10px' }} variant="contained" color="primary" onClick={handleSave}>
        Save Settings
      </Button>
    </div>
  );
};
