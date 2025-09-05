/**
 * Link component tests
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { render, screen, createUser } from '../../test/test-utils';
import { Icon } from '../Icon';

import { Link } from './Link';

// Mock window location for external link tests
const mockLocation = {
  href: 'https://example.com',
  hostname: 'example.com',
} as Location;

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('Link', () => {
  it('renders with default props', () => {
    render(<Link href="/test">Test Link</Link>);
    
    const link = screen.getByRole('link', { name: 'Test Link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders different variants', () => {
    const { rerender } = render(<Link href="/test" variant="default">Default</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();

    rerender(<Link href="/test" variant="quiet">Quiet</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();

    rerender(<Link href="/test" variant="emphasized">Emphasized</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Link href="/test" size="sm">Small</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();

    rerender(<Link href="/test" size="md">Medium</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();

    rerender(<Link href="/test" size="lg">Large</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('handles press events for router integration', async () => {
    const user = createUser();
    const handlePress = vi.fn();
    
    render(<Link onPress={handlePress}>Router Link</Link>);
    
    const link = screen.getByRole('link');
    await user.click(link);
    
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', () => {
    render(<Link href="/test" isDisabled>Disabled Link</Link>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('data-disabled', 'true');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders with start and end icons', () => {
    render(
      <Link 
        href="/test" 
        startIcon={<Icon name="home" />} 
        endIcon={<Icon name="arrow-right" />}
      >
        Link with Icons
      </Link>
    );
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    
    // Icons are rendered with aria-hidden, so we check their presence in the DOM
    const icons = link.querySelectorAll('[aria-hidden="true"]');
    expect(icons).toHaveLength(2); // Start icon + end icon
  });

  describe('External Link Detection', () => {
    it('detects external URLs and adds target="_blank"', () => {
      render(<Link href="https://external-site.com">External Link</Link>);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('detects external URLs without protocol and adds target="_blank"', () => {
      render(<Link href="external-site.com">External Link</Link>);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('treats relative URLs as internal', () => {
      render(<Link href="/internal-page">Internal Link</Link>);
      
      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    });

    it('treats same-domain URLs as internal', () => {
      render(<Link href="https://example.com/page">Same Domain Link</Link>);
      
      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    });

    it('shows external link indicator for external URLs', () => {
      render(<Link href="https://external-site.com">External Link</Link>);
      
      const link = screen.getByRole('link');
      // External icon is added as end icon with aria-hidden
      const icons = link.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('does not show external indicator when showExternalIndicator is false', () => {
      render(
        <Link href="https://external-site.com" showExternalIndicator={false}>
          External Link
        </Link>
      );
      
      const link = screen.getByRole('link');
      // Should not have auto-added external icon
      const icons = link.querySelectorAll('[aria-hidden="true"]');
      expect(icons).toHaveLength(0);
    });

    it('does not show external indicator when endIcon is provided', () => {
      render(
        <Link href="https://external-site.com" endIcon={<Icon name="arrow-right" />}>
          External Link with Custom Icon
        </Link>
      );
      
      const link = screen.getByRole('link');
      // Should only have the custom end icon, not the external icon
      const icons = link.querySelectorAll('[aria-hidden="true"]');
      expect(icons).toHaveLength(1);
    });

    it('allows custom external icon', () => {
      render(
        <Link 
          href="https://external-site.com" 
          externalIcon={<Icon name="arrow-right" />}
        >
          External Link
        </Link>
      );
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      
      // Custom external icon should be present
      const icons = link.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('enhances aria-label for external links', () => {
      render(<Link href="https://external-site.com">Visit External Site</Link>);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('aria-label', 'Visit External Site (opens in new tab)');
    });

    it('respects custom aria-label over auto-enhancement', () => {
      render(
        <Link href="https://external-site.com" aria-label="Custom label">
          External Link
        </Link>
      );
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('Accessibility', () => {
    it('maintains proper link semantics', () => {
      render(<Link href="/test">Accessible Link</Link>);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/test');
      expect(link.tagName).toBe('A');
    });

    it('renders as span with role="link" when no href', () => {
      render(<Link onPress={() => {}}>Router Link</Link>);
      
      const link = screen.getByRole('link');
      expect(link.tagName).toBe('SPAN');
      expect(link).toHaveAttribute('role', 'link');
    });

    it('supports keyboard navigation', async () => {
      const user = createUser();
      const handlePress = vi.fn();
      
      render(<Link onPress={handlePress}>Keyboard Link</Link>);
      
      const link = screen.getByRole('link');
      
      // Focus and press Enter
      link.focus();
      await user.keyboard('{Enter}');
      
      expect(handlePress).toHaveBeenCalledTimes(1);
    });

    it('provides proper focus indicators', () => {
      render(<Link href="/test">Focus Test</Link>);
      
      const link = screen.getByRole('link');
      link.focus();
      
      expect(link).toHaveFocus();
    });
  });

  describe('Full Width Layout', () => {
    it('applies full width styles when specified', () => {
      render(<Link href="/test" fullWidth>Full Width Link</Link>);
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty href gracefully', () => {
      render(<Link href="">Empty Href</Link>);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '');
    });

    it('handles malformed URLs gracefully', () => {
      render(<Link href="not-a-valid-url">Invalid URL</Link>);
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'not-a-valid-url');
    });

    it('works in SSR environment without window', () => {
      const originalWindow = global.window;
      delete (global as any).window;
      
      expect(() => {
        render(<Link href="https://external-site.com">SSR Link</Link>);
      }).not.toThrow();
      
      global.window = originalWindow;
    });
  });
});