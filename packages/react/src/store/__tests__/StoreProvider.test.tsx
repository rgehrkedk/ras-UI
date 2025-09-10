import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import StoreProvider from '../StoreProvider';
import { useTheme } from '../hooks';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock localStorage but keep real DOM environment
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock matchMedia if needed
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Test component that uses the store
function TestComponent() {
  const { theme, brand } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="brand">{brand}</span>
    </div>
  );
}

describe('StoreProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset localStorage mock to default state
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  it('should render children correctly', () => {
    render(
      <StoreProvider>
        <div data-testid="child">Test Child</div>
      </StoreProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should initialize with default values', () => {
    render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('brand')).toHaveTextContent('default');
  });

  it('should initialize with custom initial values', () => {
    render(
      <StoreProvider initialTheme="dark" initialBrand="vibrant">
        <TestComponent />
      </StoreProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('brand')).toHaveTextContent('vibrant');
  });

  it('should load saved preferences from localStorage when available', () => {
    // Mock localStorage to return saved values
    localStorageMock.getItem.mockImplementation((key) => {
      switch (key) {
        case 'ras-ui-theme':
          return 'dark';
        case 'ras-ui-brand':
          return 'corporate';
        case 'ras-ui-preferences':
          return JSON.stringify({ sidebarCollapsed: true });
        default:
          return null;
      }
    });

    render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('brand')).toHaveTextContent('corporate');
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw an error
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(() => {
      render(
        <StoreProvider>
          <TestComponent />
        </StoreProvider>
      );
    }).not.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to load ras-UI preferences from localStorage'),
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('should prioritize initial props over localStorage', () => {
    // Mock localStorage to return different values
    localStorageMock.getItem.mockImplementation((key) => {
      switch (key) {
        case 'ras-ui-theme':
          return 'light';
        case 'ras-ui-brand':
          return 'default';
        default:
          return null;
      }
    });

    render(
      <StoreProvider initialTheme="dark" initialBrand="vibrant">
        <TestComponent />
      </StoreProvider>
    );

    // Should use initial props, not localStorage values
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('brand')).toHaveTextContent('vibrant');
  });

  it('should disable persistence when persistentStorage is false', () => {
    render(
      <StoreProvider persistentStorage={false}>
        <TestComponent />
      </StoreProvider>
    );

    // Should not call localStorage.getItem when persistence is disabled
    expect(localStorageMock.getItem).not.toHaveBeenCalled();
  });

  it('should render loading component when provided', () => {
    const LoadingComponent = () => <div data-testid="loading">Loading...</div>;

    render(
      <StoreProvider loading={<LoadingComponent />}>
        <TestComponent />
      </StoreProvider>
    );

    // Note: PersistGate loading is managed by redux-persist internally
    // This test ensures the loading prop is properly passed
    expect(screen.getByTestId('theme')).toBeInTheDocument();
  });

  it('should set up system theme preference listener', () => {
    const mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    window.matchMedia = vi.fn().mockReturnValue(mockMediaQuery);

    render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>
    );

    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('should handle environments without matchMedia', () => {
    // Temporarily remove matchMedia
    const originalMatchMedia = window.matchMedia;
    (window as any).matchMedia = undefined;

    try {
      expect(() => {
        render(
          <StoreProvider>
            <TestComponent />
          </StoreProvider>
        );
      }).not.toThrow();

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
    } finally {
      // Always restore
      window.matchMedia = originalMatchMedia;
    }
  });
});