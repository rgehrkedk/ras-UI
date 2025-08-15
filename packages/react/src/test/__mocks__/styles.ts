/**
 * Mock styles for testing
 */

// Mock vanilla-extract style functions
export const button = () => 'button-mock';
export const buttonIcon = 'button-icon-mock';
export const buttonSpinner = 'button-spinner-mock';

export const inputContainer = () => 'input-container-mock';
export const inputField = 'input-field-mock';
export const inputBase = 'input-base-mock';
export const inputLabel = 'input-label-mock';
export const inputHelperText = 'input-helper-text-mock';
export const inputErrorText = 'input-error-text-mock';
export const inputRequired = 'input-required-mock';
export const inputStartIcon = 'input-start-icon-mock';
export const inputEndIcon = 'input-end-icon-mock';

export const dialogOverlay = 'dialog-overlay-mock';
export const dialogContainer = 'dialog-container-mock';
export const dialogHeader = 'dialog-header-mock';
export const dialogTitle = 'dialog-title-mock';
export const dialogCloseButton = 'dialog-close-button-mock';
export const dialogBody = 'dialog-body-mock';
export const dialogFooter = 'dialog-footer-mock';
export const dialogDescription = 'dialog-description-mock';
export const alertDialogContainer = 'alert-dialog-container-mock';
export const alertDialogIcon = 'alert-dialog-icon-mock';
export const alertDialogContent = 'alert-dialog-content-mock';
export const dialogSizes = {
  sm: 'dialog-sm-mock',
  md: 'dialog-md-mock',
  lg: 'dialog-lg-mock',
  xl: 'dialog-xl-mock',
};

// Mock theme
export const theme = {
  color: {
    surface: { base: '--surface-base', raised: '--surface-raised', float: '--surface-float' },
    text: { primary: '--text-primary', secondary: '--text-secondary', onBrand: '--text-on-brand' },
    border: { default: '--border-default', focus: '--border-focus' },
    brand: { primary: '--brand-primary' },
    danger: '--danger',
  },
  space: {
    0: '--space-0', 1: '--space-1', 2: '--space-2', 3: '--space-3', 4: '--space-4',
    5: '--space-5', 6: '--space-6', 7: '--space-7', 8: '--space-8', 9: '--space-9', 10: '--space-10',
  },
  radius: { none: '--radius-none', sm: '--radius-sm', md: '--radius-md', lg: '--radius-lg', xl: '--radius-xl', full: '--radius-full' },
  elevation: { 0: '--elevation-0', 1: '--elevation-1', 2: '--elevation-2', 3: '--elevation-3' },
  font: {
    family: { sans: '--font-sans', mono: '--font-mono' },
    size: { xs: '--font-xs', sm: '--font-sm', md: '--font-md', lg: '--font-lg', xl: '--font-xl' },
    weight: { regular: '--font-regular', medium: '--font-medium', semibold: '--font-semibold', bold: '--font-bold' },
  },
};