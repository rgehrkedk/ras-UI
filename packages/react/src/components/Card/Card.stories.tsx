/**
 * Card component stories demonstrating ras-UI design principles
 */

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "../Badge";
import { Button } from "../Button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Card component family following ras-UI design principles with elevation, interaction states, and design token integration.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    elevation: {
      control: { type: "select" },
      options: ["flat", "low", "medium", "high"],
      description: "Visual elevation level for hierarchy and depth",
    },
    interactive: {
      control: { type: "boolean" },
      description: "Enable hover and interaction states",
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
      description: "Internal padding for content density control",
    },
    onClick: {
      action: "clicked",
      description: "Click handler for interactive cards",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Default card example
export const Default: Story = {
  args: {
    elevation: "low",
    interactive: false,
    padding: "md",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description of the card content. It provides context and
          additional information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Main card content goes here. This could be any React content including
          text, components, or complex layouts.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="primary"
          size="sm"
          onClick={() => console.log("Action triggered")}
        >
          Primary Action
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => console.log("Action triggered")}
        >
          Secondary
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Basic card structure with header, content, and footer sections. Ideal for information display with actions.",
      },
    },
  },
};

// Interactive card with hover states
export const Interactive: Story = {
  args: {
    elevation: "low",
    interactive: true,
    padding: "md",
    onClick: () => console.log("Action triggered"),
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>
          This card responds to hover and click interactions with elevation
          changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Hover over this card to see the interactive effects in action. Click
          to trigger the action handler.
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive card with hover effects and click handling. Perfect for clickable content containers.",
      },
    },
  },
};

// Elevation showcase
export const ElevationLevels: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
      }}
    >
      {(["flat", "low", "medium", "high"] as const).map((elevation) => (
        <Card key={elevation} elevation={elevation}>
          <CardHeader>
            <CardTitle size="sm">Elevation: {elevation}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This card demonstrates the "{elevation}" elevation level.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different elevation levels create visual hierarchy and depth.",
      },
    },
  },
};

// Different title sizes
export const TitleSizes: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
      }}
    >
      {(["sm", "md", "lg"] as const).map((size) => (
        <Card key={size} elevation="medium">
          <CardHeader>
            <CardTitle size={size}>Size: {size}</CardTitle>
            <CardDescription>
              Card title with {size} size variant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content scales appropriately with title size.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Title component supports different size variants for typography hierarchy.",
      },
    },
  },
};

// Padding variants
export const PaddingVariants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
      {(["none", "sm", "md", "lg"] as const).map((padding) => (
        <Card key={padding} elevation="low" padding={padding}>
          <CardHeader>
            <CardTitle size="sm">Padding: {padding}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Internal spacing variant.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different padding options for various content density needs.",
      },
    },
  },
};

// Complex content example (like sporty-book usage)
export const ComplexContent: Story = {
  render: () => (
    <div style={{ maxWidth: "350px" }}>
      <Card
        elevation="medium"
        interactive
        onClick={() => console.log("Action triggered")}
      >
        <CardHeader>
          <CardTitle>Sports Facility</CardTitle>
          <CardDescription>
            Premium tennis court with professional equipment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Badge variant="primary">Tennis</Badge>
              <Badge variant="secondary">Indoor</Badge>
              <Badge variant="outline">Air Conditioned</Badge>
            </div>
            <p>Available today from 9:00 AM - 10:00 PM</p>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-semantic-text-primary)",
              }}
            >
              $45/hour
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="primary"
            fullWidth
            onClick={() => console.log("Action triggered")}
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complex card content with badges, pricing, and booking actions. Demonstrates real-world usage patterns.",
      },
    },
  },
};

