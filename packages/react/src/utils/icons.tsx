/**
 * Icon utilities using Iconoir icon library
 */

import {
  Xmark,
  NavArrowDown,
  Check,
  WarningCircle,
  InfoCircle,
  XmarkCircle,
  Search,
  Heart,
  User,
  Home,
  Settings,
  Mail,
  Phone,
  Calendar,
  Clock,
  Download,
  Upload,
  Edit,
  Trash,
  Plus,
  Minus,
} from 'iconoir-react';
import React from 'react';

import type { DefaultIconName } from '../types';

// Iconoir icon components mapped to our naming convention
export const DefaultIcons: Record<DefaultIconName, React.FC> = {
  close: Xmark,
  'chevron-down': NavArrowDown,
  check: Check,
  'alert-circle': WarningCircle,
  info: InfoCircle,
  'x-circle': XmarkCircle,
  search: Search,
  heart: Heart,
  user: User,
  home: Home,
  settings: Settings,
  mail: Mail,
  phone: Phone,
  calendar: Calendar,
  clock: Clock,
  download: Download,
  upload: Upload,
  edit: Edit,
  trash: Trash,
  plus: Plus,
  minus: Minus,
};

/**
 * Get an icon component by name
 */
export function getIcon(name: DefaultIconName): React.FC {
  return DefaultIcons[name];
}

/**
 * Check if an icon name exists
 */
export function hasIcon(name: string): name is DefaultIconName {
  return name in DefaultIcons;
}