import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Sidebar } from './Sidebar';


const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Accessible sidebar navigation component with collapsible state management. Features push layout that adjusts content width when collapsed/expanded, with smooth transitions, nested navigation groups, icons, badges, and brand theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['floating', 'push'],
      description: 'Layout variant - floating overlays content, push moves content aside',
    },
    defaultCollapsed: {
      control: { type: 'boolean' },
      description: 'Whether the sidebar starts in collapsed state',
    },
    collapsible: {
      control: { type: 'boolean' },
      description: 'Whether the sidebar can be collapsed/expanded',
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Layout container for demo purposes with push behavior
const DemoLayout: React.FC<{ children: React.ReactNode; showContent?: boolean }> = ({ 
  children, 
  showContent = true 
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
  return (
    <div style={{ 
      display: 'flex',
      height: '100vh', 
      backgroundColor: '#f8fafc',
    }}>
      {React.cloneElement(children as React.ReactElement, {
        onCollapseChange: setIsCollapsed
      })}
      {showContent && (
        <div style={{
          flex: 1,
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
          color: '#64748b',
          transition: 'all 200ms ease-out',
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, margin: 0 }}>Main Content Area</h1>
          <p style={{ fontSize: '1.1rem', textAlign: 'center', maxWidth: '600px', margin: 0 }}>
            This represents the main application content. The sidebar pushes this content 
            aside when expanded and gives it more space when collapsed.
          </p>
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            backgroundColor: 'rgba(59, 130, 246, 0.1)', 
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            Sidebar is currently: <strong>{isCollapsed ? 'Collapsed' : 'Expanded'}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

// Complete Navigation Structure - Primary Example (Floating)
export const Default: Story = {
  args: {
    children: <div />, // Placeholder - actual children provided in render
  },
  render: () => (
    <DemoLayout>
      <Sidebar variant="floating">
        <Sidebar.Header title="Application" />
        <Sidebar.Separator />

        <Sidebar.Content>
          <Sidebar.Group label="Main">
            <Sidebar.Item icon="home" label="Dashboard" />
            <Sidebar.Item icon="search" label="Search" />
            <Sidebar.Item icon="chart" label="Analytics" badgeText="New" badgeVariant="success" />
          </Sidebar.Group>

          <Sidebar.Separator />

          <Sidebar.Group label="Projects">
            <Sidebar.Item icon="folder" label="All Projects" />
            <Sidebar.Item icon="star" label="Favorites" badgeText="5" badgeVariant="outline" />
            <Sidebar.Item icon="calendar" label="Recent" />
          </Sidebar.Group>

          <Sidebar.Separator />

          <Sidebar.Group label="Communication">
            <Sidebar.Item icon="message" label="Messages" badgeText="12" badgeVariant="danger" />
            <Sidebar.Item icon="bell" label="Notifications" badgeText="3" badgeVariant="warning" />
          </Sidebar.Group>
        </Sidebar.Content>

        <Sidebar.Footer userName="John Doe" userEmail="john@example.com" />
      </Sidebar>
    </DemoLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default floating sidebar with elegant shadow and border-radius. Pushes content aside while maintaining a floating visual appearance. Features smooth transitions, groups, badges, and user info.',
      },
    },
  },
};

// Push Layout Variant
export const Push: Story = {
  args: {
    children: <div />, // Placeholder - actual children provided in render
  },
  render: () => (
    <DemoLayout>
      <Sidebar variant="push">
        <Sidebar.Header title="Application" />
        <Sidebar.Separator />

        <Sidebar.Content>
          <Sidebar.Group label="Main">
            <Sidebar.Item icon="home" label="Dashboard" />
            <Sidebar.Item icon="search" label="Search" />
            <Sidebar.Item icon="chart" label="Analytics" badgeText="New" badgeVariant="success" />
          </Sidebar.Group>

          <Sidebar.Separator />

          <Sidebar.Group label="Projects">
            <Sidebar.Item icon="folder" label="All Projects" />
            <Sidebar.Item icon="star" label="Favorites" badgeText="5" badgeVariant="outline" />
            <Sidebar.Item icon="calendar" label="Recent" />
          </Sidebar.Group>

          <Sidebar.Separator />

          <Sidebar.Group label="Communication">
            <Sidebar.Item icon="message" label="Messages" badgeText="12" badgeVariant="danger" />
            <Sidebar.Item icon="bell" label="Notifications" badgeText="3" badgeVariant="warning" />
          </Sidebar.Group>
        </Sidebar.Content>

        <Sidebar.Footer userName="John Doe" userEmail="john@example.com" />
      </Sidebar>
    </DemoLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Push sidebar with flat design integrated seamlessly with the layout. Clean appearance without shadows or border-radius, perfect for dashboard layouts.',
      },
    },
  },
};