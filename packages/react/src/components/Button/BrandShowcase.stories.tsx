import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Button } from './Button';

const meta = {
  title: 'Design System/Brand Showcase',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Test all button variants across different brands and themes. Use the Brand and Theme controls in the toolbar to see how components adapt to different brand configurations.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>
          Multi-Brand Button Showcase
        </h3>
        <p style={{ marginBottom: '2rem', color: 'var(--color-semantic-text-secondary)', fontSize: '0.9rem' }}>
          Switch between brands using the toolbar controls. Notice how the same component tokens 
          create different visual experiences while maintaining consistent behavior and accessibility.
        </p>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>Button Variants</h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>Button Sizes</h4>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>Button States</h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <Button variant="primary">Normal</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" isDisabled>Disabled</Button>
        </div>
      </div>
      
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: 'var(--color-semantic-surface-raised)', 
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-semantic-border-default)'
      }}>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>
          Brand Information
        </h4>
        <div style={{ 
          fontFamily: 'var(--font-family-mono)', 
          fontSize: '0.875rem',
          color: 'var(--color-semantic-text-secondary)',
          lineHeight: '1.6'
        }}>
          <div><strong>Available Brands:</strong></div>
          <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li><strong>Default:</strong> Blue-based design with standard styling</li>
            <li><strong>Vibrant:</strong> Purple and pink colors with energetic feel</li>
            <li><strong>Corporate:</strong> Teal and slate colors with professional styling</li>
          </ul>
          <div style={{ marginTop: '1rem' }}>
            <strong>Current Brand CSS Variables:</strong><br/>
            Primary: <code style={{ backgroundColor: 'var(--color-components-button-primary-background)', color: 'var(--color-components-button-primary-text)', padding: '2px 4px', borderRadius: '4px' }}>
              var(--color-components-button-primary-background)
            </code>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const BrandComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      {/* This story shows what each brand would look like side by side */}
      <div data-brand="default" style={{ 
        padding: '1.5rem', 
        border: '2px solid var(--color-semantic-border-default)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-semantic-text-primary)' }}>Default Brand</h4>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="primary" size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="ghost" size="sm">Ghost</Button>
          <Button variant="danger" size="sm">Danger</Button>
        </div>
      </div>
      
      <div data-brand="vibrant" style={{ 
        padding: '1.5rem', 
        border: '2px solid var(--color-semantic-border-default)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-semantic-text-primary)' }}>Vibrant Brand</h4>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="primary" size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="ghost" size="sm">Ghost</Button>
          <Button variant="danger" size="sm">Danger</Button>
        </div>
      </div>
      
      <div data-brand="corporate" style={{ 
        padding: '1.5rem', 
        border: '2px solid var(--color-semantic-border-default)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-semantic-text-primary)' }}>Corporate Brand</h4>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="primary" size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="ghost" size="sm">Ghost</Button>
          <Button variant="danger" size="sm">Danger</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'This story shows all brands side by side for comparison. Each section uses a different data-brand attribute to showcase the visual differences.',
      },
    },
  },
};