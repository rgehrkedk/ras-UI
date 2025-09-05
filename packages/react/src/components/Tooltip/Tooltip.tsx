import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../utils/cn';

import * as styles from './Tooltip.css';

export interface TooltipProps {
  /** The tooltip content */
  children: React.ReactNode;
  /** The element that triggers the tooltip */
  trigger: React.ReactElement;
  /** Tooltip placement relative to trigger */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Custom CSS class */
  className?: string;
  /** Whether tooltip is disabled */
  disabled?: boolean;
}

export function Tooltip({
  children,
  trigger,
  placement = 'top',
  delay = 100,
  className,
  disabled = false
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    const id = setTimeout(() => {
      // Calculate tooltip position relative to viewport
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const offset = 12;
        
        let top = 0;
        let left = 0;
        
        switch (placement) {
          case 'top':
            top = rect.top - offset;
            left = rect.left + rect.width / 2;
            break;
          case 'bottom':
            top = rect.bottom + offset;
            left = rect.left + rect.width / 2;
            break;
          case 'left':
            top = rect.top + rect.height / 2;
            left = rect.left - offset;
            break;
          case 'right':
            top = rect.top + rect.height / 2;
            left = rect.right + offset;
            break;
        }
        
        setTooltipPosition({ top, left });
      }
      
      setIsVisible(true);
    }, delay);
    
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const tooltipContent = isVisible && (
    <div 
      className={cn(styles.tooltip, className)}
      role="tooltip"
      style={{
        position: 'fixed',
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        transform: placement === 'top' || placement === 'bottom' 
          ? 'translateX(-50%)' 
          : placement === 'left' 
            ? 'translateX(-100%) translateY(-50%)' 
            : 'translateY(-50%)',
        zIndex: 1000,
      }}
    >
      {children}
      <div className={cn(styles.arrow, styles.arrowPlacement[placement])} />
    </div>
  );

  return (
    <div className={styles.tooltipContainer} ref={triggerRef}>
      {React.cloneElement(trigger, {
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
        onFocus: showTooltip,
        onBlur: hideTooltip,
      })}
      {tooltipContent && createPortal(tooltipContent, document.body)}
    </div>
  );
}
