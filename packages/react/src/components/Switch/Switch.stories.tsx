/**
 * Switch component stories for Storybook
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Switch component provides accessible binary on/off controls with floating UI design principles.
Built with React Aria Components and features elevation.1 surface treatment with interactive hover states.

## Features
- **Accessible**: Full keyboard navigation and screen reader support
- **Floating UI**: Elevation-based design with hover state changes
- **Brand-aware**: Adapts to all brand themes (default, vibrant, corporate)
- **Form-ready**: Supports validation, error states, and form integration
- **Customizable**: Multiple sizes and styling options

## Usage Guidelines
- Use for binary settings and preferences
- Provide clear labels that describe what the switch controls
- Use description text for additional context when needed
- Test with keyboard navigation and screen readers
        `,
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Switch label text",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Switch size variant",
    },
    isSelected: {
      control: "boolean",
      description: "Whether the switch is checked (controlled)",
    },
    defaultSelected: {
      control: "boolean",
      description: "Default checked state (uncontrolled)",
    },
    isDisabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    isRequired: {
      control: "boolean",
      description: "Whether the switch is required",
    },
    isInvalid: {
      control: "boolean",
      description: "Whether the switch has validation errors",
    },
    description: {
      control: "text",
      description: "Description text below the label",
    },
    helperText: {
      control: "text",
      description: "Helper text to display",
    },
    errorMessage: {
      control: "text",
      description: "Error message when invalid",
    },
    onChange: {
      action: "changed",
      description: "Callback when switch state changes",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Enable notifications",
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Switch size="sm" defaultSelected>
        Small switch
      </Switch>
      <Switch size="md" defaultSelected>
        Medium switch
      </Switch>
      <Switch size="lg" defaultSelected>
        Large switch
      </Switch>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Switches support three sizes to match different interface contexts.",
      },
    },
  },
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Switch>Unchecked switch</Switch>
      <Switch defaultSelected>Checked switch</Switch>
      <Switch isDisabled>Disabled unchecked</Switch>
      <Switch isDisabled defaultSelected>
        Disabled checked
      </Switch>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Switches have clear visual states for different interaction modes.",
      },
    },
  },
};

// With descriptions
export const WithDescriptions: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxWidth: "400px",
      }}
    >
      <Switch description="Get notified about important updates and messages">
        Push notifications
      </Switch>

      <Switch
        defaultSelected
        description="Automatically save your work every few minutes"
      >
        Auto-save
      </Switch>

      <Switch description="Use system settings to determine the theme">
        Follow system theme
      </Switch>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Switches can include description text to provide additional context.",
      },
    },
  },
};

// Form integration
export const FormIntegration: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        maxWidth: "400px",
      }}
    >
      <Switch
        isRequired
        helperText="This setting is required for account setup"
      >
        Accept terms and conditions
      </Switch>

      <Switch
        isInvalid
        errorMessage="You must enable notifications to receive updates"
      >
        Enable notifications
      </Switch>

      <Switch helperText="You can change this later in settings">
        Email marketing
      </Switch>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Switches integrate well with forms and support validation states.",
      },
    },
  },
};

// Settings panel example
export const SettingsPanel: Story = {
  render: () => (
    <div
      style={{
        padding: "1.5rem",
        border: "1px solid var(--color-border-default)",
        borderRadius: "8px",
        maxWidth: "500px",
        backgroundColor: "var(--color-surface-base)",
      }}
    >
      <h3
        style={{
          margin: "0 0 1.5rem 0",
          fontSize: "1.125rem",
          fontWeight: 600,
        }}
      >
        Privacy Settings
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Switch
          defaultSelected
          description="Allow others to see when you're online"
        >
          Show online status
        </Switch>

        <Switch description="Let others find you using your email address">
          Discoverable by email
        </Switch>

        <Switch
          defaultSelected
          description="Receive notifications for mentions and direct messages"
        >
          Push notifications
        </Switch>

        <Switch description="Include your activity in our analytics">
          Analytics tracking
        </Switch>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of switches used in a settings panel interface.",
      },
    },
  },
};

// Controlled vs Uncontrolled
export const ControlledExample: Story = {
  render: () => {
    const [isEnabled, setIsEnabled] = React.useState(false);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Switch
          isSelected={isEnabled}
          onChange={setIsEnabled}
          description="This is a controlled switch"
        >
          Controlled switch
        </Switch>

        <p
          style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}
        >
          Current state: {isEnabled ? "Enabled" : "Disabled"}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example of a controlled switch that manages its state externally.",
      },
    },
  },
};

// Without labels (icon switches)
export const WithoutLabels: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.25rem" }}>🔊</span>
        <Switch aria-label="Toggle sound" />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.25rem" }}>🌙</span>
        <Switch aria-label="Toggle dark mode" defaultSelected />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.25rem" }}>📱</span>
        <Switch aria-label="Toggle mobile mode" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Switches can be used without labels when context is clear from surrounding elements.",
      },
    },
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    children: "Toggle setting",
    size: "md",
    isSelected: false,
    isDisabled: false,
    isRequired: false,
    isInvalid: false,
    description: "",
    helperText: "",
    errorMessage: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to experiment with all switch options.",
      },
    },
  },
};

// Accessibility demonstration
export const AccessibilityDemo: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "500px",
      }}
    >
      <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
        Try using keyboard navigation (Tab, Space, Enter) to interact with these
        switches:
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Switch description="Fully accessible with keyboard navigation">
          Keyboard accessible
        </Switch>

        <Switch
          isRequired
          description="Screen readers will announce this as required"
        >
          Required setting
        </Switch>

        <Switch
          aria-label="Hidden label for screen readers"
          description="Uses aria-label for accessibility"
        >
          Has hidden label
        </Switch>
      </div>

      <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
        Each switch includes proper ARIA attributes and keyboard support for
        accessibility.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Switches are fully accessible with keyboard navigation and screen reader support.",
      },
    },
  },
};
