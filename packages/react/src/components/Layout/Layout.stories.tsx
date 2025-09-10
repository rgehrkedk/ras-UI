import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

import { Button } from "../Button";
import { Icon } from "../Icon";
import { Sidebar } from "../Sidebar";

import {
  Layout,
  LayoutHeader,
  LayoutBody,
  LayoutMain,
  LayoutContent,
  LayoutFooter,
} from "./Layout";

const meta = {
  title: "Components/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Layout provides a complete page structure system for building consistent application interfaces.

## Features
- **Semantic HTML Structure**: Uses proper semantic HTML elements (header, main, footer)
- **Flexible Composition**: Compound component pattern for easy customization
- **Responsive Design**: Built-in responsive behavior and container constraints
- **Sticky Header Support**: Optional sticky header positioning
- **Content Width Control**: Multiple max-width options (sm, md, lg, xl, full)
- **Sidebar Integration**: Seamless integration with Sidebar component
- **Theme Aware**: Responds to theme changes across all brands

## Components
- **Layout**: Root container with full-height viewport layout
- **LayoutHeader**: Top navigation/header area with optional sticky behavior
- **LayoutBody**: Main content area container (sidebar + main)
- **LayoutMain**: Primary content region with optional padding
- **LayoutContent**: Content container with max-width constraints
- **LayoutFooter**: Bottom footer area

## Usage Guidelines
- Use Layout as the root container for page-level structure
- Wrap main content in LayoutContent for proper max-width constraints
- Use sticky header for navigation that should remain visible on scroll
- Apply padded={false} to LayoutMain when content needs full bleed
- Consider accessibility when structuring page content hierarchy

## Accessibility
- Uses semantic HTML5 elements (header, main, footer)
- Maintains proper document structure and landmark navigation
- Skip links can be easily integrated with Layout structure
- Focus management works naturally with semantic elements
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: "Layout content and structure",
    },
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Layout Structure
export const Default: Story = {
  args: { children: <div /> },
  render: () => (
    <Layout>
      <LayoutHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Icon name="home" />
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
            Application Name
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button variant="ghost" size="sm">
            Profile
          </Button>
          <Button variant="primary" size="sm">
            Sign Out
          </Button>
        </div>
      </LayoutHeader>

      <LayoutBody>
        <LayoutMain>
          <LayoutContent>
            <div style={{ padding: "2rem 0" }}>
              <h2
                style={{ marginTop: 0, marginBottom: "1rem", fontSize: "2rem" }}
              >
                Welcome to Your Dashboard
              </h2>
              <p
                style={{
                  marginBottom: "2rem",
                  color: "var(--color-semantic-text-secondary)",
                }}
              >
                This is the main content area. The layout provides a consistent
                structure with proper spacing and semantic HTML elements.
              </p>

              <div
                style={{
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                }}
              >
                <div
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "var(--color-semantic-surface-raised)",
                    borderRadius: "8px",
                    border: "1px solid var(--color-semantic-border-default)",
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
                    Card 1
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--color-semantic-text-secondary)",
                    }}
                  >
                    Sample content to demonstrate layout behavior
                  </p>
                </div>
                <div
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "var(--color-semantic-surface-raised)",
                    borderRadius: "8px",
                    border: "1px solid var(--color-semantic-border-default)",
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
                    Card 2
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--color-semantic-text-secondary)",
                    }}
                  >
                    Content adapts to available space
                  </p>
                </div>
              </div>
            </div>
          </LayoutContent>
        </LayoutMain>
      </LayoutBody>

      <LayoutFooter>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          © 2024 Your Company. All rights reserved.
        </p>
      </LayoutFooter>
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Basic layout structure with header, main content, and footer. Demonstrates semantic HTML structure and responsive behavior.",
      },
    },
  },
};

