/**
 * NumberField component Storybook stories
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { NumberField } from "./NumberField";

const meta = {
  title: "Components/Form/NumberField",
  component: NumberField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible number field component built on React Aria Components with stepper buttons, validation support, and number formatting.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size variant of the number field",
      defaultValue: "md",
    },
    validationState: {
      control: { type: "select" },
      options: ["neutral", "valid", "invalid"],
      description: "Validation state for visual feedback",
      defaultValue: "neutral",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether the number field takes full width",
    },
    isDisabled: {
      control: { type: "boolean" },
      description: "Whether the number field is disabled",
    },
    isRequired: {
      control: { type: "boolean" },
      description: "Whether the number field is required",
    },
    showSteppers: {
      control: { type: "boolean" },
      description: "Whether to show stepper buttons",
      defaultValue: true,
    },
    label: {
      control: { type: "text" },
      description: "Number field label",
      defaultValue: "Quantity",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
      defaultValue: "Enter number...",
    },
    minValue: {
      control: { type: "number" },
      description: "Minimum allowed value",
    },
    maxValue: {
      control: { type: "number" },
      description: "Maximum allowed value",
    },
    step: {
      control: { type: "number" },
      description: "Step increment for stepper buttons",
      defaultValue: 1,
    },
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    label: "Quantity",
    placeholder: "Enter quantity",
    defaultValue: 1,
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Age",
    placeholder: "Enter your age",
    minValue: 0,
    maxValue: 120,
    defaultValue: 25,
  },
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "200px",
      }}
    >
      <NumberField
        label="Small size"
        size="sm"
        placeholder="0"
        defaultValue={10}
      />
      <NumberField
        label="Medium size (default)"
        size="md"
        placeholder="0"
        defaultValue={20}
      />
      <NumberField
        label="Large size"
        size="lg"
        placeholder="0"
        defaultValue={30}
      />
    </div>
  ),
};

// Validation States
export const ValidationStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "200px",
      }}
    >
      <NumberField
        label="Neutral state"
        validationState="neutral"
        placeholder="Enter number"
        defaultValue={42}
      />
      <NumberField
        label="Valid state"
        validationState="valid"
        placeholder="Enter number"
        defaultValue={100}
        helperText="Perfect score!"
      />
      <NumberField
        label="Invalid state"
        validationState="invalid"
        placeholder="Enter number"
        defaultValue={-5}
        errorMessage="Value must be positive"
      />
    </div>
  ),
};

// Form States
export const FormStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "200px",
      }}
    >
      <NumberField
        label="Normal field"
        placeholder="Enter number"
        helperText="Any number is allowed"
        defaultValue={123}
      />
      <NumberField
        label="Required field"
        placeholder="Enter number"
        isRequired
        helperText="This field is required"
      />
      <NumberField
        label="Disabled field"
        placeholder="Enter number"
        isDisabled
        defaultValue={999}
      />
    </div>
  ),
};

// Currency Formatting
export const CurrencyFormatting: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "250px",
      }}
    >
      <NumberField
        label="Price (USD)"
        placeholder="0.00"
        formatOptions={{
          style: "currency",
          currency: "USD",
        }}
        step={0.01}
        minValue={0}
        defaultValue={29.99}
      />
      <NumberField
        label="Price (EUR)"
        placeholder="0,00"
        formatOptions={{
          style: "currency",
          currency: "EUR",
        }}
        step={0.01}
        minValue={0}
        defaultValue={24.99}
      />
      <NumberField
        label="Price (GBP)"
        placeholder="0.00"
        formatOptions={{
          style: "currency",
          currency: "GBP",
        }}
        step={0.01}
        minValue={0}
        defaultValue={19.99}
      />
    </div>
  ),
};

// Brand Showcase
export const BrandShowcase: Story = {
  name: "Brand Showcase",
  render: () => {
    const ComponentVariants = () => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "220px",
        }}
      >
        <NumberField
          label="Quantity"
          defaultValue={5}
          minValue={1}
          maxValue={100}
          helperText="Standard number input"
        />
        <NumberField
          label="Price"
          defaultValue={29.99}
          formatOptions={{
            style: "currency",
            currency: "USD",
          }}
          step={0.01}
          validationState="valid"
          helperText="Currency formatted"
        />
        <NumberField
          label="Age"
          validationState="invalid"
          defaultValue={-1}
          errorMessage="Must be positive"
        />
        <NumberField
          label="Percentage"
          defaultValue={75}
          formatOptions={{ style: "percent", maximumFractionDigits: 0 }}
          minValue={0}
          maxValue={100}
          size="sm"
          helperText="Small size variant"
        />
      </div>
    );

    return (
      <div style={{ display: "grid", gap: "2rem" }}>
        <div data-brand="default">
          <h4
            style={{ marginBottom: "1rem", fontSize: "1rem", fontWeight: 600 }}
          >
            Default Brand
          </h4>
          <ComponentVariants />
        </div>
        <div data-brand="vibrant">
          <h4
            style={{ marginBottom: "1rem", fontSize: "1rem", fontWeight: 600 }}
          >
            Vibrant Brand
          </h4>
          <ComponentVariants />
        </div>
        <div data-brand="corporate">
          <h4
            style={{ marginBottom: "1rem", fontSize: "1rem", fontWeight: 600 }}
          >
            Corporate Brand
          </h4>
          <ComponentVariants />
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "NumberField appearance across all three brand themes, demonstrating how numerical input components adapt their visual styling while maintaining stepper functionality and number formatting capabilities.",
      },
    },
  },
};
