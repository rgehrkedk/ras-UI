import { describe, it, expect, beforeEach, vi } from 'vitest';
import userPreferencesReducer, {
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
} from '../userPreferencesSlice';

// Mock document
const mockDocument = {
  documentElement: {
    style: {
      setProperty: vi.fn(),
    },
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
    },
    setAttribute: vi.fn(),
  },
};

vi.stubGlobal('document', mockDocument);

describe('userPreferencesSlice', () => {
  const initialState = {
    sidebarCollapsed: false,
    reducedMotion: false,
    highContrast: false,
    fontSize: 'medium' as const,
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(userPreferencesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setSidebarCollapsed', () => {
      const action = setSidebarCollapsed(true);
      const state = userPreferencesReducer(initialState, action);
      
      expect(state.sidebarCollapsed).toBe(true);
    });

    it('should handle toggleSidebar', () => {
      const state = userPreferencesReducer(initialState, toggleSidebar());
      expect(state.sidebarCollapsed).toBe(true);
      
      const toggledBackState = userPreferencesReducer(state, toggleSidebar());
      expect(toggledBackState.sidebarCollapsed).toBe(false);
    });

    it('should handle setReducedMotion and apply to document', () => {
      const action = setReducedMotion(true);
      const state = userPreferencesReducer(initialState, action);
      
      expect(state.reducedMotion).toBe(true);
      expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--motion-preference',
        'reduce'
      );
    });

    it('should handle setHighContrast and apply to document', () => {
      const action = setHighContrast(true);
      const state = userPreferencesReducer(initialState, action);
      
      expect(state.highContrast).toBe(true);
      expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('high-contrast');
    });

    it('should remove high contrast class when disabled', () => {
      const highContrastState = { ...initialState, highContrast: true };
      const action = setHighContrast(false);
      const state = userPreferencesReducer(highContrastState, action);
      
      expect(state.highContrast).toBe(false);
      expect(mockDocument.documentElement.classList.remove).toHaveBeenCalledWith('high-contrast');
    });

    it('should handle setFontSize and apply to document', () => {
      const action = setFontSize('large');
      const state = userPreferencesReducer(initialState, action);
      
      expect(state.fontSize).toBe('large');
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('data-font-size', 'large');
    });

    it('should handle setLanguage and apply to document', () => {
      const action = setLanguage('es');
      const state = userPreferencesReducer(initialState, action);
      
      expect(state.language).toBe('es');
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('lang', 'es');
    });

    it('should handle setNotificationPreferences partial updates', () => {
      const action = setNotificationPreferences({ enabled: false, desktop: true });
      const state = userPreferencesReducer(initialState, action);
      
      expect(state.notifications).toEqual({
        enabled: false,
        sound: true, // unchanged
        desktop: true,
      });
    });

    it('should handle setAccessibilityPreferences partial updates', () => {
      const action = setAccessibilityPreferences({ screenReader: true, focusVisible: false });
      const state = userPreferencesReducer(initialState, action);
      
      expect(state.accessibility).toEqual({
        screenReader: true,
        keyboardNavigation: true, // unchanged
        focusVisible: false,
      });
    });

    it('should handle initializePreferences and apply to document', () => {
      const preferences = {
        fontSize: 'small' as const,
        language: 'fr',
        reducedMotion: true,
        highContrast: true,
      };
      
      const action = initializePreferences(preferences);
      const state = userPreferencesReducer(initialState, action);
      
      expect(state.fontSize).toBe('small');
      expect(state.language).toBe('fr');
      expect(state.reducedMotion).toBe(true);
      expect(state.highContrast).toBe(true);
      
      // Check document updates
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('data-font-size', 'small');
      expect(mockDocument.documentElement.setAttribute).toHaveBeenCalledWith('lang', 'fr');
      expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--motion-preference',
        'reduce'
      );
      expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('high-contrast');
    });

    it('should handle resetPreferences', () => {
      const modifiedState = {
        ...initialState,
        sidebarCollapsed: true,
        fontSize: 'large' as const,
        language: 'es',
      };
      
      const state = userPreferencesReducer(modifiedState, resetPreferences());
      expect(state).toEqual(initialState);
    });
  });

  describe('document integration edge cases', () => {
    it('should not throw when document is undefined', () => {
      vi.stubGlobal('document', undefined);
      
      expect(() => {
        userPreferencesReducer(initialState, setReducedMotion(true));
      }).not.toThrow();
      
      expect(() => {
        userPreferencesReducer(initialState, setHighContrast(true));
      }).not.toThrow();
      
      expect(() => {
        userPreferencesReducer(initialState, setFontSize('large'));
      }).not.toThrow();
      
      expect(() => {
        userPreferencesReducer(initialState, setLanguage('es'));
      }).not.toThrow();
    });
  });
});