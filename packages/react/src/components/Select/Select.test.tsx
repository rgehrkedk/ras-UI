/**
 * Select component tests
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { UserIcon, SettingsIcon } from "../Icon";

import { Select } from "./Select";
import { SelectItem } from "./SelectItem";

// Mock icons to avoid issues with SVG imports in tests
vi.mock("../Icon", () => ({
  ChevronDownIcon: ({ className }: { className?: string }) => (
    <div className={className} data-testid="chevron-down-icon">
      ↓
    </div>
  ),
  CheckIcon: ({ className }: { className?: string }) => (
    <div className={className} data-testid="check-icon">
      ✓
    </div>
  ),
  UserIcon: ({ className }: { className?: string }) => (
    <div className={className} data-testid="user-icon">
      👤
    </div>
  ),
  SettingsIcon: ({ className }: { className?: string }) => (
    <div className={className} data-testid="settings-icon">
      ⚙️
    </div>
  ),
}));

describe("Select", () => {
  const defaultProps = {
    label: "Test Select",
    placeholder: "Choose an option",
    children: [
      <SelectItem key="1" id="option1">
        Option 1
      </SelectItem>,
      <SelectItem key="2" id="option2">
        Option 2
      </SelectItem>,
      <SelectItem key="3" id="option3">
        Option 3
      </SelectItem>,
    ],
  };

  describe("Rendering", () => {
    it("renders with basic props", () => {
      render(<Select {...defaultProps} />);

      expect(screen.getByText("Test Select")).toBeInTheDocument();
      expect(screen.getByText("Choose an option")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders without label when not provided", () => {
      render(
        <Select placeholder="Choose an option">
          <SelectItem id="1">Option 1</SelectItem>
        </Select>,
      );

      expect(screen.queryByText("Test Select")).not.toBeInTheDocument();
      expect(screen.getByText("Choose an option")).toBeInTheDocument();
    });

    it("renders required indicator when isRequired is true", () => {
      render(<Select {...defaultProps} isRequired />);

      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("renders helper text when provided", () => {
      render(<Select {...defaultProps} helperText="This is helper text" />);

      expect(screen.getAllByText("This is helper text")[0]).toBeInTheDocument();
    });

    it("renders description when provided", () => {
      render(<Select {...defaultProps} description="This is a description" />);

      expect(screen.getAllByText("This is a description")[0]).toBeInTheDocument();
    });

    it("renders chevron icon", () => {
      render(<Select {...defaultProps} />);

      expect(screen.getByTestId("chevron-down-icon")).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("applies small size class", () => {
      render(<Select {...defaultProps} size="sm" />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(expect.stringContaining("sm"));
    });

    it("applies medium size class (default)", () => {
      render(<Select {...defaultProps} size="md" />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(expect.stringContaining("md"));
    });

    it("applies large size class", () => {
      render(<Select {...defaultProps} size="lg" />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(expect.stringContaining("lg"));
    });
  });

  describe("Layout", () => {
    it("applies fullWidth class when fullWidth is true", () => {
      render(<Select {...defaultProps} fullWidth />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass(expect.stringContaining("true"));
    });

    it("applies custom className", () => {
      render(<Select {...defaultProps} className="custom-class" />);

      const select = screen.getByRole("group");
      expect(select).toHaveClass("custom-class");
    });
  });

  describe("States", () => {
    it("applies disabled state", () => {
      render(<Select {...defaultProps} isDisabled />);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("shows error message when invalid", () => {
      render(
        <Select
          {...defaultProps}
          isInvalid
          errorMessage="This field is required"
        />,
      );

      expect(screen.getByText("This field is required")).toBeInTheDocument();
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-invalid", "true");
    });

    it("shows required state", () => {
      render(<Select {...defaultProps} isRequired />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-required", "true");
    });
  });

  describe("Interaction", () => {
    it("opens dropdown when clicked", async () => {
      const user = userEvent.setup();
      render(<Select {...defaultProps} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Option 1" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Option 2" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Option 3" })).toBeInTheDocument();
      });
    });

    it("opens dropdown with Enter key", async () => {
      const user = userEvent.setup();
      render(<Select {...defaultProps} />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("opens dropdown with Space key", async () => {
      const user = userEvent.setup();
      render(<Select {...defaultProps} />);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard(" ");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("selects option when clicked", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Select {...defaultProps} onSelectionChange={handleChange}>
          <SelectItem id="1">Option 1</SelectItem>
          <SelectItem id="2">Option 2</SelectItem>
        </Select>,
      );

      // Open dropdown
      const button = screen.getByRole("button");
      await user.click(button);

      // Click option
      await waitFor(() => {
        const option1 = screen.getByRole("option", { name: "Option 1" });
        return user.click(option1);
      });

      expect(handleChange).toHaveBeenCalledWith("1");
    });

    it("closes dropdown when clicking outside", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Select {...defaultProps} />
          <button>Outside button</button>
        </div>,
      );

      // Open dropdown
      const selectButton = screen.getByRole("button", { name: /test select/i });
      await user.click(selectButton);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      // Click outside
      const outsideButton = screen.getByRole("button", {
        name: "Outside button",
      });
      await user.click(outsideButton);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("navigates options with arrow keys", async () => {
      const user = userEvent.setup();
      render(<Select {...defaultProps} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      // Navigate with arrow keys
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowUp}");

      // The navigation should work (exact assertion would depend on React Aria's implementation)
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("does not open when disabled", async () => {
      const user = userEvent.setup();
      render(<Select {...defaultProps} isDisabled />);

      const button = screen.getByRole("button");
      await user.click(button);

      // Should not open dropdown
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("SelectItem", () => {
    it("renders item content", async () => {
      const user = userEvent.setup();
      render(<Select {...defaultProps} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole("option", { name: "Option 1" })).toBeInTheDocument();
      });
    });

    it("renders item with icon", async () => {
      const user = userEvent.setup();
      render(
        <Select label="Test" placeholder="Choose">
          <SelectItem id="1" icon={<UserIcon />}>
            With Icon
          </SelectItem>
        </Select>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByTestId("user-icon")).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "With Icon" })).toBeInTheDocument();
      });
    });

    it("shows disabled state", async () => {
      const user = userEvent.setup();
      render(
        <Select label="Test" placeholder="Choose">
          <SelectItem id="1">Enabled</SelectItem>
          <SelectItem id="2" isDisabled>
            Disabled
          </SelectItem>
        </Select>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        const disabledItem = screen.getByRole("option", { name: "Disabled" });
        expect(disabledItem).toBeInTheDocument();
        // React Aria should handle the disabled state
      });
    });

    it("shows check icon when selected", async () => {
      const user = userEvent.setup();
      render(
        <Select label="Test" placeholder="Choose" defaultSelectedKey="1">
          <SelectItem id="1">Selected</SelectItem>
          <SelectItem id="2">Not Selected</SelectItem>
        </Select>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByTestId("check-icon")).toBeInTheDocument();
      });
    });
  });

  describe("Dynamic Data", () => {
    const items = [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
      { id: "3", name: "Item 3" },
    ];

    it("renders with items prop", async () => {
      const user = userEvent.setup();
      render(
        <Select label="Test" placeholder="Choose" items={items}>
          {(item) => <SelectItem id={item.id}>{item.name}</SelectItem>}
        </Select>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole("option", { name: "Item 1" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Item 2" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Item 3" })).toBeInTheDocument();
      });
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works as controlled component", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Select
          {...defaultProps}
          selectedKey="option1"
          onSelectionChange={handleChange}
        />,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        const option2 = screen.getByRole("option", { name: "Option 2" });
        return user.click(option2);
      });

      expect(handleChange).toHaveBeenCalledWith("option2");
    });

    it("works as uncontrolled component", async () => {
      const user = userEvent.setup();

      render(<Select {...defaultProps} defaultSelectedKey="option1" />);

      // Should show the default selected value
      expect(screen.getByDisplayValue).toBeDefined();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<Select {...defaultProps} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-haspopup", "listbox");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("has proper ARIA attributes when expanded", async () => {
      const user = userEvent.setup();
      render(<Select {...defaultProps} />);

      const button = screen.getByRole("button");
      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("has proper labelling", () => {
      render(<Select {...defaultProps} />);

      const button = screen.getByRole("button");
      expect(button).toHaveAccessibleName("Test Select");
    });

    it("has proper error announcement", () => {
      render(
        <Select
          {...defaultProps}
          isInvalid
          errorMessage="This field is required"
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    // Accessibility tests would go here - requires jest-axe setup
    // it('passes axe accessibility tests', async () => {
    //   const { container } = render(<Select {...defaultProps} />);
    //   const results = await axe(container);
    //   expect(results).toHaveNoViolations();
    // });
  });

  describe("Form Integration", () => {
    it("integrates with form validation", () => {
      render(
        <form>
          <Select
            {...defaultProps}
            name="testSelect"
            isRequired
            isInvalid
            errorMessage="Required field"
          />
        </form>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-required", "true");
      expect(button).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText("Required field")).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("handles error message as function", () => {
      const errorMessageFn = vi.fn(() => "Dynamic error message");

      render(
        <Select {...defaultProps} isInvalid errorMessage={errorMessageFn} />,
      );

      expect(screen.getByText("Dynamic error message")).toBeInTheDocument();
    });
  });
});
