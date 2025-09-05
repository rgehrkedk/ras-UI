import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component for displaying user profile images, initials, or fallback placeholders. Supports multiple sizes, variants, and interactive states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color variant of the avatar',
    },
    name: {
      control: { type: 'text' },
      description: 'Full name used for generating initials when no image is provided',
    },
    initials: {
      control: { type: 'text' },
      description: 'Custom initials to display (overrides name-generated initials)',
    },
    src: {
      control: { type: 'text' },
      description: 'Image URL for the avatar',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for the avatar image (important for accessibility)',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for interactive avatars',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    size: 'md',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic avatar with name-generated initials. The component automatically extracts initials from the full name.',
      },
    },
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'AB',
    size: 'md',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with custom initials. Use this when you need specific initials that differ from the name-generated ones.',
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    name: 'John Doe',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: 'John Doe',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with profile image. Falls back to initials if image fails to load. Always include alt text for accessibility.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="John Doe" size="sm" />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>Small</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="John Doe" size="md" />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>Medium</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="John Doe" size="lg" />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>Large</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="John Doe" size="xl" />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>X-Large</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available avatar sizes from small to extra-large. Choose the appropriate size based on the UI context.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="John Doe" variant="primary" />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>Primary</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Jane Smith" variant="secondary" />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>Secondary</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Bob Johnson" variant="success" />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>Success</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Alice Brown" variant="warning" />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>Warning</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar name="Charlie Wilson" variant="danger" />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>Danger</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar color variants for different semantic meanings or visual hierarchy.',
      },
    },
  },
};

export const Clickable: Story = {
  args: {
    name: 'John Doe',
    size: 'md',
    variant: 'primary',
    onClick: () => console.log('Avatar clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive avatar that responds to clicks. Useful for profile menus or user selection.',
      },
    },
  },
};

// Edge cases and error states
export const ImageErrorFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar 
          name="Broken Image" 
          src="https://broken-image-url.jpg" 
          alt="Broken Image User"
          size="md" 
        />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>Broken Image</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar 
          name="No Image" 
          size="md" 
        />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>No Image</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar 
          name="" 
          size="md" 
        />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>Empty Name</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar behavior when images fail to load or required props are missing. Shows graceful fallbacks to initials or placeholder.',
      },
    },
  },
};

// Real-world usage patterns
export const UserList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
      {[
        { name: 'Sarah Johnson', role: 'Design Lead', variant: 'primary' as const },
        { name: 'Michael Chen', role: 'Frontend Developer', variant: 'secondary' as const },
        { name: 'Emma Rodriguez', role: 'Product Manager', variant: 'success' as const },
        { name: 'David Kim', role: 'Backend Developer', variant: 'primary' as const },
        { name: 'Lisa Thompson', role: 'UX Researcher', variant: 'warning' as const },
      ].map((user, index) => (
        <div 
          key={index}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '8px 12px',
            borderRadius: '6px',
            backgroundColor: '#f9fafb',
          }}
        >
          <Avatar 
            name={user.name} 
            variant={user.variant} 
            size="md"
            onClick={() => console.log('User selected:', user.name)}
          />
          <div>
            <div style={{ fontWeight: '500', fontSize: '14px' }}>{user.name}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{user.role}</div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar in a user list context, demonstrating practical usage with names, roles, and interactive behavior.',
      },
    },
  },
};

// Accessibility demonstration
export const AccessibilityExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>With Proper Alt Text</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar 
            name="Alex Morgan" 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            alt="Alex Morgan, Senior Developer at TechCorp"
            size="md" 
          />
          <div style={{ fontSize: '12px', color: '#6b7280', maxWidth: '200px' }}>
            Screen readers will announce: "Alex Morgan, Senior Developer at TechCorp"
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Interactive with Focus</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar 
            name="Jamie Wilson" 
            size="md" 
            onClick={() => console.log('Avatar clicked')}
          />
          <div style={{ fontSize: '12px', color: '#6b7280', maxWidth: '200px' }}>
            Clickable avatar with proper focus states for keyboard navigation
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>Non-Latin Characters</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Avatar name="张伟" size="md" />
          <Avatar name="José García" size="md" />
          <Avatar name="محمد أحمد" size="md" />
          <Avatar name="Иван Петров" size="md" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility best practices including proper alt text, keyboard navigation, and international character support.',
      },
    },
  },
};
