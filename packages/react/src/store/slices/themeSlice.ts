import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark' | 'hc-light' | 'hc-dark';
export type Brand = 'default' | 'vibrant' | 'corporate';

export interface ThemeState {
  theme: Theme;
  brand: Brand;
  systemPreference: Theme | null;
  autoTheme: boolean;
}

const initialState: ThemeState = {
  theme: 'light',
  brand: 'default',
  systemPreference: null,
  autoTheme: false,
};

// Helper function to apply theme to document
const applyThemeToDocument = (theme: Theme, brand: Brand) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-brand', brand);
  }
};

// Helper function to detect system theme preference
const getSystemTheme = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      state.autoTheme = false;
      applyThemeToDocument(state.theme, state.brand);
    },
    setBrand: (state, action: PayloadAction<Brand>) => {
      state.brand = action.payload;
      applyThemeToDocument(state.theme, state.brand);
    },
    toggleTheme: (state) => {
      const themeMap: Record<Theme, Theme> = {
        'light': 'dark',
        'dark': 'light',
        'hc-light': 'hc-dark',
        'hc-dark': 'hc-light',
      };
      state.theme = themeMap[state.theme];
      state.autoTheme = false;
      applyThemeToDocument(state.theme, state.brand);
    },
    setAutoTheme: (state, action: PayloadAction<boolean>) => {
      state.autoTheme = action.payload;
      if (action.payload) {
        state.systemPreference = getSystemTheme();
        state.theme = state.systemPreference;
        applyThemeToDocument(state.theme, state.brand);
      }
    },
    updateSystemPreference: (state, action: PayloadAction<Theme>) => {
      state.systemPreference = action.payload;
      if (state.autoTheme) {
        state.theme = action.payload;
        applyThemeToDocument(state.theme, state.brand);
      }
    },
    initializeTheme: (state, action: PayloadAction<{ theme?: Theme; brand?: Brand }>) => {
      const { theme, brand } = action.payload;
      if (theme) state.theme = theme;
      if (brand) state.brand = brand;
      state.systemPreference = getSystemTheme();
      applyThemeToDocument(state.theme, state.brand);
    },
  },
});

export const { 
  setTheme, 
  setBrand, 
  toggleTheme, 
  setAutoTheme, 
  updateSystemPreference, 
  initializeTheme 
} = themeSlice.actions;

export default themeSlice.reducer;