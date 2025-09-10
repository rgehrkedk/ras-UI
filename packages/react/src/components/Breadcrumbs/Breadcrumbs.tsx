/**
 * Breadcrumbs component built on React Aria Components
 * Provides accessible navigation hierarchy with auto-collapse and custom separators
 */

import React, { useMemo } from "react";
import {
  Breadcrumbs as AriaBreadcrumbs,
  Breadcrumb as AriaBreadcrumb,
  Link,
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";

import type { ComponentSize, BaseComponentProps } from "../../types";
import { cn } from "../../utils/cn";
import { Icon } from "../Icon";

import {
  breadcrumbs,
  breadcrumbsList,
  breadcrumbItem,
  breadcrumbLink,
  breadcrumbCurrent,
  breadcrumbSeparator,
  breadcrumbEllipsis,
  breadcrumbEllipsisButton,
  breadcrumbEllipsisMenu,
} from "./Breadcrumbs.css";

export type BreadcrumbSeparator =
  | "chevron-right"
  | "arrow-right"
  | "slash"
  | React.ReactNode;

export interface BreadcrumbItemData {
  /**
   * Unique identifier for the breadcrumb item
   */
  id: string;

  /**
   * Display text for the breadcrumb
   */
  label: string;

  /**
   * Optional href for navigation
   */
  href?: string;

  /**
   * Optional onPress handler for programmatic navigation
   */
  onPress?: () => void;

  /**
   * Whether this item is disabled
   */
  isDisabled?: boolean;
}

export interface BreadcrumbsProps extends BaseComponentProps {
  /**
   * Array of breadcrumb items
   */
  items: BreadcrumbItemData[];

  /**
   * Component size variant
   * @default 'md'
   */
  size?: ComponentSize;

  /**
   * Maximum number of breadcrumb items to show before collapsing
   * When exceeded, shows first item + ellipsis + last N items
   * @default 3
   */
  maxItems?: number;

  /**
   * Separator element to display between breadcrumbs
   * @default 'chevron-right'
   */
  separator?: BreadcrumbSeparator;

  /**
   * Whether to show separators
   * @default true
   */
  showSeparators?: boolean;

  /**
   * Custom aria-label for the breadcrumb navigation
   * @default 'Breadcrumb navigation'
   */
  "aria-label"?: string;
}

/**
 * Breadcrumb separator component
 */
const BreadcrumbSeparatorEl: React.FC<{
  separator: BreadcrumbSeparator;
  size: ComponentSize;
}> = ({ separator, size }) => {
  const iconSize: ComponentSize = size;

  if (React.isValidElement(separator)) {
    return <span className={breadcrumbSeparator({ size })}>{separator}</span>;
  }

  if (separator === "slash") {
    return <span className={breadcrumbSeparator({ size })}>/</span>;
  }

  // Default to chevron-right or arrow-right icons
  return (
    <span className={breadcrumbSeparator({ size })}>
      <Icon
        name={separator as "chevron-right" | "arrow-right"}
        size={iconSize}
        aria-hidden={true}
      />
    </span>
  );
};

/**
 * Ellipsis menu component for collapsed breadcrumbs
 */
const BreadcrumbEllipsisMenu: React.FC<{
  items: BreadcrumbItemData[];
  size: ComponentSize;
}> = ({ items, size }) => {
  return (
    <MenuTrigger>
      <Button
        className={breadcrumbEllipsisButton({ size })}
        aria-label="Show more breadcrumbs"
      >
        <Icon name="menu" size={size} />
      </Button>
      <Popover>
        <Menu className={breadcrumbEllipsisMenu({ size })}>
          {items.map((item) => (
            <MenuItem
              key={item.id}
              href={item.href}
              onAction={item.onPress}
              isDisabled={item.isDisabled}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};

/**
 * Individual breadcrumb item component
 */
const BreadcrumbItem: React.FC<{
  item: BreadcrumbItemData;
  isLast: boolean;
  size: ComponentSize;
}> = ({ item, isLast, size }) => {
  if (isLast) {
    // Current page - not clickable
    return (
      <AriaBreadcrumb className={breadcrumbItem({ size })}>
        <span className={breadcrumbCurrent({ size })} aria-current="page">
          {item.label}
        </span>
      </AriaBreadcrumb>
    );
  }

  // Clickable breadcrumb
  return (
    <AriaBreadcrumb className={breadcrumbItem({ size })}>
      <Link
        className={breadcrumbLink({ size })}
        href={item.href}
        onPress={item.onPress}
        isDisabled={item.isDisabled}
      >
        {item.label}
      </Link>
    </AriaBreadcrumb>
  );
};

/**
 * Accessible breadcrumb navigation component with auto-collapse functionality.
 * Built on React Aria Components for robust accessibility and keyboard navigation.
 *
 * Features:
 * - Automatic aria-current marking for current page
 * - Auto-collapse with ellipsis menu when maxItems exceeded
 * - Customizable separators (chevron, arrow, slash, custom)
 * - Size variants (sm, md, lg)
 * - Router integration ready (href and onPress)
 * - Keyboard navigation support
 *
 * @example
 * ```tsx
 * const breadcrumbItems = [
 *   { id: '1', label: 'Home', href: '/' },
 *   { id: '2', label: 'Products', href: '/products' },
 *   { id: '3', label: 'Electronics', href: '/products/electronics' },
 *   { id: '4', label: 'Smartphones' }, // Current page
 * ];
 *
 * <Breadcrumbs items={breadcrumbItems} maxItems={3} />
 *
 * // With custom separator
 * <Breadcrumbs
 *   items={breadcrumbItems}
 *   separator="arrow-right"
 *   size="lg"
 * />
 *
 * // With programmatic navigation
 * <Breadcrumbs
 *   items={breadcrumbItems.map(item => ({
 *     ...item,
 *     onPress: () => navigate(item.href)
 *   }))}
 * />
 * ```
 */
export const Breadcrumbs = React.forwardRef<HTMLOListElement, BreadcrumbsProps>(
  (
    {
      items,
      size = "md",
      maxItems = 3,
      separator = "chevron-right",
      showSeparators = true,
      className,
      "aria-label": ariaLabel = "Breadcrumb navigation",
      ...props
    },
    ref,
  ) => {
    // Validate items array (do not return before hooks)
    const safeItems = items ?? [];

    // Calculate which items to show and which to collapse
    const { visibleItems, collapsedItems } = useMemo(() => {
      if (safeItems.length <= maxItems) {
        return { visibleItems: safeItems, collapsedItems: [] };
      }

      // Auto-collapse logic: show first item + ellipsis + last (maxItems - 1) items
      const numLastItems = Math.max(1, maxItems - 1); // Ensure at least current page shows
      const firstItem = safeItems[0];
      const lastItems = safeItems.slice(-numLastItems);
      const collapsedItems = safeItems.slice(1, -numLastItems);

      return {
        visibleItems: [firstItem, ...lastItems],
        collapsedItems,
      };
    }, [safeItems, maxItems]);

    if (safeItems.length === 0) {
      console.warn(
        "Breadcrumbs: items prop is required and must contain at least one item",
      );
      return null;
    }

    const shouldShowEllipsis = collapsedItems.length > 0;

    return (
      <AriaBreadcrumbs
        ref={ref}
        className={cn(breadcrumbs({ size }), className)}
        aria-label={ariaLabel}
        {...props}
      >
        <ol className={breadcrumbsList({ size })}>
          {visibleItems.map((item: BreadcrumbItemData, index: number) => {
            const isFirst = index === 0;
            const isLast = index === visibleItems.length - 1;
            const needsEllipsis = isFirst && shouldShowEllipsis && !isLast;

            return (
              <React.Fragment key={item.id}>
                <li>
                  <BreadcrumbItem item={item} isLast={isLast} size={size} />
                </li>

                {/* Show ellipsis menu after first item if needed */}
                {needsEllipsis && (
                  <>
                    {showSeparators && (
                      <li>
                        <BreadcrumbSeparatorEl
                          separator={separator}
                          size={size}
                        />
                      </li>
                    )}
                    <li>
                      <div className={breadcrumbEllipsis({ size })}>
                        <BreadcrumbEllipsisMenu
                          items={collapsedItems}
                          size={size}
                        />
                      </div>
                    </li>
                  </>
                )}

                {/* Show separator between items (but not after last item) */}
                {!isLast && showSeparators && !needsEllipsis && (
                  <li>
                    <BreadcrumbSeparatorEl separator={separator} size={size} />
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </AriaBreadcrumbs>
    );
  },
);

Breadcrumbs.displayName = "Breadcrumbs";

export default Breadcrumbs;
