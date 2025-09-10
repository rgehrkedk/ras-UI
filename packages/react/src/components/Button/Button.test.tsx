/**
 * Button component tests
 */

import { describe, it, expect, vi } from "vitest";

import { render, screen, createUser } from "../../test/test-utils";

import { Button } from "./Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders different variants", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const user = createUser();
    const handlePress = vi.fn();

    render(<Button onPress={handlePress}>Click me</Button>);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("renders in loading state", () => {
    render(<Button loading>Loading</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("renders with start icon", () => {
    const StartIcon = () => <span data-testid="start-icon">→</span>;

    render(<Button startIcon={<StartIcon />}>With Start Icon</Button>);

    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders with end icon", () => {
    const EndIcon = () => <span data-testid="end-icon">←</span>;

    render(<Button endIcon={<EndIcon />}>With End Icon</Button>);

    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("hides icons when loading", () => {
    const StartIcon = () => <span data-testid="start-icon">→</span>;
    const EndIcon = () => <span data-testid="end-icon">←</span>;

    render(
      <Button loading startIcon={<StartIcon />} endIcon={<EndIcon />}>
        Loading
      </Button>,
    );

    expect(screen.queryByTestId("start-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("end-icon")).not.toBeInTheDocument();
  });

  it("renders full width", () => {
    render(<Button fullWidth>Full Width</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("handles disabled state", async () => {
    const user = createUser();
    const handlePress = vi.fn();

    render(
      <Button isDisabled onPress={handlePress}>
        Disabled
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handlePress).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(<Button ref={ref}>With Ref</Button>);

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it("supports keyboard navigation", async () => {
    const user = createUser();
    const handlePress = vi.fn();

    render(<Button onPress={handlePress}>Keyboard Test</Button>);

    const button = screen.getByRole("button");
    button.focus();

    await user.keyboard("{Enter}");
    expect(handlePress).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(handlePress).toHaveBeenCalledTimes(2);
  });

  it("maintains focus visible styles", async () => {
    const user = createUser();

    render(<Button>Focus Test</Button>);

    const button = screen.getByRole("button");

    // Tab to focus the button
    await user.tab();
    expect(button).toHaveFocus();
  });

  it("prevents multiple calls during loading", async () => {
    const user = createUser();
    const handlePress = vi.fn();

    const { rerender } = render(
      <Button onPress={handlePress}>Click me</Button>,
    );

    const button = screen.getByRole("button");
    await user.click(button);
    expect(handlePress).toHaveBeenCalledTimes(1);

    // Re-render in loading state
    rerender(
      <Button loading onPress={handlePress}>
        Loading
      </Button>,
    );

    await user.click(button);
    // Should not have been called again
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("renders without children", () => {
    const Icon = () => <span data-testid="icon">★</span>;

    render(<Button startIcon={<Icon />} aria-label="Icon only button" />);

    const button = screen.getByRole("button", { name: "Icon only button" });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
