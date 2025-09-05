/**
 * Breadcrumbs component stories
 * Minimal implementation as requested - just basic usage and auto-collapse example
 */

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Breadcrumbs, type BreadcrumbItemData } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible breadcrumb navigation component built on React Aria Components with auto-collapse functionality.',
      },
    },
  },
  argTypes: {
    items: {
      description: 'Array of breadcrumb items',
      control: { type: 'object' },
    },
    size: {
      description: 'Size variant',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    maxItems: {
      description: 'Maximum items to show before collapsing',
      control: { type: 'number', min: 1, max: 10 },
    },
    separator: {
      description: 'Separator type between breadcrumbs',
      control: { type: 'select' },
      options: ['chevron-right', 'arrow-right', 'slash'],
    },
    showSeparators: {
      description: 'Whether to show separators',
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic breadcrumb data
const basicItems: BreadcrumbItemData[] = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Products', href: '/products' },
  { id: '3', label: 'Electronics', href: '/products/electronics' },
  { id: '4', label: 'Smartphones' }, // Current page
];

// Extended breadcrumb data for auto-collapse demo
const extendedItems: BreadcrumbItemData[] = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Category', href: '/category' },
  { id: '3', label: 'Subcategory', href: '/category/sub' },
  { id: '4', label: 'Product Type', href: '/category/sub/type' },
  { id: '5', label: 'Brand', href: '/category/sub/type/brand' },
  { id: '6', label: 'Model', href: '/category/sub/type/brand/model' },
  { id: '7', label: 'Current Product' }, // Current page
];

/**
 * Basic breadcrumbs with typical navigation path
 */
export const Default: Story = {
  args: {
    items: basicItems,
    size: 'md',
    separator: 'chevron-right',
    showSeparators: true,
  },
};

/**
 * Auto-collapse behavior when maxItems is exceeded.
 * Shows ellipsis menu with collapsed items.
 */
export const AutoCollapse: Story = {
  args: {
    items: extendedItems,
    size: 'md',
    maxItems: 3,
    separator: 'chevron-right',
    showSeparators: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'When there are more items than maxItems, the breadcrumb automatically collapses middle items into an ellipsis menu. Click the ellipsis to see collapsed items.',
      },
    },
  },
};

// Brand Showcase
export const BrandShowcase: Story = {
  name: 'Brand Showcase',
  render: () => {
    const ComponentVariants = () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
            Standard Navigation
          </h5>
          <Breadcrumbs 
            items={basicItems}
            size="md"
            separator="chevron-right"
          />
        </div>
        <div>
          <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
            With Auto-Collapse
          </h5>
          <Breadcrumbs 
            items={extendedItems}
            size="md"
            maxItems={4}
            separator="arrow-right"
          />
        </div>
        <div>
          <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
            Different Separators
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Breadcrumbs 
              items={basicItems.slice(0, 3)}
              size="sm"
              separator="slash"
            />
            <Breadcrumbs 
              items={basicItems.slice(0, 3)}
              size="lg"
              separator="chevron-right"
            />
          </div>
        </div>
      </div>
    );

    return (
      <div style={{ display: 'grid', gap: '2rem' }}>
        <div data-brand="default">
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>
            Default Brand
          </h4>
          <ComponentVariants />
        </div>
        <div data-brand="vibrant">
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>
            Vibrant Brand
          </h4>
          <ComponentVariants />
        </div>
        <div data-brand="corporate">
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>
            Corporate Brand
          </h4>
          <ComponentVariants />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Breadcrumbs appearance across all three brand themes, showing how navigation elements adapt their visual styling while maintaining consistent functionality and accessibility features.',
      },
    },
  },
};