/**
 * Alert component stories for Storybook
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rocket, Shield } from 'iconoir-react';
import React from 'react';

import { Button } from '../Button';

import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Alert component provides accessible feedback messages with floating UI design principles.
Features elevation.1 surface treatment for cards/panels with clear visual hierarchy.

## Features
- **Accessible**: Full ARIA support and keyboard navigation
- **Floating UI**: Elevation-based design with opaque surfaces
- **Brand-aware**: Status colors adapt to all brand themes
- **Interactive**: Dismissible alerts with smooth animations
- **Flexible**: Support for titles, descriptions, icons, and actions

## Usage Guidelines
- Use for important status messages and feedback
- Choose appropriate variant based on message type
- Keep content concise and actionable
- Test with keyboard navigation and screen readers
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert variant/type'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Alert size variant'
    },
    title: {
      control: 'text',
      description: 'Alert title'
    },
    children: {
      control: 'text',
      description: 'Alert description/content'
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed'
    },
    hideIcon: {
      control: 'boolean',
      description: 'Whether to hide the icon'
    },
    autoHideDuration: {
      control: 'number',
      description: 'Auto-dismiss timeout in milliseconds'
    },
    role: {
      control: 'select',
      options: ['alert', 'alertdialog', 'status'],
      description: 'ARIA role for the alert'
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback when alert is dismissed'
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
    children: 'This is a default info alert message.',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info">
        This is an informational message with helpful details.
      </Alert>
      
      <Alert variant="success">
        Success! Your changes have been saved successfully.
      </Alert>
      
      <Alert variant="warning">
        Warning: Please review your settings before continuing.
      </Alert>
      
      <Alert variant="error">
        Error: Unable to process your request. Please try again.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts support different variants to communicate message urgency and type.'
      }
    }
  }
};

// With titles
export const WithTitles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="New Features Available">
        Check out the latest updates and improvements to your dashboard.
      </Alert>
      
      <Alert variant="success" title="Payment Processed">
        Your payment of $99.99 has been successfully processed.
      </Alert>
      
      <Alert variant="warning" title="Storage Almost Full">
        You&apos;re using 95% of your storage space. Consider upgrading your plan.
      </Alert>
      
      <Alert variant="error" title="Connection Failed">
        Unable to connect to the server. Check your internet connection and try again.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts can include titles to provide clear context for the message.'
      }
    }
  }
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert size="sm" variant="info" title="Small Alert">
        Compact alert for subtle notifications.
      </Alert>
      
      <Alert size="md" variant="success" title="Medium Alert">
        Standard alert size for most use cases and general messaging.
      </Alert>
      
      <Alert size="lg" variant="warning" title="Large Alert">
        Prominent alert for important announcements and critical information that needs attention.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts support three sizes to match different interface contexts and importance levels.'
      }
    }
  }
};

// Dismissible alerts
export const Dismissible: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="info" title="New Update Available" dismissible>
        Version 2.1 is now available with new features and bug fixes.
      </Alert>
      
      <Alert variant="success" dismissible>
        Your profile has been updated successfully. You can dismiss this message.
      </Alert>
      
      <Alert variant="warning" title="Maintenance Scheduled" dismissible>
        System maintenance is scheduled for tomorrow at 2 AM UTC.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dismissible alerts allow users to close messages when they are no longer needed.'
      }
    }
  }
};

// With custom icons
export const CustomIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert 
        variant="info" 
        title="New Features"
        icon={<Rocket width={20} height={20} />}
      >
        We&apos;ve launched new features to improve your experience.
      </Alert>
      
      <Alert 
        variant="success" 
        title="Secure Connection"
        icon={<Shield width={20} height={20} />}
      >
        Your connection is protected with end-to-end encryption.
      </Alert>
      
      <Alert variant="warning" hideIcon>
        This alert doesn&apos;t show any icon for a cleaner appearance.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts can use custom icons or hide icons completely for different visual treatments.'
      }
    }
  }
};

// With actions
export const WithActions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert 
        variant="info" 
        title="Update Available"
        actions={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button size="sm" variant="primary">Update Now</Button>
            <Button size="sm" variant="ghost">Later</Button>
          </div>
        }
      >
        A new version of the application is available for download.
      </Alert>
      
      <Alert 
        variant="error" 
        title="Connection Error"
        dismissible
        actions={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button size="sm" variant="secondary">Retry</Button>
            <Button size="sm" variant="ghost">Cancel</Button>
          </div>
        }
      >
        Failed to connect to the server. Please check your internet connection.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts can include action buttons to provide immediate next steps for users.'
      }
    }
  }
};

// Auto-hide example
export const AutoHide: Story = {
  render: () => {
    const [showAlert, setShowAlert] = React.useState(true);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {showAlert ? (
          <Alert 
            variant="success" 
            title="Auto-dismiss Alert"
            dismissible
            autoHideDuration={5000}
            onDismiss={() => setShowAlert(false)}
          >
            This alert will automatically disappear after 5 seconds.
          </Alert>
        ) : (
          <div style={{ 
            padding: '1rem', 
            textAlign: 'center', 
            color: 'var(--color-text-secondary)' 
          }}>
            Alert was dismissed! 
            <Button 
              size="sm" 
              variant="ghost" 
              style={{ marginLeft: '0.5rem' }}
              onPress={() => setShowAlert(true)}
            >
              Show Again
            </Button>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Alerts can automatically dismiss after a specified duration.'
      }
    }
  }
};

// Notification panel example
export const NotificationPanel: Story = {
  render: () => (
    <div style={{ 
      maxWidth: '400px',
      padding: '1rem',
      backgroundColor: 'var(--color-surface-base)',
      border: '1px solid var(--color-border-default)',
      borderRadius: '8px'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600 }}>
        Recent Notifications
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Alert size="sm" variant="success" dismissible>
          Your report has been generated successfully.
        </Alert>
        
        <Alert size="sm" variant="info" title="System Update" dismissible>
          New features are now available in your dashboard.
        </Alert>
        
        <Alert size="sm" variant="warning" dismissible>
          Your trial expires in 3 days. Upgrade to continue.
        </Alert>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of alerts used in a notification panel or feed interface.'
      }
    }
  }
};

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'info',
    size: 'md',
    title: 'Alert Title',
    children: 'This is the alert message content.',
    dismissible: false,
    hideIcon: false,
    role: 'alert',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with all alert options.'
      }
    }
  }
};


// Accessibility demonstration
export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
        Try using keyboard navigation (Tab, Enter, Escape) to interact with these alerts:
      </p>
      
      <Alert 
        variant="info" 
        title="Keyboard Accessible"
        dismissible
        role="alert"
      >
        This alert can be dismissed using the Escape key or clicking the close button.
      </Alert>
      
      <Alert 
        variant="success" 
        title="Screen Reader Friendly"
        role="status"
        actions={
          <Button size="sm" variant="primary">Take Action</Button>
        }
      >
        Screen readers will announce this alert content and provide access to actions.
      </Alert>
      
      <Alert variant="warning" title="Focus Management">
        Dismiss button receives proper focus and can be activated with Enter or Space.
      </Alert>
      
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
        Each alert includes proper ARIA attributes and supports keyboard navigation for accessibility.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts are fully accessible with keyboard navigation, screen reader support, and proper ARIA roles.'
      }
    }
  }
};