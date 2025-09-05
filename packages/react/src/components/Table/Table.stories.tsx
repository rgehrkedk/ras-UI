/**
 * Storybook stories for Table component
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { Selection, SortDescriptor } from 'react-aria-components';

import { Button } from '../Button';

import { Table, TableHeader, TableBody, Column, Row, Cell } from './index';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible table component with sorting, selection, and keyboard navigation. Built on React Aria Components.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Table size variant',
    },
    selectionMode: {
      control: 'select',
      options: ['none', 'single', 'multiple'],
      description: 'Row selection mode',
    },
    striped: {
      control: 'boolean',
      description: 'Whether rows should alternate colors',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether table should have borders',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether rows should have hover effects',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

// Sample data for stories
const files = [
  { id: 1, name: 'document.pdf', size: '2.5 MB', modified: '2024-01-15', type: 'PDF' },
  { id: 2, name: 'presentation.pptx', size: '5.2 MB', modified: '2024-01-14', type: 'PowerPoint' },
  { id: 3, name: 'spreadsheet.xlsx', size: '1.8 MB', modified: '2024-01-13', type: 'Excel' },
  { id: 4, name: 'image.png', size: '892 KB', modified: '2024-01-12', type: 'Image' },
  { id: 5, name: 'video.mp4', size: '45.3 MB', modified: '2024-01-11', type: 'Video' },
];

/**
 * Basic table with static data and no special features.
 * Shows the fundamental table structure and styling.
 */
