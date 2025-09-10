import { useCallback } from 'react';

import { 
  setTheme, 
  setBrand, 
  toggleTheme, 
  setAutoTheme,
  type Theme,
  type Brand 
} from './slices/themeSlice';
import {
  setSidebarCollapsed,
  toggleSidebar,
  setReducedMotion,
  setHighContrast,
  setFontSize,
  setLanguage,
  setNotificationPreferences,
  setAccessibilityPreferences,
} from './slices/userPreferencesSlice';

import { useAppSelector, useAppDispatch } from './index';

// Theme and Brand Hooks
export const useTheme = () => {
  const dispatch = useAppDispatch();
  const themeState = useAppSelector((state) => state.theme);

  const changeTheme = useCallback((theme: Theme) => {
    dispatch(setTheme(theme));
  }, [dispatch]);

  const changeBrand = useCallback((brand: Brand) => {
    dispatch(setBrand(brand));
  }, [dispatch]);

  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const setAutoMode = useCallback((auto: boolean) => {
    dispatch(setAutoTheme(auto));
  }, [dispatch]);

  return {
    theme: themeState.theme,
    brand: themeState.brand,
    systemPreference: themeState.systemPreference,
    autoTheme: themeState.autoTheme,
    setTheme: changeTheme,
    setBrand: changeBrand,
    toggleTheme: toggle,
    setAutoTheme: setAutoMode,
  };
};

// Sidebar Hooks
export const useSidebar = () => {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.userPreferences.sidebarCollapsed);

  const setCollapsed = useCallback((collapsed: boolean) => {
    dispatch(setSidebarCollapsed(collapsed));
  }, [dispatch]);

  const toggle = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  return {
    collapsed,
    setCollapsed,
    toggle,
  };
};

// Accessibility Hooks
export const useAccessibility = () => {
  const dispatch = useAppDispatch();
  const preferences = useAppSelector((state) => state.userPreferences);

  const setMotionPreference = useCallback((reducedMotion: boolean) => {
    dispatch(setReducedMotion(reducedMotion));
  }, [dispatch]);

  const setContrastPreference = useCallback((highContrast: boolean) => {
    dispatch(setHighContrast(highContrast));
  }, [dispatch]);

  const setFontSizePreference = useCallback((fontSize: 'small' | 'medium' | 'large') => {
    dispatch(setFontSize(fontSize));
  }, [dispatch]);

  const setLanguagePreference = useCallback((language: string) => {
    dispatch(setLanguage(language));
  }, [dispatch]);

  const updateAccessibilitySettings = useCallback((settings: Partial<typeof preferences.accessibility>) => {
    dispatch(setAccessibilityPreferences(settings));
  }, [dispatch]);

  return {
    reducedMotion: preferences.reducedMotion,
    highContrast: preferences.highContrast,
    fontSize: preferences.fontSize,
    language: preferences.language,
    accessibility: preferences.accessibility,
    setReducedMotion: setMotionPreference,
    setHighContrast: setContrastPreference,
    setFontSize: setFontSizePreference,
    setLanguage: setLanguagePreference,
    updateAccessibilitySettings,
  };
};

// Notifications Hooks
export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.userPreferences.notifications);

  const updateNotificationSettings = useCallback((settings: Partial<typeof notifications>) => {
    dispatch(setNotificationPreferences(settings));
  }, [dispatch]);

  return {
    notifications,
    updateNotificationSettings,
  };
};

// Combined Design System Hook
export const useDesignSystem = () => {
  const theme = useTheme();
  const sidebar = useSidebar();
  const accessibility = useAccessibility();
  const notifications = useNotifications();

  return {
    theme,
    sidebar,
    accessibility,
    notifications,
  };
};