import React from 'react';

import type { BaseComponentProps } from '../../../types';
import { cn } from '../../../utils/cn';

import * as styles from './SidebarSeparator.css';

export interface SidebarSeparatorProps extends BaseComponentProps {
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

export const SidebarSeparator = React.forwardRef<HTMLHRElement, SidebarSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        aria-orientation="horizontal"
        className={cn(styles.sidebarSeparator, className)}
        {...props}
      />
    );
  }
);

SidebarSeparator.displayName = 'SidebarSeparator';