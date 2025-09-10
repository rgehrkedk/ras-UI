import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { initializeTheme } from './slices/themeSlice';
import type { Theme, Brand } from './slices/themeSlice';
import { initializePreferences } from './slices/userPreferencesSlice';

import { store, persistor } from './index';

interface StoreProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
  initialBrand?: Brand;
  persistentStorage?: boolean;
  loading?: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ 
  children, 
  initialTheme, 
  initialBrand, 
  persistentStorage = true,
  loading = null 
}) => {
  useEffect(() => {
    // Initialize theme and preferences
    const initializeStore = () => {
      let theme = initialTheme;
      let brand = initialBrand;
      let preferences = {};

      // Load from localStorage if persistence is enabled
      if (persistentStorage && typeof window !== 'undefined') {
        try {
          const savedTheme = localStorage.getItem('ras-ui-theme') as Theme;
          const savedBrand = localStorage.getItem('ras-ui-brand') as Brand;
          const savedPreferences = localStorage.getItem('ras-ui-preferences');

          if (savedTheme) theme = savedTheme;
          if (savedBrand) brand = savedBrand;
          if (savedPreferences) {
            preferences = JSON.parse(savedPreferences);
          }
        } catch (error) {
          console.warn('Failed to load ras-UI preferences from localStorage:', error);
        }
      }

      // Dispatch initialization actions
      store.dispatch(initializeTheme({ theme, brand }));
      store.dispatch(initializePreferences(preferences));

      // Set up system theme preference listener
      if (typeof window !== 'undefined' && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
          const systemTheme: Theme = e.matches ? 'dark' : 'light';
          // Only update if auto theme is enabled
          const state = store.getState();
          if (state.theme.autoTheme) {
            store.dispatch(initializeTheme({ theme: systemTheme }));
          }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        
        // Cleanup function
        return () => {
          mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
      }
    };

    const cleanup = initializeStore();
    return cleanup;
  }, [initialTheme, initialBrand, persistentStorage]);

  // Subscribe to store changes for persistence
  useEffect(() => {
    if (!persistentStorage || typeof window === 'undefined') return;

    const unsubscribe = store.subscribe(() => {
      try {
        const state = store.getState();
        localStorage.setItem('ras-ui-theme', state.theme.theme);
        localStorage.setItem('ras-ui-brand', state.theme.brand);
        localStorage.setItem('ras-ui-preferences', JSON.stringify(state.userPreferences));
      } catch (error) {
        console.warn('Failed to save ras-UI preferences to localStorage:', error);
      }
    });

    return unsubscribe;
  }, [persistentStorage]);

  return (
    <Provider store={store}>
      <PersistGate loading={loading} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;