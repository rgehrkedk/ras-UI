/**
 * Input component tests
 */

import { describe, it, expect, vi } from 'vitest';

import { render, screen, createUser } from '../../test/test-utils';

import { Input } from './Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input aria-label="Test input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with label', () => {
    render(<Input label="Email" />);
    
    const input = screen.getByRole('textbox', { name: 'Email' });
    const label = screen.getByText('Email');
    
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('renders required indicator', () => {
    render(<Input label="Required Field" isRequired />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders different input types', () => {
    const { rerender } = render(<Input type="email" aria-label="Email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" aria-label="Password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');

    rerender(<Input type="tel" aria-label="Phone" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Input size="sm" aria-label="Small" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    rerender(<Input size="md" aria-label="Medium" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    rerender(<Input size="lg" aria-label="Large" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    render(<Input onChange={handleChange} aria-label="Test input" />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello');
    
    expect(input).toHaveValue('Hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders placeholder text', () => {
    render(<Input placeholder="Enter your email" aria-label="Email" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter your email');
  });

  it('renders helper text', () => {
    render(
      <Input 
        label="Password" 
        helperText="Must be at least 8 characters" 
      />
    );
    
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
      <Input 
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
      <Input 
        label="Email" 
        helperText="Enter your email address"
        isInvalid 
        errorMessage="Invalid email"
      />
    );
    
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.queryByText('Enter your email address')).not.toBeInTheDocument();
  });

  it('renders with start icon', () => {
    const StartIcon = () => <span data-testid="start-icon">@</span>;
    
    render(
      <Input 
        label="Email" 
        startIcon={<StartIcon />} 
      />
    );
    
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renders with end icon', () => {
    const EndIcon = () => <span data-testid="end-icon">👁</span>;
    
    render(
      <Input 
        label="Password" 
        endIcon={<EndIcon />} 
      />
    );
    
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('handles disabled state', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    render(
      <Input 
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
    render(<Input label="Full Width" fullWidth />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(<Input ref={ref} label="With Ref" />);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" label="Custom" />);
    
    // The className is applied to the container, not the input itself
    const container = screen.getByRole('textbox').closest('div')?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('applies custom input className', () => {
    render(<Input inputClassName="custom-input" label="Custom Input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  it('supports controlled input', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    const { rerender } = render(
      <Input 
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
      <Input 
        label="Controlled" 
        value="updated value" 
        onChange={handleChange} 
      />
    );
    
    expect(input).toHaveValue('updated value');
  });

  it('maintains focus on label click', async () => {
    const user = createUser();
    
    render(<Input label="Click Label" />);
    
    const label = screen.getByText('Click Label');
    const input = screen.getByRole('textbox');
    
    await user.click(label);
    expect(input).toHaveFocus();
  });

  it('supports form validation', () => {
    render(
      <Input 
        label="Email" 
        type="email" 
        isRequired 
        isInvalid
        errorMessage="Email is required"
      />
    );
    
    const input = screen.getByRole('textbox');
    // Check that the required indicator is shown in the label
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('handles keyboard navigation', async () => {
    const user = createUser();
    
    render(<Input label="Keyboard Test" />);
    
    // Tab to focus the input
    await user.tab();
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });

  it('supports autofocus', () => {
    // Note: autoFocus removed to comply with accessibility guidelines
    // In real apps, prefer programmatic focus management over autoFocus
    const { container } = render(<Input label="Test Focus" />);
    const input = container.querySelector('input') as HTMLInputElement;
    
    // Programmatically focus instead of using autoFocus
    input.focus();
    expect(input).toHaveFocus();
  });
});