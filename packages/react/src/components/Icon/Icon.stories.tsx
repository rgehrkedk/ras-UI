import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { 
  Icon, 
  CloseIcon, 
  CheckIcon, 
  AlertCircleIcon, 
  InfoIcon, 
  XCircleIcon, 
  ChevronDownIcon,
  SearchIcon,
  HeartIcon,
  UserIcon,
  HomeIcon,
  SettingsIcon,
  MailIcon,
  EditIcon,
  TrashIcon,
  PlusIcon
} from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon component with consistent sizing and positioning using the design system icon library. Built on top of IconWrapper for standardized styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: [
        'close', 'chevron-down', 'check', 'alert-circle', 'info', 'x-circle',
        'search', 'heart', 'user', 'home', 'settings', 'mail', 'phone', 
        'calendar', 'clock', 'download', 'upload', 'edit', 'trash', 'plus', 'minus'
      ],
      description: 'Icon name from the Iconoir library',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Icon size',
    },
    'aria-hidden': {
      control: { type: 'boolean' },
      description: 'Whether the icon should be hidden from screen readers',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'check',
    size: 'md',
    'aria-hidden': true,
  },
};

export const AllIcons: Story = {
  args: {
    name: 'check',
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="close" size="md" />
        <span style={{ fontSize: '11px' }}>close</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="chevron-down" size="md" />
        <span style={{ fontSize: '11px' }}>chevron-down</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="check" size="md" />
        <span style={{ fontSize: '11px' }}>check</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="alert-circle" size="md" />
        <span style={{ fontSize: '11px' }}>alert-circle</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="info" size="md" />
        <span style={{ fontSize: '11px' }}>info</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="x-circle" size="md" />
        <span style={{ fontSize: '11px' }}>x-circle</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="search" size="md" />
        <span style={{ fontSize: '11px' }}>search</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="heart" size="md" />
        <span style={{ fontSize: '11px' }}>heart</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="user" size="md" />
        <span style={{ fontSize: '11px' }}>user</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="home" size="md" />
        <span style={{ fontSize: '11px' }}>home</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="settings" size="md" />
        <span style={{ fontSize: '11px' }}>settings</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="mail" size="md" />
        <span style={{ fontSize: '11px' }}>mail</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="edit" size="md" />
        <span style={{ fontSize: '11px' }}>edit</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="trash" size="md" />
        <span style={{ fontSize: '11px' }}>trash</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="plus" size="md" />
        <span style={{ fontSize: '11px' }}>plus</span>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    name: 'check',
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="check" size="sm" />
        <span style={{ fontSize: '12px' }}>Small</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="check" size="md" />
        <span style={{ fontSize: '12px' }}>Medium</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="check" size="lg" />
        <span style={{ fontSize: '12px' }}>Large</span>
      </div>
    </div>
  ),
};

export const NamedIcons: Story = {
  args: {
    name: 'check',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '14px', fontWeight: 'bold' }}>Common Named Icon Components</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <SearchIcon size="md" />
          <UserIcon size="md" />
          <HomeIcon size="md" />
          <SettingsIcon size="md" />
          <MailIcon size="md" />
          <EditIcon size="md" />
          <TrashIcon size="md" />
          <PlusIcon size="md" />
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '14px', fontWeight: 'bold' }}>UI State Icons</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <CheckIcon size="md" />
          <AlertCircleIcon size="md" />
          <InfoIcon size="md" />
          <XCircleIcon size="md" />
          <CloseIcon size="md" />
          <ChevronDownIcon size="md" />
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '14px', fontWeight: 'bold' }}>Usage Examples</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SearchIcon size="sm" />
            <span>Search for items</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckIcon size="sm" />
            <span>Task completed successfully</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircleIcon size="sm" />
            <span>Warning: Please review your input</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HeartIcon size="sm" />
            <span>Add to favorites</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  args: {
    name: 'check',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        backgroundColor: '#f0f9ff',
        border: '1px solid #0ea5e9',
        borderRadius: '6px'
      }}>
        <InfoIcon size="sm" />
        <span>This is an info message with an icon</span>
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        backgroundColor: '#f0fdf4',
        border: '1px solid #22c55e',
        borderRadius: '6px'
      }}>
        <CheckIcon size="sm" />
        <span>Success! Your changes have been saved</span>
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        backgroundColor: '#fef3f2',
        border: '1px solid #ef4444',
        borderRadius: '6px'
      }}>
        <AlertCircleIcon size="sm" />
        <span>Error: Something went wrong</span>
      </div>
      
      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        backgroundColor: 'white',
        cursor: 'pointer'
      }}>
        <span>Options</span>
        <ChevronDownIcon size="sm" />
      </button>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}>
          <EditIcon size="sm" />
        </button>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}>
          <TrashIcon size="sm" />
        </button>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          border: '1px solid #10b981',
          borderRadius: '6px',
          backgroundColor: '#10b981',
          color: 'white',
          cursor: 'pointer'
        }}>
          <PlusIcon size="sm" />
        </button>
      </div>
    </div>
  ),
};