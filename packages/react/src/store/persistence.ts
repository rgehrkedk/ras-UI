import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import themeReducer from './slices/themeSlice';
import userPreferencesReducer from './slices/userPreferencesSlice';

// Define what we want to persist
const themePersistConfig = {
  key: 'ras-ui-theme',
  storage,
  whitelist: ['theme', 'brand', 'autoTheme'], // Only persist these fields
};

const userPreferencesPersistConfig = {
  key: 'ras-ui-user-preferences',
  storage,
  // Persist all user preferences
};

// Create persisted reducers
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedUserPreferencesReducer = persistReducer(
  userPreferencesPersistConfig,
  userPreferencesReducer
);

// Combine all reducers
export const rootReducer = combineReducers({
  theme: persistedThemeReducer,
  userPreferences: persistedUserPreferencesReducer,
});

// Create persistor function
export const createPersistor = (store: any) => persistStore(store);

// Types
export type PersistedRootState = ReturnType<typeof rootReducer>;