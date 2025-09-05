import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Button } from '../Button/Button';
import { Select } from '../Select';
import { SelectItem } from '../Select/SelectItem';
import { TextField } from '../TextField';

import { Dialog, DialogTrigger, AlertDialog } from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible modal dialog component with floating UI design. Built on React Aria Components for robust focus management and keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Dialog size',
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: 'Whether to show the close button',
    },
  },
  args: { 
    onClose: () => console.log('Dialog closed'),
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Dialog Story
export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>
          Open Dialog
        </Button>
        
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Dialog title="Basic Dialog">
            <p>This is a basic dialog with some content.</p>
          </Dialog>
        </DialogTrigger>
      </>
    );
  },
};

// Dialog with Description
export const WithDescription: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>
          Open Dialog with Description
        </Button>
        
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Dialog 
            title="Confirm Action" 
            description="This action will permanently delete the selected items."
          >
            <p>Are you sure you want to continue? This action cannot be undone.</p>
          </Dialog>
        </DialogTrigger>
      </>
    );
  },
};

// Dialog with Footer
export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>
          Open Dialog with Footer
        </Button>
        
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Dialog 
            title="Settings" 
            description="Update your account preferences"
            footer={
              <>
                <Button variant="secondary" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onPress={() => setIsOpen(false)}>
                  Save Changes
                </Button>
              </>
            }
          >
            <div style={{ padding: '1rem 0' }}>
              <p>Your settings content would go here.</p>
            </div>
          </Dialog>
        </DialogTrigger>
      </>
    );
  },
};

// Different Sizes
export const Sizes: Story = {
  render: () => {
    const [currentSize, setCurrentSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);
    
    return (
      <>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button onPress={() => setCurrentSize('sm')}>Small Dialog</Button>
          <Button onPress={() => setCurrentSize('md')}>Medium Dialog</Button>
          <Button onPress={() => setCurrentSize('lg')}>Large Dialog</Button>
          <Button onPress={() => setCurrentSize('xl')}>Extra Large Dialog</Button>
        </div>
        
        <DialogTrigger isOpen={!!currentSize} onOpenChange={() => setCurrentSize(null)}>
          <Dialog 
            title={`${currentSize?.toUpperCase()} Dialog`} 
            size={currentSize!}
            description={`This is a ${currentSize} sized dialog.`}
          >
            <p>Dialog content scales with the selected size.</p>
          </Dialog>
        </DialogTrigger>
      </>
    );
  },
};

// Alert Dialog variants
export const AlertDialogs: Story = {
  render: () => {
    const [currentAlert, setCurrentAlert] = useState<'info' | 'warning' | 'error' | 'success' | null>(null);
    
    return (
      <>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button onPress={() => setCurrentAlert('info')}>Info Alert</Button>
          <Button onPress={() => setCurrentAlert('warning')}>Warning Alert</Button>
          <Button onPress={() => setCurrentAlert('error')}>Error Alert</Button>
          <Button onPress={() => setCurrentAlert('success')}>Success Alert</Button>
        </div>
        
        <DialogTrigger isOpen={!!currentAlert} onOpenChange={() => setCurrentAlert(null)}>
          <AlertDialog 
            title={`${currentAlert?.charAt(0).toUpperCase()}${currentAlert?.slice(1)} Alert`}
            type={currentAlert!}
            description={`This is a ${currentAlert} alert dialog.`}
            footer={
              <Button onPress={() => setCurrentAlert(null)}>
                OK
              </Button>
            }
          >
            <p>Additional alert content can go here.</p>
          </AlertDialog>
        </DialogTrigger>
      </>
    );
  },
};

// Confirmation Dialog
export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleDelete = () => {
      window.alert('Item deleted!');
      setIsOpen(false);
    };
    
    return (
      <>
        <Button variant="danger" onPress={() => setIsOpen(true)}>
          Delete Item
        </Button>
        
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <AlertDialog 
            title="Delete Item" 
            type="warning"
            description="This action cannot be undone."
            footer={
              <>
                <Button variant="secondary" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onPress={handleDelete}>
                  Delete
                </Button>
              </>
            }
          >
            <p>Are you sure you want to delete this item? This will permanently remove it from your account.</p>
          </AlertDialog>
        </DialogTrigger>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A confirmation dialog for destructive actions with appropriate warning styling.',
      },
    },
  },
};

// Form Dialog
export const FormDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      window.alert('Form submitted!');
      setIsOpen(false);
    };
    
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>
          Add New User
        </Button>
        
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Dialog 
            title="Add New User" 
            description="Fill out the form below to add a new user"
            footer={
              <>
                <Button variant="secondary" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" form="user-form">
                  Add User
                </Button>
              </>
            }
          >
            <form id="user-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextField
                label="Name"
                name="name"
                isRequired
                placeholder="Enter full name"
              />
              
              <TextField
                label="Email"
                name="email"
                type="email"
                isRequired
                placeholder="Enter email address"
              />
              
              <Select
                label="Role"
                name="role"
                placeholder="Select a role"
              >
                <SelectItem id="user">User</SelectItem>
                <SelectItem id="admin">Admin</SelectItem>
                <SelectItem id="manager">Manager</SelectItem>
              </Select>
            </form>
          </Dialog>
        </DialogTrigger>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A dialog containing a form with proper form submission handling.',
      },
    },
  },
};

// Scrollable Content
export const ScrollableContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const longContent = Array.from({ length: 20 }, (_, i) => (
      <p key={i}>
        This is paragraph {i + 1} of the long content. Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et 
        dolore magna aliqua.
      </p>
    ));
    
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>
          Open Scrollable Dialog
        </Button>
        
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Dialog 
            title="Scrollable Content" 
            description="This dialog has a lot of content that requires scrolling"
            size="md"
          >
            <div style={{ maxHeight: '300px', overflow: 'auto' }}>
              {longContent}
            </div>
          </Dialog>
        </DialogTrigger>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A dialog with scrollable content when the content exceeds the available height.',
      },
    },
  },
};