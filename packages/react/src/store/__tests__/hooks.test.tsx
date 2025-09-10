import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { useTheme, useSidebar, useAccessibility, useNotifications, useDesignSystem } from '../hooks';
import themeReducer from '../slices/themeSlice';
import userPreferencesReducer from '../slices/userPreferencesSlice';

// Mock document and window for theme slice
const mockDocument = {
  documentElement: {
    setAttribute: vi.fn(),
    style: { setProperty: vi.fn() },
    classList: { add: vi.fn(), remove: vi.fn() },
  },
};

const mockWindow = {
  matchMedia: vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
};

vi.stubGlobal('document', mockDocument);
vi.stubGlobal('window', mockWindow);

// Create test store
function createTestStore(initialState = {}) {
  return configureStore({
    reducer: {
      theme: themeReducer,
      userPreferences: userPreferencesReducer,
    },
    preloadedState: initialState,
  });
}

// Wrapper component for testing hooks
function createWrapper(store: ReturnType<typeof createTestStore>) {
  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
}

describe('Redux Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useTheme', () => {
    it('should return theme state and actions', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useTheme(), { wrapper });
      
      expect(result.current.theme).toBe('light');
      expect(result.current.brand).toBe('default');
      expect(result.current.autoTheme).toBe(false);
      expect(result.current.systemPreference).toBe(null);
      expect(typeof result.current.setTheme).toBe('function');
      expect(typeof result.current.setBrand).toBe('function');
      expect(typeof result.current.toggleTheme).toBe('function');
      expect(typeof result.current.setAutoTheme).toBe('function');
    });

    it('should update theme when setTheme is called', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useTheme(), { wrapper });
      
      act(() => {
        result.current.setTheme('dark');
      });
      
      expect(result.current.theme).toBe('dark');
    });

    it('should update brand when setBrand is called', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useTheme(), { wrapper });
      
      act(() => {
        result.current.setBrand('vibrant');
      });
      
      expect(result.current.brand).toBe('vibrant');
    });

    it('should toggle theme when toggleTheme is called', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useTheme(), { wrapper });
      
      act(() => {
        result.current.toggleTheme();
      });
      
      expect(result.current.theme).toBe('dark');
      
      act(() => {
        result.current.toggleTheme();
      });
      
      expect(result.current.theme).toBe('light');
    });
  });

  describe('useSidebar', () => {
    it('should return sidebar state and actions', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useSidebar(), { wrapper });
      
      expect(result.current.collapsed).toBe(false);
      expect(typeof result.current.setCollapsed).toBe('function');
      expect(typeof result.current.toggle).toBe('function');
    });

    it('should update collapsed state when setCollapsed is called', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useSidebar(), { wrapper });
      
      act(() => {
        result.current.setCollapsed(true);
      });
      
      expect(result.current.collapsed).toBe(true);
    });

    it('should toggle collapsed state when toggle is called', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useSidebar(), { wrapper });
      
      act(() => {
        result.current.toggle();
      });
      
      expect(result.current.collapsed).toBe(true);
      
      act(() => {
        result.current.toggle();
      });
      
      expect(result.current.collapsed).toBe(false);
    });
  });

  describe('useAccessibility', () => {
    it('should return accessibility state and actions', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      
      expect(result.current.reducedMotion).toBe(false);
      expect(result.current.highContrast).toBe(false);
      expect(result.current.fontSize).toBe('medium');
      expect(result.current.language).toBe('en');
      expect(typeof result.current.setReducedMotion).toBe('function');
      expect(typeof result.current.setHighContrast).toBe('function');
      expect(typeof result.current.setFontSize).toBe('function');
      expect(typeof result.current.setLanguage).toBe('function');
    });

    it('should update reduced motion when setReducedMotion is called', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      
      act(() => {
        result.current.setReducedMotion(true);
      });
      
      expect(result.current.reducedMotion).toBe(true);
    });

    it('should update font size when setFontSize is called', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      
      act(() => {
        result.current.setFontSize('large');
      });
      
      expect(result.current.fontSize).toBe('large');
    });
  });

  describe('useNotifications', () => {
    it('should return notification state and actions', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useNotifications(), { wrapper });
      
      expect(result.current.notifications.enabled).toBe(true);
      expect(result.current.notifications.sound).toBe(true);
      expect(result.current.notifications.desktop).toBe(false);
      expect(typeof result.current.updateNotificationSettings).toBe('function');
    });

    it('should update notification settings when updateNotificationSettings is called', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useNotifications(), { wrapper });
      
      act(() => {
        result.current.updateNotificationSettings({ enabled: false, desktop: true });
      });
      
      expect(result.current.notifications.enabled).toBe(false);
      expect(result.current.notifications.desktop).toBe(true);
      expect(result.current.notifications.sound).toBe(true); // Should remain unchanged
    });
  });

  describe('useDesignSystem', () => {
    it('should return all design system hooks', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useDesignSystem(), { wrapper });
      
      expect(result.current.theme).toBeDefined();
      expect(result.current.sidebar).toBeDefined();
      expect(result.current.accessibility).toBeDefined();
      expect(result.current.notifications).toBeDefined();
      
      // Verify structure
      expect(result.current.theme.theme).toBe('light');
      expect(result.current.sidebar.collapsed).toBe(false);
      expect(result.current.accessibility.fontSize).toBe('medium');
      expect(result.current.notifications.notifications.enabled).toBe(true);
    });

    it('should allow coordinated updates across all features', () => {
      const store = createTestStore();
      const wrapper = createWrapper(store);
      
      const { result } = renderHook(() => useDesignSystem(), { wrapper });
      
      act(() => {
        result.current.theme.setTheme('dark');
        result.current.theme.setBrand('vibrant');
        result.current.sidebar.setCollapsed(true);
        result.current.accessibility.setFontSize('large');
      });
      
      expect(result.current.theme.theme).toBe('dark');
      expect(result.current.theme.brand).toBe('vibrant');
      expect(result.current.sidebar.collapsed).toBe(true);
      expect(result.current.accessibility.fontSize).toBe('large');
    });
  });
});