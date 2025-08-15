/**
 * Test setup file for Vitest
 */

import '@testing-library/jest-dom/vitest';

// Mock ResizeObserver for tests
global.ResizeObserver = class ResizeObserver {
  private cb: ResizeObserverCallback;
  
  constructor(cb: ResizeObserverCallback) {
    this.cb = cb;
  }
  
  observe() {
    // Mock implementation
  }
  
  unobserve() {
    // Mock implementation
  }
  
  disconnect() {
    // Mock implementation
  }
};

// Mock IntersectionObserver for tests
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = Object.freeze([]);
  
  private cb: IntersectionObserverCallback;
  
  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb;
  }
  
  observe() {
    // Mock implementation
  }
  
  unobserve() {
    // Mock implementation
  }
  
  disconnect() {
    // Mock implementation
  }
  
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

// Mock matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock scrollTo for tests
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});

// Mock requestAnimationFrame for tests
Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: (callback: (time: number) => void) => {
    return setTimeout(() => callback(Date.now()), 16);
  },
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: (id: number) => {
    clearTimeout(id);
  },
});