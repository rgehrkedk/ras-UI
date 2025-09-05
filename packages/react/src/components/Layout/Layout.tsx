import React from 'react';

import { cn } from '../../utils/cn';

import * as styles from './Layout.css';

// Root Layout Container
export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.layout, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Layout.displayName = 'Layout';

// Layout Header
export interface LayoutHeaderProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

export const LayoutHeader = React.forwardRef<HTMLElement, LayoutHeaderProps>(
  ({ children, className, sticky = true, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(styles.layoutHeader({ sticky }), className)}
        {...props}
      >
        {children}
      </header>
    );
  }
);

LayoutHeader.displayName = 'LayoutHeader';

// Layout Body (contains sidebar and main content)
export interface LayoutBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const LayoutBody = React.forwardRef<HTMLDivElement, LayoutBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.layoutBody, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LayoutBody.displayName = 'LayoutBody';

// Layout Main Content Area
export interface LayoutMainProps {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}

export const LayoutMain = React.forwardRef<HTMLElement, LayoutMainProps>(
  ({ children, className, padded = true, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(styles.layoutMain({ padded }), className)}
        {...props}
      >
        {children}
      </main>
    );
  }
);

LayoutMain.displayName = 'LayoutMain';

// Layout Content Container (for max-width constraint)
export interface LayoutContentProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const LayoutContent = React.forwardRef<HTMLDivElement, LayoutContentProps>(
  ({ children, className, maxWidth = 'xl', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.layoutContent({ maxWidth }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LayoutContent.displayName = 'LayoutContent';

// Layout Footer
export interface LayoutFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const LayoutFooter = React.forwardRef<HTMLElement, LayoutFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(styles.layoutFooter, className)}
        {...props}
      >
        {children}
      </footer>
    );
  }
);

LayoutFooter.displayName = 'LayoutFooter';