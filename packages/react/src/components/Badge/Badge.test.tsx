/**
 * Badge component tests
 */

import { describe, it, expect, vi } from 'vitest';

import { render, screen, createUser } from '../../test/test-utils';

import { Badge, BadgeUtils } from './Badge';

// Mock Icon component
vi.mock('../Icon', () => ({
  Icon: ({ name, size, ...props }: { name: string; size?: string; [key: string]: any }) => (
    <span data-testid={`icon-${name}`} data-size={size} {...props}>
      {name}
    </span>
  ),
}));

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Default Badge</Badge>);
    
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
  });

  it('renders without children', () => {
    render(<Badge />);
    
    // Badge container should still exist even without content
    const badge = screen.getByRole('generic');
    expect(badge).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const variants = [
      'primary', 'secondary', 'outline', 'success', 'warning', 'danger', 'info',
      'tennis', 'basketball', 'football', 'volleyball', 'premium', 'glass'
    ] as const;

    variants.forEach(variant => {
      const { unmount } = render(<Badge variant={variant}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    sizes.forEach(size => {
      const { unmount } = render(<Badge size={size}>Test</Badge>);
      expect(screen.getByText('Test')).toBeInTheDocument();
      unmount();
    });
  });

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Test</Badge>);
    
    const badge = screen.getByText('Test');
    expect(badge).toHaveClass('custom-badge');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    
    render(<Badge ref={ref}>Test</Badge>);
    
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  describe('Icons', () => {
    it('renders start icon', () => {
      render(<Badge startIcon="star">With Start Icon</Badge>);
      
      const startIcon = screen.getByTestId('icon-star');
      expect(startIcon).toBeInTheDocument();
      expect(startIcon).toHaveAttribute('data-size', 'sm');
      expect(screen.getByText('With Start Icon')).toBeInTheDocument();
    });

    it('renders end icon', () => {
      render(<Badge endIcon="arrow-right">With End Icon</Badge>);
      
      const endIcon = screen.getByTestId('icon-arrow-right');
      expect(endIcon).toBeInTheDocument();
      expect(endIcon).toHaveAttribute('data-size', 'sm');
      expect(screen.getByText('With End Icon')).toBeInTheDocument();
    });

    it('renders both start and end icons', () => {
      render(
        <Badge startIcon="star" endIcon="arrow-right">
          Both Icons
        </Badge>
      );
      
      expect(screen.getByTestId('icon-star')).toBeInTheDocument();
      expect(screen.getByTestId('icon-arrow-right')).toBeInTheDocument();
      expect(screen.getByText('Both Icons')).toBeInTheDocument();
    });

    it('hides end icon when removable is true', () => {
      render(
        <Badge endIcon="arrow-right" removable onRemove={() => {}}>
          Removable with End Icon
        </Badge>
      );
      
      expect(screen.queryByTestId('icon-arrow-right')).not.toBeInTheDocument();
      expect(screen.getByTestId('icon-close')).toBeInTheDocument(); // Remove button icon
    });
  });

  describe('Interactive Badge', () => {
    it('handles click when interactive', async () => {
      const user = createUser();
      const handleClick = vi.fn();
      
      render(
        <Badge interactive onClick={handleClick}>
          Interactive Badge
        </Badge>
      );
      
      const badge = screen.getByText('Interactive Badge');
      await user.click(badge);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles click when onClick is provided (implicit interactive)', async () => {
      const user = createUser();
      const handleClick = vi.fn();
      
      render(
        <Badge onClick={handleClick}>
          Clickable Badge
        </Badge>
      );
      
      const badge = screen.getByText('Clickable Badge');
      await user.click(badge);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not handle click when not interactive', async () => {
      const user = createUser();
      const handleClick = vi.fn();
      
      render(
        <Badge onClick={handleClick}>
          Non-Interactive Badge
        </Badge>
      );
      
      const badge = screen.getByText('Non-Interactive Badge');
      await user.click(badge);
      
      // Click should not be handled when not explicitly interactive
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Removable Badge', () => {
    it('renders remove button when removable', () => {
      render(
        <Badge removable onRemove={() => {}}>
          Removable Badge
        </Badge>
      );
      
      const removeButton = screen.getByRole('button', { name: 'Remove' });
      expect(removeButton).toBeInTheDocument();
      expect(screen.getByTestId('icon-close')).toBeInTheDocument();
    });

    it('calls onRemove when remove button is clicked', async () => {
      const user = createUser();
      const handleRemove = vi.fn();
      
      render(
        <Badge removable onRemove={handleRemove}>
          Removable Badge
        </Badge>
      );
      
      const removeButton = screen.getByRole('button', { name: 'Remove' });
      await user.click(removeButton);
      
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('stops propagation on remove button click', async () => {
      const user = createUser();
      const handleRemove = vi.fn();
      const handleBadgeClick = vi.fn();
      
      render(
        <Badge 
          removable 
          onRemove={handleRemove} 
          interactive 
          onClick={handleBadgeClick}
        >
          Removable Interactive Badge
        </Badge>
      );
      
      const removeButton = screen.getByRole('button', { name: 'Remove' });
      await user.click(removeButton);
      
      expect(handleRemove).toHaveBeenCalledTimes(1);
      expect(handleBadgeClick).not.toHaveBeenCalled(); // Should not bubble up
    });

    it('does not render remove button when not removable', () => {
      render(<Badge>Not Removable</Badge>);
      
      const removeButton = screen.queryByRole('button', { name: 'Remove' });
      expect(removeButton).not.toBeInTheDocument();
    });

    it('handles keyboard interaction on remove button', async () => {
      const user = createUser();
      const handleRemove = vi.fn();
      
      render(
        <Badge removable onRemove={handleRemove}>
          Removable Badge
        </Badge>
      );
      
      const removeButton = screen.getByRole('button', { name: 'Remove' });
      
      // Tab to focus remove button
      await user.tab();
      await user.tab(); // Assuming badge itself might be focusable
      expect(removeButton).toHaveFocus();
      
      // Enter to trigger remove
      await user.keyboard('{Enter}');
      expect(handleRemove).toHaveBeenCalledTimes(1);
      
      // Space to trigger remove
      await user.keyboard(' ');
      expect(handleRemove).toHaveBeenCalledTimes(2);
    });
  });

  describe('BadgeUtils', () => {
    describe('getSportVariant', () => {
      it('returns correct sport variants', () => {
        expect(BadgeUtils.getSportVariant('tennis')).toBe('tennis');
        expect(BadgeUtils.getSportVariant('basketball')).toBe('basketball');
        expect(BadgeUtils.getSportVariant('football')).toBe('football');
        expect(BadgeUtils.getSportVariant('volleyball')).toBe('volleyball');
      });

      it('returns primary for unknown sports', () => {
        expect(BadgeUtils.getSportVariant('unknown')).toBe('primary');
        expect(BadgeUtils.getSportVariant('cricket')).toBe('primary');
      });
    });

    describe('getStatusVariant', () => {
      it('returns correct status variants', () => {
        expect(BadgeUtils.getStatusVariant('confirmed')).toBe('success');
        expect(BadgeUtils.getStatusVariant('active')).toBe('success');
        expect(BadgeUtils.getStatusVariant('pending')).toBe('warning');
        expect(BadgeUtils.getStatusVariant('cancelled')).toBe('danger');
        expect(BadgeUtils.getStatusVariant('inactive')).toBe('danger');
        expect(BadgeUtils.getStatusVariant('expired')).toBe('danger');
      });

      it('handles case insensitive status', () => {
        expect(BadgeUtils.getStatusVariant('CONFIRMED')).toBe('success');
        expect(BadgeUtils.getStatusVariant('Pending')).toBe('warning');
        expect(BadgeUtils.getStatusVariant('CANCELLED')).toBe('danger');
      });

      it('returns info for unknown status', () => {
        expect(BadgeUtils.getStatusVariant('unknown')).toBe('info');
        expect(BadgeUtils.getStatusVariant('processing')).toBe('info');
      });
    });

    describe('getMembershipVariant', () => {
      it('returns correct membership variants', () => {
        expect(BadgeUtils.getMembershipVariant('premium')).toBe('premium');
        expect(BadgeUtils.getMembershipVariant('pro')).toBe('primary');
        expect(BadgeUtils.getMembershipVariant('basic')).toBe('secondary');
        expect(BadgeUtils.getMembershipVariant('trial')).toBe('warning');
      });

      it('handles case insensitive membership', () => {
        expect(BadgeUtils.getMembershipVariant('PREMIUM')).toBe('premium');
        expect(BadgeUtils.getMembershipVariant('Pro')).toBe('primary');
        expect(BadgeUtils.getMembershipVariant('BASIC')).toBe('secondary');
      });

      it('returns outline for unknown membership', () => {
        expect(BadgeUtils.getMembershipVariant('unknown')).toBe('outline');
        expect(BadgeUtils.getMembershipVariant('custom')).toBe('outline');
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct role for remove button', () => {
      render(
        <Badge removable onRemove={() => {}}>
          Accessible Badge
        </Badge>
      );
      
      const removeButton = screen.getByRole('button', { name: 'Remove' });
      expect(removeButton).toHaveAttribute('type', 'button');
      expect(removeButton).toHaveAttribute('aria-label', 'Remove');
    });

    it('sets aria-hidden correctly on remove icon', () => {
      render(
        <Badge removable onRemove={() => {}}>
          Badge with Remove
        </Badge>
      );
      
      const closeIcon = screen.getByTestId('icon-close');
      expect(closeIcon).toHaveAttribute('aria-hidden', 'false');
    });

    it('provides accessible content structure', () => {
      render(
        <Badge startIcon="star" removable onRemove={() => {}}>
          Accessible Badge Content
        </Badge>
      );
      
      // Content should be wrapped in span for screen readers
      const content = screen.getByText('Accessible Badge Content');
      expect(content.tagName).toBe('SPAN');
      
      // Icons should be present
      expect(screen.getByTestId('icon-star')).toBeInTheDocument();
      expect(screen.getByTestId('icon-close')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty content with icons', () => {
      render(<Badge startIcon="star" endIcon="arrow-right" />);
      
      expect(screen.getByTestId('icon-star')).toBeInTheDocument();
      expect(screen.getByTestId('icon-arrow-right')).toBeInTheDocument();
    });

    it('handles only icon content', () => {
      render(<Badge startIcon="star" />);
      
      expect(screen.getByTestId('icon-star')).toBeInTheDocument();
    });

    it('handles removable without onRemove callback', async () => {
      const user = createUser();
      
      // Should not crash even without onRemove callback
      render(<Badge removable>No Callback</Badge>);
      
      const removeButton = screen.getByRole('button', { name: 'Remove' });
      
      // Should not throw error when clicked
      await user.click(removeButton);
      expect(removeButton).toBeInTheDocument();
    });

    it('handles complex content', () => {
      render(
        <Badge startIcon="star" removable onRemove={() => {}}>
          <span>Complex <strong>Content</strong></span>
        </Badge>
      );
      
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByTestId('icon-star')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
    });

    it('preserves additional props', () => {
      render(
        <Badge 
          data-testid="custom-badge" 
          title="Custom title"
          style={{ color: 'red' }}
        >
          Custom Props
        </Badge>
      );
      
      const badge = screen.getByTestId('custom-badge');
      expect(badge).toHaveAttribute('title', 'Custom title');
      expect(badge).toHaveStyle('color: red');
    });
  });

  describe('Integration with Real-World Usage', () => {
    it('works as sport badge', () => {
      const sport = 'tennis';
      const variant = BadgeUtils.getSportVariant(sport);
      
      render(<Badge variant={variant}>{sport.toUpperCase()}</Badge>);
      
      expect(screen.getByText('TENNIS')).toBeInTheDocument();
    });

    it('works as status badge', () => {
      const status = 'confirmed';
      const variant = BadgeUtils.getStatusVariant(status);
      
      render(<Badge variant={variant}>Booking {status}</Badge>);
      
      expect(screen.getByText('Booking confirmed')).toBeInTheDocument();
    });

    it('works as membership badge', () => {
      const membership = 'premium';
      const variant = BadgeUtils.getMembershipVariant(membership);
      
      render(
        <Badge variant={variant} startIcon="crown">
          {membership.toUpperCase()} Member
        </Badge>
      );
      
      expect(screen.getByText('PREMIUM Member')).toBeInTheDocument();
      expect(screen.getByTestId('icon-crown')).toBeInTheDocument();
    });

    it('works as removable tag', async () => {
      const user = createUser();
      const handleRemove = vi.fn();
      
      render(
        <Badge 
          variant="outline" 
          removable 
          onRemove={handleRemove}
          startIcon="tag"
        >
          Removable Tag
        </Badge>
      );
      
      expect(screen.getByText('Removable Tag')).toBeInTheDocument();
      expect(screen.getByTestId('icon-tag')).toBeInTheDocument();
      
      const removeButton = screen.getByRole('button', { name: 'Remove' });
      await user.click(removeButton);
      
      expect(handleRemove).toHaveBeenCalled();
    });
  });
});