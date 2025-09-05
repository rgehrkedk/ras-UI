/**
 * Navigation hooks for sidebar component using React Aria patterns
 */

// import { useRef } from 'react'; // Future use for focus management
import {
  useFocusRing,
  usePress,
  useFocusWithin,
  useKeyboard,
  mergeProps
} from 'react-aria';
import type { PressEvent } from 'react-aria';

export interface SidebarNavigationOptions {
  /** Whether the item is currently selected/active */
  isSelected?: boolean;
  /** Whether the item is disabled */
  isDisabled?: boolean;
  /** Handler for when item is pressed/clicked */
  onAction?: () => void;
  /** Optional href for navigation */
  href?: string;
  /** Whether to prevent default navigation behavior */
  preventNavigation?: boolean;
}

export interface SidebarNavigationResult {
  /** Props to spread on the navigation item element */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigationProps: any;
  /** Focus ring props for focus indication */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  focusRingProps: any;
  /** Whether focus ring is visible */
  isFocusVisible: boolean;
  /** Whether the item is currently pressed */
  isPressed: boolean;
}

/**
 * Provides navigation behavior for sidebar items with React Aria integration
 */
export function useSidebarNavigation(
  options: SidebarNavigationOptions
): SidebarNavigationResult {
  const {
    isSelected = false,
    isDisabled = false,
    onAction,
    href,
    preventNavigation = false
  } = options;

  // const ref = useRef<HTMLElement>(null); // Future use for focus management

  // Focus ring management
  const { focusProps, isFocusVisible } = useFocusRing();
  
  // Press interaction handling
  const { pressProps, isPressed } = usePress({
    isDisabled,
    onPress: (_e: PressEvent) => {
      if (onAction) {
        onAction();
      }
      
      // Handle navigation if href is provided and not prevented
      if (href && !preventNavigation) {
        // Allow default navigation behavior for anchor elements
        return;
      }
    }
  });

  // Keyboard navigation handling
  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      // Handle Enter and Space for activation
      if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
        e.preventDefault();
        if (onAction) {
          onAction();
        }
      }
    }
  });

  // Merge all props for the navigation element
  const navigationProps = mergeProps(
    focusProps,
    pressProps,
    keyboardProps,
    {
      role: href ? 'menuitem' : 'button',
      tabIndex: isDisabled ? -1 : 0,
      'aria-current': isSelected ? 'page' : undefined,
      'data-selected': isSelected,
      'data-disabled': isDisabled,
      'data-pressed': isPressed
    }
  );

  return {
    navigationProps,
    focusRingProps: focusProps,
    isFocusVisible,
    isPressed
  };
}

export interface SidebarGroupNavigationOptions {
  /** Accessible label for the navigation group */
  label?: string;
  /** ID for the group element */
  id?: string;
}

export interface SidebarGroupNavigationResult {
  /** Props to spread on the group container */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groupProps: any;
  /** Props for the group label element */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labelProps: any;
}

/**
 * Provides navigation group semantics for sidebar sections
 */
export function useSidebarGroupNavigation(
  options: SidebarGroupNavigationOptions = {}
): SidebarGroupNavigationResult {
  const { label, id } = options;
  const groupId = id || `sidebar-group-${Math.random().toString(36).substr(2, 9)}`;
  const labelId = `${groupId}-label`;

  const groupProps = {
    role: 'group',
    id: groupId,
    'aria-labelledby': label ? labelId : undefined
  };

  const labelProps = {
    id: labelId,
    'aria-hidden': false
  };

  return {
    groupProps,
    labelProps
  };
}

export interface SidebarFocusManagementOptions {
  /** Whether the sidebar is collapsed */
  isCollapsed?: boolean;
  /** Initial focus item index */
  defaultFocusedIndex?: number;
  /** Callback when focus moves between items */
  onFocusChange?: (index: number) => void;
}

export interface SidebarFocusManagementResult {
  /** Props for the focus scope container */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  focusScopeProps: any;
  /** Whether focus is within the sidebar */
  isFocusWithin: boolean;
}

/**
 * Manages focus behavior for the entire sidebar component
 */
export function useSidebarFocusManagement(
  options: SidebarFocusManagementOptions = {}
): SidebarFocusManagementResult {
  const { isCollapsed = false } = options;
  
  // Focus within detection
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: (isFocusWithin: boolean) => {
      // Handle focus entering/leaving sidebar
      if (!isFocusWithin) {
        // Focus left sidebar - could trigger auto-collapse in the future
      }
    }
  });

  const focusScopeProps = mergeProps(focusWithinProps, {
    role: 'navigation',
    'aria-label': 'Main navigation',
    'data-collapsed': isCollapsed
  });

  return {
    focusScopeProps,
    isFocusWithin: false // We'll manage this separately if needed
  };
}