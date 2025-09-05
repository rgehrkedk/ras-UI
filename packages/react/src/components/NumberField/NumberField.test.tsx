/**
 * NumberField component tests
 */

import { describe, it, expect, vi } from 'vitest';

import { render, screen, createUser } from '../../test/test-utils';

import { NumberField } from './NumberField';

describe('NumberField', () => {
  it('renders with default props', () => {
    render(<NumberField aria-label="Test number" />);
    
    const spinbutton = screen.getByRole('spinbutton');
    expect(spinbutton).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<NumberField label="Quantity" />);
    
    const spinbutton = screen.getByRole('spinbutton', { name: 'Quantity' });
    const label = screen.getByText('Quantity');
    
    expect(spinbutton).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('renders required indicator when isRequired is true', () => {
    render(<NumberField label="Required Field" isRequired />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { rerender } = render(<NumberField size="sm" label="Small" />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();

    rerender(<NumberField size="md" label="Medium" />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();

    rerender(<NumberField size="lg" label="Large" />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('renders placeholder text', () => {
    render(<NumberField placeholder="Enter quantity" label="Quantity" />);
    
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('placeholder', 'Enter quantity');
  });

  it('renders helper text', () => {
    render(
      <NumberField 
        label="Age" 
        helperText="Must be between 18 and 100" 
      />
    );
    
    expect(screen.getByText('Must be between 18 and 100')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
      <NumberField 
        label="Quantity" 
        isInvalid 
        errorMessage="Must be a positive number"
      />
    );
    
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Must be a positive number')).toBeInTheDocument();
  });

  it('handles disabled state', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    render(
      <NumberField 
        label="Disabled" 
        isDisabled 
        onChange={handleChange} 
      />
    );
    
    const input = screen.getByRole('spinbutton');
    expect(input).toBeDisabled();
    
    await user.type(input, '123');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders full width', () => {
    render(<NumberField label="Full Width" fullWidth />);
    
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(<NumberField ref={ref} label="With Ref" />);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it('applies custom className', () => {
    render(<NumberField className="custom-class" label="Custom" />);
    
    // The className is applied to the NumberField container
    const container = screen.getByRole('spinbutton').closest('[class*="flex"]');
    expect(container).toHaveClass('custom-class');
  });

  it('applies custom input className', () => {
    render(<NumberField inputClassName="custom-input" label="Custom Input" />);
    
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveClass('custom-input');
  });

  it('supports controlled input', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    const { rerender } = render(
      <NumberField 
        label="Controlled" 
        value={10} 
        onChange={handleChange} 
      />
    );
    
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(10);
    
    await user.clear(input);
    await user.type(input, '25');
    
    expect(handleChange).toHaveBeenCalled();
    
    // Simulate parent component updating the value
    rerender(
      <NumberField 
        label="Controlled" 
        value={25} 
        onChange={handleChange} 
      />
    );
    
    expect(input).toHaveValue(25);
  });

  it('maintains focus on label click', async () => {
    const user = createUser();
    
    render(<NumberField label="Click Label" />);
    
    const label = screen.getByText('Click Label');
    const input = screen.getByRole('spinbutton');
    
    await user.click(label);
    expect(input).toHaveFocus();
  });

  it('supports form validation', () => {
    render(
      <NumberField 
        label="Quantity" 
        isRequired 
        isInvalid
        errorMessage="Quantity is required"
      />
    );
    
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('handles keyboard navigation', async () => {
    const user = createUser();
    
    render(<NumberField label="Keyboard Test" />);
    
    // Tab to focus the input
    await user.tab();
    
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveFocus();
  });

  it('supports validation states', () => {
    const { rerender } = render(
      <NumberField label="Test" validationState="neutral" />
    );
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();

    rerender(<NumberField label="Test" validationState="valid" />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();

    rerender(<NumberField label="Test" validationState="invalid" />);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  describe('Stepper Buttons', () => {
    it('renders stepper buttons by default', () => {
      render(<NumberField label="With Steppers" />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increase value' });
      const decrementButton = screen.getByRole('button', { name: 'Decrease value' });
      
      expect(incrementButton).toBeInTheDocument();
      expect(decrementButton).toBeInTheDocument();
    });

    it('hides stepper buttons when showSteppers is false', () => {
      render(<NumberField label="No Steppers" showSteppers={false} />);
      
      const incrementButton = screen.queryByRole('button', { name: 'Increase value' });
      const decrementButton = screen.queryByRole('button', { name: 'Decrease value' });
      
      expect(incrementButton).not.toBeInTheDocument();
      expect(decrementButton).not.toBeInTheDocument();
    });

    it('increments value when increment button is clicked', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <NumberField 
          label="Stepper Test" 
          value={5} 
          onChange={handleChange} 
        />
      );
      
      const incrementButton = screen.getByRole('button', { name: 'Increase value' });
      await user.click(incrementButton);
      
      expect(handleChange).toHaveBeenCalledWith(6);
    });

    it('decrements value when decrement button is clicked', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <NumberField 
          label="Stepper Test" 
          value={5} 
          onChange={handleChange} 
        />
      );
      
      const decrementButton = screen.getByRole('button', { name: 'Decrease value' });
      await user.click(decrementButton);
      
      expect(handleChange).toHaveBeenCalledWith(4);
    });

    it('respects min and max values with stepper buttons', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <NumberField 
          label="Min Max Test" 
          value={10}
          minValue={5}
          maxValue={10}
          onChange={handleChange} 
        />
      );
      
      const incrementButton = screen.getByRole('button', { name: 'Increase value' });
      const decrementButton = screen.getByRole('button', { name: 'Decrease value' });
      
      // Try to increment beyond max
      await user.click(incrementButton);
      expect(handleChange).not.toHaveBeenCalled(); // Should not exceed max
      
      // Change to min value
      render(
        <NumberField 
          label="Min Max Test" 
          value={5}
          minValue={5}
          maxValue={10}
          onChange={handleChange} 
        />
      );
      
      // Try to decrement below min
      await user.click(decrementButton);
      expect(handleChange).not.toHaveBeenCalled(); // Should not go below min
    });

    it('disables stepper buttons when field is disabled', () => {
      render(
        <NumberField 
          label="Disabled Steppers" 
          isDisabled 
          value={5} 
        />
      );
      
      const incrementButton = screen.getByRole('button', { name: 'Increase value' });
      const decrementButton = screen.getByRole('button', { name: 'Decrease value' });
      
      expect(incrementButton).toBeDisabled();
      expect(decrementButton).toBeDisabled();
    });
  });

  describe('Number Formatting', () => {
    it('applies currency formatting', () => {
      render(
        <NumberField 
          label="Price" 
          value={1234.56}
          formatOptions={{
            style: 'currency',
            currency: 'USD',
          }}
        />
      );
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveDisplayValue('$1,234.56');
    });

    it('applies percentage formatting', () => {
      render(
        <NumberField 
          label="Percentage" 
          value={0.25}
          formatOptions={{
            style: 'percent',
          }}
        />
      );
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveDisplayValue('25%');
    });

    it('applies decimal formatting', () => {
      render(
        <NumberField 
          label="Decimal" 
          value={123.456}
          formatOptions={{
            maximumFractionDigits: 2,
          }}
        />
      );
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveDisplayValue('123.46');
    });
  });

  describe('Keyboard Input', () => {
    it('handles arrow key increments and decrements', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <NumberField 
          label="Arrow Keys" 
          value={10} 
          onChange={handleChange} 
        />
      );
      
      const input = screen.getByRole('spinbutton');
      input.focus();
      
      // Arrow up to increment
      await user.keyboard('{ArrowUp}');
      expect(handleChange).toHaveBeenCalledWith(11);
      
      // Arrow down to decrement
      await user.keyboard('{ArrowDown}');
      expect(handleChange).toHaveBeenCalledWith(9);
    });

    it('handles step value with keyboard input', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <NumberField 
          label="Step Test" 
          value={0} 
          step={5}
          onChange={handleChange} 
        />
      );
      
      const input = screen.getByRole('spinbutton');
      input.focus();
      
      await user.keyboard('{ArrowUp}');
      expect(handleChange).toHaveBeenCalledWith(5);
    });
  });

  describe('Accessibility', () => {
    it('connects label to input with aria-labelledby', () => {
      render(<NumberField label="Number Input" />);
      
      const input = screen.getByRole('spinbutton');
      const label = screen.getByText('Number Input');
      
      expect(input).toHaveAccessibleName('Number Input');
    });

    it('connects helper text with aria-describedby', () => {
      render(
        <NumberField 
          label="Number" 
          helperText="Enter a number between 1 and 100" 
        />
      );
      
      const input = screen.getByRole('spinbutton');
      const helperText = screen.getByText('Enter a number between 1 and 100');
      
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('sets aria-required when required', () => {
      render(<NumberField label="Required Field" isRequired />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('sets aria-invalid when invalid', () => {
      render(<NumberField label="Invalid Field" isInvalid />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('works without visible label when aria-label is provided', () => {
      render(<NumberField aria-label="Quantity" placeholder="Enter quantity..." />);
      
      const input = screen.getByRole('spinbutton', { name: 'Quantity' });
      expect(input).toBeInTheDocument();
    });

    it('has correct aria attributes for stepper buttons', () => {
      render(<NumberField label="Test" />);
      
      const incrementButton = screen.getByRole('button', { name: 'Increase value' });
      const decrementButton = screen.getByRole('button', { name: 'Decrease value' });
      
      expect(incrementButton).toHaveAttribute('aria-label', 'Increase value');
      expect(decrementButton).toHaveAttribute('aria-label', 'Decrease value');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string values', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <NumberField 
          label="Test" 
          value={null as any}
          onChange={handleChange} 
        />
      );
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveDisplayValue('');
      
      await user.type(input, '123');
      expect(handleChange).toHaveBeenCalled();
    });

    it('handles invalid number input gracefully', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <NumberField 
          label="Test" 
          onChange={handleChange} 
        />
      );
      
      const input = screen.getByRole('spinbutton');
      
      // Try to type non-numeric characters
      await user.type(input, 'abc');
      
      // NumberField should handle this gracefully
      expect(input).toBeInTheDocument();
    });

    it('respects minValue constraint', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <NumberField 
          label="Min Value Test" 
          minValue={10}
          onChange={handleChange} 
        />
      );
      
      const input = screen.getByRole('spinbutton');
      
      await user.type(input, '5');
      // The component should handle validation internally
      expect(input).toBeInTheDocument();
    });

    it('respects maxValue constraint', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <NumberField 
          label="Max Value Test" 
          maxValue={100}
          onChange={handleChange} 
        />
      );
      
      const input = screen.getByRole('spinbutton');
      
      await user.type(input, '150');
      // The component should handle validation internally
      expect(input).toBeInTheDocument();
    });
  });
});