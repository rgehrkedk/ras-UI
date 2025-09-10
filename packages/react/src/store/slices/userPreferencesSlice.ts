import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferencesState {
  sidebarCollapsed: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
  accessibility: {
    screenReader: boolean;
    keyboardNavigation: boolean;
    focusVisible: boolean;
  };
}

const initialState: UserPreferencesState = {
  sidebarCollapsed: false,
  reducedMotion: false,
  highContrast: false,
  fontSize: 'medium',
  language: 'en',
  notifications: {
    enabled: true,
    sound: true,
    desktop: false,
  },
  accessibility: {
    screenReader: false,
    keyboardNavigation: true,
    focusVisible: true,
  },
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setReducedMotion: (state, action: PayloadAction<boolean>) => {
      state.reducedMotion = action.payload;
      // Apply to document for CSS detection
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
          '--motion-preference',
          action.payload ? 'reduce' : 'no-preference'
        );
      }
    },
    setHighContrast: (state, action: PayloadAction<boolean>) => {
      state.highContrast = action.payload;
      // Apply to document for CSS detection
      if (typeof document !== 'undefined') {
        if (action.payload) {
          document.documentElement.classList.add('high-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
        }
      }
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
      // Apply to document
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-font-size', action.payload);
      }
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      // Apply to document
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('lang', action.payload);
      }
    },
    setNotificationPreferences: (
      state,
      action: PayloadAction<Partial<UserPreferencesState['notifications']>>
    ) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    setAccessibilityPreferences: (
      state,
      action: PayloadAction<Partial<UserPreferencesState['accessibility']>>
    ) => {
      state.accessibility = { ...state.accessibility, ...action.payload };
    },
    initializePreferences: (state, action: PayloadAction<Partial<UserPreferencesState>>) => {
      Object.assign(state, action.payload);
      
      // Apply all preferences to document
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-font-size', state.fontSize);
        document.documentElement.setAttribute('lang', state.language);
        document.documentElement.style.setProperty(
          '--motion-preference',
          state.reducedMotion ? 'reduce' : 'no-preference'
        );
        
        if (state.highContrast) {
          document.documentElement.classList.add('high-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
        }
      }
    },
    resetPreferences: () => initialState,
  },
});

export const {
  setSidebarCollapsed,
  toggleSidebar,
  setReducedMotion,
  setHighContrast,
  setFontSize,
  setLanguage,
  setNotificationPreferences,
  setAccessibilityPreferences,
  initializePreferences,
  resetPreferences,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;