// Layout with Sidebar Integration
export const WithSidebar: Story = {
  args: { children: <div /> },
  render: () => (
    <Layout>
      <LayoutHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Icon name="menu" />
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
            Dashboard
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button variant="icon" aria-label="Notifications">
            <Icon name="bell" />
          </Button>
          <Button variant="icon" aria-label="Settings">
            <Icon name="settings" />
          </Button>
        </div>
      </LayoutHeader>

      <LayoutBody>
        <Sidebar variant="push">
          <Sidebar.Header title="App" />
          <Sidebar.Separator />
          <Sidebar.Content>
            <Sidebar.Group label="Main">
              <Sidebar.Item icon="home" label="Dashboard" />
              <Sidebar.Item icon="chart" label="Analytics" />
              <Sidebar.Item icon="folder" label="Projects" />
            </Sidebar.Group>
          </Sidebar.Content>
          <Sidebar.Footer userName="John Doe" userEmail="john@example.com" />
        </Sidebar>

        <LayoutMain>
          <LayoutContent>
            <div style={{ padding: "2rem 0" }}>
              <h2
                style={{ marginTop: 0, marginBottom: "1rem", fontSize: "2rem" }}
              >
                Dashboard Overview
              </h2>
              <p
                style={{
                  marginBottom: "2rem",
                  color: "var(--color-semantic-text-secondary)",
                }}
              >
                Layout with integrated sidebar navigation. The sidebar pushes
                the main content aside, creating a responsive layout that adapts
                to different screen sizes.
              </p>

              <div
                style={{
                  display: "grid",
                  gap: "1.5rem",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      padding: "2rem",
                      backgroundColor: "var(--color-semantic-surface-raised)",
                      borderRadius: "12px",
                      border: "1px solid var(--color-semantic-border-default)",
                      textAlign: "center",
                    }}
                  >
                    <h3
                      style={{
                        marginTop: 0,
                        marginBottom: "1rem",
                        fontSize: "1.5rem",
                      }}
                    >
                      Metric {i}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "2rem",
                        fontWeight: 700,
                        color: "var(--color-semantic-primary-text)",
                      }}
                    >
                      {Math.floor(Math.random() * 1000)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </LayoutContent>
        </LayoutMain>
      </LayoutBody>

      <LayoutFooter>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Dashboard • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </LayoutFooter>
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Layout with integrated sidebar navigation. Demonstrates how the Layout system works seamlessly with the Sidebar component.",
      },
    },
  },
};

// Non-sticky Header
export const NonStickyHeader: Story = {
  args: { children: <div /> },
  render: () => (
    <Layout>
      <LayoutHeader sticky={false}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Icon name="home" />
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
            Non-sticky Header
          </h1>
        </div>
        <Button variant="primary" size="sm">
          Action
        </Button>
      </LayoutHeader>

      <LayoutBody>
        <LayoutMain>
          <LayoutContent>
            <div style={{ padding: "2rem 0" }}>
              <h2
                style={{ marginTop: 0, marginBottom: "1rem", fontSize: "2rem" }}
              >
                Scrollable Content
              </h2>
              <p
                style={{
                  marginBottom: "2rem",
                  color: "var(--color-semantic-text-secondary)",
                }}
              >
                This layout has a non-sticky header that will scroll away with
                the content. Useful for landing pages or content-focused
                layouts.
              </p>

              {/* Generate scrollable content */}
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "1.5rem",
                    padding: "1.5rem",
                    backgroundColor: "var(--color-semantic-surface-raised)",
                    borderRadius: "8px",
                    border: "1px solid var(--color-semantic-border-default)",
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
                    Content Block {i + 1}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--color-semantic-text-secondary)",
                    }}
                  >
                    This is content that demonstrates how the non-sticky header
                    behaves when scrolling. The header will scroll away with the
                    content instead of remaining fixed at the top.
                  </p>
                </div>
              ))}
            </div>
          </LayoutContent>
        </LayoutMain>
      </LayoutBody>

      <LayoutFooter>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Footer content remains at the bottom
        </p>
      </LayoutFooter>
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Layout with non-sticky header that scrolls with content. Good for content-heavy pages where the header shouldn't take up permanent screen real estate.",
      },
    },
  },
};

