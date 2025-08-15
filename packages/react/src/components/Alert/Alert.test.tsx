/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { render, screen, act } from '../../test/test-utils';
import { createUser } from '../../test/test-utils';
import { Button } from '../Button';

import { Alert } from './Alert';

describe('Alert', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  // Basic rendering tests
  it('renders with children content', () => {
    render(<Alert>This is an alert message</Alert>);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('This is an alert message')).toBeInTheDocument();
  });

  it('renders with title and children', () => {
    render(
      <Alert title="Alert Title">
        This is the alert description
      </Alert>
    );
    
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('This is the alert description')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Alert className="custom-alert">Test alert</Alert>);
    
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass('custom-alert');
  });

  // Variant tests
  it('renders with different variants', () => {
    const { rerender } = render(<Alert variant="success">Success message</Alert>);
    
    let alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass(expect.stringContaining('success'));

    rerender(<Alert variant="error">Error message</Alert>);
    
    alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass(expect.stringContaining('error'));

    rerender(<Alert variant="warning">Warning message</Alert>);
    
    alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass(expect.stringContaining('warning'));
  });

  // Size variants
  it('renders with different sizes', () => {
    const { rerender } = render(<Alert size="sm">Small alert</Alert>);
    
    let alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass(expect.stringContaining('sm'));

    rerender(<Alert size="lg">Large alert</Alert>);
    
    alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass(expect.stringContaining('lg'));
  });

  // Icon tests
  it('renders with default icons for each variant', () => {
    const { rerender } = render(<Alert variant="info">Info alert</Alert>);
    
    expect(document.querySelector('svg')).toBeInTheDocument();

    rerender(<Alert variant="success">Success alert</Alert>);
    expect(document.querySelector('svg')).toBeInTheDocument();

    rerender(<Alert variant="warning">Warning alert</Alert>);
    expect(document.querySelector('svg')).toBeInTheDocument();

    rerender(<Alert variant="error">Error alert</Alert>);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    const CustomIcon = () => <div data-testid="custom-icon">🔥</div>;
    
    render(
      <Alert icon={<CustomIcon />}>
        Alert with custom icon
      </Alert>
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('hides icon when hideIcon is true', () => {
    render(<Alert hideIcon>Alert without icon</Alert>);
    
    expect(document.querySelector('svg')).not.toBeInTheDocument();
  });

  // Dismissible functionality
  it('renders dismiss button when dismissible', () => {
    render(<Alert dismissible>Dismissible alert</Alert>);
    
    expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument();
  });

  it('does not render dismiss button by default', () => {
    render(<Alert>Regular alert</Alert>);
    
    expect(screen.queryByRole('button', { name: 'Dismiss alert' })).not.toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = createUser();
    const handleDismiss = vi.fn();
    
    render(<Alert dismissible onDismiss={handleDismiss}>Dismissible alert</Alert>);
    
    const dismissButton = screen.getByRole('button', { name: 'Dismiss alert' });
    await user.click(dismissButton);
    
    // Wait for animation to complete
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    expect(handleDismiss).toHaveBeenCalled();
  });

  it('dismisses on Escape key', async () => {
    const user = createUser();
    const handleDismiss = vi.fn();
    
    render(<Alert dismissible onDismiss={handleDismiss}>Dismissible alert</Alert>);
    
    const alertElement = screen.getByRole('alert');
    alertElement.focus();
    
    await user.keyboard('{Escape}');
    
    // Wait for animation to complete
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    expect(handleDismiss).toHaveBeenCalled();
  });

  it('does not dismiss on Escape when not dismissible', async () => {
    const user = createUser();
    const handleDismiss = vi.fn();
    
    render(<Alert onDismiss={handleDismiss}>Non-dismissible alert</Alert>);
    
    const alertElement = screen.getByRole('alert');
    alertElement.focus();
    
    await user.keyboard('{Escape}');
    
    expect(handleDismiss).not.toHaveBeenCalled();
  });

  // Auto-hide functionality
  it('auto-hides after specified duration', async () => {
    const handleDismiss = vi.fn();
    
    render(
      <Alert 
        dismissible 
        autoHideDuration={3000} 
        onDismiss={handleDismiss}
      >
        Auto-hide alert
      </Alert>
    );
    
    expect(screen.getByText('Auto-hide alert')).toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    
    // Wait for animation to complete
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    expect(handleDismiss).toHaveBeenCalled();
  });

  it('does not auto-hide when duration is not specified', () => {
    const handleDismiss = vi.fn();
    
    render(<Alert dismissible onDismiss={handleDismiss}>Regular alert</Alert>);
    
    // Fast-forward time significantly
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    
    expect(screen.getByText('Regular alert')).toBeInTheDocument();
    expect(handleDismiss).not.toHaveBeenCalled();
  });

  // Actions functionality
  it('renders with action buttons', () => {
    const actions = (
      <div>
        <Button size="sm">Retry</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </div>
    );
    
    render(<Alert actions={actions}>Alert with actions</Alert>);
    
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  // Role customization
  it('supports custom ARIA role', () => {
    render(<Alert role="status">Status alert</Alert>);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  // Accessibility tests
  it('has correct ARIA attributes', () => {
    render(<Alert>Accessible alert</Alert>);
    
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveAttribute('role', 'alert');
  });

  it('dismiss button has correct aria-label', () => {
    render(<Alert dismissible>Dismissible alert</Alert>);
    
    const dismissButton = screen.getByRole('button');
    expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert');
  });

  it('supports keyboard navigation for dismiss button', async () => {
    const user = createUser();
    const handleDismiss = vi.fn();
    
    render(<Alert dismissible onDismiss={handleDismiss}>Alert with focus</Alert>);
    
    // Tab to dismiss button
    await user.tab();
    
    const dismissButton = screen.getByRole('button', { name: 'Dismiss alert' });
    expect(dismissButton).toHaveFocus();
    
    // Press Enter to dismiss
    await user.keyboard('{Enter}');
    
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    expect(handleDismiss).toHaveBeenCalled();
  });

  // Content structure tests
  it('renders complex content structure', () => {
    render(
      <Alert 
        title="Complex Alert"
        actions={<Button size="sm">Action</Button>}
      >
        <p>This is a paragraph with <strong>bold text</strong>.</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
        </ul>
      </Alert>
    );
    
    expect(screen.getByText('Complex Alert')).toBeInTheDocument();
    expect(screen.getByText('bold text')).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('handles empty content gracefully', () => {
    render(<Alert title="Title Only" />);
    
    expect(screen.getByText('Title Only')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  // Animation and lifecycle tests
  it('applies exit animation class when dismissing', async () => {
    const user = createUser();
    
    render(<Alert dismissible>Dismissible alert</Alert>);
    
    const alertElement = screen.getByRole('alert');
    const dismissButton = screen.getByRole('button', { name: 'Dismiss alert' });
    
    await user.click(dismissButton);
    
    expect(alertElement).toHaveAttribute('data-exiting', 'true');
  });

  it('removes alert from DOM after animation completes', async () => {
    const user = createUser();
    
    render(<Alert dismissible>Dismissible alert</Alert>);
    
    const dismissButton = screen.getByRole('button', { name: 'Dismiss alert' });
    await user.click(dismissButton);
    
    // Wait for animation to complete
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    expect(screen.queryByText('Dismissible alert')).not.toBeInTheDocument();
  });

  // Edge cases
  it('handles rapid dismiss clicks gracefully', async () => {
    const user = createUser();
    const handleDismiss = vi.fn();
    
    render(<Alert dismissible onDismiss={handleDismiss}>Alert</Alert>);
    
    const dismissButton = screen.getByRole('button', { name: 'Dismiss alert' });
    
    // Rapid clicks
    await user.click(dismissButton);
    await user.click(dismissButton);
    await user.click(dismissButton);
    
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    // Should only call onDismiss once
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('cleans up timers on unmount', () => {
    const { unmount } = render(
      <Alert dismissible autoHideDuration={5000}>
        Auto-hide alert
      </Alert>
    );
    
    // Unmount before timer completes
    unmount();
    
    // Fast-forward past the timer duration
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    
    // Should not cause any errors or memory leaks
    expect(true).toBe(true); // Test passes if no errors thrown
  });
});