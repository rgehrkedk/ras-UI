/**
 * Checkbox component Storybook stories
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Form/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible checkbox component built on React Aria Components with support for checked, unchecked, and indeterminate states.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size variant of the checkbox",
      defaultValue: "md",
    },
    isSelected: {
      control: { type: "boolean" },
      description: "Whether the checkbox is selected",
    },
    isIndeterminate: {
      control: { type: "boolean" },
      description: "Whether the checkbox is in indeterminate state",
    },
    isDisabled: {
      control: { type: "boolean" },
      description: "Whether the checkbox is disabled",
    },
    isRequired: {
      control: { type: "boolean" },
      description: "Whether the checkbox is required",
    },
    isInvalid: {
      control: { type: "boolean" },
      description: "Whether the checkbox has a validation error",
    },
    errorMessage: {
      control: { type: "text" },
      description: "Error message to display below the checkbox",
    },
    description: {
      control: { type: "text" },
      description: "Description text to display below the checkbox",
    },
    children: {
      control: { type: "text" },
      description: "Checkbox label text",
      defaultValue: "Accept terms and conditions",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    children: "Accept terms and conditions",
  },
};

export const Indeterminate: Story = {
  args: {
    children: "Indeterminate checkbox",
    isIndeterminate: true,
  },
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox size="sm">Small checkbox</Checkbox>
      <Checkbox size="md">Medium checkbox (default)</Checkbox>
      <Checkbox size="lg">Large checkbox</Checkbox>
    </div>
  ),
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false);

    return (
      <Checkbox isSelected={isSelected} onChange={setIsSelected}>
        {isSelected ? "Thanks for accepting!" : "Accept terms and conditions"}
      </Checkbox>
    );
  },
};

// Group Example
export const CheckboxGroup: Story = {
  render: () => {
    const [selections, setSelections] = useState({
      feature1: false,
      feature2: true,
      feature3: false,
    });

    const handleChange =
      (key: keyof typeof selections) => (isSelected: boolean) => {
        setSelections((prev) => ({ ...prev, [key]: isSelected }));
      };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: 600 }}>
          Select features:
        </h3>
        <Checkbox
          isSelected={selections.feature1}
          onChange={handleChange("feature1")}
        >
          Feature 1: Advanced analytics
        </Checkbox>
        <Checkbox
          isSelected={selections.feature2}
          onChange={handleChange("feature2")}
        >
          Feature 2: Real-time sync
        </Checkbox>
        <Checkbox
          isSelected={selections.feature3}
          onChange={handleChange("feature3")}
        >
          Feature 3: Custom integrations
        </Checkbox>
      </div>
    );
  },
};

// Form States
export const FormStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox>Normal checkbox</Checkbox>
      <Checkbox isRequired>Required checkbox *</Checkbox>
      <Checkbox isDisabled>Disabled checkbox</Checkbox>
      <Checkbox isSelected isDisabled>
        Disabled + checked
      </Checkbox>
      <Checkbox isIndeterminate isDisabled>
        Disabled + indeterminate
      </Checkbox>
    </div>
  ),
};

// Form Validation Examples
export const ValidationStates: Story = {
  name: "Form Validation",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "400px",
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          Error States
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Checkbox
            isInvalid
            errorMessage="You must accept the terms and conditions to continue"
          >
            Accept terms and conditions
          </Checkbox>

          <Checkbox isRequired isInvalid errorMessage="This field is required">
            Subscribe to newsletter *
          </Checkbox>
        </div>
      </div>

      <div>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          With Descriptions
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Checkbox description="We'll only send you important updates and never spam">
            Email notifications
          </Checkbox>

          <Checkbox
            description="Allow us to collect anonymous usage data to improve the product"
            isSelected
          >
            Analytics tracking
          </Checkbox>
        </div>
      </div>

      <div>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          Complex Validation
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Checkbox
            isRequired
            description="Review our privacy policy for details on how we handle your data"
            errorMessage="You must accept the privacy policy"
            isInvalid
          >
            I have read and accept the Privacy Policy *
          </Checkbox>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples of checkbox validation states including error messages, descriptions, and complex form validation scenarios. All examples include proper ARIA attributes for screen reader accessibility.",
      },
    },
  },
};

// Interactive Form Validation
export const InteractiveValidation: Story = {
  name: "Interactive Form Validation",
  render: () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [newsletter, setNewsletter] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);

      if (acceptedTerms && acceptedPrivacy) {
        alert("Form submitted successfully!");
        // Reset form
        setAcceptedTerms(false);
        setAcceptedPrivacy(false);
        setNewsletter(false);
        setSubmitted(false);
      }
    };

    const termsError = submitted && !acceptedTerms;
    const privacyError = submitted && !acceptedPrivacy;

    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h4
            style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}
          >
            Account Registration
          </h4>

          <Checkbox
            isRequired
            isSelected={acceptedTerms}
            onChange={setAcceptedTerms}
            isInvalid={termsError}
            errorMessage={
              termsError
                ? "You must accept the terms to create an account"
                : undefined
            }
            description="Please review our terms of service before continuing"
          >
            I accept the Terms of Service *
          </Checkbox>

          <Checkbox
            isRequired
            isSelected={acceptedPrivacy}
            onChange={setAcceptedPrivacy}
            isInvalid={privacyError}
            errorMessage={
              privacyError ? "Privacy policy acceptance is required" : undefined
            }
          >
            I have read and accept the Privacy Policy *
          </Checkbox>

          <Checkbox
            isSelected={newsletter}
            onChange={setNewsletter}
            description="Get product updates, tips, and special offers (optional)"
          >
            Subscribe to our newsletter
          </Checkbox>

          <button
            type="submit"
            style={{
              marginTop: "16px",
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </div>
      </form>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Interactive form validation example showing real-time error states, required field validation, and proper ARIA announcements. Try submitting without checking required checkboxes to see validation in action.",
      },
    },
  },
};

// Accessibility Testing
export const AccessibilityTest: Story = {
  name: "Accessibility Testing",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "600px",
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          Touch Target Testing (All 44x44px minimum)
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            border: "1px dashed #ccc",
            padding: "16px",
            borderRadius: "4px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
            Each checkbox has a minimum 44x44px touch target (shown with dashed
            lines)
          </div>
          <div
            style={{ border: "1px dashed #ff0000", display: "inline-block" }}
          >
            <Checkbox size="sm">Small checkbox (44x44px touch area)</Checkbox>
          </div>
          <div
            style={{ border: "1px dashed #ff0000", display: "inline-block" }}
          >
            <Checkbox size="md">Medium checkbox (44x44px touch area)</Checkbox>
          </div>
          <div
            style={{ border: "1px dashed #ff0000", display: "inline-block" }}
          >
            <Checkbox size="lg">Large checkbox (44x44px touch area)</Checkbox>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          Screen Reader Testing
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Checkbox aria-label="Unlabeled checkbox with aria-label" />

          <div>
            <div
              id="external-label"
              style={{ marginBottom: "8px", fontWeight: 500 }}
            >
              External Label Example
            </div>
            <Checkbox aria-labelledby="external-label" />
          </div>

          <Checkbox
            description="This description should be announced by screen readers"
            errorMessage="This error should also be announced"
            isInvalid
          >
            Checkbox with description and error
          </Checkbox>
        </div>
      </div>

      <div>
        <h4 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600 }}>
          Keyboard Navigation Test
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
            Use Tab to navigate, Space to toggle. Focus indicators should be
            clearly visible.
          </div>
          <Checkbox>First checkbox</Checkbox>
          <Checkbox>Second checkbox</Checkbox>
          <Checkbox>Third checkbox</Checkbox>
          <button style={{ marginTop: "8px", padding: "8px" }}>
            Focusable button after checkboxes
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Comprehensive accessibility testing examples including touch target visualization, screen reader compatibility, and keyboard navigation patterns. Use this story to verify WCAG compliance.",
      },
    },
  },
};

// Brand Showcase
export const BrandShowcase: Story = {
  name: "Brand Showcase",
  render: () => {
    const ComponentVariants = () => (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <h5
            style={{
              margin: "0 0 0.5rem 0",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            States & Sizes
          </h5>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <Checkbox isSelected>Checked checkbox</Checkbox>
            <Checkbox>Unchecked checkbox</Checkbox>
            <Checkbox isIndeterminate>Indeterminate state</Checkbox>
          </div>
        </div>
        <div>
          <h5
            style={{
              margin: "0 0 0.5rem 0",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            Size Variants
          </h5>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <Checkbox size="sm" isSelected>
              Small checkbox
            </Checkbox>
            <Checkbox size="md" isSelected>
              Medium checkbox
            </Checkbox>
            <Checkbox size="lg" isSelected>
              Large checkbox
            </Checkbox>
          </div>
        </div>
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
          "Checkbox appearance across all three brand themes, showing how form controls adapt their visual styling while preserving consistent interaction patterns and accessibility features.",
      },
    },
  },
};
