/**
 * Tooltip component stories for Storybook
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoCircle, HelpCircle, WarningTriangle } from 'iconoir-react';
import React from 'react';

import { Button } from '../Button';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tooltip component provides accessible contextual information that appears on hover or focus.
Built with React Aria Components and follows floating UI design principles with elevation.2 surface treatment.

## Features
- **Accessible**: Full keyboard navigation and screen reader support
- **Floating UI**: Opaque surfaces with elevation.2 for clear floating elements
- **Customizable**: Multiple sizes, placements, and styling options
- **Performance**: Respects \`prefers-reduced-motion\` for animations
- **Brand-aware**: Works across all brand themes (default, vibrant, corporate)

## Usage Guidelines
- Use for supplementary information that helps users understand interface elements
- Keep content concise and scannable
- Avoid critical information that users need to complete tasks
- Test with keyboard navigation and screen readers
        `
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The content to show in the tooltip'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tooltip size variant'
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip placement relative to trigger'
    },
    delay: {
      control: 'number',
      description: 'Delay before showing tooltip in milliseconds'
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show arrow pointing to trigger'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled'
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names'
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    children: <Button>Hover me</Button>,
  },
};

// Placement variants
export const Placements: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)', 
      gap: '3rem',
      padding: '2rem' 
    }}>
      <Tooltip content="Tooltip above" placement="top">
        <Button>Top</Button>
      </Tooltip>
      
      <Tooltip content="Tooltip below" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      
      <Tooltip content="Tooltip on left" placement="left">
        <Button>Left</Button>
      </Tooltip>
      
      <Tooltip content="Tooltip on right" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be positioned on any side of the trigger element.'
      }
    }
  }
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip content="Small tooltip with concise text" size="sm">
        <Button size="sm">Small</Button>
      </Tooltip>
      
      <Tooltip content="Medium tooltip with moderate amount of text" size="md">
        <Button size="md">Medium</Button>
      </Tooltip>
      
      <Tooltip 
        content="Large tooltip with more detailed information and longer explanatory text that wraps to multiple lines" 
        size="lg"
      >
        <Button size="lg">Large</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips support different sizes to accommodate varying amounts of content.'
      }
    }
  }
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip content="Get more information about this feature">
        <Button variant="ghost" size="sm">
          <InfoCircle width={16} height={16} />
        </Button>
      </Tooltip>
      
      <Tooltip content="Click for help documentation" placement="bottom">
        <Button variant="ghost" size="sm">
          <HelpCircle width={16} height={16} />
        </Button>
      </Tooltip>
      
      <Tooltip content="Warning: This action cannot be undone" placement="right">
        <Button variant="danger" size="sm">
          <WarningTriangle width={16} height={16} />
        </Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips work well with icon buttons to provide context for actions.'
      }
    }
  }
};

// Complex content
export const ComplexContent: Story = {
  args: {
    content: (
      <div>
        <strong>User Settings</strong>
        <div style={{ fontSize: '0.875rem', marginTop: '4px', opacity: 0.9 }}>
          Configure your account preferences and privacy settings
        </div>
      </div>
    ),
    size: 'lg',
    children: <Button>Settings</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can contain rich content including formatted text and multiple elements.'
      }
    }
  }
};

// Without arrow
export const WithoutArrow: Story = {
  args: {
    content: 'Clean tooltip without arrow',
    showArrow: false,
    children: <Button>No arrow</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be displayed without an arrow for a cleaner look.'
      }
    }
  }
};

// Custom delay
export const CustomDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip content="Fast tooltip (200ms)" delay={200}>
        <Button>Fast</Button>
      </Tooltip>
      
      <Tooltip content="Normal tooltip (700ms)" delay={700}>
        <Button>Normal</Button>
      </Tooltip>
      
      <Tooltip content="Slow tooltip (1500ms)" delay={1500}>
        <Button>Slow</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip display delay can be customized to match your interface needs.'
      }
    }
  }
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip content="This tooltip is enabled">
        <Button>Enabled</Button>
      </Tooltip>
      
      <Tooltip content="This tooltip is disabled" isDisabled>
        <Button>Disabled Tooltip</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be disabled when contextual information is not needed.'
      }
    }
  }
};

// Interactive playground
export const Playground: Story = {
  args: {
    content: 'Customize this tooltip',
    size: 'md',
    placement: 'top',
    delay: 700,
    showArrow: true,
    isDisabled: false,
    children: <Button>Interactive Tooltip</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with all tooltip options.'
      }
    }
  }
};

// Brand showcase
export const BrandShowcase: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Default Brand</h3>
        <div data-brand="default" style={{ display: 'flex', gap: '1rem' }}>
          <Tooltip content="Default brand tooltip">
            <Button>Default</Button>
          </Tooltip>
          <Tooltip content="Primary action tooltip" placement="bottom">
            <Button variant="primary">Primary</Button>
          </Tooltip>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Vibrant Brand</h3>
        <div data-brand="vibrant" style={{ display: 'flex', gap: '1rem' }}>
          <Tooltip content="Vibrant brand tooltip">
            <Button>Vibrant</Button>
          </Tooltip>
          <Tooltip content="Primary action tooltip" placement="bottom">
            <Button variant="primary">Primary</Button>
          </Tooltip>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Corporate Brand</h3>
        <div data-brand="corporate" style={{ display: 'flex', gap: '1rem' }}>
          <Tooltip content="Corporate brand tooltip">
            <Button>Corporate</Button>
          </Tooltip>
          <Tooltip content="Primary action tooltip" placement="bottom">
            <Button variant="primary">Primary</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips work consistently across all brand themes while maintaining their floating UI characteristics.'
      }
    }
  }
};

// Accessibility demonstration
export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
        Try using keyboard navigation (Tab key) or screen reader to interact with these tooltips:
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Tooltip content="Save your current progress">
          <Button>Save</Button>
        </Tooltip>
        
        <Tooltip content="Export data to CSV file" placement="bottom">
          <Button variant="secondary">Export</Button>
        </Tooltip>
        
        <Tooltip content="Delete this item permanently" placement="right">
          <Button variant="danger">Delete</Button>
        </Tooltip>
      </div>
      
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
        Each tooltip includes proper ARIA attributes and keyboard support for accessibility.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips are fully accessible with keyboard navigation and screen reader support.'
      }
    }
  }
};