// Without header or footer
export const ContentOnly: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <Card elevation="low" padding="lg">
        <CardContent>
          <h3
            style={{
              margin: "0 0 0.5rem 0",
              fontSize: "1.25rem",
              fontWeight: 600,
            }}
          >
            Simple Content Card
          </h3>
          <p
            style={{ margin: 0, color: "var(--color-semantic-text-secondary)" }}
          >
            Sometimes you just need a simple container without the structured
            header/footer layout.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Cards can be used with just content, without requiring header or footer sections.",
      },
    },
  },
};

// Card layouts and compositions
export const CardLayouts: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {/* Product Card */}
      <Card elevation="low">
        <CardHeader>
          <CardTitle>Product Card</CardTitle>
          <CardDescription>
            Standard product information layout with pricing and actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}
          >
            <Badge variant="primary">New</Badge>
            <Badge variant="success">Available</Badge>
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--color-semantic-text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            $299.99
          </div>
          <p>
            High-quality product with excellent features and competitive
            pricing.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            variant="primary"
            size="sm"
            onClick={() => console.log("Action triggered")}
          >
            View Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log("Action triggered")}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>

      {/* Profile Card */}
      <Card elevation="medium">
        <CardHeader>
          <CardTitle size="sm">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "var(--color-semantic-bg-secondary)",
              }}
            ></div>
            <div>
              <div style={{ fontWeight: 600 }}>Sarah Johnson</div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-semantic-text-secondary)",
                }}
              >
                Product Designer
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Badge variant="outline" size="sm">
              UI/UX
            </Badge>
            <Badge variant="outline" size="sm">
              Figma
            </Badge>
            <Badge variant="outline" size="sm">
              Design Systems
            </Badge>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={() => console.log("Action triggered")}
          >
            View Profile
          </Button>
        </CardFooter>
      </Card>

      {/* Notification Card */}
      <Card elevation="high" padding="md">
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "var(--color-semantic-bg-danger)",
                flexShrink: 0,
                marginTop: "2px",
              }}
            ></div>
            <div>
              <h4
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                System Alert
              </h4>
              <p
                style={{
                  margin: "0 0 0.75rem 0",
                  fontSize: "0.875rem",
                  color: "var(--color-semantic-text-secondary)",
                }}
              >
                High elevation for important messages that require immediate
                attention.
              </p>
              <Button
                variant="danger"
                size="sm"
                onClick={() => console.log("Action triggered")}
              >
                Take Action
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Common card layout patterns including product cards, profile cards, and notification cards.",
      },
    },
  },
};

// Accessibility and responsive behavior
export const AccessibilityExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Keyboard Navigation
        </h4>
        <Card
          elevation="low"
          interactive
          onClick={() => console.log("Action triggered")}
        >
          <CardHeader>
            <CardTitle>Focusable Card</CardTitle>
            <CardDescription>
              This entire card is keyboard accessible and focusable
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Use Tab to focus this card, then Enter or Space to activate.</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Screen Reader Support
        </h4>
        <Card
          elevation="low"
          aria-labelledby="article-title"
          aria-describedby="article-summary"
        >
          <CardHeader>
            <CardTitle id="article-title">Article: Design Systems</CardTitle>
            <CardDescription id="article-summary">
              Complete guide to building scalable design systems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Proper ARIA labels and structure help screen readers understand
              card content relationships.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="primary"
              size="sm"
              onClick={() => console.log("Action triggered")}
            >
              Read Article
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <h4
          style={{ margin: "0 0 0.75rem 0", fontSize: "14px", fontWeight: 600 }}
        >
          Responsive Layout
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          <Card elevation="medium" padding="sm">
            <CardContent>
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem" }}>
                Compact
              </h4>
              <p style={{ margin: 0, fontSize: "0.8rem" }}>
                Smaller padding for mobile
              </p>
            </CardContent>
          </Card>
          <Card elevation="medium" padding="lg">
            <CardContent>
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem" }}>
                Spacious
              </h4>
              <p style={{ margin: 0 }}>Larger padding for desktop</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Card accessibility features including keyboard navigation, screen reader support, and responsive behavior.",
      },
    },
  },
};
