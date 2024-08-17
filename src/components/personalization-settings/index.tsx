import { FC, useState, useEffect, ChangeEvent } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Button, Typography } from '@mui/material';
import { UserSettings } from '../../models/models.ts';
import styles from './styles.module.css';

export const PersonalizationSettings: FC = () => {
  const getInitUserSettings = (): UserSettings => ({
    sources: [],
    categories: [],
  });
  const [settings, setSettings] = useState(getInitUserSettings());

  useEffect(() => {
    // Load user settings from localStorage
    const savedInLocalStorage = localStorage.getItem('userSettings');
    const savedSettings = savedInLocalStorage ? JSON.parse(savedInLocalStorage) as UserSettings : getInitUserSettings();
    setSettings(savedSettings);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: checked
        ? [...prevSettings[name as keyof UserSettings], value]
        : prevSettings[name as keyof UserSettings].filter(item => item !== value),
    }));
  };

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className={styles.personalizationSettings}>
      <Typography variant="h5" mb="20px">Personalize Your News Feed</Typography>
      <Typography variant="h6" mb="8px">Preferred Sources</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.sources.includes('gardian')}
              onChange={handleChange}
              name="sources"
              value="gardian"
            />
          }
          label="The Guardian"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.sources.includes('the-new-york-times')}
              onChange={handleChange}
              name="sources"
              value="the-new-york-times"
            />
          }
          label="The New York Times"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.sources.includes('news-api')}
              onChange={handleChange}
              name="sources"
              value="news-api"
            />
          }
          label="News from different sources"
        />
      </FormGroup>

      <Typography variant="h6" m="8px 0">Preferred Categories</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.categories.includes('business')}
              onChange={handleChange}
              name="categories"
              value="business"
            />
          }
          label="Business"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.categories.includes('technology')}
              onChange={handleChange}
              name="categories"
              value="technology"
            />
          }
          label="Technology"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.categories.includes('sports')}
              onChange={handleChange}
              name="categories"
              value="sports"
            />
          }
          label="Sports"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.categories.includes('entertainment')}
              onChange={handleChange}
              name="categories"
              value="entertainment"
            />
          }
          label="Entertainment"
        />
      </FormGroup>

      <Button sx={{ marginTop: '10px' }} variant="contained" color="primary" onClick={handleSave}>
        Save Settings
      </Button>
    </div>
  );
};
