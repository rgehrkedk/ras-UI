/**
 * @vitest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, test, expect, vi } from 'vitest';

import { Breadcrumbs, type BreadcrumbItemData } from './Breadcrumbs';

const mockItems: BreadcrumbItemData[] = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Products', href: '/products' },
  { id: '3', label: 'Electronics', href: '/products/electronics' },
  { id: '4', label: 'Smartphones' }, // Current page - no href
];

const manyItems: BreadcrumbItemData[] = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Category', href: '/category' },
  { id: '3', label: 'Subcategory', href: '/category/sub' },
  { id: '4', label: 'Product Type', href: '/category/sub/type' },
  { id: '5', label: 'Brand', href: '/category/sub/type/brand' },
  { id: '6', label: 'Current Product' }, // Current page
];

describe('Breadcrumbs', () => {
  describe('Basic Functionality', () => {
    test('renders breadcrumb navigation with correct structure', () => {
      render(<Breadcrumbs items={mockItems} />);
      
      // Check navigation landmark exists
      const nav = screen.getByRole('navigation', { name: /breadcrumb navigation/i });
      expect(nav).toBeInTheDocument();
      
      // Check list structure
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      // Check all links are rendered (excluding current page)
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3); // First 3 items are links
      
      // Check current page is marked correctly
      const currentPage = screen.getByText('Smartphones');
      expect(currentPage).toHaveAttribute('aria-current', 'page');
      expect(currentPage.tagName).toBe('SPAN'); // Not a link
    });

    test('renders all breadcrumb items with correct text', () => {
      render(<Breadcrumbs items={mockItems} />);
      
      mockItems.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });

    test('handles empty items array gracefully', () => {
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(<Breadcrumbs items={[]} />);
      
      expect(consoleWarn).toHaveBeenCalledWith(
        'Breadcrumbs: items prop is required and must contain at least one item'
      );
      
      // Should render nothing
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      
      consoleWarn.mockRestore();
    });
  });

  describe('Auto-collapse Functionality', () => {
    test('shows all items when count is within maxItems limit', () => {
      render(<Breadcrumbs items={mockItems} maxItems={5} />);
      
      // Should show all 4 items
      mockItems.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
      
      // Should not show ellipsis menu
      expect(screen.queryByLabelText(/show more breadcrumbs/i)).not.toBeInTheDocument();
    });

    test('collapses items when maxItems is exceeded', () => {
      render(<Breadcrumbs items={manyItems} maxItems={3} />);
      
      // Should show first item
      expect(screen.getByText('Home')).toBeInTheDocument();
      
      // Should show ellipsis menu
      expect(screen.getByLabelText(/show more breadcrumbs/i)).toBeInTheDocument();
      
      // Should show last 2 items (maxItems - 1)
      expect(screen.getByText('Brand')).toBeInTheDocument();
      expect(screen.getByText('Current Product')).toBeInTheDocument();
      
      // Should not show collapsed items
      expect(screen.queryByText('Category')).not.toBeInTheDocument();
      expect(screen.queryByText('Subcategory')).not.toBeInTheDocument();
      expect(screen.queryByText('Product Type')).not.toBeInTheDocument();
    });

    test('ellipsis menu shows collapsed items when clicked', async () => {
      render(<Breadcrumbs items={manyItems} maxItems={3} />);
      
      const ellipsisButton = screen.getByLabelText(/show more breadcrumbs/i);
      fireEvent.click(ellipsisButton);
      
      // Wait for menu to appear
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });
      
      // Check collapsed items are in the menu
      expect(screen.getByRole('menuitem', { name: 'Category' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Subcategory' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Product Type' })).toBeInTheDocument();
    });
  });

  describe('Navigation Behavior', () => {
    test('calls href navigation for breadcrumb links', () => {
      render(<Breadcrumbs items={mockItems} />);
      
      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).toHaveAttribute('href', '/');
      
      const productsLink = screen.getByRole('link', { name: 'Products' });
      expect(productsLink).toHaveAttribute('href', '/products');
    });

    test('calls onPress handlers when provided', () => {
      const onPressMock = vi.fn();
      const itemsWithPress = mockItems.map((item) => ({
        ...item,
        onPress: item.href ? onPressMock : undefined,
      }));
      
      render(<Breadcrumbs items={itemsWithPress} />);
      
      const homeLink = screen.getByRole('link', { name: 'Home' });
      fireEvent.click(homeLink);
      
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Size Variants', () => {
    test('applies correct size classes', () => {
      const { container } = render(<Breadcrumbs items={mockItems} size="lg" />);
      
      // Check that size variant is applied
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass(expect.stringContaining('lg'));
    });

    test('renders different sizes correctly', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      
      sizes.forEach((size) => {
        const { container } = render(<Breadcrumbs items={mockItems} size={size} />);
        const nav = container.querySelector('nav');
        expect(nav).toHaveClass(expect.stringContaining(size));
      });
    });
  });

  describe('Custom Separators', () => {
    test('renders default chevron-right separator', () => {
      const { container } = render(<Breadcrumbs items={mockItems} />);
      
      // Should have separators (one less than items, excluding current page)
      const separators = container.querySelectorAll('[aria-hidden="true"]');
      expect(separators.length).toBeGreaterThan(0);
    });

    test('renders slash separator when specified', () => {
      render(<Breadcrumbs items={mockItems} separator="slash" />);
      
      // Check that slash separators are rendered
      expect(screen.getAllByText('/')).toBeTruthy();
    });

    test('can hide separators', () => {
      const { container } = render(
        <Breadcrumbs items={mockItems} showSeparators={false} />
      );
      
      // Should not have separator elements
      const separators = container.querySelectorAll('[aria-hidden="true"]');
      expect(separators).toHaveLength(0);
    });

    test('renders custom separator element', () => {
      const customSeparator = <span data-testid="custom-separator">→</span>;
      
      render(<Breadcrumbs items={mockItems} separator={customSeparator} />);
      
      const separators = screen.getAllByTestId('custom-separator');
      expect(separators.length).toBeGreaterThan(0);
    });
  });

  describe('Disabled State', () => {
    test('disables specific breadcrumb items', () => {
      const itemsWithDisabled = mockItems.map((item, index) => ({
        ...item,
        isDisabled: index === 1, // Disable "Products"
      }));
      
      render(<Breadcrumbs items={itemsWithDisabled} />);
      
      const productsLink = screen.getByRole('link', { name: 'Products' });
      expect(productsLink).toHaveAttribute('data-disabled', 'true');
    });
  });

  describe('Custom Props', () => {
    test('accepts custom aria-label', () => {
      render(
        <Breadcrumbs 
          items={mockItems} 
          aria-label="Custom navigation breadcrumb" 
        />
      );
      
      expect(
        screen.getByRole('navigation', { name: /custom navigation breadcrumb/i })
      ).toBeInTheDocument();
    });

    test('accepts custom className', () => {
      const { container } = render(
        <Breadcrumbs items={mockItems} className="custom-breadcrumbs" />
      );
      
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('custom-breadcrumbs');
    });
  });

  describe('Responsive Behavior', () => {
    test('applies text overflow classes for long labels', () => {
      const longLabelItems = [
        { id: '1', label: 'Very Long Category Name That Should Truncate', href: '/' },
        { id: '2', label: 'Another Super Long Breadcrumb Label' },
      ];
      
      const { container } = render(<Breadcrumbs items={longLabelItems} />);
      
      const links = container.querySelectorAll('a, span[aria-current]');
      links.forEach((link) => {
        const styles = window.getComputedStyle(link);
        // These CSS properties are applied in our styles
        expect(link).toHaveStyle('text-overflow: ellipsis');
      });
    });
  });

  describe('Accessibility', () => {
    test('provides proper ARIA attributes', () => {
      render(<Breadcrumbs items={mockItems} />);
      
      // Navigation landmark
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb navigation');
      
      // Current page marker
      const currentPage = screen.getByText('Smartphones');
      expect(currentPage).toHaveAttribute('aria-current', 'page');
      
      // Separators are hidden from screen readers
      const { container } = render(<Breadcrumbs items={mockItems} />);
      const separators = container.querySelectorAll('[aria-hidden="true"]');
      separators.forEach((separator) => {
        expect(separator).toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('ellipsis button has proper accessibility attributes', () => {
      render(<Breadcrumbs items={manyItems} maxItems={3} />);
      
      const ellipsisButton = screen.getByLabelText(/show more breadcrumbs/i);
      expect(ellipsisButton).toHaveAttribute('aria-label', 'Show more breadcrumbs');
      expect(ellipsisButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Edge Cases', () => {
    test('handles single item breadcrumb', () => {
      const singleItem = [{ id: '1', label: 'Single Page' }];
      
      render(<Breadcrumbs items={singleItem} />);
      
      expect(screen.getByText('Single Page')).toBeInTheDocument();
      expect(screen.getByText('Single Page')).toHaveAttribute('aria-current', 'page');
      
      // No separators should be present
      expect(screen.queryAllByText('/')).toHaveLength(0);
    });

    test('handles maxItems of 1', () => {
      render(<Breadcrumbs items={manyItems} maxItems={1} />);
      
      // Should only show current page
      expect(screen.getByText('Current Product')).toBeInTheDocument();
      expect(screen.getByText('Current Product')).toHaveAttribute('aria-current', 'page');
      
      // Should show ellipsis for all other items
      expect(screen.getByLabelText(/show more breadcrumbs/i)).toBeInTheDocument();
    });

    test('handles items without href or onPress', () => {
      const itemsWithoutNavigation = [
        { id: '1', label: 'Static Item' },
        { id: '2', label: 'Current Page' },
      ];
      
      render(<Breadcrumbs items={itemsWithoutNavigation} />);
      
      // Both items should be rendered, last one as current page
      expect(screen.getByText('Static Item')).toBeInTheDocument();
      expect(screen.getByText('Current Page')).toHaveAttribute('aria-current', 'page');
    });
  });
});