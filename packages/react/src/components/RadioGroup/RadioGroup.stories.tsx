/**
 * RadioGroup component Storybook stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { RadioGroup, RadioOption } from './RadioGroup';

const meta = {
  title: 'Components/Form/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible radio group component built on React Aria Components with support for horizontal and vertical orientations.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the radio group',
      defaultValue: 'md',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the radio group',
      defaultValue: 'vertical',
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Whether the radio group is disabled',
    },
    isRequired: {
      control: { type: 'boolean' },
      description: 'Whether the radio group is required',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    'aria-label': 'Select size',
    defaultValue: 'md',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioOption value="sm">Small</RadioOption>
      <RadioOption value="md">Medium</RadioOption>
      <RadioOption value="lg">Large</RadioOption>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  args: {
    'aria-label': 'Select delivery method',
    orientation: 'horizontal',
    defaultValue: 'standard',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioOption value="standard">Standard</RadioOption>
      <RadioOption value="express">Express</RadioOption>
      <RadioOption value="overnight">Overnight</RadioOption>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Disabled radio group',
    isDisabled: true,
    defaultValue: 'option2',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioOption value="option1">Option 1</RadioOption>
      <RadioOption value="option2">Option 2 (selected)</RadioOption>
      <RadioOption value="option3">Option 3</RadioOption>
    </RadioGroup>
  ),
};

export const Required: Story = {
  args: {
    'aria-label': 'Required selection',
    isRequired: true,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioOption value="yes">Yes</RadioOption>
      <RadioOption value="no">No</RadioOption>
      <RadioOption value="maybe">Maybe</RadioOption>
    </RadioGroup>
  ),
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <RadioGroup aria-label="Small size" size="sm" defaultValue="sm">
        <RadioOption value="sm">Small option</RadioOption>
        <RadioOption value="md">Another option</RadioOption>
      </RadioGroup>
      
      <RadioGroup aria-label="Medium size (default)" size="md" defaultValue="md">
        <RadioOption value="sm">Medium option</RadioOption>
        <RadioOption value="md">Another option</RadioOption>
      </RadioGroup>
      
      <RadioGroup aria-label="Large size" size="lg" defaultValue="lg">
        <RadioOption value="sm">Large option</RadioOption>
        <RadioOption value="md">Another option</RadioOption>
      </RadioGroup>
    </div>
  ),
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [selectedPlan, setSelectedPlan] = useState('basic');
    
    const plans = [
      { value: 'basic', name: 'Basic Plan', price: '$9/month', description: 'Essential features for individuals' },
      { value: 'pro', name: 'Pro Plan', price: '$19/month', description: 'Advanced features for professionals' },
      { value: 'enterprise', name: 'Enterprise Plan', price: '$49/month', description: 'Full features for teams' },
    ];
    
    return (
      <div style={{ maxWidth: '400px' }}>
        <RadioGroup 
          aria-label="Choose your plan" 
          value={selectedPlan}
          onChange={setSelectedPlan}
        >
          {plans.map((plan) => (
            <RadioOption key={plan.value} value={plan.value}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ fontWeight: 600 }}>{plan.name} - {plan.price}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  {plan.description}
                </div>
              </div>
            </RadioOption>
          ))}
        </RadioGroup>
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: '6px' }}>
          <strong>Selected:</strong> {plans.find(p => p.value === selectedPlan)?.name}
        </div>
      </div>
    );
  },
};

// Orientation Comparison
export const OrientationComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600 }}>
          Vertical (Default)
        </h3>
        <RadioGroup aria-label="Select priority" orientation="vertical" defaultValue="medium">
          <RadioOption value="low">Low priority</RadioOption>
          <RadioOption value="medium">Medium priority</RadioOption>
          <RadioOption value="high">High priority</RadioOption>
        </RadioGroup>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600 }}>
          Horizontal
        </h3>
        <RadioGroup aria-label="Select rating" orientation="horizontal" defaultValue="4">
          <RadioOption value="1">1 star</RadioOption>
          <RadioOption value="2">2 stars</RadioOption>
          <RadioOption value="3">3 stars</RadioOption>
          <RadioOption value="4">4 stars</RadioOption>
          <RadioOption value="5">5 stars</RadioOption>
        </RadioGroup>
      </div>
    </div>
  ),
};

// Form States
export const FormStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <RadioGroup aria-label="Normal state" defaultValue="option2">
        <RadioOption value="option1">Option 1</RadioOption>
        <RadioOption value="option2">Option 2 (selected)</RadioOption>
        <RadioOption value="option3">Option 3</RadioOption>
      </RadioGroup>
      
      <RadioGroup aria-label="Required state *" isRequired>
        <RadioOption value="agree">I agree</RadioOption>
        <RadioOption value="disagree">I disagree</RadioOption>
      </RadioGroup>
      
      <RadioGroup aria-label="Disabled state" isDisabled defaultValue="no">
        <RadioOption value="yes">Yes</RadioOption>
        <RadioOption value="no">No (selected)</RadioOption>
      </RadioGroup>
    </div>
  ),
};

// Complex Options
export const ComplexOptions: Story = {
  render: () => {
    const [selectedMethod, setSelectedMethod] = useState('card');
    
    return (
      <div style={{ maxWidth: '500px' }}>
        <RadioGroup 
          aria-label="Payment method" 
          value={selectedMethod}
          onChange={setSelectedMethod}
        >
          <RadioOption value="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2em' }}>💳</span>
              <div>
                <div style={{ fontWeight: 600 }}>Credit Card</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Visa, Mastercard, American Express
                </div>
              </div>
            </div>
          </RadioOption>
          
          <RadioOption value="paypal">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2em' }}>🟦</span>
              <div>
                <div style={{ fontWeight: 600 }}>PayPal</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Pay with your PayPal account
                </div>
              </div>
            </div>
          </RadioOption>
          
          <RadioOption value="bank">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2em' }}>🏦</span>
              <div>
                <div style={{ fontWeight: 600 }}>Bank Transfer</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Direct bank transfer (3-5 business days)
                </div>
              </div>
            </div>
          </RadioOption>
        </RadioGroup>
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'var(--color-surface-subtle)', borderRadius: '6px' }}>
          <strong>Selected method:</strong> {selectedMethod}
        </div>
      </div>
    );
  },
};

// Without Visible Options (for accessibility testing)
export const WithAriaLabel: Story = {
  args: {
    'aria-label': 'Select option (no visible label)',
    defaultValue: 'b',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioOption value="a">Option A</RadioOption>
      <RadioOption value="b">Option B</RadioOption>
      <RadioOption value="c">Option C</RadioOption>
    </RadioGroup>
  ),
};

// Brand Showcase
export const BrandShowcase: Story = {
  name: 'Brand Showcase',
  render: () => {
    const ComponentVariants = () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <RadioGroup aria-label="Size Options" defaultValue="md">
            <RadioOption value="sm">Small</RadioOption>
            <RadioOption value="md">Medium</RadioOption>
            <RadioOption value="lg">Large</RadioOption>
          </RadioGroup>
        </div>
        <div>
          <RadioGroup aria-label="Plan Selection" orientation="horizontal" defaultValue="pro">
            <RadioOption value="basic">Basic</RadioOption>
            <RadioOption value="pro">Pro</RadioOption>
            <RadioOption value="enterprise">Enterprise</RadioOption>
          </RadioGroup>
        </div>
        <div>
          <RadioGroup aria-label="Payment Method" defaultValue="card" size="sm">
            <RadioOption value="card">Credit Card</RadioOption>
            <RadioOption value="paypal">PayPal</RadioOption>
            <RadioOption value="bank">Bank Transfer</RadioOption>
          </RadioGroup>
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
        story: 'RadioGroup appearance across all three brand themes, showcasing how radio buttons and selection states adapt their visual styling while maintaining accessibility and keyboard navigation.',
      },
    },
  },
};