// Full Width Layout (no padding)
export const FullWidth: Story = {
  args: { children: <div /> },
  render: () => (
    <Layout>
      <LayoutHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Icon name="folder" />
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
            Full Width Layout
          </h1>
        </div>
      </LayoutHeader>

      <LayoutBody>
        <LayoutMain padded={false}>
          {/* Hero section - full width */}
          <div
            style={{
              padding: "4rem 2rem",
              background:
                "linear-gradient(135deg, var(--color-semantic-primary-base) 0%, var(--color-semantic-primary-emphasis) 100%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "1rem",
                fontSize: "3rem",
                fontWeight: 700,
              }}
            >
              Full Width Hero
            </h2>
            <p
              style={{
                margin: "0 auto 2rem",
                fontSize: "1.25rem",
                opacity: 0.9,
                maxWidth: "600px",
              }}
            >
              This layout uses padded={false} on LayoutMain to allow full-width
              content sections while still maintaining structured content areas
              where needed.
            </p>
            <Button variant="secondary" size="lg">
              Get Started
            </Button>
          </div>

          {/* Content section with constraints */}
          <LayoutContent>
            <div style={{ padding: "3rem 0" }}>
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "2rem",
                  fontSize: "2rem",
                  textAlign: "center",
                }}
              >
                Constrained Content Area
              </h3>
              <div
                style={{
                  display: "grid",
                  gap: "2rem",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      padding: "2rem",
                      backgroundColor: "var(--color-semantic-surface-raised)",
                      borderRadius: "12px",
                      border: "1px solid var(--color-semantic-border-default)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "1rem",
                        fontSize: "2rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name="star" />
                    </div>
                    <h4 style={{ marginTop: 0, marginBottom: "1rem" }}>
                      Feature {i}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: "var(--color-semantic-text-secondary)",
                      }}
                    >
                      This content is constrained by LayoutContent max-width
                      while the hero above spans full width.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </LayoutContent>

          {/* Another full-width section */}
          <div
            style={{
              padding: "3rem 2rem",
              backgroundColor: "var(--color-semantic-surface-raised)",
              borderTop: "1px solid var(--color-semantic-border-default)",
              borderBottom: "1px solid var(--color-semantic-border-default)",
            }}
          >
            <LayoutContent>
              <div style={{ textAlign: "center" }}>
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: "1rem",
                    fontSize: "2rem",
                  }}
                >
                  Full Width with Constrained Content
                </h3>
                <p
                  style={{
                    margin: "0 auto",
                    color: "var(--color-semantic-text-secondary)",
                    maxWidth: "700px",
                  }}
                >
                  This demonstrates how you can have full-width backgrounds
                  while constraining the actual content using LayoutContent
                  within the full-width section.
                </p>
              </div>
            </LayoutContent>
          </div>
        </LayoutMain>
      </LayoutBody>

      <LayoutFooter>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Full width layout example
        </p>
      </LayoutFooter>
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Layout with no main padding (padded={false}) allowing full-width content sections while maintaining structured content areas using LayoutContent.",
      },
    },
  },
};

// Different Content Width Constraints
export const ContentWidths: Story = {
  args: { children: <div /> },
  render: () => (
    <Layout>
      <LayoutHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Icon name="settings" />
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
            Content Width Examples
          </h1>
        </div>
      </LayoutHeader>

      <LayoutBody>
        <LayoutMain>
          {/* Small width */}
          <LayoutContent maxWidth="sm">
            <div
              style={{
                padding: "2rem",
                marginBottom: "2rem",
                backgroundColor: "var(--color-semantic-surface-raised)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
                Small (640px max)
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--color-semantic-text-secondary)",
                }}
              >
                Perfect for forms, reading content, or focused interfaces
              </p>
            </div>
          </LayoutContent>

          {/* Medium width */}
          <LayoutContent maxWidth="md">
            <div
              style={{
                padding: "2rem",
                marginBottom: "2rem",
                backgroundColor: "var(--color-semantic-surface-raised)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
                Medium (768px max)
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--color-semantic-text-secondary)",
                }}
              >
                Good for content pages, articles, or medium-complexity
                interfaces
              </p>
            </div>
          </LayoutContent>

          {/* Large width */}
          <LayoutContent maxWidth="lg">
            <div
              style={{
                padding: "2rem",
                marginBottom: "2rem",
                backgroundColor: "var(--color-semantic-surface-raised)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
                Large (1024px max)
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--color-semantic-text-secondary)",
                }}
              >
                Suitable for data tables, dashboards, or content-rich interfaces
              </p>
            </div>
          </LayoutContent>

          {/* Extra large width */}
          <LayoutContent maxWidth="xl">
            <div
              style={{
                padding: "2rem",
                marginBottom: "2rem",
                backgroundColor: "var(--color-semantic-surface-raised)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
                Extra Large (1280px max) - Default
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--color-semantic-text-secondary)",
                }}
              >
                The default max-width, ideal for most application layouts
              </p>
            </div>
          </LayoutContent>

          {/* Full width */}
          <LayoutContent maxWidth="full">
            <div
              style={{
                padding: "2rem",
                backgroundColor: "var(--color-semantic-surface-raised)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
                Full Width (no constraint)
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--color-semantic-text-secondary)",
                }}
              >
                Takes the full available width, good for tables or when maximum
                space utilization is needed
              </p>
            </div>
          </LayoutContent>
        </LayoutMain>
      </LayoutBody>

      <LayoutFooter>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>
          Content width demonstration
        </p>
      </LayoutFooter>
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all available LayoutContent maxWidth options: sm (640px), md (768px), lg (1024px), xl (1280px), and full (no constraint).",
      },
    },
  },
};

