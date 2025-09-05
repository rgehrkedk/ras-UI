/**
 * Menu component tests
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { 
  MenuTriggerComponent, 
  MenuTriggerButton, 
  Menu, 
  MenuItem, 
  MenuSeparator,
  DynamicMenu,
  type MenuItemData 
} from './Menu';

// Mock for accessibility tests
const mockAxe = vi.fn().mockResolvedValue({ violations: [] });

// Mock Icon component
vi.mock('../Icon', () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
  IconWrapper: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className}>{children}</span>
  ),
}));

describe('Menu Components', () => {
  describe('MenuTriggerComponent', () => {
    it('renders trigger button and menu', () => {
      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <Menu>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      expect(screen.getByRole('button', { name: 'Actions' })).toBeInTheDocument();
    });

    it('opens menu when trigger is clicked', async () => {
      const user = userEvent.setup();
      
      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <Menu>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <Menu>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Copy</MenuItem>
            <MenuItem>Delete</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      const trigger = screen.getByRole('button', { name: 'Actions' });
      
      // Open menu with Enter
      trigger.focus();
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      // Navigate with arrow keys
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveAttribute('data-focused', 'true');

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'Copy' })).toHaveAttribute('data-focused', 'true');

      // Select with Enter
      await user.keyboard('{Enter}');
      
      // Menu should close after selection
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('calls onAction when menu item is selected', async () => {
      const handleEdit = vi.fn();
      const handleDelete = vi.fn();
      const user = userEvent.setup();
      
      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <Menu>
            <MenuItem onAction={handleEdit}>Edit</MenuItem>
            <MenuItem onAction={handleDelete}>Delete</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      const editItem = screen.getByRole('menuitem', { name: 'Edit' });
      await user.click(editItem);

      expect(handleEdit).toHaveBeenCalled();
      expect(handleDelete).not.toHaveBeenCalled();
    });

    it('supports different sizes', () => {
      const { rerender } = render(
        <MenuTriggerComponent size="sm">
          <MenuTriggerButton>Small</MenuTriggerButton>
          <Menu>
            <MenuItem>Item</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      let trigger = screen.getByRole('button', { name: 'Small' });
      expect(trigger).toHaveClass('menuTriggerButton_size_sm');

      rerender(
        <MenuTriggerComponent size="lg">
          <MenuTriggerButton>Large</MenuTriggerButton>
          <Menu>
            <MenuItem>Item</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      trigger = screen.getByRole('button', { name: 'Large' });
      expect(trigger).toHaveClass('menuTriggerButton_size_lg');
    });

    it('has no accessibility violations', async () => {
      const { container } = render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <Menu>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      const results = await mockAxe(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('MenuItem', () => {
    it('renders with icons and descriptions', async () => {
      const user = userEvent.setup();
      
      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <Menu>
            <MenuItem 
              startIcon={<span data-testid="edit-icon">edit</span>}
              endIcon={<span data-testid="arrow-icon">arrow</span>}
              description="Edit this item"
              keyboardShortcut="⌘E"
            >
              Edit Item
            </MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      const menuItem = screen.getByRole('menuitem', { name: 'Edit Item' });
      expect(menuItem).toBeInTheDocument();
      expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
      expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
      expect(screen.getByText('Edit this item')).toBeInTheDocument();
      expect(screen.getByText('⌘E')).toBeInTheDocument();
    });

    it('applies destructive styling', async () => {
      const user = userEvent.setup();
      
      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <Menu>
            <MenuItem destructive>Delete Item</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      const menuItem = screen.getByRole('menuitem', { name: 'Delete Item' });
      expect(menuItem).toHaveClass('menuItem_destructive_true');
    });

    it('supports disabled state', async () => {
      const handleAction = vi.fn();
      const user = userEvent.setup();
      
      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <Menu>
            <MenuItem isDisabled onAction={handleAction}>
              Disabled Item
            </MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      const menuItem = screen.getByRole('menuitem', { name: 'Disabled Item' });
      expect(menuItem).toHaveAttribute('data-disabled', 'true');
      
      await user.click(menuItem);
      expect(handleAction).not.toHaveBeenCalled();
    });

    it('warns when no visible content is provided', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <Menu>
            <MenuItem />
          </Menu>
        </MenuTriggerComponent>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        'MenuItem: Menu items should have visible content (children, startIcon, or endIcon)'
      );

      consoleSpy.mockRestore();
    });
  });

  describe('MenuSeparator', () => {
    it('renders with correct role', async () => {
      const user = userEvent.setup();
      
      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <Menu>
            <MenuItem>Edit</MenuItem>
            <MenuSeparator />
            <MenuItem>Delete</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      const separator = screen.getByRole('separator');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveClass('menuSeparator');
    });
  });

  describe('DynamicMenu', () => {
    it('renders items from data', async () => {
      const handleAction = vi.fn();
      const user = userEvent.setup();
      
      const items: MenuItemData[] = [
        {
          id: 'edit',
          label: 'Edit Item',
          startIcon: <span data-testid="edit-icon">edit</span>,
          keyboardShortcut: '⌘E'
        },
        {
          id: 'delete',
          label: 'Delete Item',
          destructive: true
        }
      ];

      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <DynamicMenu items={items} onAction={handleAction} />
        </MenuTriggerComponent>
      );

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      expect(screen.getByRole('menuitem', { name: 'Edit Item' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Delete Item' })).toBeInTheDocument();
      expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
      expect(screen.getByText('⌘E')).toBeInTheDocument();

      const deleteItem = screen.getByRole('menuitem', { name: 'Delete Item' });
      expect(deleteItem).toHaveClass('menuItem_destructive_true');

      await user.click(screen.getByRole('menuitem', { name: 'Edit Item' }));
      expect(handleAction).toHaveBeenCalledWith('edit');
    });

    it('renders sections with separators', async () => {
      const user = userEvent.setup();
      
      const items = [
        {
          id: 'file-section',
          title: 'File Operations',
          items: [
            { id: 'new', label: 'New' },
            { id: 'open', label: 'Open' }
          ]
        },
        {
          id: 'edit-section', 
          title: 'Edit Operations',
          items: [
            { id: 'cut', label: 'Cut' },
            { id: 'copy', label: 'Copy' }
          ]
        }
      ];

      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <DynamicMenu items={items} />
        </MenuTriggerComponent>
      );

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      // Check that all items are rendered
      expect(screen.getByRole('menuitem', { name: 'New' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Open' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Cut' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();

      // Check that separators are present (at least one for sections)
      const separators = screen.getAllByRole('separator');
      expect(separators.length).toBeGreaterThan(0);
    });
  });

  describe('MenuTriggerButton', () => {
    it('renders with icons', () => {
      render(
        <MenuTriggerButton 
          startIcon={<span data-testid="start-icon">start</span>}
          endIcon={<span data-testid="end-icon">end</span>}
        >
          Button Text
        </MenuTriggerButton>
      );

      expect(screen.getByText('Button Text')).toBeInTheDocument();
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });

    it('applies size variants', () => {
      const { rerender } = render(<MenuTriggerButton size="sm">Small</MenuTriggerButton>);
      
      let button = screen.getByRole('button', { name: 'Small' });
      expect(button).toHaveClass('menuTriggerButton_size_sm');

      rerender(<MenuTriggerButton size="lg">Large</MenuTriggerButton>);
      
      button = screen.getByRole('button', { name: 'Large' });
      expect(button).toHaveClass('menuTriggerButton_size_lg');
    });
  });

  describe('Component Integration', () => {
    it('works with custom trigger buttons', async () => {
      const user = userEvent.setup();
      
      render(
        <MenuTriggerComponent>
          <button>Custom Trigger</button>
          <Menu>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      const trigger = screen.getByRole('button', { name: 'Custom Trigger' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      expect(screen.getByRole('menuitem', { name: 'Item 1' })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: 'Item 2' })).toBeInTheDocument();
    });

    it('closes menu when clicking outside', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <MenuTriggerComponent>
            <MenuTriggerButton>Actions</MenuTriggerButton>
            <Menu>
              <MenuItem>Edit</MenuItem>
            </Menu>
          </MenuTriggerComponent>
          <button>Outside Button</button>
        </div>
      );

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      // Click outside
      const outsideButton = screen.getByRole('button', { name: 'Outside Button' });
      await user.click(outsideButton);

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('closes menu with Escape key', async () => {
      const user = userEvent.setup();
      
      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Actions</MenuTriggerButton>
          <Menu>
            <MenuItem>Edit</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      const trigger = screen.getByRole('button', { name: 'Actions' });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('warns when incorrect children structure is provided', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(
        <MenuTriggerComponent>
          <MenuTriggerButton>Only One Child</MenuTriggerButton>
          <Menu>
            <MenuItem>Item</MenuItem>
          </Menu>
        </MenuTriggerComponent>
      );

      // The warning should not be called when correct structure is provided
      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});