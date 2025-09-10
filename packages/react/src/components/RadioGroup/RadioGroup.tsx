/**
 * RadioGroup component built on React Aria Components
 * Provides accessible radio group functionality with multiple orientations
 */

import React from "react";
import {
  RadioGroup as AriaRadioGroup,
  RadioGroupProps as AriaRadioGroupProps,
  Radio as AriaRadio,
  RadioProps,
} from "react-aria-components";

import { radioGroup, radio, radioIndicator } from "./RadioGroup.css";

export interface RadioGroupProps extends AriaRadioGroupProps {
  /**
   * Size variant
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Orientation of radio group
   * @default 'vertical'
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Radio group children
   */
  children?: React.ReactNode;
}

export interface RadioOptionProps extends RadioProps {
  /**
   * Size variant
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Radio option label/content
   */
  children?: React.ReactNode;
}

/**
 * Radio option component for use within RadioGroup
 */
export const RadioOption = React.forwardRef<HTMLLabelElement, RadioOptionProps>(
  ({ size = "md", children, className: _className, ...props }, ref) => {
    return (
      <AriaRadio ref={ref} className={radio({ size })} {...props}>
        {({ isSelected }) => (
          <>
            <div className={radioIndicator({ size })}>
              <svg viewBox="0 0 18 18" aria-hidden="true" fill="none">
                <circle
                  cx={9}
                  cy={9}
                  r={3}
                  fill="currentColor"
                  style={{
                    opacity: isSelected ? 1 : 0,
                  }}
                />
              </svg>
            </div>
            {children && <span>{children}</span>}
          </>
        )}
      </AriaRadio>
    );
  },
);

/**
 * Accessible radio group component with support for horizontal and vertical orientation.
 * Built on React Aria Components for robust accessibility and keyboard navigation.
 *
 * @example
 * ```tsx
 * <RadioGroup label="Select size" defaultValue="md">
 *   <RadioOption value="sm">Small</RadioOption>
 *   <RadioOption value="md">Medium</RadioOption>
 *   <RadioOption value="lg">Large</RadioOption>
 * </RadioGroup>
 * ```
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { size = "md", orientation = "vertical", children, className: _className, ...props },
    ref,
  ) => {
    return (
      <AriaRadioGroup
        ref={ref}
        className={radioGroup({
          size,
          orientation,
        })}
        {...props}
      >
        {children}
      </AriaRadioGroup>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
RadioOption.displayName = "RadioOption";

export default RadioGroup;
