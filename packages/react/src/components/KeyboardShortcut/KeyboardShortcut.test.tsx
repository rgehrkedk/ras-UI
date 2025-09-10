import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { KeyboardShortcut } from "./KeyboardShortcut";

describe("KeyboardShortcut", () => {
  it("renders label from combo by default", () => {
    render(<KeyboardShortcut combo="mod+E" />);
    expect(screen.getByText(/E|⌘E|Ctrl \/ \+ E/)).toBeInTheDocument();
  });

  it("uses custom label when provided", () => {
    render(<KeyboardShortcut combo="mod+E" label="Custom" />);
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("invokes onTrigger when combo is pressed", async () => {
    const user = userEvent.setup();
    const onTrigger = vi.fn();
    render(<KeyboardShortcut combo="mod+E" onTrigger={onTrigger} />);

    // Simulate Meta+E (works on mac) – jsdom will pass through
    const event = new KeyboardEvent("keydown", { key: "e", metaKey: true });
    window.dispatchEvent(event);
    expect(onTrigger).toHaveBeenCalled();
  });
});
