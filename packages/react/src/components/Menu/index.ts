/**
 * Menu component exports
 */

// Explicit, guideline-aligned exports (no confusing aliasing)
export {
  MenuTriggerComponent, // composite trigger + popover + menu
  MenuTriggerButton,
  Menu,                 // raw Aria Menu content
  MenuItem,
  MenuSeparator,
  DynamicMenu,
  type MenuProps,
  type MenuTriggerComponentProps,
  type MenuItemProps,
  type MenuSeparatorProps,
  type MenuItemData,
  type MenuSectionData,
  type DynamicMenuProps,
} from './Menu';

// Backwards-compatible default export remains the composite trigger
export { MenuTriggerComponent as default } from './Menu';
