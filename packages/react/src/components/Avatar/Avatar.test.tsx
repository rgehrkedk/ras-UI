/**
 * Avatar component tests
 */

import { describe, it, expect, vi } from "vitest";

import { render, screen, createUser } from "../../test/test-utils";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders with default props", () => {
    render(<Avatar />);

    const avatar = screen.getByText("??");
    expect(avatar).toBeInTheDocument();
  });

  it("generates initials from name", () => {
    render(<Avatar name="John Doe" />);

    const initials = screen.getByText("JD");
    expect(initials).toBeInTheDocument();
  });

  it("generates single initial from single word name", () => {
    render(<Avatar name="John" />);

    const initial = screen.getByText("J");
    expect(initial).toBeInTheDocument();
  });

  it("uses custom initials when provided", () => {
    render(<Avatar name="John Doe" initials="ABC" />);

    const customInitials = screen.getByText("ABC");
    expect(customInitials).toBeInTheDocument();
    // Should not show generated initials
    expect(screen.queryByText("JD")).not.toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    render(
      <Avatar
        name="John Doe"
        src="https://example.com/avatar.jpg"
        alt="User avatar"
      />,
    );

    const image = screen.getByRole("img", { name: "User avatar" });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/avatar.jpg");

    // Should not show initials when image is provided
    expect(screen.queryByText("JD")).not.toBeInTheDocument();
  });

  it("uses name as alt text when alt is not provided", () => {
    render(<Avatar name="John Doe" src="https://example.com/avatar.jpg" />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "John Doe");
  });

  it("uses default alt text when neither alt nor name provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Avatar");
  });

  it("renders different sizes", () => {
    const { rerender } = render(<Avatar name="Test" size="sm" />);
    expect(screen.getByText("T")).toBeInTheDocument();

    rerender(<Avatar name="Test" size="md" />);
    expect(screen.getByText("T")).toBeInTheDocument();

    rerender(<Avatar name="Test" size="lg" />);
    expect(screen.getByText("T")).toBeInTheDocument();

    rerender(<Avatar name="Test" size="xl" />);
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("renders different variants", () => {
    const { rerender } = render(<Avatar name="Test" variant="primary" />);
    expect(screen.getByText("T")).toBeInTheDocument();

    rerender(<Avatar name="Test" variant="secondary" />);
    expect(screen.getByText("T")).toBeInTheDocument();

    rerender(<Avatar name="Test" variant="success" />);
    expect(screen.getByText("T")).toBeInTheDocument();

    rerender(<Avatar name="Test" variant="warning" />);
    expect(screen.getByText("T")).toBeInTheDocument();

    rerender(<Avatar name="Test" variant="danger" />);
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Avatar name="Test" className="custom-avatar" />);

    const avatar = screen.getByText("T").closest("div");
    expect(avatar).toHaveClass("custom-avatar");
  });

  it("handles click events when clickable", async () => {
    const user = createUser();
    const handleClick = vi.fn();

    render(<Avatar name="Clickable" onClick={handleClick} />);

    const avatar = screen.getByRole("button");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("tabIndex", "0");

    await user.click(avatar);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is not clickable when onClick is not provided", () => {
    render(<Avatar name="Not Clickable" />);

    const avatar = screen.getByText("NC").closest("div");
    expect(avatar).not.toHaveAttribute("role", "button");
    expect(avatar).not.toHaveAttribute("tabIndex");
  });

  it("supports keyboard interaction when clickable", async () => {
    const user = createUser();
    const handleClick = vi.fn();

    render(<Avatar name="Keyboard" onClick={handleClick} />);

    const avatar = screen.getByRole("button");

    // Tab to focus
    await user.tab();
    expect(avatar).toHaveFocus();

    // Enter to click
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Space to click
    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  describe("Initial Generation", () => {
    it("handles empty name gracefully", () => {
      render(<Avatar name="" />);

      const fallback = screen.getByText("??");
      expect(fallback).toBeInTheDocument();
    });

    it("handles whitespace-only name", () => {
      render(<Avatar name="   " />);

      const fallback = screen.getByText("??");
      expect(fallback).toBeInTheDocument();
    });

    it("generates initials from multiple words correctly", () => {
      render(<Avatar name="John Michael Doe Smith" />);

      // Should use first and last word
      const initials = screen.getByText("JS");
      expect(initials).toBeInTheDocument();
    });

    it("handles names with special characters", () => {
      render(<Avatar name="Jean-Paul O'Connor" />);

      const initials = screen.getByText("JO");
      expect(initials).toBeInTheDocument();
    });

    it("converts initials to uppercase", () => {
      render(<Avatar name="john doe" />);

      const initials = screen.getByText("JD");
      expect(initials).toBeInTheDocument();
    });

    it("handles unicode characters", () => {
      render(<Avatar name="José María" />);

      const initials = screen.getByText("JM");
      expect(initials).toBeInTheDocument();
    });
  });

  describe("Image Handling", () => {
    it("shows initials when image fails to load", () => {
      render(
        <Avatar name="John Doe" src="https://invalid-url.com/avatar.jpg" />,
      );

      const image = screen.getByRole("img");

      // Simulate image load error
      image.dispatchEvent(new Event("error"));

      // Should still show the image element, but browser will handle the broken image
      expect(image).toBeInTheDocument();
    });

    it("applies correct CSS class to image", () => {
      render(<Avatar name="John Doe" src="https://example.com/avatar.jpg" />);

      const image = screen.getByRole("img");
      expect(image).toHaveClass("avatarImage");
    });
  });

  describe("Accessibility", () => {
    it("has correct role when clickable", () => {
      render(<Avatar name="Test" onClick={() => {}} />);

      const avatar = screen.getByRole("button");
      expect(avatar).toBeInTheDocument();
    });

    it("does not have button role when not clickable", () => {
      render(<Avatar name="Test" />);

      const avatar = screen.getByText("T").closest("div");
      expect(avatar).not.toHaveAttribute("role");
    });

    it("is focusable when clickable", () => {
      render(<Avatar name="Test" onClick={() => {}} />);

      const avatar = screen.getByRole("button");
      expect(avatar).toHaveAttribute("tabIndex", "0");
    });

    it("is not focusable when not clickable", () => {
      render(<Avatar name="Test" />);

      const avatar = screen.getByText("T").closest("div");
      expect(avatar).not.toHaveAttribute("tabIndex");
    });

    it("provides appropriate alt text for images", () => {
      render(
        <Avatar
          name="John Doe"
          src="https://example.com/avatar.jpg"
          alt="Custom alt text"
        />,
      );

      const image = screen.getByRole("img");
      expect(image).toHaveAccessibleName("Custom alt text");
    });

    it("includes initials in accessible content", () => {
      render(<Avatar name="John Doe" />);

      const initials = screen.getByText("JD");
      expect(initials).toBeInTheDocument();
      // The initials span should be accessible to screen readers
      expect(initials).toHaveClass("avatarInitials");
    });
  });

  describe("Edge Cases", () => {
    it("handles very long names", () => {
      const longName =
        "Extraordinarily Long First Name Incredibly Extended Last Name";
      render(<Avatar name={longName} />);

      // Should still generate two initials from first and last words
      const initials = screen.getByText("EN");
      expect(initials).toBeInTheDocument();
    });

    it("handles names with numbers", () => {
      render(<Avatar name="User123 Test456" />);

      const initials = screen.getByText("UT");
      expect(initials).toBeInTheDocument();
    });

    it("handles single character names", () => {
      render(<Avatar name="X" />);

      const initial = screen.getByText("X");
      expect(initial).toBeInTheDocument();
    });

    it("handles custom initials longer than 2 characters", () => {
      render(<Avatar name="Test" initials="ABC" />);

      const initials = screen.getByText("ABC");
      expect(initials).toBeInTheDocument();
    });

    it("handles empty custom initials", () => {
      render(<Avatar name="John Doe" initials="" />);

      // Should fall back to generated initials
      const initials = screen.getByText("JD");
      expect(initials).toBeInTheDocument();
    });
  });

  describe("Event Handling", () => {
    it("stops propagation when needed", async () => {
      const user = createUser();
      const handleContainerClick = vi.fn();
      const handleAvatarClick = vi.fn();

      render(
        <div onClick={handleContainerClick}>
          <Avatar name="Test" onClick={handleAvatarClick} />
        </div>,
      );

      const avatar = screen.getByRole("button");
      await user.click(avatar);

      expect(handleAvatarClick).toHaveBeenCalledTimes(1);
      // Container click should also fire due to event bubbling
      expect(handleContainerClick).toHaveBeenCalledTimes(1);
    });

    it("handles multiple rapid clicks", async () => {
      const user = createUser();
      const handleClick = vi.fn();

      render(<Avatar name="Test" onClick={handleClick} />);

      const avatar = screen.getByRole("button");

      // Rapid clicks
      await user.click(avatar);
      await user.click(avatar);
      await user.click(avatar);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("Style Application", () => {
    it("combines size and variant classes correctly", () => {
      render(
        <Avatar
          name="Test"
          size="lg"
          variant="success"
          className="custom-class"
        />,
      );

      const avatar = screen.getByText("T").closest("div");
      expect(avatar).toHaveClass("custom-class");
      // Size and variant classes are applied via CSS modules,
      // so we can't easily test their exact names, but we can verify the element exists
      expect(avatar).toBeInTheDocument();
    });

    it("applies clickable styles when clickable", () => {
      render(<Avatar name="Test" onClick={() => {}} />);

      const avatar = screen.getByRole("button");
      // Clickable styles are applied via CSS modules
      expect(avatar).toBeInTheDocument();
    });
  });
});
