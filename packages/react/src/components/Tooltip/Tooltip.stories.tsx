import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    children: 'This is a tooltip',
    placement: 'top',
    delay: 100,
    disabled: false,
    trigger: <button>Hover me</button>,
  },
};

export const Bottom: Story = {
  args: {
    children: 'Tooltip on bottom',
    placement: 'bottom',
    trigger: <button>Bottom tooltip</button>,
  },
};

export const Left: Story = {
  args: {
    children: 'Left side tooltip',
    placement: 'left',
    trigger: <button>Left tooltip</button>,
  },
};

export const Right: Story = {
  args: {
    children: 'Right side tooltip',
    placement: 'right',
    trigger: <button>Right tooltip</button>,
  },
};

export const LongDelay: Story = {
  args: {
    children: 'This tooltip has a longer delay',
    delay: 1000,
    trigger: <button>Slow tooltip</button>,
  },
};

export const Disabled: Story = {
  args: {
    children: 'This tooltip is disabled',
    disabled: true,
    trigger: <button>Disabled tooltip</button>,
  },
};