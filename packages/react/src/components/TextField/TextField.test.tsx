/**
 * TextField component tests
 */

import { describe, it, expect, vi } from 'vitest';

import { render, screen, createUser } from '../../test/test-utils';

import { TextField } from './TextField';

describe('TextField', () => {
  it('renders with default props', () => {
    render(<TextField aria-label="Test input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<TextField label="Email Address" />);
    
    const input = screen.getByRole('textbox', { name: 'Email Address' });
    const label = screen.getByText('Email Address');
    
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('renders required indicator when isRequired is true', () => {
    render(<TextField label="Required Field" isRequired />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders different input types for single-line inputs', () => {
    const { rerender } = render(<TextField type="email" label="Email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<TextField type="password" label="Password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');

    rerender(<TextField type="tel" label="Phone" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');

    rerender(<TextField type="url" label="Website" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<TextField size="sm" label="Small" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    rerender(<TextField size="md" label="Medium" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    rerender(<TextField size="lg" label="Large" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    render(<TextField onChange={handleChange} label="Test input" />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello World');
    
    expect(input).toHaveValue('Hello World');
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders placeholder text', () => {
    render(<TextField placeholder="Enter your email" label="Email" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter your email');
  });

  it('renders helper text', () => {
    render(
      <TextField 
        label="Password" 
        helperText="Must be at least 8 characters" 
      />
    );
    
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
      <TextField 
        label="Email" 
        isInvalid 
        errorMessage="Please enter a valid email"
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
  });

  it('hides helper text when showing error', () => {
    render(
      <TextField 
        label="Email" 
        helperText="Enter your email address"
        isInvalid 
        errorMessage="Invalid email"
      />
    );
    
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.queryByText('Enter your email address')).not.toBeInTheDocument();
  });

  it('handles disabled state', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    render(
      <TextField 
        label="Disabled" 
        isDisabled 
        onChange={handleChange} 
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    
    await user.type(input, 'test');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders full width', () => {
    render(<TextField label="Full Width" fullWidth />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('forwards ref correctly for single-line input', () => {
    const ref = vi.fn();
    
    render(<TextField ref={ref} label="With Ref" />);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it('applies custom className', () => {
    render(<TextField className="custom-class" label="Custom" />);
    
    // The className is applied to the TextField container
    const container = screen.getByRole('textbox').closest('[class*="flex"]');
    expect(container).toHaveClass('custom-class');
  });

  it('applies custom input className', () => {
    render(<TextField inputClassName="custom-input" label="Custom Input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  it('supports controlled input', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    const { rerender } = render(
      <TextField 
        label="Controlled" 
        value="initial" 
        onChange={handleChange} 
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('initial');
    
    await user.clear(input);
    await user.type(input, 'updated');
    
    expect(handleChange).toHaveBeenCalled();
    
    // Simulate parent component updating the value
    rerender(
      <TextField 
        label="Controlled" 
        value="updated value" 
        onChange={handleChange} 
      />
    );
    
    expect(input).toHaveValue('updated value');
  });

  it('maintains focus on label click', async () => {
    const user = createUser();
    
    render(<TextField label="Click Label" />);
    
    const label = screen.getByText('Click Label');
    const input = screen.getByRole('textbox');
    
    await user.click(label);
    expect(input).toHaveFocus();
  });

  it('supports form validation', () => {
    render(
      <TextField 
        label="Email" 
        type="email" 
        isRequired 
        isInvalid
        errorMessage="Email is required"
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('handles keyboard navigation', async () => {
    const user = createUser();
    
    render(<TextField label="Keyboard Test" />);
    
    // Tab to focus the input
    await user.tab();
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });

  it('supports validation states', () => {
    const { rerender } = render(
      <TextField label="Test" validationState="neutral" />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    rerender(<TextField label="Test" validationState="valid" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    rerender(<TextField label="Test" validationState="invalid" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  describe('Multiline TextField', () => {
    it('renders as textarea when multiline is true', () => {
      render(<TextField label="Description" multiline />);
      
      const textarea = screen.getByRole('textbox');
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('applies correct number of rows', () => {
      render(<TextField label="Description" multiline rows={5} />);
      
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '5');
    });

    it('uses default rows when not specified', () => {
      render(<TextField label="Description" multiline />);
      
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '3');
    });

    it('forwards ref correctly for textarea', () => {
      const ref = vi.fn();
      
      render(<TextField ref={ref} label="With Ref" multiline />);
      
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
    });

    it('handles text input in multiline mode', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <TextField 
          label="Description" 
          multiline 
          onChange={handleChange} 
        />
      );
      
      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Line 1\nLine 2\nLine 3');
      
      expect(textarea).toHaveValue('Line 1\nLine 2\nLine 3');
      expect(handleChange).toHaveBeenCalled();
    });

    it('applies placeholder to textarea', () => {
      render(
        <TextField 
          label="Description" 
          multiline 
          placeholder="Enter your description here..." 
        />
      );
      
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('placeholder', 'Enter your description here...');
    });

    it('does not apply input type to textarea', () => {
      render(
        <TextField 
          label="Description" 
          multiline 
          type="email" // Should be ignored for textarea
        />
      );
      
      const textarea = screen.getByRole('textbox');
      expect(textarea).not.toHaveAttribute('type');
    });
  });

  describe('Accessibility', () => {
    it('connects label to input with aria-labelledby', () => {
      render(<TextField label="Email Address" />);
      
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Email Address');
      
      expect(input).toHaveAccessibleName('Email Address');
    });

    it('connects helper text with aria-describedby', () => {
      render(
        <TextField 
          label="Password" 
          helperText="Must be at least 8 characters" 
        />
      );
      
      const input = screen.getByRole('textbox');
      const helperText = screen.getByText('Must be at least 8 characters');
      
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('connects error message with aria-describedby', () => {
      render(
        <TextField 
          label="Email" 
          isInvalid 
          errorMessage="Please enter a valid email" 
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('sets aria-required when required', () => {
      render(<TextField label="Required Field" isRequired />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('sets aria-invalid when invalid', () => {
      render(<TextField label="Invalid Field" isInvalid />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('works without visible label when aria-label is provided', () => {
      render(<TextField aria-label="Search" placeholder="Search..." />);
      
      const input = screen.getByRole('textbox', { name: 'Search' });
      expect(input).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string values', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <TextField 
          label="Test" 
          value=""
          onChange={handleChange} 
        />
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
      
      await user.type(input, 'a');
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles undefined/null values gracefully', () => {
      const { rerender } = render(
        <TextField label="Test" value={undefined as any} />
      );
      
      let input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
      
      rerender(<TextField label="Test" value={null as any} />);
      
      input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });
  });
});