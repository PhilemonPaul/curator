import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors } from './colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark Mode
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('@theme_mode');
      if (storedTheme !== null) {
        setIsDarkMode(storedTheme === 'dark');
      } else {
        // No stored preference, default to true or system setting
        // setIsDarkMode(systemColorScheme === 'dark'); 
        setIsDarkMode(true);
      }
    } catch (e) {
      console.error('Failed to load theme.', e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('@theme_mode', newTheme ? 'dark' : 'light');
    } catch (e) {
      console.error('Failed to save theme.', e);
    }
  };

  const colors = isDarkMode ? darkColors : lightColors;

  if (isLoading) {
    return null; // Or a splash screen
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
