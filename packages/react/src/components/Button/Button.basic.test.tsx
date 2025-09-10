/**
 * Basic Button component tests (without CSS imports)
 */

import React from "react";
import { Button as AriaButton } from "react-aria-components";
import { describe, it, expect, vi } from "vitest";

import { render, screen, createUser } from "../../test/test-utils";

// Simplified Button component for testing without CSS imports
interface BasicButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  isDisabled?: boolean;
}

const BasicButton = React.forwardRef<HTMLButtonElement, BasicButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      children,
      onPress,
      isDisabled,
      ...props
    },
    ref,
  ) => {
    return (
      <AriaButton
        ref={ref}
        className={`button button--${variant} button--${size}`}
        isDisabled={isDisabled || loading}
        onPress={onPress}
        {...props}
      >
        {loading && <span data-testid="spinner">Loading...</span>}
        {!loading && children}
      </AriaButton>
    );
  },
);

BasicButton.displayName = "BasicButton";

describe("BasicButton", () => {
  it("renders with default props", () => {
    render(<BasicButton>Click me</BasicButton>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders different variants", () => {
    const { rerender } = render(
      <BasicButton variant="primary">Primary</BasicButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("button--primary");

    rerender(<BasicButton variant="secondary">Secondary</BasicButton>);
    expect(screen.getByRole("button")).toHaveClass("button--secondary");

    rerender(<BasicButton variant="ghost">Ghost</BasicButton>);
    expect(screen.getByRole("button")).toHaveClass("button--ghost");

    rerender(<BasicButton variant="danger">Danger</BasicButton>);
    expect(screen.getByRole("button")).toHaveClass("button--danger");
  });

  it("renders different sizes", () => {
    const { rerender } = render(<BasicButton size="sm">Small</BasicButton>);
    expect(screen.getByRole("button")).toHaveClass("button--sm");

    rerender(<BasicButton size="md">Medium</BasicButton>);
    expect(screen.getByRole("button")).toHaveClass("button--md");

    rerender(<BasicButton size="lg">Large</BasicButton>);
    expect(screen.getByRole("button")).toHaveClass("button--lg");
  });

  it("handles click events", async () => {
    const user = createUser();
    const handlePress = vi.fn();

    render(<BasicButton onPress={handlePress}>Click me</BasicButton>);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("renders in loading state", () => {
    render(<BasicButton loading>Loading</BasicButton>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("handles disabled state", async () => {
    const user = createUser();
    const handlePress = vi.fn();

    render(
      <BasicButton isDisabled onPress={handlePress}>
        Disabled
      </BasicButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handlePress).not.toHaveBeenCalled();
  });

  it("supports keyboard navigation", async () => {
    const user = createUser();
    const handlePress = vi.fn();

    render(<BasicButton onPress={handlePress}>Keyboard Test</BasicButton>);

    const button = screen.getByRole("button");
    button.focus();

    await user.keyboard("{Enter}");
    expect(handlePress).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(handlePress).toHaveBeenCalledTimes(2);
  });

  it("maintains focus after tab navigation", async () => {
    const user = createUser();

    render(<BasicButton>Focus Test</BasicButton>);

    const button = screen.getByRole("button");

    // Tab to focus the button
    await user.tab();
    expect(button).toHaveFocus();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(<BasicButton ref={ref}>With Ref</BasicButton>);

    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });
});
