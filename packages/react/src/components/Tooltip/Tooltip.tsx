/**
 * Tooltip component built on React Aria Components
 * Provides accessible tooltip functionality with floating UI design principles
 */

import React from 'react';
import { 
  Tooltip as AriaTooltip, 
  TooltipTrigger as AriaTooltipTrigger,
  OverlayArrow
} from 'react-aria-components';

import type { ComponentSize, ComponentChildren } from '../../types';

import { tooltip, tooltipArrow } from './Tooltip.css';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /**
   * The content to show in the tooltip
   */
  content: ComponentChildren;
  
  /**
   * Tooltip size
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Tooltip placement relative to trigger
   * @default 'top'
   */
  placement?: TooltipPlacement;
  
  /**
   * Delay before showing tooltip in milliseconds
   * @default 700
   */
  delay?: number;
  
  /**
   * Whether to show an arrow pointing to the trigger
   * @default true
   */
  showArrow?: boolean;
  
  /**
   * The trigger element that will show the tooltip on hover/focus
   */
  children: ComponentChildren;
  
  /**
   * Whether the tooltip is disabled
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Accessible tooltip component with floating UI design principles.
 * Shows additional information on hover or focus.
 * 
 * @example
 * ```tsx
 * <Tooltip content="This button saves your changes">
 *   <Button>Save</Button>
 * </Tooltip>
 * 
 * <Tooltip 
 *   content="View more details about this item" 
 *   placement="right"
 *   size="lg"
 * >
 *   <Icon name="info" />
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  size = 'md',
  placement = 'top',
  delay = 700,
  showArrow = true,
  children,
  isDisabled = false,
}) => {

    if (isDisabled) {
      return <>{children}</>;
    }

    return (
      <AriaTooltipTrigger delay={delay}>
        {children}
        <AriaTooltip
          className={tooltip({ size })}
          placement={placement}
          offset={8}
        >
          {({ placement: currentPlacement }) => (
            <>
              {content}
              {showArrow && (
                <OverlayArrow>
                  <div 
                    className={tooltipArrow} 
                    data-placement={currentPlacement}
                  />
                </OverlayArrow>
              )}
            </>
          )}
        </AriaTooltip>
      </AriaTooltipTrigger>
    );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;