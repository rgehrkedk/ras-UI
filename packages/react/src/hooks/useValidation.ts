/**
 * Hook for managing validation state and messages
 */

import { useMemo } from "react";

export interface UseValidationProps {
  isInvalid?: boolean;
  errorMessage?: string;
  helperText?: string;
}

export interface UseValidationReturn {
  /**
   * Whether there's currently an error to display
   */
  hasError: boolean;

  /**
   * Whether helper text should be shown
   */
  showHelper: boolean;

  /**
   * Error message to display (undefined if no error)
   */
  displayErrorMessage?: string;

  /**
   * Helper text to display (undefined if error is shown)
   */
  displayHelperText?: string;

  /**
   * Validation state for styling
   */
  validationState: "valid" | "invalid";
}

/**
 * Hook for managing validation messages and state
 *
 * @example
 * ```tsx
 * const { hasError, showHelper, displayErrorMessage, displayHelperText } = useValidation({
 *   isInvalid,
 *   errorMessage,
 *   helperText
 * });
 *
 * return (
 *   <>
 *     <input {...props} />
 *     {showHelper && <Text>{displayHelperText}</Text>}
 *     {hasError && <FieldError>{displayErrorMessage}</FieldError>}
 *   </>
 * );
 * ```
 */
export function useValidation({
  isInvalid = false,
  errorMessage,
  helperText,
}: UseValidationProps): UseValidationReturn {
  const hasError = useMemo(
    () => isInvalid && Boolean(errorMessage),
    [isInvalid, errorMessage],
  );

  const showHelper = useMemo(
    () => Boolean(helperText) && !hasError,
    [helperText, hasError],
  );

  return {
    hasError,
    showHelper,
    displayErrorMessage: hasError ? errorMessage : undefined,
    displayHelperText: showHelper ? helperText : undefined,
    validationState: isInvalid ? "invalid" : "valid",
  };
}
