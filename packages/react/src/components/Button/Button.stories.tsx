import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible button component with multiple variants and states. Built on React Aria Components for robust accessibility.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner and disables interaction',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether button should take full width of container',
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Disables the button',
    },
  },
  // Use action to log onPress events in the actions panel
  args: { onPress: () => console.log('Button pressed') },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: 'Disabled Button',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithStartIcon: Story = {
  args: {
    startIcon: '→',
    children: 'With Start Icon',
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: '←',
    children: 'With End Icon',
  },
};

export const IconOnly: Story = {
  args: {
    startIcon: '⭐',
    'aria-label': 'Favorite',
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together.',
      },
    },
  },
};

// Showcase all sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes displayed together.',
      },
    },
  },
};

// Interactive example
export const InteractiveExample: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Button onPress={() => window.alert('Primary button clicked!')}>
          Click for Alert
        </Button>
        <Button 
          variant="secondary" 
          startIcon="📁"
          onPress={() => console.log('Opening file...')}
        >
          Open File
        </Button>
        <Button 
          variant="danger" 
          onPress={() => window.confirm('Are you sure you want to delete?')}
        >
          Delete Item
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive buttons that demonstrate real-world usage with event handlers.',
      },
    },
  },
};

// Contrast testing story for WCAG compliance validation
export const ContrastTesting: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column', padding: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>
          WCAG Contrast Validation Test
        </h3>
        <p style={{ marginBottom: '2rem', color: '#666', fontSize: '0.9rem' }}>
          All buttons should meet WCAG AA contrast standards (4.5:1 minimum).
          Check the contrast displays and accessibility panel for validation.
        </p>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>All Variants</h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Danger Button</Button>
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>All Sizes</h4>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <Button variant="primary" size="sm">Small Primary</Button>
          <Button variant="primary" size="md">Medium Primary</Button>
          <Button variant="primary" size="lg">Large Primary</Button>
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>States</h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <Button variant="primary">Normal State</Button>
          <Button variant="primary" isDisabled>Disabled State</Button>
          <Button variant="primary" loading>Loading State</Button>
        </div>
      </div>
      
      <div style={{ 
        padding: '1rem', 
        background: '#f5f5f5', 
        borderRadius: '8px',
        fontSize: '0.9rem',
        lineHeight: 1.5
      }}>
        <strong>Expected Results:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>Primary: #2563eb background + white text = ~5.2:1 (AA)</li>
          <li>Secondary: white background + #374151 text = ~10.3:1 (AAA)</li>
          <li>Ghost: transparent + #111827 text = ~17.7:1 (AAA)</li>
          <li>Danger: #dc2626 background + white text = ~4.8:1 (AA)</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive contrast testing story for WCAG compliance validation. Use this story to verify that all button variants meet accessibility standards and that the custom contrast checker works correctly without interfering with the a11y addon.',
      },
    },
  },
};