// Content Width Examples
export const ContentWidthExamples: Story = {
  args: { children: <div /> },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {(["sm", "md", "lg", "xl"] as const).map((maxWidth) => (
        <Layout key={maxWidth}>
          <LayoutHeader>
            <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
              Content Width: {maxWidth.toUpperCase()}
            </h1>
          </LayoutHeader>
          <LayoutBody>
            <LayoutMain>
              <LayoutContent maxWidth={maxWidth}>
                <div
                  style={{
                    padding: "2rem",
                    backgroundColor: "var(--color-semantic-surface-raised)",
                    borderRadius: "8px",
                    border: "1px solid var(--color-semantic-border-default)",
                    textAlign: "center",
                  }}
                >
                  <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>
                    Max Width: {maxWidth}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--color-semantic-text-secondary)",
                    }}
                  >
                    This content is constrained to the {maxWidth} max-width
                    setting, demonstrating how different width constraints
                    affect content layout.
                  </p>
                </div>
              </LayoutContent>
            </LayoutMain>
          </LayoutBody>
        </Layout>
      ))}

      <Layout>
        <LayoutHeader>
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
            Content Width: Full
          </h1>
        </LayoutHeader>
        <LayoutBody>
          <LayoutMain>
            <LayoutContent maxWidth="full">
              <div
                style={{
                  padding: "2rem",
                  backgroundColor: "var(--color-semantic-surface-raised)",
                  borderRadius: "8px",
                  border: "1px solid var(--color-semantic-border-default)",
                  textAlign: "center",
                }}
              >
                <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>
                  Max Width: Full
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: "var(--color-semantic-text-secondary)",
                  }}
                >
                  Full width content that extends to the container edges, useful
                  for full-bleed designs or wide data tables.
                </p>
              </div>
            </LayoutContent>
          </LayoutMain>
        </LayoutBody>
      </Layout>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Different content width constraints from small to full-width, showing how Layout adapts to various content width requirements.",
      },
    },
  },
};

// Minimal Layout (header only)
export const Minimal: Story = {
  args: { children: <div /> },
  render: () => (
    <Layout>
      <LayoutHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Icon name="home" />
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
            Minimal Layout
          </h1>
        </div>
        <Button variant="primary" size="sm">
          Action
        </Button>
      </LayoutHeader>

      <LayoutBody>
        <LayoutMain>
          <LayoutContent>
            <div style={{ padding: "3rem 0", textAlign: "center" }}>
              <h2
                style={{ marginTop: 0, marginBottom: "1rem", fontSize: "2rem" }}
              >
                Clean & Simple
              </h2>
              <p
                style={{
                  marginBottom: "2rem",
                  color: "var(--color-semantic-text-secondary)",
                }}
              >
                Minimal layout with just header and main content. Perfect for
                landing pages, auth screens, or simple content displays.
              </p>
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </div>
          </LayoutContent>
        </LayoutMain>
      </LayoutBody>
    </Layout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Minimal layout structure with only header and main content. No footer, perfect for simple pages or focused user flows.",
      },
    },
  },
};

