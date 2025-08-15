/**
 * Shared hook for managing component state logic
 */

import { useMemo } from 'react';

import type { ComponentState } from '../types';

export interface UseComponentStateProps {
  isDisabled?: boolean;
  isInvalid?: boolean;
  loading?: boolean;
  isRequired?: boolean;
}

export interface UseComponentStateReturn {
  /**
   * Current computed state of the component
   */
  state: ComponentState;
  
  /**
   * Whether the component can receive user interaction
   */
  isInteractive: boolean;
  
  /**
   * Computed disabled state (disabled OR loading)
   */
  computedDisabled: boolean;
  
  /**
   * Whether the component is in an error state
   */
  hasError: boolean;
  
  /**
   * ARIA attributes for the component state
   */
  ariaProps: {
    'aria-disabled'?: boolean;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
    'aria-busy'?: boolean;
  };
}

/**
 * Centralized hook for managing component state logic
 * 
 * @example
 * ```tsx
 * const { state, computedDisabled, ariaProps } = useComponentState({
 *   isDisabled,
 *   loading,
 *   isInvalid
 * });
 * 
 * return (
 *   <AriaButton 
 *     isDisabled={computedDisabled}
 *     {...ariaProps}
 *   >
 *     {children}
 *   </AriaButton>
 * );
 * ```
 */
export function useComponentState({
  isDisabled = false,
  isInvalid = false,
  loading = false,
  isRequired = false,
}: UseComponentStateProps): UseComponentStateReturn {
  const state = useMemo((): ComponentState => {
    if (loading) return 'loading';
    if (isInvalid) return 'error';
    if (isDisabled) return 'disabled';
    return 'default';
  }, [isDisabled, isInvalid, loading]);

  const computedDisabled = isDisabled || loading;
  const isInteractive = !computedDisabled;
  const hasError = isInvalid;

  const ariaProps = useMemo(() => ({
    'aria-disabled': computedDisabled || undefined,
    'aria-invalid': isInvalid || undefined,
    'aria-required': isRequired || undefined,
    'aria-busy': loading || undefined,
  }), [computedDisabled, isInvalid, isRequired, loading]);

  return {
    state,
    isInteractive,
    computedDisabled,
    hasError,
    ariaProps,
  };
}