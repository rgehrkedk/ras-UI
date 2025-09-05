import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Icon } from '../Icon';

import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Link provides accessible navigation with automatic external link detection and multiple variants.

## Features
- **External Link Detection**: Automatically detects external URLs and adds appropriate attributes
- **Multiple Variants**: Default for standard links, quiet for subtle links, emphasized for prominent links
- **Router Integration**: Support for both href navigation and onPress handlers
- **Icon Support**: Built-in external link indicators and custom icon support
- **Accessibility First**: Built on React Aria Components with proper semantics and keyboard navigation

## Usage Guidelines
- Use default variant for standard navigation links
- Use quiet variant for less prominent or secondary links
- Use emphasized variant for important calls-to-action
- External links automatically show indicators and open in new tabs
- Combine with router libraries using onPress handlers

## Accessibility
- Proper semantic HTML link or span elements based on usage
- External links announce "opens in new tab" to screen readers
- Keyboard accessible with Enter key activation
- Focus indicators meet WCAG contrast requirements
- Disabled states are properly announced
        `
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'quiet', 'emphasized'],
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
    },
    showExternalIndicator: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage example
export const BasicUsage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <Link href="/internal-page">Internal Link</Link>
      <Link href="https://example.com">External Link (auto-detects)</Link>
      <Link onPress={() => alert('Router navigation!')}>Router Link</Link>
    </div>
  ),
};

// Variants example
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <Link href="/page" variant="default">Default Link</Link>
      <Link href="/page" variant="quiet">Quiet Link</Link>
      <Link href="/page" variant="emphasized">Emphasized Link</Link>
    </div>
  ),
};