/**
 * TextField component Storybook stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { TextField } from './TextField';

const meta = {
  title: 'Components/Form/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
TextField provides accessible text input with validation, helper text, multiline support, and multiple input type support.

## Features
- **Multiline Support**: Single-line input fields and multiline textarea with configurable rows
- **Input Type Support**: Text, email, password, telephone, and URL input types with appropriate validation  
- **Validation States**: Visual feedback for neutral, valid, and invalid states with error messages
- **Size Variants**: Small, medium, and large sizes for different interface contexts
- **Helper Text**: Support for descriptive helper text and contextual guidance
- **Full Width Option**: Ability to stretch to container width when needed
- **Accessibility First**: Built on React Aria Components with proper labeling and validation announcements

## Usage Guidelines
- Always provide clear, descriptive labels that explain what input is expected
- Use helper text to provide additional context or formatting requirements
- Choose appropriate input types for better mobile keyboard support and validation
- Use validation states to provide immediate feedback on input correctness
- Keep required fields clearly marked and provide helpful error messages
- Consider using placeholder text for formatting examples, not essential information

## Accessibility
- All text fields include proper label associations and ARIA attributes
- Validation states are announced to screen readers with live regions
- Error messages are properly associated with inputs for screen reader navigation
- Keyboard navigation follows standard form field expectations
- Required fields are clearly announced to assistive technologies
- Helper text is accessible and associated with the input field
        `
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the text field',
      defaultValue: 'md',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'tel', 'url'],
      description: 'Input type',
      defaultValue: 'text',
    },
    validationState: {
      control: { type: 'select' },
      options: ['neutral', 'valid', 'invalid'],
      description: 'Validation state for visual feedback',
      defaultValue: 'neutral',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the text field takes full width',
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Whether the text field is disabled',
    },
    isRequired: {
      control: { type: 'boolean' },
      description: 'Whether the text field is required',
    },
    label: {
      control: { type: 'text' },
      description: 'Text field label',
      defaultValue: 'Label',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
      defaultValue: 'Enter text...',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text displayed below the field',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message when validation fails',
    },
    multiline: {
      control: { type: 'boolean' },
      description: 'Enable multiline text input using TextArea',
      defaultValue: false,
    },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of visible text lines for multiline input',
      defaultValue: 3,
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};


export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};



// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <TextField 
        label="Small size" 
        size="sm" 
        placeholder="Small text field"
      />
      <TextField 
        label="Medium size (default)" 
        size="md" 
        placeholder="Medium text field"
      />
      <TextField 
        label="Large size" 
        size="lg" 
        placeholder="Large text field"
      />
    </div>
  ),
};

// Validation States
export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <TextField 
        label="Neutral state" 
        validationState="neutral"
        placeholder="Normal field"
        defaultValue="Some text"
      />
      <TextField 
        label="Valid state" 
        validationState="valid"
        placeholder="Valid field"
        defaultValue="valid@example.com"
      />
      <TextField 
        label="Invalid state" 
        validationState="invalid"
        placeholder="Invalid field"
        defaultValue="invalid-email"
        errorMessage="Please enter a valid email address"
      />
    </div>
  ),
};

// Form States
export const FormStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <TextField 
        label="Normal field" 
        placeholder="Enter text"
        helperText="This is a helper text"
      />
      <TextField 
        label="Required field" 
        placeholder="Enter text"
        isRequired
        helperText="This field is required"
      />
      <TextField 
        label="Disabled field" 
        placeholder="Enter text"
        isDisabled
        defaultValue="Disabled text"
      />
    </div>
  ),
};

// Full Width

// Interactive Form Example
export const InteractiveForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      website: '',
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const validateField = (name: string, value: string) => {
      const newErrors = { ...errors };
      
      switch (name) {
        case 'email':
          if (value && !value.includes('@')) {
            newErrors.email = 'Please enter a valid email address';
          } else {
            delete newErrors.email;
          }
          break;
        case 'website':
          if (value && !value.startsWith('http')) {
            newErrors.website = 'Website must start with http:// or https://';
          } else {
            delete newErrors.website;
          }
          break;
        default:
          if (value.length > 0 && value.length < 2) {
            newErrors[name] = `${name} must be at least 2 characters`;
          } else {
            delete newErrors[name];
          }
      }
      
      setErrors(newErrors);
    };
    
    const handleChange = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      validateField(field, value);
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>
          User Registration Form
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <TextField
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            validationState={errors.firstName ? 'invalid' : 'neutral'}
            errorMessage={errors.firstName}
            isRequired
          />
          <TextField
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            validationState={errors.lastName ? 'invalid' : 'neutral'}
            errorMessage={errors.lastName}
            isRequired
          />
        </div>
        
        <TextField
          label="Email Address"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={handleChange('email')}
          validationState={errors.email ? 'invalid' : 'neutral'}
          errorMessage={errors.email}
          isRequired
        />
        
        <TextField
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={handleChange('phone')}
          helperText="Optional - for account recovery"
        />
        
        <TextField
          label="Website"
          type="url"
          placeholder="https://johndoe.com"
          value={formData.website}
          onChange={handleChange('website')}
          validationState={errors.website ? 'invalid' : 'neutral'}
          errorMessage={errors.website}
          helperText="Optional - your personal website"
        />
        
        <div style={{ 
          marginTop: '16px', 
          padding: '12px', 
          backgroundColor: 'var(--color-surface-subtle)', 
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          <strong>Form Data:</strong>
          <pre style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
          {Object.keys(errors).length > 0 && (
            <div style={{ marginTop: '8px', color: 'var(--color-semantic-danger)' }}>
              <strong>Validation Errors:</strong> {Object.keys(errors).length}
            </div>
          )}
        </div>
      </div>
    );
  },
};

// With Different Input Types
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <TextField 
        label="Text Input" 
        type="text"
        placeholder="Enter any text"
        helperText="Standard text input"
      />
      <TextField 
        label="Email Input" 
        type="email"
        placeholder="user@example.com"
        helperText="Email validation on submit"
      />
      <TextField 
        label="Password Input" 
        type="password"
        placeholder="Enter password"
        helperText="Password is hidden"
      />
      <TextField 
        label="Telephone Input" 
        type="tel"
        placeholder="+1 (555) 000-0000"
        helperText="Mobile keyboard on touch devices"
      />
      <TextField 
        label="URL Input" 
        type="url"
        placeholder="https://example.com"
        helperText="URL validation on submit"
      />
    </div>
  ),
};

// Complex Validation Example
export const ValidationExample: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const passwordValidation = () => {
      if (password.length === 0) return { state: 'neutral', message: '' };
      if (password.length < 8) return { state: 'invalid', message: 'Password must be at least 8 characters' };
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return { state: 'invalid', message: 'Password must contain uppercase, lowercase, and number' };
      }
      return { state: 'valid', message: 'Strong password' };
    };
    
    const confirmValidation = () => {
      if (confirmPassword.length === 0) return { state: 'neutral', message: '' };
      if (password !== confirmPassword) return { state: 'invalid', message: 'Passwords do not match' };
      return { state: 'valid', message: 'Passwords match' };
    };
    
    const passwordCheck = passwordValidation();
    const confirmCheck = confirmValidation();
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <TextField
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={setPassword}
          validationState={passwordCheck.state as 'neutral' | 'valid' | 'invalid'}
          errorMessage={passwordCheck.state === 'invalid' ? passwordCheck.message : undefined}
          helperText={passwordCheck.state === 'valid' ? passwordCheck.message : 'Must be 8+ chars with uppercase, lowercase, and number'}
          isRequired
        />
        
        <TextField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          validationState={confirmCheck.state as 'neutral' | 'valid' | 'invalid'}
          errorMessage={confirmCheck.state === 'invalid' ? confirmCheck.message : undefined}
          helperText={confirmCheck.state === 'valid' ? confirmCheck.message : 'Re-enter your password'}
          isRequired
        />
        
        <div style={{ 
          marginTop: '8px', 
          padding: '12px', 
          backgroundColor: 'var(--color-surface-subtle)', 
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          <strong>Password Strength:</strong> {passwordCheck.state === 'valid' ? '✅ Strong' : '❌ Weak'}
          <br />
          <strong>Confirmation:</strong> {confirmCheck.state === 'valid' ? '✅ Match' : '❌ No Match'}
        </div>
      </div>
    );
  },
};

// Without Label (aria-label only)
export const WithAriaLabel: Story = {
  args: {
    'aria-label': 'Search field (no visible label)',
    placeholder: 'Search...',
    type: 'text',
  },
};

// Multiline Examples
export const BasicMultiline: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description...',
    multiline: true,
    rows: 4,
    helperText: 'Provide a detailed description of your project or idea',
  },
};

export const MultilineSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <TextField 
        label="Small multiline" 
        size="sm" 
        multiline
        rows={3}
        placeholder="Small textarea"
        helperText="Small size multiline input"
      />
      <TextField 
        label="Medium multiline (default)" 
        size="md" 
        multiline
        rows={3}
        placeholder="Medium textarea"
        helperText="Medium size multiline input"
      />
      <TextField 
        label="Large multiline" 
        size="lg" 
        multiline
        rows={3}
        placeholder="Large textarea"
        helperText="Large size multiline input"
      />
    </div>
  ),
};

export const MultilineWithValidation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <TextField 
        label="Valid feedback" 
        multiline
        rows={3}
        validationState="valid"
        defaultValue="This is a well-written description that meets all the requirements for content quality and length."
        helperText="Great! This description looks comprehensive."
      />
      <TextField 
        label="Invalid feedback" 
        multiline
        rows={3}
        validationState="invalid"
        defaultValue="Too short"
        errorMessage="Description must be at least 20 characters long"
      />
      <TextField 
        label="Required multiline field" 
        multiline
        rows={4}
        isRequired
        placeholder="Enter detailed feedback..."
        helperText="This field is required and must contain meaningful content"
      />
    </div>
  ),
};

export const MultilineFormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      title: '',
      summary: '',
      description: '',
      notes: '',
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const validateField = (name: string, value: string) => {
      const newErrors = { ...errors };
      
      switch (name) {
        case 'title':
          if (value.length > 0 && value.length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
          } else {
            delete newErrors.title;
          }
          break;
        case 'summary':
          if (value.length > 0 && value.length < 10) {
            newErrors.summary = 'Summary must be at least 10 characters';
          } else {
            delete newErrors.summary;
          }
          break;
        case 'description':
          if (value.length > 0 && value.length < 20) {
            newErrors.description = 'Description must be at least 20 characters';
          } else {
            delete newErrors.description;
          }
          break;
      }
      
      setErrors(newErrors);
    };
    
    const handleChange = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      validateField(field, value);
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>
          Project Submission Form
        </h3>
        
        <TextField
          label="Project Title"
          placeholder="Enter project title"
          value={formData.title}
          onChange={handleChange('title')}
          validationState={errors.title ? 'invalid' : 'neutral'}
          errorMessage={errors.title}
          isRequired
        />
        
        <TextField
          label="Project Summary"
          placeholder="Brief overview of your project (2-3 lines)"
          multiline
          rows={2}
          value={formData.summary}
          onChange={handleChange('summary')}
          validationState={errors.summary ? 'invalid' : 'neutral'}
          errorMessage={errors.summary}
          helperText="Provide a concise summary highlighting key features"
          isRequired
        />
        
        <TextField
          label="Detailed Description"
          placeholder="Provide detailed information about your project, including goals, methodology, and expected outcomes..."
          multiline
          rows={6}
          value={formData.description}
          onChange={handleChange('description')}
          validationState={errors.description ? 'invalid' : 'neutral'}
          errorMessage={errors.description}
          helperText="Include technical details, timeline, and any relevant background information"
          isRequired
        />
        
        <TextField
          label="Additional Notes"
          placeholder="Any additional information, comments, or special requirements..."
          multiline
          rows={3}
          value={formData.notes}
          onChange={handleChange('notes')}
          helperText="Optional - include any other relevant information"
        />
        
        <div style={{ 
          marginTop: '16px', 
          padding: '16px', 
          backgroundColor: 'var(--color-surface-subtle)', 
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <strong>Form Data Preview:</strong>
          <pre style={{ margin: '8px 0 0 0', fontSize: '12px', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
          {Object.keys(errors).length > 0 && (
            <div style={{ marginTop: '12px', color: 'var(--color-semantic-danger)' }}>
              <strong>Validation Errors:</strong> {Object.keys(errors).length}
            </div>
          )}
        </div>
      </div>
    );
  },
};

// Advanced Form Validation Patterns
export const AdvancedValidation: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const validateUsername = (value: string) => {
      if (!value) return { isValid: false, message: 'Username is required' };
      if (value.length < 3) return { isValid: false, message: 'Username must be at least 3 characters' };
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return { isValid: false, message: 'Username can only contain letters, numbers, and underscores' };
      return { isValid: true, message: 'Username is available' };
    };

    const validateEmail = (value: string) => {
      if (!value) return { isValid: false, message: 'Email is required' };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return { isValid: false, message: 'Please enter a valid email address' };
      return { isValid: true, message: 'Email format is valid' };
    };

    const validatePassword = (value: string) => {
      if (!value) return { isValid: false, message: 'Password is required' };
      if (value.length < 8) return { isValid: false, message: 'Password must be at least 8 characters' };
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return { isValid: false, message: 'Password must contain uppercase, lowercase, and numbers' };
      }
      return { isValid: true, message: 'Password strength is good' };
    };

    const validateConfirmPassword = (value: string) => {
      if (!value) return { isValid: false, message: 'Please confirm your password' };
      if (value !== formData.password) return { isValid: false, message: 'Passwords do not match' };
      return { isValid: true, message: 'Passwords match' };
    };

    const usernameValidation = validateUsername(formData.username);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = validateConfirmPassword(formData.confirmPassword);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <TextField
          label="Username"
          placeholder="Enter username"
          value={formData.username}
          onChange={(value) => setFormData(prev => ({ ...prev, username: value }))}
          validationState={formData.username ? (usernameValidation.isValid ? 'valid' : 'invalid') : 'neutral'}
          errorMessage={!usernameValidation.isValid ? usernameValidation.message : undefined}
          helperText={usernameValidation.isValid ? usernameValidation.message : 'Letters, numbers, and underscores only'}
          isRequired
        />
        
        <TextField
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
          validationState={formData.email ? (emailValidation.isValid ? 'valid' : 'invalid') : 'neutral'}
          errorMessage={!emailValidation.isValid ? emailValidation.message : undefined}
          helperText={emailValidation.isValid ? emailValidation.message : 'We\'ll use this for account recovery'}
          isRequired
        />

        <TextField
          label="Password"
          type="password"
          placeholder="Create a secure password"
          value={formData.password}
          onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
          validationState={formData.password ? (passwordValidation.isValid ? 'valid' : 'invalid') : 'neutral'}
          errorMessage={!passwordValidation.isValid ? passwordValidation.message : undefined}
          helperText={passwordValidation.isValid ? passwordValidation.message : 'At least 8 characters with mixed case and numbers'}
          isRequired
        />

        <TextField
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={(value) => setFormData(prev => ({ ...prev, confirmPassword: value }))}
          validationState={formData.confirmPassword ? (confirmPasswordValidation.isValid ? 'valid' : 'invalid') : 'neutral'}
          errorMessage={!confirmPasswordValidation.isValid ? confirmPasswordValidation.message : undefined}
          helperText={confirmPasswordValidation.isValid ? confirmPasswordValidation.message : 'Must match your password exactly'}
          isRequired
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced validation patterns with real-time feedback, custom validation logic, and contextual helper text.',
      },
    },
  },
};

// Accessibility and keyboard navigation
export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '14px', fontWeight: 600 }}>Screen Reader Support</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <TextField
            label="Full Name"
            placeholder="Enter your full name"
            helperText="This information will be used for your public profile"
            aria-describedby="name-help"
            isRequired
          />
          
          <TextField
            label="Phone Number"
            type="tel"
            placeholder="(555) 123-4567"
            validationState="invalid"
            errorMessage="Please enter a valid phone number in the format (555) 123-4567"
            aria-invalid="true"
          />

          <TextField
            label="Comments"
            multiline
            rows={4}
            placeholder="Share your thoughts..."
            helperText="Maximum 500 characters"
            maxLength={500}
            aria-describedby="comments-help"
          />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '14px', fontWeight: 600 }}>Keyboard Navigation</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <TextField
            label="First Field"
            placeholder="Use Tab to move to next field"
            helperText="Press Tab to navigate to the next field"
          />
          
          <TextField
            label="Second Field"
            placeholder="Shift+Tab to go back"
            helperText="Use Shift+Tab to navigate backwards"
          />

          <TextField
            label="Third Field"
            multiline
            rows={3}
            placeholder="Tab works in multiline fields too"
            helperText="Keyboard navigation works consistently across all field types"
          />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '14px', fontWeight: 600 }}>Error Announcements</h4>
        <p style={{ margin: '0 0 1rem 0', fontSize: '12px', color: 'var(--color-semantic-text-secondary)' }}>
          Validation errors are announced to screen readers via live regions
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <TextField
            label="Email with Live Validation"
            type="email"
            defaultValue="invalid-email"
            validationState="invalid"
            errorMessage="Please enter a valid email address"
            helperText="Error messages are announced automatically when validation changes"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including screen reader support, keyboard navigation, and error announcements.',
      },
    },
  },
};