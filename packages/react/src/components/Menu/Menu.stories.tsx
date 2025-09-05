/**
 * Simple working Menu story using design-system wrappers
 */

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { KeyboardShortcut } from '../KeyboardShortcut';

import { MenuTriggerComponent, Menu, MenuItem, MenuSeparator } from './Menu';

const meta: Meta<typeof MenuTriggerComponent> = {
  title: 'Components/Menu',
  component: MenuTriggerComponent,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MenuTriggerComponent>;

export const WithIcons: Story = {
  render: () => (
    <MenuTriggerComponent>
      <Button endIcon={<Icon name="chevron-down" />}>Menu</Button>
      <Menu aria-label="Actions">
        <MenuItem id="edit" startIcon={<Icon name="edit" />}>
          Edit
          <KeyboardShortcut combo="mod+E" align="end" />
        </MenuItem>
        <MenuItem id="copy" startIcon={<Icon name="copy" />}>
          Copy
          <KeyboardShortcut combo="mod+C" align="end" />
        </MenuItem>
        <MenuSeparator />
        <MenuItem id="delete" startIcon={<Icon name="trash" />} destructive>
          Delete
          <KeyboardShortcut combo="mod+Backspace" align="end" />
        </MenuItem>
      </Menu>
    </MenuTriggerComponent>
  ),
};