// Interactive Layout Configuration
export const InteractiveConfiguration: Story = {
  args: { children: <div /> },
  render: () => {
    const [stickyHeader, setStickyHeader] = React.useState(true);
    const [paddedMain, setPaddedMain] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<
      "sm" | "md" | "lg" | "xl" | "full"
    >("xl");
    const [showFooter, setShowFooter] = React.useState(true);

    return (
      <div>
        {/* Control Panel */}
        <div
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 1000,
            padding: "1rem",
            backgroundColor: "var(--color-semantic-surface-raised)",
            borderRadius: "8px",
            border: "1px solid var(--color-semantic-border-default)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            minWidth: "250px",
          }}
        >
          <h4
            style={{
              margin: "0 0 1rem",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            Layout Configuration
          </h4>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              fontSize: "0.875rem",
            }}
          >
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                checked={stickyHeader}
                onChange={(e) => setStickyHeader(e.target.checked)}
              />
              Sticky Header
            </label>

            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                checked={paddedMain}
                onChange={(e) => setPaddedMain(e.target.checked)}
              />
              Padded Main
            </label>

            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                checked={showFooter}
                onChange={(e) => setShowFooter(e.target.checked)}
              />
              Show Footer
            </label>

            <label
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              Max Width:
              <select
                value={maxWidth}
                onChange={(e) => setMaxWidth(e.target.value as any)}
                style={{ padding: "0.25rem", borderRadius: "4px" }}
              >
                <option value="sm">Small (640px)</option>
                <option value="md">Medium (768px)</option>
                <option value="lg">Large (1024px)</option>
                <option value="xl">Extra Large (1280px)</option>
                <option value="full">Full Width</option>
              </select>
            </label>
          </div>
        </div>

        {/* Layout */}
        <Layout>
          <LayoutHeader sticky={stickyHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Icon name="settings" />
              <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
                Interactive Layout
              </h1>
            </div>
            <div
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "var(--color-semantic-surface-raised)",
                borderRadius: "4px",
                fontSize: "0.75rem",
                color: "var(--color-semantic-text-secondary)",
              }}
            >
              {stickyHeader ? "Sticky" : "Static"} •{" "}
              {paddedMain ? "Padded" : "No Padding"} • {maxWidth.toUpperCase()}
            </div>
          </LayoutHeader>

          <LayoutBody>
            <LayoutMain padded={paddedMain}>
              <LayoutContent maxWidth={maxWidth}>
                <div style={{ padding: paddedMain ? "0" : "2rem" }}>
                  <h2
                    style={{
                      marginTop: paddedMain ? 0 : "2rem",
                      marginBottom: "1rem",
                      fontSize: "2rem",
                    }}
                  >
                    Configure Your Layout
                  </h2>
                  <p
                    style={{
                      marginBottom: "2rem",
                      color: "var(--color-semantic-text-secondary)",
                    }}
                  >
                    Use the controls in the top-right to experiment with
                    different layout configurations. This interactive example
                    demonstrates the flexibility of the Layout system.
                  </p>

                  {/* Generate content to test scrolling */}
                  {Array.from({ length: 15 }, (_, i) => (
                    <div
                      key={i}
                      style={{
                        marginBottom: "1.5rem",
                        padding: "1.5rem",
                        backgroundColor: "var(--color-semantic-surface-raised)",
                        borderRadius: "8px",
                        border:
                          "1px solid var(--color-semantic-border-default)",
                      }}
                    >
                      <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
                        Content Section {i + 1}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          color: "var(--color-semantic-text-secondary)",
                        }}
                      >
                        This content demonstrates how the layout behaves with
                        different configurations.
                        {stickyHeader
                          ? " The sticky header remains at the top while scrolling."
                          : " The header scrolls with the content."}
                        {paddedMain
                          ? " Main content has padding."
                          : " Main content has no padding."}{" "}
                        Max-width is set to {maxWidth}.
                      </p>
                    </div>
                  ))}
                </div>
              </LayoutContent>
            </LayoutMain>
          </LayoutBody>

          {showFooter && (
            <LayoutFooter>
              <p style={{ margin: 0, fontSize: "0.875rem" }}>
                Interactive Layout Configuration • Try the controls above
              </p>
            </LayoutFooter>
          )}
        </Layout>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Interactive layout example with live controls to experiment with different configuration options. Toggle sticky header, main padding, content width, and footer visibility to see how the Layout system adapts.",
      },
    },
  },
};
