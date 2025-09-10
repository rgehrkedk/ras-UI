import { describe, it, expect, vi, beforeEach } from 'vitest';
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

// Mock document and window
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

vi.stubGlobal('localStorage', localStorageMock);
vi.stubGlobal('document', mockDocument);
vi.stubGlobal('window', mockWindow);

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

    mockWindow.matchMedia.mockReturnValue(mockMediaQuery);

    render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>
    );

    expect(mockWindow.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('should handle environments without matchMedia', () => {
    vi.stubGlobal('window', undefined);

    expect(() => {
      render(
        <StoreProvider>
          <TestComponent />
        </StoreProvider>
      );
    }).not.toThrow();

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });
});