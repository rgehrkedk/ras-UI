/**
 * Dialog component tests
 */

import { describe, it, expect, vi } from 'vitest';

import { render, screen, createUser, waitFor } from '../../test/test-utils';
import { Button } from '../Button';

import { Dialog, DialogTrigger, AlertDialog } from './Dialog';

describe('Dialog', () => {
  it('renders dialog content', () => {
    render(
      <DialogTrigger isOpen={true}>
        <Dialog title="Test Dialog">
          <p>Dialog content</p>
        </Dialog>
      </DialogTrigger>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('renders without title', () => {
    render(
      <DialogTrigger isOpen={true}>
        <Dialog showCloseButton={false}>
          <p>Dialog without title</p>
        </Dialog>
      </DialogTrigger>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog without title')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <DialogTrigger isOpen={true}>
        <Dialog 
          title="Test Dialog" 
          description="This is a test dialog"
        >
          <p>Content</p>
        </Dialog>
      </DialogTrigger>
    );

    expect(screen.getByText('This is a test dialog')).toBeInTheDocument();
  });

  it('renders close button by default', () => {
    render(
      <DialogTrigger isOpen={true}>
        <Dialog title="Test Dialog">
          <p>Content</p>
        </Dialog>
      </DialogTrigger>
    );

    const closeButton = screen.getByRole('button', { name: 'Close dialog' });
    expect(closeButton).toBeInTheDocument();
  });

  it('can hide close button', () => {
    render(
      <DialogTrigger isOpen={true}>
        <Dialog title="Test Dialog" showCloseButton={false}>
          <p>Content</p>
        </Dialog>
      </DialogTrigger>
    );

    const closeButton = screen.queryByRole('button', { name: 'Close dialog' });
    expect(closeButton).not.toBeInTheDocument();
  });

  it('renders footer content', () => {
    render(
      <DialogTrigger isOpen={true}>
        <Dialog 
          title="Test Dialog"
          footer={
            <Button variant="primary">Save</Button>
          }
        >
          <p>Content</p>
        </Dialog>
      </DialogTrigger>
    );

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('handles close button click', async () => {
    const user = createUser();
    const handleClose = vi.fn();
    
    render(
      <DialogTrigger isOpen={true} onOpenChange={handleClose}>
        <Dialog title="Test Dialog" onClose={handleClose}>
          <p>Content</p>
        </Dialog>
      </DialogTrigger>
    );

    const closeButton = screen.getByRole('button', { name: 'Close dialog' });
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledWith(false);
  });

  it('renders different sizes', () => {
    const { rerender } = render(
      <DialogTrigger isOpen={true}>
        <Dialog title="Small Dialog" size="sm">
          <p>Small content</p>
        </Dialog>
      </DialogTrigger>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    rerender(
      <DialogTrigger isOpen={true}>
        <Dialog title="Large Dialog" size="lg">
          <p>Large content</p>
        </Dialog>
      </DialogTrigger>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <DialogTrigger isOpen={true}>
        <Dialog className="custom-dialog" title="Custom">
          <p>Content</p>
        </Dialog>
      </DialogTrigger>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('custom-dialog');
  });

  it('traps focus within dialog', async () => {
    const user = createUser();
    
    render(
      <DialogTrigger isOpen={true}>
        <Dialog 
          title="Focus Test"
          footer={<Button>Footer Button</Button>}
        >
          <Button>Content Button</Button>
        </Dialog>
      </DialogTrigger>
    );

    const closeButton = screen.getByRole('button', { name: 'Close dialog' });
    const contentButton = screen.getByRole('button', { name: 'Content Button' });
    const footerButton = screen.getByRole('button', { name: 'Footer Button' });

    // Tab through focusable elements
    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(contentButton).toHaveFocus();

    await user.tab();
    expect(footerButton).toHaveFocus();

    // Should wrap back to close button
    await user.tab();
    expect(closeButton).toHaveFocus();
  });

  it('handles escape key', async () => {
    const user = createUser();
    const handleClose = vi.fn();
    
    render(
      <DialogTrigger isOpen={true} onOpenChange={handleClose}>
        <Dialog title="Escape Test">
          <p>Press escape to close</p>
        </Dialog>
      </DialogTrigger>
    );

    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledWith(false);
  });

  it('renders default close icon', () => {
    render(
      <DialogTrigger isOpen={true}>
        <Dialog title="Default Icon">
          <p>Content</p>
        </Dialog>
      </DialogTrigger>
    );

    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });
});

describe('AlertDialog', () => {
  it('renders alert dialog with icon', () => {
    render(
      <DialogTrigger isOpen={true}>
        <AlertDialog 
          title="Warning" 
          description="This action cannot be undone"
          type="warning"
        />
      </DialogTrigger>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone')).toBeInTheDocument();
  });

  it('renders different alert types', () => {
    const { rerender } = render(
      <DialogTrigger isOpen={true}>
        <AlertDialog title="Info" type="info" />
      </DialogTrigger>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    rerender(
      <DialogTrigger isOpen={true}>
        <AlertDialog title="Error" type="error" />
      </DialogTrigger>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    rerender(
      <DialogTrigger isOpen={true}>
        <AlertDialog title="Success" type="success" />
      </DialogTrigger>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    const CustomIcon = () => <span data-testid="alert-icon">!</span>;
    
    render(
      <DialogTrigger isOpen={true}>
        <AlertDialog 
          title="Custom Icon" 
          icon={<CustomIcon />}
        />
      </DialogTrigger>
    );

    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
  });

  it('renders additional content', () => {
    render(
      <DialogTrigger isOpen={true}>
        <AlertDialog 
          title="Alert with Content" 
          description="Main description"
        >
          <p>Additional content</p>
        </AlertDialog>
      </DialogTrigger>
    );

    expect(screen.getByText('Main description')).toBeInTheDocument();
    expect(screen.getByText('Additional content')).toBeInTheDocument();
  });
});

describe('DialogTrigger', () => {
  it('opens dialog when trigger is clicked', async () => {
    const user = createUser();
    
    render(
      <DialogTrigger 
        trigger={<Button>Open Dialog</Button>}
      >
        <Dialog title="Triggered Dialog">
          <p>Content</p>
        </Dialog>
      </DialogTrigger>
    );

    // Dialog should not be visible initially
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Click trigger to open dialog
    const trigger = screen.getByRole('button', { name: 'Open Dialog' });
    await user.click(trigger);

    // Dialog should now be visible
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('supports controlled state', () => {
    const { rerender } = render(
      <DialogTrigger isOpen={false}>
        <Dialog title="Controlled Dialog">
          <p>Content</p>
        </Dialog>
      </DialogTrigger>
    );

    // Dialog should not be visible
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Change to open
    rerender(
      <DialogTrigger isOpen={true}>
        <Dialog title="Controlled Dialog">
          <p>Content</p>
        </Dialog>
      </DialogTrigger>
    );

    // Dialog should now be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onOpenChange when state changes', async () => {
    const user = createUser();
    const handleOpenChange = vi.fn();
    
    render(
      <DialogTrigger 
        isOpen={true} 
        onOpenChange={handleOpenChange}
      >
        <Dialog title="Change Test">
          <p>Content</p>
        </Dialog>
      </DialogTrigger>
    );

    const closeButton = screen.getByRole('button', { name: 'Close dialog' });
    await user.click(closeButton);

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});