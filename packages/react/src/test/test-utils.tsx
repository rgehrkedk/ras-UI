/**
 * Test utilities and custom render functions
 */

import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';

// Test wrapper that includes necessary providers
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="light">
      {children}
    </div>
  );
}

// Custom render function that includes our test wrapper
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult {
  return render(ui, { wrapper: TestWrapper, ...options });
}

// Create user event instance with default options
function createUser() {
  return userEvent.setup();
}

// Helper to get theme classes for testing
export function getThemeClasses() {
  return {
    light: '[data-theme="light"]',
    dark: '[data-theme="dark"]',
    'hc-light': '[data-theme="hc-light"]',
    'hc-dark': '[data-theme="hc-dark"]',
  };
}

// Helper to mock component dependencies
export function mockComponent(name: string) {
  const MockComponent = React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => (
    <div ref={ref} data-testid={`mock-${name}`} {...props} />
  ));
  MockComponent.displayName = `Mock${name}`;
  return MockComponent;
}

// Re-export everything from testing library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Override the default render with our custom one
export { customRender as render, createUser };