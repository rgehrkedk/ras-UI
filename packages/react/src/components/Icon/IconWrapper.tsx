/**
 * Reusable icon wrapper component for consistent icon styling
 */

import React from 'react';

import type { IconWrapperProps } from '../../types';
import { cn } from '../../utils/cn';

import { iconWrapperRecipe } from './IconWrapper.css';

/**
 * Wrapper component for icons with consistent sizing and positioning
 * 
 * @example
 * ```tsx
 * <IconWrapper position="start" size="md">
 *   <SearchIcon />
 * </IconWrapper>
 * ```
 */
export const IconWrapper: React.FC<IconWrapperProps> = ({
  children,
  position,
  size = 'md',
  className,
}) => {
  return (
    <span
      className={cn(
        iconWrapperRecipe({ size, position }),
        className
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
};