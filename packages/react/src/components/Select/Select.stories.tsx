/**
 * Select component stories for Storybook
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Key } from "react-aria-components";

import {
  UserIcon,
  SettingsIcon,
  HomeIcon,
  MailIcon,
  EditIcon,
  TrashIcon,
} from "../Icon";

import { Select } from "./Select";
import type { SelectProps } from "./Select";
import { SelectItem } from "./SelectItem";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Select component provides accessible dropdown selection functionality built on React Aria Components.

## Features
- **Accessible**: Full keyboard navigation and screen reader support
- **Flexible**: Support for static items or dynamic data collections  
- **Customizable**: Multiple size variants and styling options
- **Form Integration**: Built-in validation and error handling
- **Multi-brand**: Supports all brand themes (default, vibrant, corporate)

## Usage

### Basic Select
\`\`\`tsx
<Select label="Country" placeholder="Select a country">
  <SelectItem id="us">United States</SelectItem>
  <SelectItem id="ca">Canada</SelectItem>
  <SelectItem id="mx">Mexico</SelectItem>
</Select>
\`\`\`

### With Data Collection
\`\`\`tsx
const countries = [
  { id: 'us', name: 'United States' },
  { id: 'ca', name: 'Canada' }
];

<Select label="Country" items={countries}>
  {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
</Select>
\`\`\`

### Form Validation
\`\`\`tsx
<Select 
  label="Status" 
  isRequired 
  isInvalid={!value}
  errorMessage="Please select a status"
>
  <SelectItem id="draft">Draft</SelectItem>
  <SelectItem id="published">Published</SelectItem>
</Select>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant of the select",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Whether select should take full width of container",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Whether select is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isRequired: {
      control: "boolean",
      description: "Whether select is required",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isInvalid: {
      control: "boolean",
      description: "Whether select has validation errors",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "Label text for the select",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the select",
    },
    errorMessage: {
      control: "text",
      description: "Error message displayed when invalid",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

// Basic story with controlled state
const BasicSelectTemplate = (args: SelectProps<object>) => {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);

  return (
    <div style={{ width: "300px" }}>
      <Select
        {...args}
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
      >
        <SelectItem id="us">United States</SelectItem>
        <SelectItem id="ca">Canada</SelectItem>
        <SelectItem id="mx">Mexico</SelectItem>
        <SelectItem id="uk">United Kingdom</SelectItem>
        <SelectItem id="de">Germany</SelectItem>
        <SelectItem id="fr">France</SelectItem>
        <SelectItem id="jp">Japan</SelectItem>
      </Select>
      <p
        style={{
          marginTop: "1rem",
          fontSize: "14px",
          color: "var(--color-semantic-text-secondary)",
        }}
      >
        Selected: {selectedKey || "None"}
      </p>
    </div>
  );
};

export const Default: Story = {
  render: BasicSelectTemplate,
  args: {
    label: "Country",
    placeholder: "Select a country",
    size: "md",
  },
};

export const WithoutLabel: Story = {
  render: BasicSelectTemplate,
  args: {
    placeholder: "Choose an option...",
    size: "md",
  },
};

export const Required: Story = {
  render: BasicSelectTemplate,
  args: {
    label: "Country",
    placeholder: "Select a country",
    isRequired: true,
    helperText: "This field is required",
    size: "md",
  },
};

export const WithError: Story = {
  render: BasicSelectTemplate,
  args: {
    label: "Country",
    placeholder: "Select a country",
    isRequired: true,
    isInvalid: true,
    errorMessage: "Please select a valid country",
    size: "md",
  },
};

export const Disabled: Story = {
  render: BasicSelectTemplate,
  args: {
    label: "Country",
    placeholder: "Select a country",
    isDisabled: true,
    helperText: "This field is currently disabled",
    size: "md",
  },
};

// Size variants
export const SizeSmall: Story = {
  render: BasicSelectTemplate,
  args: {
    label: "Country",
    placeholder: "Select a country",
    size: "sm",
  },
};

export const SizeLarge: Story = {
  render: BasicSelectTemplate,
  args: {
    label: "Country",
    placeholder: "Select a country",
    size: "lg",
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div
      style={{
        width: "400px",
        padding: "20px",
        border: "1px dashed var(--color-border-default)",
      }}
    >
      <BasicSelectTemplate {...args} />
    </div>
  ),
  args: {
    label: "Country",
    placeholder: "Select a country",
    fullWidth: true,
    size: "md",
  },
};

// Select with icons
const IconSelectTemplate = (args: SelectProps<object>) => {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);

  return (
    <div style={{ width: "300px" }}>
      <Select
        {...args}
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
      >
        <SelectItem id="home" icon={<HomeIcon />}>
          Home
        </SelectItem>
        <SelectItem id="profile" icon={<UserIcon />}>
          Profile
        </SelectItem>
        <SelectItem id="settings" icon={<SettingsIcon />}>
          Settings
        </SelectItem>
        <SelectItem id="messages" icon={<MailIcon />}>
          Messages
        </SelectItem>
      </Select>
      <p
        style={{
          marginTop: "1rem",
          fontSize: "14px",
          color: "var(--color-semantic-text-secondary)",
        }}
      >
        Selected: {selectedKey || "None"}
      </p>
    </div>
  );
};

export const WithIcons: Story = {
  render: IconSelectTemplate,
  args: {
    label: "Navigation",
    placeholder: "Choose a page",
    size: "md",
  },
};

// Dynamic data example
interface User {
  id: string;
  name: string;
  role: string;
  status: "active" | "inactive";
}

const users: User[] = [
  { id: "1", name: "John Doe", role: "Admin", status: "active" },
  { id: "2", name: "Jane Smith", role: "Editor", status: "active" },
  { id: "3", name: "Bob Johnson", role: "User", status: "inactive" },
  { id: "4", name: "Alice Brown", role: "Moderator", status: "active" },
  { id: "5", name: "Charlie Wilson", role: "User", status: "active" },
];

const DynamicDataTemplate = (args: SelectProps<User>) => {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);

  return (
    <div style={{ width: "350px" }}>
      <Select
        {...args}
        items={users}
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
      >
        {(user) => (
          <SelectItem
            id={user.id}
            isDisabled={user.status === "inactive"}
            icon={<UserIcon />}
          >
            <div>
              <div style={{ fontWeight: "medium" }}>{user.name}</div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--color-semantic-text-secondary)",
                  marginTop: "2px",
                }}
              >
                {user.role} • {user.status}
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      <p style={{ marginTop: "1rem", fontSize: "14px", color: "#666" }}>
        Selected:{" "}
        {selectedKey ? users.find((u) => u.id === selectedKey)?.name : "None"}
      </p>
    </div>
  );
};

export const DynamicData = {
  render: DynamicDataTemplate,
  args: {
    label: "Assign User",
    placeholder: "Select a user",
    helperText: "Inactive users are disabled",
    size: "md",
  },
};

// Actions example
const ActionsTemplate = (args: SelectProps<object>) => {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const [message, setMessage] = useState("");

  const handleSelectionChange = (key: Key | null) => {
    setSelectedKey(key);
    if (key) {
      setMessage(`Selected action: ${key}`);
      // Reset after a moment
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div style={{ width: "300px" }}>
      <Select
        {...args}
        selectedKey={selectedKey}
        onSelectionChange={handleSelectionChange}
      >
        <SelectItem id="edit" icon={<EditIcon />}>
          Edit Item
        </SelectItem>
        <SelectItem id="duplicate" icon={<UserIcon />}>
          Duplicate
        </SelectItem>
        <SelectItem id="delete" icon={<TrashIcon />}>
          Delete Item
        </SelectItem>
      </Select>
      {message && (
        <p
          style={{
            marginTop: "1rem",
            fontSize: "14px",
            color: "var(--color-semantic-success)",
            fontWeight: "medium",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export const Actions: Story = {
  render: ActionsTemplate,
  args: {
    label: "Actions",
    placeholder: "Choose an action",
    size: "md",
  },
};

// Multiple selects showing size comparison
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
      <div>
        <Select label="Small" placeholder="Small size" size="sm">
          <SelectItem id="1">Option 1</SelectItem>
          <SelectItem id="2">Option 2</SelectItem>
          <SelectItem id="3">Option 3</SelectItem>
        </Select>
      </div>
      <div>
        <Select label="Medium" placeholder="Medium size" size="md">
          <SelectItem id="1">Option 1</SelectItem>
          <SelectItem id="2">Option 2</SelectItem>
          <SelectItem id="3">Option 3</SelectItem>
        </Select>
      </div>
      <div>
        <Select label="Large" placeholder="Large size" size="lg">
          <SelectItem id="1">Option 1</SelectItem>
          <SelectItem id="2">Option 2</SelectItem>
          <SelectItem id="3">Option 3</SelectItem>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};

// Form example
const FormTemplate = () => {
  const [formData, setFormData] = useState({
    country: null as Key | null,
    role: null as Key | null,
    status: null as Key | null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const isValid = formData.country && formData.role && formData.status;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Select
        label="Country"
        placeholder="Select a country"
        isRequired
        isInvalid={submitted && !formData.country}
        errorMessage={
          submitted && !formData.country ? "Country is required" : undefined
        }
        selectedKey={formData.country}
        onSelectionChange={(key) =>
          setFormData((prev) => ({ ...prev, country: key }))
        }
      >
        <SelectItem id="us">United States</SelectItem>
        <SelectItem id="ca">Canada</SelectItem>
        <SelectItem id="uk">United Kingdom</SelectItem>
        <SelectItem id="de">Germany</SelectItem>
      </Select>

      <Select
        label="Role"
        placeholder="Select a role"
        isRequired
        isInvalid={submitted && !formData.role}
        errorMessage={
          submitted && !formData.role ? "Role is required" : undefined
        }
        selectedKey={formData.role}
        onSelectionChange={(key) =>
          setFormData((prev) => ({ ...prev, role: key }))
        }
      >
        <SelectItem id="admin" icon={<SettingsIcon />}>
          Administrator
        </SelectItem>
        <SelectItem id="editor" icon={<EditIcon />}>
          Editor
        </SelectItem>
        <SelectItem id="user" icon={<UserIcon />}>
          User
        </SelectItem>
      </Select>

      <Select
        label="Status"
        placeholder="Select status"
        helperText="Choose the initial account status"
        isRequired
        isInvalid={submitted && !formData.status}
        errorMessage={
          submitted && !formData.status ? "Status is required" : undefined
        }
        selectedKey={formData.status}
        onSelectionChange={(key) =>
          setFormData((prev) => ({ ...prev, status: key }))
        }
      >
        <SelectItem id="active">Active</SelectItem>
        <SelectItem id="pending">Pending</SelectItem>
        <SelectItem id="suspended">Suspended</SelectItem>
      </Select>

      <button
        type="submit"
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1rem",
          backgroundColor: isValid
            ? "var(--color-components-button-primary-background)"
            : "var(--color-components-button-secondary-background)",
          color: isValid
            ? "var(--color-components-button-primary-text)"
            : "var(--color-components-button-secondary-text)",
          border: "none",
          borderRadius: "6px",
          cursor: isValid ? "pointer" : "not-allowed",
          transition: "background-color 0.2s",
        }}
        disabled={!isValid}
      >
        {submitted ? "Submitted!" : "Create Account"}
      </button>

      {submitted && (
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-semantic-success)",
            marginTop: "0.5rem",
          }}
        >
          Form submitted successfully!
        </p>
      )}
    </form>
  );
};

export const FormExample: Story = {
  render: FormTemplate,
  parameters: {
    docs: {
      description: {
        story: "Example of multiple selects in a form with validation.",
      },
    },
  },
};
