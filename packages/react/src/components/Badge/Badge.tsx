/**
 * Badge component built with ras-UI design principles
 * Informed by sporty-book usage patterns - sports colors, status indicators, premium badges
 */

import React from 'react';

import type { ComponentSize, DefaultIconName } from '../../types';
import { cn } from '../../utils/cn';
import { Icon } from '../Icon';

import { badge, badgeIcon, removableBadge, removeButton } from './Badge.css';

// Badge variant types based on sporty-book usage patterns
export type BadgeVariant = 
  // Standard semantic variants
  | 'primary' 
  | 'secondary' 
  | 'outline'
  // Status variants (booking/membership status)
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info'
  // Sports/category variants (expand ras-UI with domain-specific colors)
  | 'tennis' 
  | 'basketball' 
  | 'football' 
  | 'volleyball'
  // Special purpose variants
  | 'premium'  // For gradient "Save up to X%" badges
  | 'glass';   // For overlay badges with glassmorphism

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual variant - semantic, status, or sport-specific
   * @default 'primary'
   */
  variant?: BadgeVariant;
  
  /**
   * Size of the badge
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Enable interactive states (hover, click)
   * @default false
   */
  interactive?: boolean;
  
  /**
   * Icon name to display at start of badge
   */
  startIcon?: DefaultIconName;
  
  /**
   * Icon name to display at end of badge
   */
  endIcon?: DefaultIconName;
  
  /**
   * Enable remove functionality with X button
   * @default false
   */
  removable?: boolean;
  
  /**
   * Callback when remove button is clicked
   */
  onRemove?: () => void;
  
  /**
   * Badge content
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Badge - Compact labels and status indicators
 * Expanded with domain-specific variants based on sporty-book requirements
 * 
 * @example
 * ```tsx
 * // Status badges
 * <Badge variant="success">Confirmed</Badge>
 * <Badge variant="warning">Pending</Badge>
 * 
 * // Sport badges (expanding ras-UI with domain knowledge)
 * <Badge variant="tennis">Tennis</Badge>
 * <Badge variant="basketball">Basketball</Badge>
 * 
 * // Premium badges
 * <Badge variant="premium">Save up to 17%</Badge>
 * 
 * // Interactive with icons
 * <Badge variant="outline" interactive startIcon="star" onRemove={handleRemove} removable>
 *   Removable Tag
 * </Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      interactive = false,
      startIcon,
      endIcon,
      removable = false,
      onRemove,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    // Handle remove button click
    const handleRemoveClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    };
    
    // Handle badge click
    const handleBadgeClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (interactive && onClick) {
        onClick(e);
      }
    };

    return (
      <span
        ref={ref}
        className={cn(
          badge({
            variant,
            size,
            interactive: interactive || !!onClick,
          }),
          className
        )}
        onClick={handleBadgeClick}
        role={interactive || onClick ? 'button' : undefined}
        tabIndex={interactive || onClick ? 0 : undefined}
        onKeyDown={(e) => {
          if (!(interactive || onClick)) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e as any);
          }
        }}
        {...props}
      >
        {startIcon && (
          <Icon name={startIcon} size="sm" />
        )}
        
        {children && <span>{children}</span>}
        
        {!removable && endIcon && (
          <Icon name={endIcon} size="sm" />
        )}
        
        {removable && (
          <button
            type="button"
            className={removeButton}
            onClick={handleRemoveClick}
            aria-label="Remove"
          >
            <Icon name="close" size="sm" aria-hidden={false} />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Utility functions for sporty-book migration
export const BadgeUtils = {
  /**
   * Convert sporty-book sport names to badge variants
   * Expanding ras-UI with domain-specific utilities
   */
  getSportVariant: (sport: string): BadgeVariant => {
    const sportMap: Record<string, BadgeVariant> = {
      tennis: 'tennis',
      basketball: 'basketball',
      football: 'football',
      volleyball: 'volleyball',
      // Future sports can be added as more variants
    };
    return sportMap[sport] || 'primary';
  },
  
  /**
   * Convert status strings to semantic variants
   */
  getStatusVariant: (status: string): BadgeVariant => {
    const statusMap: Record<string, BadgeVariant> = {
      confirmed: 'success',
      active: 'success',
      pending: 'warning',
      cancelled: 'danger',
      inactive: 'danger',
      expired: 'danger',
    };
    return statusMap[status.toLowerCase()] || 'info';
  },
  
  /**
   * Convert membership types to variants
   */
  getMembershipVariant: (type: string): BadgeVariant => {
    const typeMap: Record<string, BadgeVariant> = {
      premium: 'premium',
      pro: 'primary',
      basic: 'secondary',
      trial: 'warning',
    };
    return typeMap[type.toLowerCase()] || 'outline';
  },
};

export default Badge;
