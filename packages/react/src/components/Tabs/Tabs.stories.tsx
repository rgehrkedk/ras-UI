import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import { Button } from "../Button";
import { Icon } from "../Icon";

import { Tabs, TabList, Tab, TabPanel } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Accessible tabbed interface component built on React Aria Components. Supports horizontal/vertical orientation, keyboard navigation, and lazy loading.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Tab list orientation",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size variant for all tabs",
    },
    keyboardActivation: {
      control: { type: "select" },
      options: ["automatic", "manual"],
      description: "How tabs are activated via keyboard",
    },
    defaultSelectedKey: {
      control: { type: "text" },
      description: "Initial selected tab key",
    },
  },
  // Provide reasonable defaults for Storybook controls
  args: {
    orientation: "horizontal",
    size: "md",
    keyboardActivation: "automatic",
    defaultSelectedKey: "general",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic horizontal tabs example
export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Settings tabs">
        <Tab id="general">General</Tab>
        <Tab id="advanced">Advanced</Tab>
        <Tab id="security">Security</Tab>
      </TabList>
      <TabPanel id="general">
        <h3 style={{ marginTop: 0 }}>General Settings</h3>
        <p>Configure general application settings and preferences here.</p>
        <p>
          This includes basic configuration options that most users will need to
          customize.
        </p>
      </TabPanel>
      <TabPanel id="advanced">
        <h3 style={{ marginTop: 0 }}>Advanced Settings</h3>
        <p>Advanced configuration options for power users.</p>
        <p>
          These settings provide fine-grained control over application behavior.
        </p>
      </TabPanel>
      <TabPanel id="security">
        <h3 style={{ marginTop: 0 }}>Security Settings</h3>
        <p>Security-related configuration and privacy settings.</p>
        <p>Manage authentication, encryption, and access control options.</p>
      </TabPanel>
    </Tabs>
  ),
};

// Vertical orientation example
export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div style={{ height: "400px" }}>
      <Tabs {...args}>
        <TabList aria-label="Navigation tabs">
          <Tab id="dashboard">Dashboard</Tab>
          <Tab id="analytics">Analytics</Tab>
          <Tab id="reports">Reports</Tab>
          <Tab id="settings">Settings</Tab>
        </TabList>
        <TabPanel id="dashboard">
          <h3 style={{ marginTop: 0 }}>Dashboard</h3>
          <p>
            Welcome to your dashboard. Here you can see an overview of all your
            key metrics and recent activity.
          </p>
        </TabPanel>
        <TabPanel id="analytics">
          <h3 style={{ marginTop: 0 }}>Analytics</h3>
          <p>
            Detailed analytics and insights about your data and user behavior.
          </p>
        </TabPanel>
        <TabPanel id="reports">
          <h3 style={{ marginTop: 0 }}>Reports</h3>
          <p>
            Generate and view detailed reports for various time periods and
            metrics.
          </p>
        </TabPanel>
        <TabPanel id="settings">
          <h3 style={{ marginTop: 0 }}>Settings</h3>
          <p>
            Configure application settings and manage your account preferences.
          </p>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

// Size variants showcase
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Small */}
      <div>
        <h4>Small (sm)</h4>
        <Tabs defaultSelectedKey="tab1" size="sm">
          <TabList aria-label="Small tabs">
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel id="tab1">Small tab content for tab 1</TabPanel>
          <TabPanel id="tab2">Small tab content for tab 2</TabPanel>
          <TabPanel id="tab3">Small tab content for tab 3</TabPanel>
        </Tabs>
      </div>

      {/* Medium */}
      <div>
        <h4>Medium (md) - Default</h4>
        <Tabs defaultSelectedKey="tab1" size="md">
          <TabList aria-label="Medium tabs">
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel id="tab1">Medium tab content for tab 1</TabPanel>
          <TabPanel id="tab2">Medium tab content for tab 2</TabPanel>
          <TabPanel id="tab3">Medium tab content for tab 3</TabPanel>
        </Tabs>
      </div>

      {/* Large */}
      <div>
        <h4>Large (lg)</h4>
        <Tabs defaultSelectedKey="tab1" size="lg">
          <TabList aria-label="Large tabs">
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel id="tab1">Large tab content for tab 1</TabPanel>
          <TabPanel id="tab2">Large tab content for tab 2</TabPanel>
          <TabPanel id="tab3">Large tab content for tab 3</TabPanel>
        </Tabs>
      </div>
    </div>
  ),
};

