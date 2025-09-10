import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from '../components';
import StoreProvider from './StoreProvider';
import { useTheme, useSidebar } from './hooks';

// Demo component that uses Redux hooks
function ReduxDemo() {
  const { theme, brand, toggleTheme, setBrand } = useTheme();
  const { collapsed, toggle: toggleSidebar } = useSidebar();

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h2>ras-UI Redux Integration Demo</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Current State:</h3>
        <p><strong>Theme:</strong> {theme}</p>
        <p><strong>Brand:</strong> {brand}</p>
        <p><strong>Sidebar:</strong> {collapsed ? 'Collapsed' : 'Expanded'}</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <h3>Theme Controls:</h3>
        <Button variant="secondary" size="sm" onClick={toggleTheme}>
          Toggle Theme ({theme})
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <h3>Brand Controls:</h3>
        <Button 
          variant={brand === 'default' ? 'primary' : 'secondary'} 
          size="sm" 
          onClick={() => setBrand('default')}
        >
          Default
        </Button>
        <Button 
          variant={brand === 'vibrant' ? 'primary' : 'secondary'} 
          size="sm" 
          onClick={() => setBrand('vibrant')}
        >
          Vibrant
        </Button>
        <Button 
          variant={brand === 'corporate' ? 'primary' : 'secondary'} 
          size="sm" 
          onClick={() => setBrand('corporate')}
        >
          Corporate
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <h3>Sidebar Controls:</h3>
        <Button variant="secondary" size="sm" onClick={toggleSidebar}>
          {collapsed ? 'Expand' : 'Collapse'} Sidebar
        </Button>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h4>How it works:</h4>
        <p>This demo uses Redux Toolkit for state management with:</p>
        <ul>
          <li><strong>Theme Slice:</strong> Manages theme, brand, and auto-theme preferences</li>
          <li><strong>User Preferences Slice:</strong> Manages sidebar state and accessibility settings</li>
          <li><strong>Custom Hooks:</strong> Provide easy access to state and actions</li>
          <li><strong>Redux Persist:</strong> Automatically saves preferences to localStorage</li>
          <li><strong>StoreProvider:</strong> Wraps your app to provide Redux context</li>
        </ul>
      </div>
    </div>
  );
}

const meta: Meta<typeof ReduxDemo> = {
  title: 'System/Redux Integration',
  component: ReduxDemo,
  decorators: [
    (Story) => (
      <StoreProvider>
        <Story />
      </StoreProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => <ReduxDemo />,
};

export const WithInitialState: Story = {
  decorators: [
    (Story) => (
      <StoreProvider initialTheme="dark" initialBrand="vibrant">
        <Story />
      </StoreProvider>
    ),
  ],
  render: () => <ReduxDemo />,
};

export const NoPersistence: Story = {
  decorators: [
    (Story) => (
      <StoreProvider persistentStorage={false}>
        <Story />
      </StoreProvider>
    ),
  ],
  render: () => <ReduxDemo />,
};