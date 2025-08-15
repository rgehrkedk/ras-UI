import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible input component with label, validation, and helper text. Built on React Aria Components for robust form handling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'tel', 'url', 'search'],
      description: 'Input type',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether input should take full width of container',
    },
    isRequired: {
      control: { type: 'boolean' },
      description: 'Whether the input is required',
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    isInvalid: {
      control: { type: 'boolean' },
      description: 'Whether the input has validation errors',
    },
  },
  args: { 
    onChange: () => console.log('Input changed'),
    onBlur: () => console.log('Input blurred'),
    onFocus: () => console.log('Input focused'),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    isRequired: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters long',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    isInvalid: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit this',
    isDisabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    size: 'sm',
    placeholder: 'Small size',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    size: 'lg',
    placeholder: 'Large size',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    fullWidth: true,
    placeholder: 'Takes full width',
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithStartIcon: Story = {
  args: {
    label: 'Search',
    startIcon: '🔍',
    placeholder: 'Search...',
  },
};

export const WithEndIcon: Story = {
  args: {
    label: 'Password',
    type: 'password',
    endIcon: '👁',
    placeholder: 'Enter password',
  },
};

export const DifferentTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input label="Text" type="text" placeholder="Text input" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="Password" />
      <Input label="Phone" type="tel" placeholder="+1 (555) 123-4567" />
      <Input label="Website" type="url" placeholder="https://example.com" />
      <Input label="Search" type="search" placeholder="Search..." />
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Different input types with appropriate validation and formatting.',
      },
    },
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input 
        label="Valid Input" 
        value="valid@example.com"
        helperText="This email looks good!"
      />
      <Input 
        label="Invalid Input" 
        value="invalid-email"
        isInvalid
        errorMessage="Please enter a valid email address"
      />
      <Input 
        label="Required Field" 
        isRequired
        helperText="This field is required"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different validation states showing success, error, and required indicators.',
      },
    },
  },
};

export const FormExample: Story = {
  render: () => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      window.alert('Form submitted!');
    };

    return (
      <form onSubmit={handleSubmit} style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input 
          label="First Name" 
          isRequired
          placeholder="John"
        />
        <Input 
          label="Last Name" 
          isRequired
          placeholder="Doe"
        />
        <Input 
          label="Email" 
          type="email"
          isRequired
          placeholder="john.doe@example.com"
          helperText="We'll never share your email"
        />
        <Input 
          label="Phone" 
          type="tel"
          placeholder="+1 (555) 123-4567"
        />
        <Input 
          label="Website" 
          type="url"
          placeholder="https://johndoe.com"
        />
        <button type="submit" style={{ padding: '0.75rem', marginTop: '1rem' }}>
          Submit Form
        </button>
      </form>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'A complete form example showing how inputs work together in real-world scenarios.',
      },
    },
  },
};