import { describe, it, expect, beforeEach, vi } from 'vitest';
import themeReducer, {
  setTheme,
  setBrand,
  toggleTheme,
  setAutoTheme,
  updateSystemPreference,
  initializeTheme,
  type Theme,
  type Brand,
} from '../themeSlice';

// Mock document and window
const mockDocument = {
  documentElement: {
    setAttribute: vi.fn(),
  },
};

const mockWindow = {
  matchMedia: vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
};

// Mock global objects
vi.stubGlobal('document', mockDocument);
vi.stubGlobal('window', mockWindow);

describe('themeSlice', () => {
  const initialState = {
    theme: 'light' as Theme,
    brand: 'default' as Brand,
    systemPreference: null,
    autoTheme: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(themeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setTheme', () => {
      const action = setTheme('dark');
      const state = themeReducer(initialState, action);
      
      expect(state.theme).toBe('dark');
      expect(state.autoTheme).toBe(false);
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    });

    it('should handle setBrand', () => {
      const action = setBrand('vibrant');
      const state = themeReducer(initialState, action);
      
      expect(state.brand).toBe('vibrant');
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('data-brand', 'vibrant');
    });

    it('should handle toggleTheme correctly', () => {
      const lightState = { ...initialState, theme: 'light' as Theme };
      const darkState = themeReducer(lightState, toggleTheme());
      expect(darkState.theme).toBe('dark');
      expect(darkState.autoTheme).toBe(false);

      const backToLightState = themeReducer(darkState, toggleTheme());
      expect(backToLightState.theme).toBe('light');
    });

    it('should handle high contrast theme toggling', () => {
      const hcLightState = { ...initialState, theme: 'hc-light' as Theme };
      const hcDarkState = themeReducer(hcLightState, toggleTheme());
      expect(hcDarkState.theme).toBe('hc-dark');

      const backToHcLightState = themeReducer(hcDarkState, toggleTheme());
      expect(backToHcLightState.theme).toBe('hc-light');
    });

    it('should handle setAutoTheme', () => {
      mockWindow.matchMedia.mockReturnValue({
        matches: true, // Simulating dark preference
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const action = setAutoTheme(true);
      const state = themeReducer(initialState, action);
      
      expect(state.autoTheme).toBe(true);
      expect(state.systemPreference).toBe('dark');
      expect(state.theme).toBe('dark');
    });

    it('should handle updateSystemPreference when autoTheme is enabled', () => {
      const autoThemeState = { ...initialState, autoTheme: true };
      const action = updateSystemPreference('dark');
      const state = themeReducer(autoThemeState, action);
      
      expect(state.systemPreference).toBe('dark');
      expect(state.theme).toBe('dark');
    });

    it('should not update theme when autoTheme is disabled', () => {
      const action = updateSystemPreference('dark');
      const state = themeReducer(initialState, action);
      
      expect(state.systemPreference).toBe('dark');
      expect(state.theme).toBe('light'); // Should remain unchanged
    });

    it('should handle initializeTheme', () => {
      mockWindow.matchMedia.mockReturnValue({
        matches: false, // Simulating light preference
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      const action = initializeTheme({ theme: 'dark', brand: 'vibrant' });
      const state = themeReducer(initialState, action);
      
      expect(state.theme).toBe('dark');
      expect(state.brand).toBe('vibrant');
      expect(state.systemPreference).toBe('light');
    });
  });

  describe('document integration', () => {
    it('should apply theme and brand to document on setTheme', () => {
      const state = { ...initialState, brand: 'corporate' as Brand };
      themeReducer(state, setTheme('dark'));
      
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('data-brand', 'corporate');
    });

    it('should apply theme and brand to document on setBrand', () => {
      const state = { ...initialState, theme: 'dark' as Theme };
      themeReducer(state, setBrand('vibrant'));
      
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('data-brand', 'vibrant');
    });
  });
});