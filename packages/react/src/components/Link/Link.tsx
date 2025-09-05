/**
 * Link component built on React Aria Components
 * Provides accessible link functionality with external link detection and multiple variants
 */

import React from 'react';
import { Link as AriaLink, LinkProps as AriaLinkProps } from 'react-aria-components';

import type { 
  SizedLayoutComponentProps, 
  DisableableComponentProps,
  WithIcons,
  LinkVariant 
} from '../../types';
import { cn } from '../../utils/cn';
import { IconWrapper } from '../Icon';
import { Icon } from '../Icon';

import { link, linkIcon } from './Link.css';

export interface LinkProps 
  extends Omit<AriaLinkProps, 'className' | 'children'>,
          SizedLayoutComponentProps,
          DisableableComponentProps,
          WithIcons {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: LinkVariant;
  
  /**
   * Link content
   */
  children?: React.ReactNode;
  
  /**
   * Whether to show external link indicator for external URLs
   * @default true
   */
  showExternalIndicator?: boolean;
  
  /**
   * Custom external link icon (overrides default)
   */
  externalIcon?: React.ReactNode;
}

/**
 * Determines if a URL is external (different domain)
 */
function isExternalUrl(url: string): boolean {
  try {
    // Handle relative URLs
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
      return false;
    }
    
    // Handle absolute URLs without protocol
    if (url.startsWith('//')) {
      return true;
    }
    
    // Handle protocol-less URLs that look like domains
    if (!url.includes('://') && (url.includes('.') && !url.startsWith('.'))) {
      return true;
    }
    
    // Handle full URLs with protocols
    if (url.includes('://')) {
      const linkUrl = new URL(url);
      const currentUrl = typeof window !== 'undefined' ? new URL(window.location.href) : null;
      
      // If we can't determine current URL (SSR), assume external
      if (!currentUrl) {
        return true;
      }
      
      return linkUrl.hostname !== currentUrl.hostname;
    }
    
    return false;
  } catch {
    // If URL parsing fails, assume it's not external
    return false;
  }
}

/**
 * Accessible link component with multiple variants and external link detection.
 * Built on React Aria Components for robust accessibility.
 * 
 * @example
 * ```tsx
 * <Link href="/internal-page" variant="default">
 *   Internal Link
 * </Link>
 * 
 * <Link href="https://example.com" variant="emphasized">
 *   External Link (shows indicator automatically)
 * </Link>
 * 
 * <Link href="/page" variant="quiet" startIcon={<Icon name="home" />}>
 *   Link with Icon
 * </Link>
 * 
 * <Link onPress={() => navigate('/route')} variant="default">
 *   Router Link
 * </Link>
 * ```
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'default',
      size = 'md',
      fullWidth = false,
      startIcon,
      endIcon,
      showExternalIndicator = true,
      externalIcon,
      className,
      children,
      isDisabled,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    // Determine if this is an external link
    const isExternal = href ? isExternalUrl(href) : false;
    
    // Auto-configure external link attributes
    const computedTarget = isExternal ? target || '_blank' : target;
    const computedRel = isExternal 
      ? rel || 'noopener noreferrer'
      : rel;
    
    // Determine if we should show external indicator
    const shouldShowExternalIndicator = 
      showExternalIndicator && 
      isExternal && 
      !endIcon; // Don't show if there's already an end icon
    
    // Compute final end icon
    const finalEndIcon = shouldShowExternalIndicator 
      ? (externalIcon || <Icon name="external-link" />)
      : endIcon;

    // Accessibility warnings
    if (isExternal && !computedRel?.includes('noopener')) {
      console.warn(
        'Link: External links should include "noopener" in rel attribute for security'
      );
    }

    if (isExternal && shouldShowExternalIndicator && !props['aria-label'] && typeof children === 'string') {
      // Auto-enhance aria-label for external links
      const enhancedLabel = `${children} (opens in new tab)`;
      props['aria-label'] = enhancedLabel;
    }

    return (
      <AriaLink
        ref={ref}
        className={cn(
          link({
            variant,
            size,
            fullWidth,
            disabled: isDisabled,
          }),
          className
        )}
        isDisabled={isDisabled}
        href={href}
        target={computedTarget}
        rel={computedRel}
        {...props}
      >
        {startIcon && (
          <IconWrapper position="start" size={size} className={linkIcon}>
            {startIcon}
          </IconWrapper>
        )}
        
        {children && <span>{children}</span>}
        
        {finalEndIcon && (
          <IconWrapper position="end" size={size} className={linkIcon}>
            {finalEndIcon}
          </IconWrapper>
        )}
      </AriaLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;