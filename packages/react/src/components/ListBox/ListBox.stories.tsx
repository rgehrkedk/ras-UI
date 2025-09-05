/**
 * ListBox component stories
 * Minimal examples focusing on React Aria Components patterns
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { Selection } from 'react-aria-components';

import { Icon } from '../Icon';

import { ListBox, ListBoxItem } from './ListBox';

const meta = {
  title: 'Components/ListBox',
  component: ListBox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Accessible ListBox component built on React Aria Components with single/multiple selection modes.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    selectionMode: {
      control: { type: 'select' },
      options: ['none', 'single', 'multiple'],
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic ListBox with single selection
export const Default: Story = {
  args: {
    size: 'md',
    selectionMode: 'single',
  },
  render: (args) => {
    const [selected, setSelected] = useState<Selection>(new Set());
    
    return (
      <div style={{ width: '300px' }}>
        <ListBox
          {...args}
          aria-label="Choose an option"
          selectedKeys={selected}
          onSelectionChange={setSelected}
        >
          <ListBoxItem id="item1">First Option</ListBoxItem>
          <ListBoxItem id="item2">Second Option</ListBoxItem>
          <ListBoxItem id="item3">Third Option</ListBoxItem>
          <ListBoxItem id="item4" isDisabled>
            Disabled Option
          </ListBoxItem>
        </ListBox>
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Selected: {Array.from(selected).join(', ') || 'none'}
        </p>
      </div>
    );
  },
};

// ListBox with sections and headers
export const WithSections: Story = {
  args: {
    size: 'md',
    selectionMode: 'single',
  },
  render: (args) => {
    const [selected, setSelected] = useState<Selection>(new Set());
    
    const sections = [
      {
        id: 'actions',
        title: 'Actions',
        items: [
          { id: 'new', label: 'New Document', startIcon: <Icon name="plus" /> },
          { id: 'open', label: 'Open File', startIcon: <Icon name="folder" /> },
          { id: 'save', label: 'Save Document', startIcon: <Icon name="save" /> },
        ],
      },
      {
        id: 'recent',
        title: 'Recent Files',
        items: [
          { id: 'doc1', label: 'Project Notes.md', description: '2 hours ago' },
          { id: 'doc2', label: 'Meeting Minutes.docx', description: 'Yesterday' },
          { id: 'doc3', label: 'Budget Report.xlsx', description: '3 days ago' },
        ],
      },
    ];
    
    return (
      <div style={{ width: '300px' }}>
        <ListBox
          {...args}
          aria-label="File actions and recent files"
          sections={sections}
          selectedKeys={selected}
          onSelectionChange={setSelected}
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Selected: {Array.from(selected).join(', ') || 'none'}
        </p>
      </div>
    );
  },
};

// Empty and loading states
export const States: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    
    return (
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Normal State</h3>
          <div style={{ width: '250px' }}>
            <ListBox 
              aria-label="Normal state example"
              selectionMode="single"
            >
              <ListBoxItem id="item1">First Item</ListBoxItem>
              <ListBoxItem id="item2">Second Item</ListBoxItem>
              <ListBoxItem id="item3">Third Item</ListBoxItem>
            </ListBox>
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Loading State</h3>
          <div style={{ width: '250px' }}>
            <ListBox 
              aria-label="Loading state example"
              loading
              loadingMessage="Loading items..."
            />
          </div>
          <button
            onClick={() => setIsLoading(!isLoading)}
            style={{ marginTop: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
          >
            Toggle Loading
          </button>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Empty State</h3>
          <div style={{ width: '250px' }}>
            <ListBox 
              aria-label="Empty state example"
              emptyMessage="No files found"
            >
              {/* No children to show empty state */}
            </ListBox>
          </div>
        </div>
      </div>
    );
  },
};

// Brand Showcase
export const BrandShowcase: Story = {
  name: 'Brand Showcase',
  render: () => {
    const ComponentVariants = () => {
      const [singleSelected, setSingleSelected] = useState<Selection>(new Set(['option2']));
      const [multiSelected, setMultiSelected] = useState<Selection>(new Set(['project1', 'project3']));

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h5 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
              Single Selection
            </h5>
            <div style={{ width: '250px' }}>
              <ListBox
                aria-label="Choose option"
                selectionMode="single"
                selectedKeys={singleSelected}
                onSelectionChange={setSingleSelected}
              >
                <ListBoxItem id="option1">
                  <Icon name="home" /> Dashboard
                </ListBoxItem>
                <ListBoxItem id="option2">
                  <Icon name="users" /> Team
                </ListBoxItem>
                <ListBoxItem id="option3">
                  <Icon name="settings" /> Settings
                </ListBoxItem>
                <ListBoxItem id="option4" isDisabled>
                  <Icon name="lock" /> Admin (Disabled)
                </ListBoxItem>
              </ListBox>
            </div>
          </div>

          <div>
            <h5 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
              Multiple Selection
            </h5>
            <div style={{ width: '250px' }}>
              <ListBox
                aria-label="Choose projects"
                selectionMode="multiple"
                selectedKeys={multiSelected}
                onSelectionChange={setMultiSelected}
                size="sm"
              >
                <ListBoxItem id="project1">
                  <Icon name="folder" /> Marketing Site
                </ListBoxItem>
                <ListBoxItem id="project2">
                  <Icon name="code" /> API Development
                </ListBoxItem>
                <ListBoxItem id="project3">
                  <Icon name="chart" /> Analytics Dashboard
                </ListBoxItem>
                <ListBoxItem id="project4">
                  <Icon name="document" /> Documentation
                </ListBoxItem>
              </ListBox>
            </div>
          </div>

          <div>
            <h5 style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
              Large Size with Status
            </h5>
            <div style={{ width: '280px' }}>
              <ListBox
                aria-label="Status options"
                selectionMode="single"
                size="lg"
                defaultSelectedKeys={['status2']}
              >
                <ListBoxItem id="status1">
                  <span style={{ color: 'green' }}><Icon name="check" /></span> Completed
                </ListBoxItem>
                <ListBoxItem id="status2">
                  <span style={{ color: 'orange' }}><Icon name="clock" /></span> In Progress
                </ListBoxItem>
                <ListBoxItem id="status3">
                  <span style={{ color: 'red' }}><Icon name="alert-circle" /></span> Blocked
                </ListBoxItem>
              </ListBox>
            </div>
          </div>
        </div>
      );
    };

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
        story: 'ListBox appearance across all three brand themes, showing how list selection components adapt their visual styling while maintaining selection states and keyboard navigation.',
      },
    },
  },
};
