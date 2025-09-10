import { ColorField } from "../src/ColorField";

import type { Meta, StoryFn } from "@storybook/react-vite";

const meta: Meta<typeof ColorField> = {
  component: ColorField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryFn<typeof ColorField>;

export const Example: Story = (args) => <ColorField {...args} />;

Example.args = {
  label: "Color",
};