// Disabled tabs example
export const WithDisabledTabs: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Tabs with disabled states">
        <Tab id="available">Available</Tab>
        <Tab id="processing">Processing</Tab>
        <Tab id="disabled" isDisabled>
          Disabled
        </Tab>
        <Tab id="completed">Completed</Tab>
      </TabList>
      <TabPanel id="available">
        <h3 style={{ marginTop: 0 }}>Available</h3>
        <p>This tab is available and can be selected normally.</p>
      </TabPanel>
      <TabPanel id="processing">
        <h3 style={{ marginTop: 0 }}>Processing</h3>
        <p>This tab shows content that is currently being processed.</p>
      </TabPanel>
      <TabPanel id="disabled">
        <h3 style={{ marginTop: 0 }}>Disabled</h3>
        <p>This content should not be accessible since the tab is disabled.</p>
      </TabPanel>
      <TabPanel id="completed">
        <h3 style={{ marginTop: 0 }}>Completed</h3>
        <p>This tab shows completed items and processes.</p>
      </TabPanel>
    </Tabs>
  ),
};

// Lazy loading example with shouldForceMount
export const LazyLoading: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Lazy loading example">
        <Tab id="instant">Instant Load</Tab>
        <Tab id="lazy">Lazy Load</Tab>
        <Tab id="forced">Always Mounted</Tab>
      </TabList>
      <TabPanel id="instant">
        <h3 style={{ marginTop: 0 }}>Instant Load</h3>
        <p>This content loads immediately when the tab is first selected.</p>
        <p>
          Subsequent switches to this tab are instant since the content remains
          mounted.
        </p>
      </TabPanel>
      <TabPanel id="lazy">
        <h3 style={{ marginTop: 0 }}>Lazy Load</h3>
        <p>
          This content is lazy-loaded and unmounted when the tab is not active.
        </p>
        <p>
          Watch the React DevTools to see the panel mount/unmount as you switch
          tabs.
        </p>
        <ExpensiveComponent name="Lazy Component" />
      </TabPanel>
      <TabPanel id="forced" shouldForceMount>
        <h3 style={{ marginTop: 0 }}>Always Mounted</h3>
        <p>
          This content stays mounted even when the tab is not active
          (shouldForceMount=true).
        </p>
        <p>
          Useful for expensive components that should not remount on tab
          switches.
        </p>
        <ExpensiveComponent name="Always Mounted Component" />
      </TabPanel>
    </Tabs>
  ),
};

// Complex content example with forms and interactions
export const ComplexContent: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Complex content example">
        <Tab id="profile">Profile</Tab>
        <Tab id="preferences">Preferences</Tab>
        <Tab id="notifications">Notifications</Tab>
      </TabList>
      <TabPanel id="profile">
        <h3 style={{ marginTop: 0 }}>Profile Information</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "400px",
          }}
        >
          <div>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "medium",
              }}
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue="John Doe"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: "medium",
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue="john@example.com"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
              }}
            />
          </div>
          <Button variant="primary">Save Changes</Button>
        </div>
      </TabPanel>
      <TabPanel id="preferences">
        <h3 style={{ marginTop: 0 }}>Preferences</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" defaultChecked />
            Enable email notifications
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" />
            Show desktop notifications
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" defaultChecked />
            Auto-save drafts
          </label>
          <div style={{ marginTop: "16px" }}>
            <Button variant="secondary">Reset to Defaults</Button>
          </div>
        </div>
      </TabPanel>
      <TabPanel id="notifications">
        <h3 style={{ marginTop: 0 }}>Notification Settings</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p>Configure how and when you receive notifications.</p>
          <div style={{ display: "grid", gap: "12px" }}>
            <div
              style={{
                padding: "16px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            >
              <h4 style={{ marginTop: 0, marginBottom: "8px" }}>
                Email Notifications
              </h4>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                }}
              >
                <input type="radio" name="email" defaultChecked />
                Daily digest
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                }}
              >
                <input type="radio" name="email" />
                Immediate
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <input type="radio" name="email" />
                Never
              </label>
            </div>
          </div>
        </div>
      </TabPanel>
    </Tabs>
  ),
};

