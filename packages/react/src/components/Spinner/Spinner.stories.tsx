import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A loading spinner component with consistent styling and accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for screen readers',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    'aria-label': 'Loading',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '3rem',
      padding: '1rem',
      justifyContent: 'center',
      minWidth: '300px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner size="sm" aria-label="Small spinner" />
        <span style={{ fontSize: '12px' }}>Small</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner size="md" aria-label="Medium spinner" />
        <span style={{ fontSize: '12px' }}>Medium</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner size="lg" aria-label="Large spinner" />
        <span style={{ fontSize: '12px' }}>Large</span>
      </div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner size="sm" aria-label="Loading data" />
        <span>Loading data...</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner size="md" aria-label="Processing request" />
        <span>Processing your request...</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Spinner size="lg" aria-label="Uploading file" />
        <span>Uploading file...</span>
      </div>
    </div>
  ),
};

export const InlineSpinner: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.5rem',
      padding: '1rem',
      minWidth: '400px',
      maxWidth: '600px'
    }}>
      <p style={{ 
        fontSize: '14px',
        lineHeight: '1.5',
        margin: 0,
        textAlign: 'center'
      }}>
        Please wait while we process your request{' '}
        <Spinner size="sm" aria-label="Processing" />
      </p>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '3rem',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        backgroundColor: '#fafafa'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '1rem' 
        }}>
          <Spinner size="lg" aria-label="Loading content" />
          <span style={{ 
            fontSize: '14px',
            color: '#666'
          }}>Loading content...</span>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        border: '1px solid #e5e5e5',
        borderRadius: '6px',
        backgroundColor: '#ffffff'
      }}>
        <Spinner size="sm" aria-label="Saving changes" />
        <span style={{ fontSize: '14px' }}>Saving changes...</span>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '2rem',
      padding: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      minWidth: '400px'
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '0.5rem',
        color: '#3b82f6' 
      }}>
        <Spinner size="md" aria-label="Blue spinner" />
        <span style={{ fontSize: '12px', color: '#3b82f6' }}>Blue</span>
      </div>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '0.5rem',
        color: '#ef4444' 
      }}>
        <Spinner size="md" aria-label="Red spinner" />
        <span style={{ fontSize: '12px', color: '#ef4444' }}>Red</span>
      </div>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '0.5rem',
        color: '#10b981' 
      }}>
        <Spinner size="md" aria-label="Green spinner" />
        <span style={{ fontSize: '12px', color: '#10b981' }}>Green</span>
      </div>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '0.5rem',
        color: '#f59e0b' 
      }}>
        <Spinner size="md" aria-label="Orange spinner" />
        <span style={{ fontSize: '12px', color: '#f59e0b' }}>Orange</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The spinner inherits the color from its parent element via currentColor.',
      },
    },
  },
};