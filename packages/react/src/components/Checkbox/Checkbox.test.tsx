/**
 * Checkbox component tests
 */

import { describe, it, expect, vi } from 'vitest';

import { render, screen, createUser } from '../../test/test-utils';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with default props', () => {
    render(<Checkbox>Accept terms</Checkbox>);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders without children', () => {
    render(<Checkbox aria-label="Checkbox without label" />);
    
    const checkbox = screen.getByRole('checkbox', { name: 'Checkbox without label' });
    expect(checkbox).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Checkbox size="sm">Small</Checkbox>);
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox.parentElement).toBeInTheDocument();

    rerender(<Checkbox size="md">Medium</Checkbox>);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox.parentElement).toBeInTheDocument();

    rerender(<Checkbox size="lg">Large</Checkbox>);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox.parentElement).toBeInTheDocument();
  });

  it('handles checked state changes', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    render(
      <Checkbox onChange={handleChange}>
        Toggle me
      </Checkbox>
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
    
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(checkbox).not.toBeChecked();
  });

  it('supports controlled state', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    const { rerender } = render(
      <Checkbox isSelected={false} onChange={handleChange}>
        Controlled checkbox
      </Checkbox>
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
    
    // Simulate parent component updating the state
    rerender(
      <Checkbox isSelected={true} onChange={handleChange}>
        Controlled checkbox
      </Checkbox>
    );
    
    expect(checkbox).toBeChecked();
  });

  it('supports indeterminate state', () => {
    render(
      <Checkbox isIndeterminate>
        Partially selected
      </Checkbox>
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBePartiallyChecked();
    
    // Check that the indeterminate icon is rendered - look in parent element
    const checkboxContainer = checkbox.closest('label');
    const svg = checkboxContainer?.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.querySelector('rect')).toBeInTheDocument(); // Indeterminate uses rect
  });

  it('shows checkmark when selected', () => {
    render(
      <Checkbox isSelected>
        Selected checkbox
      </Checkbox>
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    
    // Check that the checkmark path is rendered - look in parent element
    const checkboxContainer = checkbox.closest('label');
    const svg = checkboxContainer?.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.querySelector('path')).toBeInTheDocument(); // Checkmark uses path
  });

  it('handles disabled state', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    render(
      <Checkbox isDisabled onChange={handleChange}>
        Disabled checkbox
      </Checkbox>
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    
    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(
      <Checkbox className="custom-class">
        Custom checkbox
      </Checkbox>
    );
    
    const checkboxLabel = screen.getByRole('checkbox').closest('label');
    expect(checkboxLabel).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(
      <Checkbox ref={ref}>
        With ref
      </Checkbox>
    );
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLLabelElement));
  });

  it('supports keyboard navigation', async () => {
    const user = createUser();
    const handleChange = vi.fn();
    
    render(
      <Checkbox onChange={handleChange}>
        Keyboard accessible
      </Checkbox>
    );
    
    const checkbox = screen.getByRole('checkbox');
    
    // Tab to focus
    await user.tab();
    expect(checkbox).toHaveFocus();
    
    // Space to toggle
    await user.keyboard(' ');
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
    
    // Space again to toggle off
    await user.keyboard(' ');
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(checkbox).not.toBeChecked();
  });

  it('maintains focus visible styles', async () => {
    const user = createUser();
    
    render(<Checkbox>Focus test</Checkbox>);
    
    const checkbox = screen.getByRole('checkbox');
    
    // Tab to focus the checkbox
    await user.tab();
    expect(checkbox).toHaveFocus();
  });

  it('works with form elements', () => {
    render(
      <form>
        <Checkbox name="terms" value="accepted">
          I accept the terms
        </Checkbox>
      </form>
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('name', 'terms');
    expect(checkbox).toHaveAttribute('value', 'accepted');
  });

  it('supports required validation', () => {
    render(
      <Checkbox isRequired>
        Required checkbox
      </Checkbox>
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeRequired();
  });

  it('supports invalid state', () => {
    render(
      <Checkbox isInvalid>
        Invalid checkbox
      </Checkbox>
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInvalid();
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(
        <Checkbox isRequired isInvalid>
          Test checkbox
        </Checkbox>
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-required', 'true');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });

    it('supports aria-label when no children provided', () => {
      render(<Checkbox aria-label="Unlabeled checkbox" />);
      
      const checkbox = screen.getByRole('checkbox', { name: 'Unlabeled checkbox' });
      expect(checkbox).toBeInTheDocument();
    });

    it('supports aria-labelledby', () => {
      render(
        <>
          <div id="checkbox-label">External label</div>
          <Checkbox aria-labelledby="checkbox-label" />
        </>
      );
      
      const checkbox = screen.getByRole('checkbox', { name: 'External label' });
      expect(checkbox).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(
        <>
          <div id="checkbox-help">Help text for checkbox</div>
          <Checkbox aria-describedby="checkbox-help">
            Checkbox with help
          </Checkbox>
        </>
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'checkbox-help');
    });

    it('includes SVG icon with aria-hidden', () => {
      render(<Checkbox>Test</Checkbox>);
      
      const checkboxContainer = screen.getByRole('checkbox').closest('label');
      const svg = checkboxContainer?.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Visual States', () => {
    it('shows different visual states for different selections', () => {
      const { rerender } = render(<Checkbox>Test</Checkbox>);
      
      let checkbox = screen.getByRole('checkbox');
      let checkboxContainer = checkbox.closest('label');
      let svg = checkboxContainer?.querySelector('svg');
      let path = svg?.querySelector('path');
      
      // Unchecked state - checkmark should have opacity 0
      expect(path).toHaveStyle({ opacity: '0' });
      
      // Checked state
      rerender(<Checkbox isSelected>Test</Checkbox>);
      checkbox = screen.getByRole('checkbox');
      checkboxContainer = checkbox.closest('label');
      svg = checkboxContainer?.querySelector('svg');
      path = svg?.querySelector('path');
      expect(path).toHaveStyle({ opacity: '1' });
      
      // Indeterminate state - should have rect instead of path
      rerender(<Checkbox isIndeterminate>Test</Checkbox>);
      checkbox = screen.getByRole('checkbox');
      checkboxContainer = checkbox.closest('label');
      svg = checkboxContainer?.querySelector('svg');
      const rect = svg?.querySelector('rect');
      expect(rect).toBeInTheDocument();
    });
  });

  describe('Event Handling', () => {
    it('calls onChange with boolean value', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <Checkbox onChange={handleChange}>
          Test checkbox
        </Checkbox>
      );
      
      const checkbox = screen.getByRole('checkbox');
      
      await user.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(true);
      
      await user.click(checkbox);
      expect(handleChange).toHaveBeenLastCalledWith(false);
    });

    it('handles onFocus and onBlur events', async () => {
      const user = createUser();
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      
      render(
        <Checkbox onFocus={handleFocus} onBlur={handleBlur}>
          Test checkbox
        </Checkbox>
      );
      
      const checkbox = screen.getByRole('checkbox');
      
      await user.tab(); // Focus
      expect(handleFocus).toHaveBeenCalled();
      
      await user.tab(); // Blur (focus moves to next element)
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid clicks without issues', async () => {
      const user = createUser();
      const handleChange = vi.fn();
      
      render(
        <Checkbox onChange={handleChange}>
          Rapid click test
        </Checkbox>
      );
      
      const checkbox = screen.getByRole('checkbox');
      
      // Rapid clicks
      await user.click(checkbox);
      await user.click(checkbox);
      await user.click(checkbox);
      await user.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledTimes(4);
      expect(checkbox).not.toBeChecked(); // Even number of clicks = unchecked
    });

    it('handles defaultSelected prop', () => {
      render(
        <Checkbox defaultSelected>
          Default selected
        </Checkbox>
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });
  });
});