export const BasicTable: Story = {
  args: {
    'aria-label': 'Files table',
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <Column isRowHeader>Name</Column>
        <Column>Type</Column>
        <Column>Size</Column>
        <Column>Modified</Column>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <Row key={file.id}>
            <Cell>{file.name}</Cell>
            <Cell>{file.type}</Cell>
            <Cell numeric>{file.size}</Cell>
            <Cell>{file.modified}</Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Interactive table with sorting and selection features.
 * Demonstrates sorting columns and row selection functionality.
 */
export const InteractiveTable: Story = {
  args: {
    'aria-label': 'Interactive files table',
    selectionMode: 'multiple',
  },
  render: (args) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
      column: 'name',
      direction: 'ascending',
    });
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

    const sortedFiles = [...files].sort((a, b) => {
      const aValue = a[sortDescriptor.column as keyof typeof a];
      const bValue = b[sortDescriptor.column as keyof typeof b];
      
      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;
      
      return sortDescriptor.direction === 'descending' ? -comparison : comparison;
    });

    return (
      <div>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>Selected: {selectedKeys === 'all' ? 'all' : selectedKeys.size} items</span>
          {((selectedKeys !== 'all' && selectedKeys.size > 0) || selectedKeys === 'all') && (
            <Button
              variant="secondary"
              size="sm"
              onPress={() => setSelectedKeys(new Set())}
            >
              Clear Selection
            </Button>
          )}
        </div>
        
        <Table
          {...args}
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader>
            <Column id="name" isRowHeader allowsSorting>
              Name
            </Column>
            <Column id="type" allowsSorting>
              Type
            </Column>
            <Column id="size" allowsSorting>
              Size
            </Column>
            <Column id="modified" allowsSorting>
              Modified
            </Column>
            <Column>Actions</Column>
          </TableHeader>
          <TableBody>
            {sortedFiles.map((file) => (
              <Row key={file.id}>
                <Cell>{file.name}</Cell>
                <Cell>{file.type}</Cell>
                <Cell numeric>{file.size}</Cell>
                <Cell>{file.modified}</Cell>
                <Cell>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </Cell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

/**
 * Empty table with custom empty state.
 * Shows how to handle tables with no data.
 */
export const EmptyTable: Story = {
  args: {
    'aria-label': 'Empty table',
    striped: true,
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <Column isRowHeader>Name</Column>
        <Column>Type</Column>
        <Column>Size</Column>
        <Column>Actions</Column>
      </TableHeader>
      <TableBody
        renderEmptyState={() => (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            color: 'var(--color-semantic-text-secondary)'
          }}>
            <div style={{ marginBottom: '0.5rem' }}>No files found</div>
            <Button variant="primary" size="sm">
              Upload Files
            </Button>
          </div>
        )}
      >
        {[]}
      </TableBody>
    </Table>
  ),
};

// Size variant demonstrations
export const SmallTable: Story = {
  args: {
    ...BasicTable.args,
    size: 'sm',
  },
  render: BasicTable.render,
};

export const LargeTable: Story = {
  args: {
    ...BasicTable.args,
    size: 'lg',
  },
  render: BasicTable.render,
};

// Style variant demonstrations  
export const StripedTable: Story = {
  args: {
    ...BasicTable.args,
    striped: true,
  },
  render: BasicTable.render,
};

export const BorderlessTable: Story = {
  args: {
    ...BasicTable.args,
    bordered: false,
  },
  render: BasicTable.render,
};

// Brand Showcase
export const BrandShowcase: Story = {
  name: 'Brand Showcase',
  render: () => {
    const ComponentVariants = () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h5 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
            Standard Table
          </h5>
          <Table aria-label="Products table" size="md" striped>
            <TableHeader>
              <Column isRowHeader>Product</Column>
              <Column>Category</Column>
              <Column>Status</Column>
              <Column>Price</Column>
            </TableHeader>
            <TableBody>
              <Row>
                <Cell>Wireless Headphones</Cell>
                <Cell>Electronics</Cell>
                <Cell>Available</Cell>
                <Cell>$99.99</Cell>
              </Row>
              <Row>
                <Cell>Running Shoes</Cell>
                <Cell>Sports</Cell>
                <Cell>In Stock</Cell>
                <Cell>$129.99</Cell>
              </Row>
              <Row>
                <Cell>Coffee Maker</Cell>
                <Cell>Home</Cell>
                <Cell>Limited</Cell>
                <Cell>$79.99</Cell>
              </Row>
            </TableBody>
          </Table>
        </div>

        <div>
          <h5 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
            Compact Table
          </h5>
          <Table aria-label="Users table" size="sm" hoverable>
            <TableHeader>
              <Column isRowHeader>User</Column>
              <Column>Role</Column>
              <Column>Status</Column>
            </TableHeader>
            <TableBody>
              <Row>
                <Cell>John Doe</Cell>
                <Cell>Admin</Cell>
                <Cell>Active</Cell>
              </Row>
              <Row>
                <Cell>Jane Smith</Cell>
                <Cell>Editor</Cell>
                <Cell>Active</Cell>
              </Row>
              <Row>
                <Cell>Bob Wilson</Cell>
                <Cell>Viewer</Cell>
                <Cell>Inactive</Cell>
              </Row>
            </TableBody>
          </Table>
        </div>

        <div>
          <h5 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
            Large Table with Borders
          </h5>
          <Table aria-label="Performance table" size="lg" bordered>
            <TableHeader>
              <Column isRowHeader>Metric</Column>
              <Column>Current</Column>
              <Column>Target</Column>
            </TableHeader>
            <TableBody>
              <Row>
                <Cell>Revenue</Cell>
                <Cell>$125,000</Cell>
                <Cell>$150,000</Cell>
              </Row>
              <Row>
                <Cell>Users</Cell>
                <Cell>2,450</Cell>
                <Cell>3,000</Cell>
              </Row>
              <Row>
                <Cell>Conversion</Cell>
                <Cell>3.2%</Cell>
                <Cell>4.0%</Cell>
              </Row>
            </TableBody>
          </Table>
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
        story: 'Table appearance across all three brand themes, demonstrating how data tables adapt their visual styling while preserving sorting, selection, and accessibility features.',
      },
    },
  },
};
