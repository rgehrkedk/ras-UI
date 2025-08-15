/**
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';

import { render, screen, waitFor } from '../../test/test-utils';
import { createUser } from '../../test/test-utils';
import { Button } from '../Button';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  // Basic rendering tests
  it('renders trigger element without tooltip initially', () => {
    render(
      <Tooltip content="Test tooltip">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Tooltip content="Test tooltip" className="custom-tooltip">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    const container = screen.getByRole('button').closest('.custom-tooltip');
    expect(container).toBeInTheDocument();
  });

  // Interaction tests
  it('shows tooltip on hover', async () => {
    const user = createUser();
    
    render(
      <Tooltip content="Test tooltip">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    await user.hover(trigger);
    
    await waitFor(() => {
      expect(screen.getByText('Test tooltip')).toBeInTheDocument();
    });
  });

  it('shows tooltip on focus', async () => {
    const user = createUser();
    
    render(
      <Tooltip content="Test tooltip">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    await user.tab(); // Focus the button
    
    await waitFor(() => {
      expect(screen.getByText('Test tooltip')).toBeInTheDocument();
    });
  });

  it('hides tooltip on unhover', async () => {
    const user = createUser();
    
    render(
      <Tooltip content="Test tooltip">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    
    // Show tooltip
    await user.hover(trigger);
    await waitFor(() => {
      expect(screen.getByText('Test tooltip')).toBeInTheDocument();
    });
    
    // Hide tooltip
    await user.unhover(trigger);
    await waitFor(() => {
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
    });
  });

  it('hides tooltip on blur', async () => {
    const user = createUser();
    
    render(
      <div>
        <Tooltip content="Test tooltip">
          <Button>Trigger</Button>
        </Tooltip>
        <Button>Other button</Button>
      </div>
    );
    
    // Focus first button to show tooltip
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText('Test tooltip')).toBeInTheDocument();
    });
    
    // Focus second button to hide tooltip
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
    });
  });

  // Placement tests
  it('renders with different placements', async () => {
    const user = createUser();
    
    const { rerender } = render(
      <Tooltip content="Test tooltip" placement="bottom">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    await user.hover(screen.getByRole('button'));
    
    await waitFor(() => {
      const tooltip = screen.getByText('Test tooltip').closest('[class*="tooltip"]');
      expect(tooltip).toHaveClass(expect.stringContaining('bottom'));
    });
    
    // Test other placements
    rerender(
      <Tooltip content="Test tooltip" placement="left">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    await waitFor(() => {
      const tooltip = screen.getByText('Test tooltip').closest('[class*="tooltip"]');
      expect(tooltip).toHaveClass(expect.stringContaining('left'));
    });
  });

  // Size variants
  it('renders with different sizes', async () => {
    const user = createUser();
    
    render(
      <Tooltip content="Small tooltip" size="sm">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    await user.hover(screen.getByRole('button'));
    
    await waitFor(() => {
      const tooltip = screen.getByText('Small tooltip').closest('[class*="tooltip"]');
      expect(tooltip).toHaveClass(expect.stringContaining('sm'));
    });
  });

  // Accessibility tests
  it('has correct ARIA attributes', async () => {
    const user = createUser();
    
    render(
      <Tooltip content="Accessible tooltip">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    await user.hover(trigger);
    
    await waitFor(() => {
      const tooltip = screen.getByText('Accessible tooltip');
      expect(tooltip).toHaveAttribute('role', 'tooltip');
      expect(trigger).toHaveAttribute('aria-describedby');
    });
  });

  it('supports keyboard navigation', async () => {
    const user = createUser();
    
    render(
      <Tooltip content="Keyboard tooltip">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    // Focus with keyboard
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText('Keyboard tooltip')).toBeInTheDocument();
    });
    
    // Escape should close tooltip
    await user.keyboard('{Escape}');
    
    await waitFor(() => {
      expect(screen.queryByText('Keyboard tooltip')).not.toBeInTheDocument();
    });
  });

  // Disabled state
  it('does not show tooltip when disabled', async () => {
    const user = createUser();
    
    render(
      <Tooltip content="Hidden tooltip" isDisabled>
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    await user.hover(trigger);
    
    // Wait a bit to ensure tooltip doesn't appear
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.queryByText('Hidden tooltip')).not.toBeInTheDocument();
  });

  // Delay functionality
  it('respects custom delay', async () => {
    const user = createUser();
    
    render(
      <Tooltip content="Delayed tooltip" delay={100}>
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    await user.hover(trigger);
    
    // Should not appear immediately
    expect(screen.queryByText('Delayed tooltip')).not.toBeInTheDocument();
    
    // Should appear after delay
    await waitFor(() => {
      expect(screen.getByText('Delayed tooltip')).toBeInTheDocument();
    }, { timeout: 200 });
  });

  // Arrow functionality
  it('renders with arrow by default', async () => {
    const user = createUser();
    
    render(
      <Tooltip content="Tooltip with arrow">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    await user.hover(screen.getByRole('button'));
    
    await waitFor(() => {
      const arrow = document.querySelector('[class*="tooltipArrow"]');
      expect(arrow).toBeInTheDocument();
    });
  });

  it('can hide arrow', async () => {
    const user = createUser();
    
    render(
      <Tooltip content="Tooltip without arrow" showArrow={false}>
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    await user.hover(screen.getByRole('button'));
    
    await waitFor(() => {
      expect(screen.getByText('Tooltip without arrow')).toBeInTheDocument();
      const arrow = document.querySelector('[class*="tooltipArrow"]');
      expect(arrow).not.toBeInTheDocument();
    });
  });

  // Content tests
  it('renders with complex content', async () => {
    const user = createUser();
    
    render(
      <Tooltip content={<div>Complex <strong>content</strong></div>}>
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    await user.hover(screen.getByRole('button'));
    
    await waitFor(() => {
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });

  // Edge cases
  it('handles empty content gracefully', async () => {
    const user = createUser();
    
    render(
      <Tooltip content="">
        <Button>Trigger</Button>
      </Tooltip>
    );
    
    await user.hover(screen.getByRole('button'));
    
    // Should still create tooltip element even with empty content
    await waitFor(() => {
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).toBeInTheDocument();
    });
  });
});