/**
 * Badge component stories demonstrating ras-UI expansion based on sporty-book needs
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import { Badge } from "./Badge";

// Available icon names for controls
const availableIcons = [
  "close",
  "chevron-down",
  "check",
  "alert-circle",
  "info",
  "x-circle",
  "search",
  "heart",
  "user",
  "users",
  "home",
  "settings",
  "mail",
  "phone",
  "calendar",
  "clock",
  "download",
  "upload",
  "edit",
  "trash",
  "plus",
  "minus",
  "save",
  "chart",
  "document",
  "help",
  "menu",
  "arrow-left",
  "arrow-right",
  "dashboard",
  "folder",
  "bookmark",
  "bell",
  "message",
  "star",
  "layout",
  "grid",
  "list",
  "eye",
  "lock",
  "unlock",
  "code",
  "terminal",
];

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "padded",
    docs: {
      page: () => (
        <div>
          <h1>Badge</h1>
          <p>
            Compact labels and status indicators with semantic meaning and
            visual emphasis.
          </p>

          <h2>Features</h2>
          <ul>
            <li>
              <strong>Semantic Variants</strong>: Primary, secondary, outline,
              success, warning, danger, info
            </li>
            <li>
              <strong>Interactive States</strong>: Clickable and removable
              badges with hover effects
            </li>
            <li>
              <strong>Size Options</strong>: Small, medium, and large for
              different contexts
            </li>
            <li>
              <strong>Icon Support</strong>: Start and end icons with consistent
              spacing
            </li>
            <li>
              <strong>Accessibility</strong>: Screen reader support and keyboard
              navigation
            </li>
          </ul>

          <h2>Usage Guidelines</h2>
          <ul>
            <li>
              Use semantic variants for status indicators (success, warning,
              danger)
            </li>
            <li>Keep text concise - typically 1-3 words maximum</li>
            <li>Use consistent sizing within the same interface section</li>
            <li>Interactive badges work well for filters and removable tags</li>
          </ul>

          <h2>Examples</h2>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <Badge variant="primary" size="sm">
              Small
            </Badge>
            <Badge variant="primary" size="md">
              Medium
            </Badge>
            <Badge variant="primary" size="lg">
              Large
            </Badge>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Badge variant="info" removable>
              Removable
            </Badge>
            <Badge variant="outline" interactive>
              Clickable
            </Badge>
          </div>
        </div>
      ),
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "outline",
        "success",
        "warning",
        "danger",
        "info",
        "tennis",
        "basketball",
        "football",
        "volleyball",
        "premium",
        "glass",
      ],
      description: "Badge variant - semantic, status, or sport-specific",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Badge size",
    },
    interactive: {
      control: { type: "boolean" },
      description: "Enable hover/click interactions",
    },
    removable: {
      control: { type: "boolean" },
      description: "Show remove button",
    },
    startIcon: {
      control: { type: "select" },
      options: [undefined, ...availableIcons],
      description:
        "Icon to display at start of badge - any icon from our design system",
    },
    endIcon: {
      control: { type: "select" },
      options: [undefined, ...availableIcons],
      description:
        "Icon to display at end of badge - any icon from our design system",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Default badge - playground for testing props
export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Badge Text",
  },
};

// All variants showcase
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <h4
          style={{ margin: "0 0 0.5rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Semantic Variants
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>
      <div>
        <h4
          style={{ margin: "0 0 0.5rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Status Variants
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>
      <div>
        <h4
          style={{ margin: "0 0 0.5rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Domain-Specific
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge variant="tennis">Tennis</Badge>
          <Badge variant="basketball">Basketball</Badge>
          <Badge variant="premium">Premium</Badge>
          <Badge variant="glass">Glass</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available badge variants organized by purpose - semantic, status, and domain-specific.",
      },
    },
  },
};

// Size options
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Badge variant="primary" size="sm">
          Small
        </Badge>
        <div style={{ fontSize: "11px", marginTop: "4px", color: "#6b7280" }}>
          sm
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Badge variant="primary" size="md">
          Medium
        </Badge>
        <div style={{ fontSize: "11px", marginTop: "4px", color: "#6b7280" }}>
          md (default)
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Badge variant="primary" size="lg">
          Large
        </Badge>
        <div style={{ fontSize: "11px", marginTop: "4px", color: "#6b7280" }}>
          lg
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badge sizes for different interface densities and hierarchies.",
      },
    },
  },
};

// Interactive badges
export const Interactive: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Badge
        variant="outline"
        interactive
        onClick={() => console.log("Badge clicked")}
      >
        Clickable
      </Badge>
      <Badge
        variant="primary"
        removable
        onRemove={() => console.log("Badge removed")}
      >
        Removable
      </Badge>
      <Badge
        variant="secondary"
        interactive
        removable
        onClick={() => console.log("Badge clicked")}
        onRemove={() => console.log("Badge removed")}
      >
        Both Actions
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive badges with click handlers and remove functionality. Use for filters, tags, and actionable labels.",
      },
    },
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <Badge variant="success" startIcon="check">
        Completed
      </Badge>
      <Badge variant="warning" startIcon="clock">
        Pending
      </Badge>
      <Badge
        variant="info"
        startIcon="star"
        removable
        onRemove={() => console.log("Badge action")}
      >
        Featured
      </Badge>
      <Badge variant="primary" endIcon="arrow-right">
        Next Step
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badges with start and end icons for enhanced visual communication and status indication.",
      },
    },
  },
};

// All available icons showcase
export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h4 style={{ margin: 0, fontSize: "0.875rem", fontWeight: 500 }}>
        Any Icon Available - Full Flexibility
      </h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        <Badge variant="primary" startIcon="star">
          Featured
        </Badge>
        <Badge variant="success" startIcon="check">
          Verified
        </Badge>
        <Badge variant="warning" startIcon="clock">
          Pending
        </Badge>
        <Badge variant="danger" startIcon="alert-circle">
          Alert
        </Badge>
        <Badge variant="info" startIcon="bell">
          Notification
        </Badge>
        <Badge variant="secondary" startIcon="heart">
          Favorite
        </Badge>
        <Badge variant="outline" startIcon="download">
          Download
        </Badge>
        <Badge variant="primary" startIcon="lock">
          Secure
        </Badge>
        <Badge variant="success" startIcon="mail">
          Email
        </Badge>
        <Badge variant="info" startIcon="calendar">
          Event
        </Badge>
        <Badge variant="warning" startIcon="edit">
          Edit
        </Badge>
        <Badge variant="danger" startIcon="trash">
          Delete
        </Badge>
      </div>
    </div>
  ),
};

// Real-world usage examples
export const UsageExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Status Indicators
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge variant="success" startIcon="check">
            Published
          </Badge>
          <Badge variant="warning" startIcon="clock">
            Draft
          </Badge>
          <Badge variant="danger" startIcon="x-circle">
            Archived
          </Badge>
          <Badge variant="info" startIcon="edit">
            In Review
          </Badge>
        </div>
      </div>
      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Category Tags
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge
            variant="outline"
            removable
            onRemove={() => console.log("Badge action")}
          >
            JavaScript
          </Badge>
          <Badge
            variant="outline"
            removable
            onRemove={() => console.log("Badge action")}
          >
            React
          </Badge>
          <Badge
            variant="outline"
            removable
            onRemove={() => console.log("Badge action")}
          >
            TypeScript
          </Badge>
          <Badge
            variant="outline"
            removable
            onRemove={() => console.log("Badge action")}
          >
            Design
          </Badge>
        </div>
      </div>
      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Interactive Filters
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge
            variant="primary"
            interactive
            onClick={() => console.log("Badge action")}
          >
            All Items (24)
          </Badge>
          <Badge
            variant="outline"
            interactive
            onClick={() => console.log("Badge action")}
          >
            Active (18)
          </Badge>
          <Badge
            variant="outline"
            interactive
            onClick={() => console.log("Badge action")}
          >
            Inactive (6)
          </Badge>
          <Badge
            variant="outline"
            interactive
            onClick={() => console.log("Badge action")}
          >
            Pending (3)
          </Badge>
        </div>
      </div>
      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Notification Counts
        </h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <span style={{ fontSize: "14px" }}>Messages</span>
            <Badge variant="danger" size="sm" style={{ marginLeft: "8px" }}>
              5
            </Badge>
          </div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <span style={{ fontSize: "14px" }}>Notifications</span>
            <Badge variant="primary" size="sm" style={{ marginLeft: "8px" }}>
              12
            </Badge>
          </div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <span style={{ fontSize: "14px" }}>Updates</span>
            <Badge variant="info" size="sm" style={{ marginLeft: "8px" }}>
              3
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world badge usage patterns including status indicators, category tags, filters, and notification counts.",
      },
    },
  },
};

// Accessibility and keyboard navigation
export const AccessibilityExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Keyboard Navigation
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge
            variant="primary"
            interactive
            onClick={() => console.log("Badge action")}
          >
            Tab to Focus
          </Badge>
          <Badge
            variant="secondary"
            removable
            onRemove={() => console.log("Badge action")}
          >
            Tab + Enter to Remove
          </Badge>
          <Badge
            variant="outline"
            interactive
            removable
            onClick={() => console.log("Badge action")}
            onRemove={() => console.log("Badge action")}
          >
            Multiple Actions
          </Badge>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            marginTop: "8px",
            marginBottom: 0,
          }}
        >
          Use Tab to focus, Enter/Space to activate, and focus indicators are
          visible for keyboard users.
        </p>
      </div>
      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Screen Reader Support
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge
            variant="success"
            startIcon="check"
            aria-label="Status: Completed"
          >
            Done
          </Badge>
          <Badge
            variant="warning"
            startIcon="alert-circle"
            aria-label="Status: Requires attention"
          >
            Alert
          </Badge>
          <Badge
            variant="danger"
            removable
            onRemove={() => console.log("Badge action")}
            aria-label="Error tag, press to remove"
          >
            Error
          </Badge>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            marginTop: "8px",
            marginBottom: 0,
          }}
        >
          Custom aria-label attributes provide context for screen readers beyond
          visual appearance.
        </p>
      </div>
      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Color Accessibility
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge variant="success" startIcon="check">
            Success (with icon)
          </Badge>
          <Badge variant="warning" startIcon="alert-circle">
            Warning (with icon)
          </Badge>
          <Badge variant="danger" startIcon="x-circle">
            Error (with icon)
          </Badge>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            marginTop: "8px",
            marginBottom: 0,
          }}
        >
          Icons provide additional context beyond color to support users with
          color vision differences.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badge accessibility features including keyboard navigation, screen reader support, and color accessibility with icons.",
      },
    },
  },
};

// Edge cases and error states
export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Long Text Handling
        </h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            maxWidth: "400px",
          }}
        >
          <Badge variant="primary">Normal Length</Badge>
          <Badge variant="secondary">Moderately Long Badge Text</Badge>
          <Badge variant="outline">
            This is a very long badge text that should wrap or truncate
            gracefully
          </Badge>
        </div>
      </div>
      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Empty and Minimal Content
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge variant="primary">1</Badge>
          <Badge variant="secondary">•</Badge>
          <Badge variant="success" startIcon="check"></Badge>
          <Badge variant="info" size="sm">
            !
          </Badge>
        </div>
      </div>
      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Dynamic Content
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge variant="primary">Count: 0</Badge>
          <Badge variant="warning">Count: 99+</Badge>
          <Badge variant="danger">Count: 1,234</Badge>
          <Badge variant="success" startIcon="users">
            Active: 5,678
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badge behavior with edge cases including long text, minimal content, and dynamic values.",
      },
    },
  },
};
