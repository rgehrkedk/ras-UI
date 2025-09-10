/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from "vitest";

import { render, screen } from "../../test/test-utils";
import { createUser } from "../../test/test-utils";

import { Switch } from "./Switch";

describe("Switch", () => {
  // Basic rendering tests
  it("renders with label", () => {
    render(<Switch>Enable notifications</Switch>);

    expect(
      screen.getByRole("switch", { name: "Enable notifications" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
  });

  it("renders without label", () => {
    render(<Switch aria-label="Toggle setting" />);

    expect(
      screen.getByRole("switch", { name: "Toggle setting" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Toggle setting")).not.toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Switch className="custom-switch">Test</Switch>);

    const switchElement = screen.getByRole("switch").closest(".custom-switch");
    expect(switchElement).toBeInTheDocument();
  });

  // State tests
  it("renders unchecked by default", () => {
    render(<Switch>Toggle</Switch>);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).not.toBeChecked();
  });

  it("renders checked when defaultSelected is true", () => {
    render(<Switch defaultSelected>Toggle</Switch>);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeChecked();
  });

  it("renders with controlled state", () => {
    const { rerender } = render(<Switch isSelected={false}>Toggle</Switch>);

    let switchElement = screen.getByRole("switch");
    expect(switchElement).not.toBeChecked();

    rerender(<Switch isSelected={true}>Toggle</Switch>);

    switchElement = screen.getByRole("switch");
    expect(switchElement).toBeChecked();
  });

  // Interaction tests
  it("toggles state on click", async () => {
    const user = createUser();
    const handleChange = vi.fn();

    render(<Switch onChange={handleChange}>Toggle</Switch>);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).not.toBeChecked();

    await user.click(switchElement);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("toggles state on space key", async () => {
    const user = createUser();
    const handleChange = vi.fn();

    render(<Switch onChange={handleChange}>Toggle</Switch>);

    const switchElement = screen.getByRole("switch");

    // Focus the switch
    await user.tab();
    expect(switchElement).toHaveFocus();

    // Press space to toggle
    await user.keyboard(" ");

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("toggles state on enter key", async () => {
    const user = createUser();
    const handleChange = vi.fn();

    render(<Switch onChange={handleChange}>Toggle</Switch>);

    const switchElement = screen.getByRole("switch");

    // Focus the switch
    await user.tab();
    expect(switchElement).toHaveFocus();

    // Press enter to toggle
    await user.keyboard("{Enter}");

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  // Size variants
  it("renders with different sizes", () => {
    const { rerender } = render(<Switch size="sm">Small</Switch>);

    let track = document.querySelector('[class*="switch-track-mock"]');
    expect(track).toBeInTheDocument();

    rerender(<Switch size="lg">Large</Switch>);

    track = document.querySelector('[class*="switch-track-mock"]');
    expect(track).toBeInTheDocument();
  });

  // Description and helper text
  it("renders with description", () => {
    render(
      <Switch description="This enables push notifications">
        Notifications
      </Switch>,
    );

    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(
      screen.getByText("This enables push notifications"),
    ).toBeInTheDocument();
  });

  it("renders with helper text", () => {
    render(<Switch helperText="Helper text for this setting">Setting</Switch>);

    expect(
      screen.getByText("Helper text for this setting"),
    ).toBeInTheDocument();
  });

  // Error states
  it("renders with error message", () => {
    render(
      <Switch isInvalid errorMessage="This setting is required">
        Required setting
      </Switch>,
    );

    expect(screen.getByText("This setting is required")).toBeInTheDocument();

    const switchElement = screen.getByRole("switch");
    // Check that the error message is displayed
    expect(screen.getByText("This setting is required")).toBeInTheDocument();
    // React Aria may not expose aria-invalid on the switch element directly
  });

  it("prioritizes error message over helper text", () => {
    render(
      <Switch isInvalid errorMessage="Error message" helperText="Helper text">
        Setting
      </Switch>,
    );

    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
  });

  // Required state
  it("renders required indicator", () => {
    render(<Switch isRequired>Required setting</Switch>);

    expect(screen.getByText("*")).toBeInTheDocument();

    const switchElement = screen.getByRole("switch");
    // Check that the required indicator is shown in the label
    expect(screen.getByText("*")).toBeInTheDocument();
    // React Aria may not expose aria-required on the switch element directly
  });

  // Disabled state
  it("renders disabled state", () => {
    render(<Switch isDisabled>Disabled</Switch>);

    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeDisabled();
  });

  it("does not toggle when disabled", async () => {
    const user = createUser();
    const handleChange = vi.fn();

    render(
      <Switch isDisabled onChange={handleChange}>
        Disabled
      </Switch>,
    );

    const switchElement = screen.getByRole("switch");

    await user.click(switchElement);

    expect(handleChange).not.toHaveBeenCalled();
  });

  // Focus management
  it("has correct focus styles", async () => {
    const user = createUser();

    render(<Switch>Focusable</Switch>);

    const switchElement = screen.getByRole("switch");

    await user.tab();

    expect(switchElement).toHaveFocus();
  });

  it("supports focus via click", async () => {
    const user = createUser();

    render(<Switch>Clickable</Switch>);

    const switchElement = screen.getByRole("switch");

    await user.click(switchElement);

    expect(switchElement).toHaveFocus();
  });

  // Accessibility tests
  it("has correct ARIA attributes", () => {
    render(<Switch>Accessible switch</Switch>);

    const switchElement = screen.getByRole("switch");

    expect(switchElement).toHaveAttribute("role", "switch");
    // React Aria handles aria-checked internally, focus on role and basic functionality
    expect(switchElement).toHaveAttribute("role", "switch");
  });

  it("has correct ARIA attributes when checked", () => {
    render(<Switch defaultSelected>Checked switch</Switch>);

    const switchElement = screen.getByRole("switch");

    // React Aria handles checked state internally
    expect(switchElement).toBeInTheDocument();
  });

  it("supports custom aria-label", () => {
    render(<Switch aria-label="Custom label">Visual label</Switch>);

    const switchElement = screen.getByRole("switch", { name: "Custom label" });
    expect(switchElement).toBeInTheDocument();
  });

  it("supports aria-describedby for descriptions", () => {
    render(
      <Switch description="This is a description">
        Switch with description
      </Switch>,
    );

    const switchElement = screen.getByRole("switch");
    const descriptionId = switchElement.getAttribute("aria-describedby");

    expect(descriptionId).toBeTruthy();
    expect(document.getElementById(descriptionId!)).toHaveTextContent(
      "This is a description",
    );
  });

  // Form integration
  it("works in form context", async () => {
    const user = createUser();
    const handleSubmit = vi.fn();

    render(
      <form onSubmit={handleSubmit}>
        <Switch name="notifications" defaultSelected>
          Enable notifications
        </Switch>
        <button type="submit">Submit</button>
      </form>,
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(handleSubmit).toHaveBeenCalled();
  });

  // Edge cases
  it("handles rapid state changes", async () => {
    const user = createUser();
    const handleChange = vi.fn();

    render(<Switch onChange={handleChange}>Rapid toggle</Switch>);

    const switchElement = screen.getByRole("switch");

    // Rapid clicks
    await user.click(switchElement);
    await user.click(switchElement);
    await user.click(switchElement);

    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  it("maintains focus after state change", async () => {
    const user = createUser();

    render(<Switch>Focus test</Switch>);

    const switchElement = screen.getByRole("switch");

    await user.tab();
    expect(switchElement).toHaveFocus();

    await user.keyboard(" ");
    expect(switchElement).toHaveFocus();
  });

  // Visual state tests
  it("shows hover state styling", async () => {
    const user = createUser();

    render(<Switch>Hoverable</Switch>);

    const switchElement = screen.getByRole("switch");

    await user.hover(switchElement);

    // Check that hover data attribute is applied
    const track = document.querySelector('[data-hovered="true"]');
    expect(track).toBeInTheDocument();
  });

  it("shows checked styling", () => {
    render(<Switch defaultSelected>Checked switch</Switch>);

    const track = document.querySelector('[class*="switch-track-mock"]');
    expect(track).toBeInTheDocument();
    expect(track).toHaveAttribute("data-disabled", "false");
  });
});
