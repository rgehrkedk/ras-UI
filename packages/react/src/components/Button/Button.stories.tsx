import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Icon } from '../Icon';

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
        component: `
Button provides interactive actions with semantic meaning and consistent behavior across the design system.

## Features
- **Multiple Variants**: Primary for main actions, secondary for supporting actions, ghost for subtle actions, danger for destructive actions
- **Loading States**: Built-in loading spinner with disabled interaction during async operations  
- **Size Options**: Small, medium, and large variants for different interface contexts
- **Full Width Support**: Option to stretch button to container width
- **Icon Integration**: Support for icons with proper spacing and alignment
- **Accessibility First**: Built on React Aria Components with keyboard navigation and screen reader support

## Usage Guidelines
- Use primary buttons for the main action on a page or section
- Limit to one primary button per page or modal to maintain clear hierarchy
- Use secondary buttons for supporting actions like "Cancel" or "Back"
- Use ghost buttons for less prominent actions or when placing on colored backgrounds
- Use danger variant only for destructive actions like "Delete" or "Remove"
- Keep button text action-oriented and concise (e.g., "Save Changes", not "Save")

## Accessibility
- All buttons include proper semantic HTML button elements
- Keyboard accessible with Enter and Space key activation
- Loading states announce status changes to screen readers
- Focus indicators meet WCAG contrast requirements
- Disabled states are announced and not focusable
- Icon buttons include accessible labels for screen readers
        `
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger', 'icon'],
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
    startIcon: <Icon name="save" />,
    children: 'Save Document',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon positioned before the text content.',
      },
    },
  },
};

export const WithEndIcon: Story = {
  args: {
    endIcon: <Icon name="arrow-right" />,
    children: 'Continue',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon positioned after the text content.',
      },
    },
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'icon',
    startIcon: <Icon name="heart" />,
    'aria-label': 'Add to favorites',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only button variant. Requires aria-label for accessibility.',
      },
    },
  },
};

export const LoadingWithIcon: Story = {
  args: {
    variant: 'primary',
    loading: true,
    startIcon: <Icon name="upload" />,
    children: 'Upload Files',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with loading state that replaces icons with spinner.',
      },
    },
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="icon" aria-label="Settings">
        <Icon name="settings" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants including the new icon-only variant.',
      },
    },
  },
};

// Comprehensive icon variants showcase
export const IconVariantsShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>
          Icons with Text
        </h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="primary" startIcon={<Icon name="save" />}>
            Save Document
          </Button>
          <Button variant="secondary" startIcon={<Icon name="download" />}>
            Download
          </Button>
          <Button variant="primary" endIcon={<Icon name="arrow-right" />}>
            Continue
          </Button>
          <Button variant="secondary" endIcon={<Icon name="upload" />}>
            Upload
          </Button>
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>
          Icon-Only Buttons (Different Sizes)
        </h4>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="icon" size="sm" aria-label="Edit" startIcon={<Icon name="edit" />} />
          <Button variant="icon" size="md" aria-label="Delete" startIcon={<Icon name="trash" />} />
          <Button variant="icon" size="lg" aria-label="Settings" startIcon={<Icon name="settings" />} />
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>
          Loading States with Icons
        </h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="primary" loading startIcon={<Icon name="upload" />}>
            Uploading...
          </Button>
          <Button variant="secondary" loading endIcon={<Icon name="download" />}>
            Downloading...
          </Button>
          <Button variant="icon" loading aria-label="Processing" startIcon={<Icon name="settings" />} />
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>
          Common Use Cases
        </h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="primary" startIcon={<Icon name="plus" />}>
            Add New
          </Button>
          <Button variant="secondary" startIcon={<Icon name="search" />}>
            Search
          </Button>
          <Button variant="ghost" startIcon={<Icon name="eye" />}>
            View Details
          </Button>
          <Button variant="danger" startIcon={<Icon name="trash" />}>
            Delete
          </Button>
          <Button variant="icon" aria-label="Close" startIcon={<Icon name="close" />} />
          <Button variant="icon" aria-label="Menu" startIcon={<Icon name="menu" />} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comprehensive showcase of all icon variants including startIcon, endIcon, icon-only, and loading states with icons.',
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
          startIcon={<Icon name="folder" />}
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
        <p style={{ marginBottom: '2rem', color: 'var(--color-semantic-text-secondary)', fontSize: '0.9rem' }}>
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
        background: 'var(--color-semantic-surface-elevated)', 
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