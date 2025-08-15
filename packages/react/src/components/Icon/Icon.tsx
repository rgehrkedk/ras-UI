/**
 * Icon component that uses IconWrapper for consistent styling
 */

import React from 'react';

import type { IconProps } from '../../types';
import { getIcon, hasIcon } from '../../utils/icons';

import { IconWrapper } from './IconWrapper';

/**
 * Icon component with consistent sizing and positioning using the design system icon library
 * 
 * @example
 * ```tsx
 * <Icon name="close" size="md" />
 * <Icon name="check" size="lg" />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className,
  'aria-hidden': ariaHidden = true,
}) => {
  // If no name provided, render nothing
  if (!name) {
    return null;
  }

  // Check if the icon exists in our library
  if (!hasIcon(name)) {
    console.warn(`Icon "${name}" not found in icon library`);
    return null;
  }

  // Get the icon component
  const IconComponent = getIcon(name);

  return (
    <IconWrapper 
      size={size} 
      position="start" 
      className={className}
    >
      <IconComponent aria-hidden={ariaHidden} />
    </IconWrapper>
  );
};

// Export individual icon components for direct use if needed
export const CloseIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="close" {...props} />
);

export const ChevronDownIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="chevron-down" {...props} />
);

export const CheckIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="check" {...props} />
);

export const AlertCircleIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="alert-circle" {...props} />
);

export const InfoIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="info" {...props} />
);

export const XCircleIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="x-circle" {...props} />
);

export const SearchIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="search" {...props} />
);

export const HeartIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="heart" {...props} />
);

export const UserIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="user" {...props} />
);

export const HomeIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="home" {...props} />
);

export const SettingsIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="settings" {...props} />
);

export const MailIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="mail" {...props} />
);

export const PhoneIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="phone" {...props} />
);

export const CalendarIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="calendar" {...props} />
);

export const ClockIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="clock" {...props} />
);

export const DownloadIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="download" {...props} />
);

export const UploadIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="upload" {...props} />
);

export const EditIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="edit" {...props} />
);

export const TrashIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="trash" {...props} />
);

export const PlusIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="plus" {...props} />
);

export const MinusIcon: React.FC<Omit<IconProps, 'name'>> = (props) => (
  <Icon name="minus" {...props} />
);