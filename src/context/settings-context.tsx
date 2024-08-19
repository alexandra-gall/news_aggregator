import { FC, createContext, useState, ReactNode, useEffect } from 'react';
import { UserSettings } from '../models/models';

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: UserSettings) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultSettings: UserSettings = {
  source: 'all',
  category: 'all',
};

export const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

