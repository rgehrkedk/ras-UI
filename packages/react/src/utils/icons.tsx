/**
 * Icon utilities using Iconoir icon library
 */

import {
  Xmark,
  NavArrowDown,
  NavArrowRight,
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
  FloppyDisk,
  Plus,
  Minus,
  Group,
  GraphUp,
  Page,
  HelpCircle,
  Menu,
  ArrowLeft,
  ArrowRight,
  Dashboard,
  Folder,
  BookmarkBook,
  Bell,
  ChatBubble,
  Star,
  LayoutLeft,
  ViewGrid,
  List,
  Eye,
  Lock,
  LockSlash,
  Code,
  Terminal,
  Copy,
  LogOut,
  OpenNewWindow,
  Hashtag,
} from 'iconoir-react';
import React from 'react';

import type { DefaultIconName } from '../types';

// Fallback outline icon (simple square outline) for 'outline' name
const OutlineIcon: React.FC = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

// Iconoir icon components mapped to our naming convention
export const DefaultIcons: Record<DefaultIconName, React.FC> = {
  close: Xmark,
  'chevron-down': NavArrowDown,
  'chevron-right': NavArrowRight,
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
  save: FloppyDisk,
  plus: Plus,
  minus: Minus,
  users: Group,
  chart: GraphUp,
  document: Page,
  help: HelpCircle,
  menu: Menu,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  dashboard: Dashboard,
  folder: Folder,
  bookmark: BookmarkBook,
  bell: Bell,
  message: ChatBubble,
  star: Star,
  layout: LayoutLeft,
  grid: ViewGrid,
  list: List,
  eye: Eye,
  lock: Lock,
  unlock: LockSlash,
  code: Code,
  terminal: Terminal,
  copy: Copy,
  logout: LogOut,
  'external-link': OpenNewWindow,
  crown: Star,
  tag: Hashtag,
  outline: OutlineIcon,
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
