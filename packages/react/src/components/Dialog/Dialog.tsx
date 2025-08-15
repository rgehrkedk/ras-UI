/**
 * Dialog component built on React Aria Components
 * Provides accessible modal dialog functionality with floating UI design
 */

import React from 'react';
import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal,
  ModalOverlay,
  Heading,
  Button as AriaButton,
} from 'react-aria-components';
import type { DialogProps as AriaDialogProps } from 'react-aria-components';

import type { 
  BaseComponentProps, 
  ExtendedSize,
  AlertType,
  CloseHandler
} from '../../types';
import { cn } from '../../utils/cn';
import { DefaultIcons } from '../../utils/icons';

import {
  dialogOverlay,
  dialogHeader,
  dialogTitle,
  dialogCloseButton,
  dialogBody,
  dialogFooter,
  dialogDescription,
  alertDialogContainer,
  alertDialogIcon,
  alertDialogContent,
  dialogSizes,
} from './Dialog.css';

export interface DialogProps 
  extends Omit<AriaDialogProps, 'className' | 'children'>,
          BaseComponentProps {
  /**
   * Dialog title
   */
  title?: string;
  
  /**
   * Dialog description
   */
  description?: string;
  
  /**
   * Dialog size
   * @default 'md'
   */
  size?: ExtendedSize;
  
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Footer content (typically buttons)
   */
  footer?: React.ReactNode;
  
  /**
   * Handler for close button click
   */
  onClose?: CloseHandler;
  
  /**
   * Dialog content
   */
  children?: React.ReactNode;
}

export interface DialogTriggerWrapperProps {
  /**
   * Whether dialog is open (controlled)
   */
  isOpen?: boolean;
  
  /**
   * Handler for open state change (controlled)
   */
  onOpenChange?: (isOpen: boolean) => void;
  
  /**
   * Element that triggers the dialog
   */
  trigger?: React.ReactNode;
  
  /**
   * Dialog props
   */
  children: React.ReactElement<DialogProps>;
}

// Use default close icon from centralized icons
const CloseIcon = DefaultIcons.close;

/**
 * Accessible dialog component with floating UI design.
 * Built on React Aria Components for robust accessibility.
 * 
 * @example
 * ```tsx
 * <DialogTrigger>
 *   <Button>Open Dialog</Button>
 *   <Dialog 
 *     title="Confirm Action"
 *     description="Are you sure you want to continue?"
 *     footer={
 *       <>
 *         <Button variant="secondary">Cancel</Button>
 *         <Button variant="primary">Confirm</Button>
 *       </>
 *     }
 *   >
 *     Additional content goes here.
 *   </Dialog>
 * </DialogTrigger>
 * ```
 */
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      title,
      description,
      size = 'md',
      showCloseButton = true,
      className,
      children,
      footer,
      onClose,
      ...props
    },
    ref
  ) => {
    return (
      <AriaDialog
        ref={ref}
        className={cn(dialogSizes[size], className)}
        {...props}
      >
        {({ close }) => (
          <>
            {(title || showCloseButton) && (
              <div className={dialogHeader}>
                <div>
                  {title && (
                    <Heading className={dialogTitle} slot="title">
                      {title}
                    </Heading>
                  )}
                </div>
                
                {showCloseButton && (
                  <AriaButton
                    className={dialogCloseButton}
                    onPress={() => {
                      close();
                      onClose?.();
                    }}
                    aria-label="Close dialog"
                  >
                    <CloseIcon />
                  </AriaButton>
                )}
              </div>
            )}
            
            <div className={dialogBody}>
              {description && (
                <p className={dialogDescription}>{description}</p>
              )}
              {children}
            </div>
            
            {footer && (
              <div className={dialogFooter}>
                {footer}
              </div>
            )}
          </>
        )}
      </AriaDialog>
    );
  }
);

Dialog.displayName = 'Dialog';

/**
 * Dialog wrapper that provides trigger functionality
 */
export const DialogTrigger = ({ 
  isOpen, 
  onOpenChange, 
  trigger, 
  children 
}: DialogTriggerWrapperProps) => {
  if (isOpen !== undefined) {
    // Controlled mode
    return (
      <ModalOverlay
        className={dialogOverlay}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable
      >
        <Modal>
          {children}
        </Modal>
      </ModalOverlay>
    );
  }
  
  // Uncontrolled mode with trigger
  return (
    <AriaDialogTrigger>
      {trigger}
      <ModalOverlay className={dialogOverlay} isDismissable>
        <Modal>
          {children}
        </Modal>
      </ModalOverlay>
    </AriaDialogTrigger>
  );
};

/**
 * Alert dialog component for confirmations and alerts
 */
export interface AlertDialogProps extends Omit<DialogProps, 'size'> {
  /**
   * Alert type that determines icon and styling
   */
  type?: AlertType;
  
  /**
   * Custom icon to display
   */
  icon?: React.ReactNode;
}

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      type = 'info',
      icon,
      title,
      description,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const defaultIcons = {
      info: '🛈',
      warning: '⚠',
      error: '✕',
      success: '✓',
    };
    
    const displayIcon = icon || defaultIcons[type];
    
    return (
      <Dialog
        ref={ref}
        title={title}
        className={cn(alertDialogContainer, className)}
        {...props}
      >
        <div className={alertDialogContent}>
          {displayIcon && (
            <span className={alertDialogIcon} aria-hidden="true">
              {displayIcon}
            </span>
          )}
          <div>
            {description && (
              <p className={dialogDescription}>{description}</p>
            )}
            {children}
          </div>
        </div>
      </Dialog>
    );
  }
);

AlertDialog.displayName = 'AlertDialog';

export default Dialog;