// Manual keyboard activation example
export const ManualKeyboardActivation: Story = {
  args: {
    keyboardActivation: "manual",
  },
  render: (args) => (
    <div>
      <p style={{ marginBottom: "16px", fontSize: "14px", color: "#6b7280" }}>
        <strong>Manual Keyboard Activation:</strong> Arrow keys move focus, but
        you need to press Space or Enter to activate a tab. Try using keyboard
        navigation to see the difference.
      </p>
      <Tabs {...args}>
        <TabList aria-label="Manual activation example">
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
          <Tab id="tab3">Tab 3</Tab>
          <Tab id="tab4">Tab 4</Tab>
        </TabList>
        <TabPanel id="tab1">
          <h3 style={{ marginTop: 0 }}>Tab 1 Content</h3>
          <p>
            This tab requires manual activation with Space or Enter after
            focusing with arrow keys.
          </p>
        </TabPanel>
        <TabPanel id="tab2">
          <h3 style={{ marginTop: 0 }}>Tab 2 Content</h3>
          <p>
            Use arrow keys to focus this tab, then press Space or Enter to
            activate.
          </p>
        </TabPanel>
        <TabPanel id="tab3">
          <h3 style={{ marginTop: 0 }}>Tab 3 Content</h3>
          <p>
            Manual activation gives users more control over tab selection via
            keyboard.
          </p>
        </TabPanel>
        <TabPanel id="tab4">
          <h3 style={{ marginTop: 0 }}>Tab 4 Content</h3>
          <p>
            This is useful when tab activation might trigger expensive
            operations.
          </p>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

// Keyboard navigation focus example
export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates keyboard navigation patterns. Use Tab to enter, Arrow keys to navigate between tabs, Space/Enter to activate (in manual mode).",
      },
    },
  },
  render: (args) => (
    <div>
      <p
        style={{
          marginBottom: "16px",
          padding: "12px",
          backgroundColor: "#f3f4f6",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
        <strong>Keyboard Navigation Test:</strong> Use Tab to focus the tab
        list, then Arrow keys to navigate. Space/Enter activates tabs. Escape
        moves focus out of the tab list.
      </p>
      <Tabs {...args}>
        <TabList aria-label="Keyboard navigation example">
          <Tab id="navigation">Navigation</Tab>
          <Tab id="accessibility">Accessibility</Tab>
          <Tab id="testing">Testing</Tab>
          <Tab id="help">Help</Tab>
        </TabList>
        <TabPanel id="navigation">
          <h3 style={{ marginTop: 0 }}>Navigation</h3>
          <ul>
            <li>
              <strong>Tab:</strong> Enter/exit the tab list
            </li>
            <li>
              <strong>Arrow Keys:</strong> Navigate between tabs
            </li>
            <li>
              <strong>Space/Enter:</strong> Activate focused tab
            </li>
            <li>
              <strong>Home/End:</strong> Jump to first/last tab
            </li>
          </ul>
        </TabPanel>
        <TabPanel id="accessibility">
          <h3 style={{ marginTop: 0 }}>Accessibility Features</h3>
          <ul>
            <li>ARIA roles and properties for screen readers</li>
            <li>Keyboard navigation following ARIA Authoring Practices</li>
            <li>Focus management and visible focus indicators</li>
            <li>Proper tab panel association</li>
          </ul>
        </TabPanel>
        <TabPanel id="testing">
          <h3 style={{ marginTop: 0 }}>Testing Guidelines</h3>
          <ul>
            <li>Test keyboard navigation in both automatic and manual modes</li>
            <li>Verify screen reader announcements</li>
            <li>Check focus visibility across all themes</li>
            <li>Test with browser zoom and different viewport sizes</li>
          </ul>
        </TabPanel>
        <TabPanel id="help">
          <h3 style={{ marginTop: 0 }}>Getting Help</h3>
          <p>If you encounter accessibility issues with tabs:</p>
          <ul>
            <li>Check the React Aria documentation</li>
            <li>Test with multiple screen readers</li>
            <li>Validate with accessibility audit tools</li>
            <li>Consider user feedback and real-world testing</li>
          </ul>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

// Helper component for demonstrating lazy loading
function ExpensiveComponent({ name }: { name: string }) {
  const [renderTime] = React.useState(() => new Date().toLocaleTimeString());

  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: "#f3f4f6",
        borderRadius: "4px",
        marginTop: "12px",
        fontSize: "14px",
      }}
    >
      <strong>{name}</strong> rendered at {renderTime}
      {/* Simulate some expensive computation */}
      <div>Expensive computation result: {Math.random().toFixed(6)}</div>
    </div>
  );
}
